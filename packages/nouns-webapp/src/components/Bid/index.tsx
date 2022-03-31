import { Auction, AuctionHouseContractFunction } from '../../wrappers/nounsAuction';
import {
  connectContractToSigner,
  useEthers,
  useContractFunction,
  useContractCall,
} from '@usedapp/core';
import { useAppSelector } from '../../hooks';
import React, { useEffect, useState, useRef, ChangeEvent, useCallback } from 'react';
import { utils, BigNumber as EthersBN, ethers } from 'ethers';
import BigNumber from 'bignumber.js';
import classes from './Bid.module.css';
import { Spinner, InputGroup, FormControl, Button, Col, Form } from 'react-bootstrap';
import { useAuctionMinBidIncPercentage } from '../../wrappers/nounsAuction';
import { useAppDispatch } from '../../hooks';
import { AlertModal, setAlertModal } from '../../state/slices/application';
import { NounsAuctionHouseFactory } from '@digitalax/nouns-sdk';
import { getCurrentConfig } from '../../config';
import WalletConnectModal from '../WalletConnectModal';
import SettleManuallyBtn from '../SettleManuallyBtn';
import ERC20ABI from '../../libs/abi/ERC20.json';
import { black, primary, white } from '../../utils/nounBgColors';

const computeMinimumNextBid = (
  currentBid: BigNumber,
  minBidIncPercentage: BigNumber | undefined,
): BigNumber => {
  return !minBidIncPercentage
    ? new BigNumber(0)
    : currentBid.times(minBidIncPercentage.div(100).plus(1));
};

const minBidEth = (minBid: BigNumber, paymentOption: string): string => {
  if (minBid.isZero()) {
    if (paymentOption === 'ETH') return '0.1';
    else if (paymentOption === 'MONA') return '0.9';
    else if (paymentOption === 'CC0') return '10';
  }

  const eth = Number(utils.formatEther(EthersBN.from(minBid.toString())));
  const roundedEth = Math.ceil(eth * 100) / 100;

  return roundedEth.toString();
};

const currentBid = (bidInputRef: React.RefObject<HTMLInputElement>) => {
  if (!bidInputRef.current || !bidInputRef.current.value) {
    return new BigNumber(0);
  }
  return new BigNumber(utils.parseEther(bidInputRef.current.value).toString());
};

const cc0TokenAddress = '0x91dbd2951310e887940c29d9828556086a52c54a';

const Bid: React.FC<{
  auction: Auction;
  isEthereum?: boolean;
  auctionEnded: boolean;
}> = props => {
  const activeAccount = useAppSelector(state => state.account.activeAccount);
  const { library, chainId } = useEthers();
  let { auction, auctionEnded, isEthereum } = props;
  const [paymentOption, setPaymentOption] = useState<string>(isEthereum ? 'ETH' : 'CC0');
  const currentConfig = getCurrentConfig(chainId?.toString());

  const nounsAuctionHouseContract = new NounsAuctionHouseFactory().attach(
    currentConfig.addresses.nounsAuctionHouseProxy,
  );

  const account = useAppSelector(state => state.account.activeAccount);

  const bidInputRef = useRef<HTMLInputElement>(null);

  const [bidInput, setBidInput] = useState('');
  const [bidButtonContent, setBidButtonContent] = useState({
    loading: false,
    content: auctionEnded ? 'Settle' : auction.bidder !== activeAccount ? 'Place bid' : 'Withdraw',
  });

  const [showConnectModal, setShowConnectModal] = useState(false);

  const hideModalHandler = () => {
    setShowConnectModal(false);
  };

  const dispatch = useAppDispatch();
  const setModal = useCallback((modal: AlertModal) => dispatch(setAlertModal(modal)), [dispatch]);

  const minBidIncPercentage = useAuctionMinBidIncPercentage();
  const minBid = computeMinimumNextBid(
    auction && new BigNumber(auction.amount.toString()),
    minBidIncPercentage,
  );

  const { send: placeBid, state: placeBidState } = useContractFunction(
    nounsAuctionHouseContract,
    AuctionHouseContractFunction.createBid,
  );
  const { send: settleAuction, state: settleAuctionState } = useContractFunction(
    nounsAuctionHouseContract,
    AuctionHouseContractFunction.settleCurrentAndCreateNewAuction,
  );

  const web3Provider = new ethers.providers.JsonRpcProvider(currentConfig.app.jsonRpcUri);
  const monaContract = new ethers.Contract(
    currentConfig.addresses.lidoToken ?? '',
    ERC20ABI,
    web3Provider,
  );
  const cc0Contract = new ethers.Contract(cc0TokenAddress, ERC20ABI, web3Provider);
  const { send: approve, state: approveState } = useContractFunction(monaContract, 'approve');
  const { send: approveCC0 } = useContractFunction(cc0Contract, 'approve');

  const bidInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    // disable more than 2 digits after decimal point
    if (input.includes('.') && event.target.value.split('.')[1].length > 2) {
      return;
    }

    setBidInput(event.target.value);
  };

  const confirmBid = async () => {
    if (!auction || !bidInputRef.current || !bidInputRef.current.value) {
      return;
    }
    if (
      currentBid(bidInputRef).isLessThan(
        new BigNumber(utils.parseEther(minBidEth(minBid, paymentOption)).toString()),
      )
    ) {
      setModal({
        show: true,
        isEthereum,
        title: 'Insufficient bid amount 🤏',
        message: `Please place a bid higher than or equal to the minimum bid amount of ${minBidEth(
          minBid,
          paymentOption,
        )} ETH.`,
      });
      setBidInput(minBidEth(minBid, paymentOption));
      return;
    }

    setModal({
      show: true,
      isEthereum,
      title: 'Confirm Bid',
      message:
        'Are you sure you want to place this bid? The contract is decentralised and you will not be able to withdraw your bid after placing it. If someone bids higher than you then you will be immediately refunded. ',
      onSuccess: handlePlaceBid,
    });
  };

  const handlePlaceBid = async () => {
    if (!auction || !bidInputRef.current || !bidInputRef.current.value) {
      return;
    }

    const value = utils.parseEther(bidInputRef.current.value.toString());

    if (isEthereum) {
      if (paymentOption === 'MONA') {
        const approval: BigNumber = await monaContract.allowance(
          account,
          currentConfig.addresses.nounsAuctionHouseProxy,
        );

        if (utils.parseEther(approval.toString()) < utils.parseEther('1000000000'))
          await approve(
            currentConfig.addresses.nounsAuctionHouseProxy,
            utils.parseEther('1000000000'),
          );
        placeBid(value, auction.nounId);
      } else {
        placeBid(0, auction.nounId, {
          value,
        });
      }
    } else {
      const approval = await cc0Contract.allowance(
        account,
        currentConfig.addresses.nounsAuctionHouseProxy,
      );
      if (utils.parseEther(approval.toString()) < utils.parseEther('1000000000'))
        await approveCC0(
          currentConfig.addresses.nounsAuctionHouseProxy,
          utils.parseEther('1000000000'),
        );

      placeBid(value, auction.nounId);
    }
  };

  const settleAuctionHandler = () => {
    settleAuction();
  };

  const clearBidInput = () => {
    if (bidInputRef.current) {
      bidInputRef.current.value = '';
    }
  };

  // successful bid using redux store state
  useEffect(() => {
    if (!account) return;

    // tx state is mining
    const isMiningUserTx = placeBidState.status === 'Mining';
    // allows user to rebid against themselves so long as it is not the same tx
    const isCorrectTx = currentBid(bidInputRef).isEqualTo(new BigNumber(auction.amount.toString()));
    if (isMiningUserTx && auction.bidder === account && isCorrectTx) {
      placeBidState.status = 'Success';
      setModal({
        title: 'Success',
        isEthereum,
        message: `Bid was placed successfully!`,
        show: true,
      });
      setBidButtonContent({ loading: false, content: 'Place bid' });
      clearBidInput();
    }
  }, [auction, placeBidState, account, setModal]);

  // placing bid transaction state hook
  useEffect(() => {
    switch (!auctionEnded && placeBidState.status) {
      case 'None':
        setBidButtonContent({
          loading: false,
          content: 'Place bid',
        });
        break;
      case 'Mining':
        setBidButtonContent({ loading: true, content: '' });
        break;
      case 'Fail':
        setModal({
          title: 'Transaction Failed',
          isEthereum,
          message: placeBidState.errorMessage ? placeBidState.errorMessage : 'Please try again.',
          show: true,
        });
        setBidButtonContent({ loading: false, content: 'Place bid' });
        break;
      case 'Exception':
        setModal({
          title: 'Error',
          isEthereum,
          message: placeBidState.errorMessage ? placeBidState.errorMessage : 'Please try again.',
          show: true,
        });
        setBidButtonContent({ loading: false, content: 'Place bid' });
        break;
    }
  }, [placeBidState, auctionEnded, setModal]);

  // settle auction transaction state hook
  useEffect(() => {
    switch (auctionEnded && settleAuctionState.status) {
      case 'None':
        setBidButtonContent({
          loading: false,
          content: 'Settle Auction',
        });
        break;
      case 'Mining':
        setBidButtonContent({ loading: true, content: '' });
        break;
      case 'Success':
        setModal({
          title: 'Success',
          isEthereum,
          message: `Success! Your bid was placed. You can withdraw your bid at anytime. If you are outbid your funds are sent back to your wallet. Good luck!`,
          show: true,
        });
        setBidButtonContent({ loading: false, content: 'Withdraw' });
        break;
      case 'Fail':
        setModal({
          title: 'Transaction Failed',
          isEthereum,
          message: settleAuctionState.errorMessage
            ? settleAuctionState.errorMessage
            : 'Please try again.',
          show: true,
        });
        setBidButtonContent({ loading: false, content: 'Settle Auction' });
        break;
      case 'Exception':
        setModal({
          title: 'Error',
          isEthereum,
          message: settleAuctionState.errorMessage
            ? settleAuctionState.errorMessage
            : 'Please try again.',
          show: true,
        });
        setBidButtonContent({ loading: false, content: 'Settle Auction' });
        break;
    }
  }, [settleAuctionState, auctionEnded, setModal]);

  if (!auction) return null;

  const isDisabled =
    placeBidState.status === 'Mining' || settleAuctionState.status === 'Mining' || !activeAccount;

  const minBidCopy = `${minBidEth(minBid, paymentOption)} ${
    isEthereum ? paymentOption : 'CC0'
  } or more`;
  const fomoNounsBtnOnClickHandler = () => {
    // Open Fomo Nouns in a new tab
    window.open('https://fomonouns.wtf', '_blank')?.focus();
  };

  const isWalletConnected = activeAccount !== undefined;

  return (
    <>
      {showConnectModal && activeAccount === undefined && (
        <WalletConnectModal onDismiss={hideModalHandler} />
      )}
      {isEthereum && (
        <div className="mb-3">
          <Form.Check
            className={isEthereum ? classes.formCheck : classes.polygonFormCheck}
            inline
            label="Eth"
            defaultChecked={paymentOption === 'ETH'}
            name="group1"
            type="radio"
            onChange={e => {
              setPaymentOption('ETH');
            }}
            id={`inline-radio-1`}
          />
          <Form.Check
            className={isEthereum ? classes.formCheck : classes.polygonFormCheck}
            inline
            label="Mona"
            defaultChecked={paymentOption === 'MONA'}
            name="group1"
            value={paymentOption}
            type="radio"
            onChange={() => {
              setPaymentOption('MONA');
            }}
            id={`inline-radio-2`}
          />
        </div>
      )}
      <InputGroup>
        {!auctionEnded && (
          <>
            <span
              style={{ color: isEthereum ? primary : black }}
              className={classes.customPlaceholderBidAmt}
            >
              {!auctionEnded && !bidInput ? minBidCopy : ''}
            </span>
            <FormControl
              className={classes.bidInput}
              style={{
                backgroundColor: isEthereum ? 'rgba(30, 228, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                color: isEthereum ? 'rgba(30, 228, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
              }}
              type="number"
              min="0"
              onChange={bidInputHandler}
              ref={bidInputRef}
              value={bidInput}
            />
          </>
        )}
        {!auctionEnded ? (
          <Button
            style={{
              backgroundColor: isEthereum ? primary : black,
              color: isEthereum ? black : white,
            }}
            className={auctionEnded ? classes.bidBtnAuctionEnded : classes.bidBtn}
            onClick={auctionEnded ? settleAuctionHandler : confirmBid}
            disabled={isDisabled}
          >
            {bidButtonContent.loading ? <Spinner animation="border" /> : bidButtonContent.content}
          </Button>
        ) : (
          <>
            {/* <Col lg={12} className={classes.voteForNextNounBtnWrapper}>
              <Button className={classes.bidBtnAuctionEnded} onClick={fomoNounsBtnOnClickHandler}>
                Vote for the next Noun ⌐◧-◧
              </Button>
            </Col> */}
            {/* Only show force settle button if wallet connected */}
            {/* {isWalletConnected && (
              <Col lg={12}>
                <SettleManuallyBtn settleAuctionHandler={settleAuctionHandler} auction={auction} />
              </Col>
            )} */}
          </>
        )}
      </InputGroup>
    </>
  );
};
export default Bid;
