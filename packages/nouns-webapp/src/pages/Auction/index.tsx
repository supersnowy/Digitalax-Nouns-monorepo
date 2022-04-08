import Banner from '../../components/Banner';
import Auction from '../../components/Auction';
import Documentation from '../../components/Documentation';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setOnDisplayAuctionNounId } from '../../state/slices/onDisplayAuction';
import { push } from 'connected-react-router';
import { nounPath } from '../../utils/history';
import useOnDisplayAuction from '../../wrappers/onDisplayAuction';
import { useEffect, useState } from 'react';
import { useEthers } from '@usedapp/core';
import { CHAIN_ID } from '../../config';
import classes from './Auction.module.css';
import { fetchFromIpfs } from '../../utils/ipfs';
import { Auction as AuctionType } from '../../wrappers/nounsAuction';

interface AuctionPageProps {
  initialAuctionId?: number;
}

const AuctionPage: React.FC<AuctionPageProps> = props => {
  const { initialAuctionId } = props;
  const { chainId } = useEthers();
  const reduxChainId = useAppSelector(state => state.application.chainId);
  const onDisplayAuction = useOnDisplayAuction();
  const [realAuction, setRealAuction] = useState<AuctionType | undefined>();
  const isSwitching = useAppSelector(state => state.application.isSwitching);
  const lastAuctionNounId = useAppSelector(state => state.onDisplayAuction.lastAuctionNounId);
  const onDisplayAuctionNounId = onDisplayAuction?.nounId.toNumber();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof lastAuctionNounId === 'undefined') return;

    if (initialAuctionId !== undefined) {
      // handle out of bounds noun path ids
      if (initialAuctionId > lastAuctionNounId || initialAuctionId < 0) {
        dispatch(setOnDisplayAuctionNounId(lastAuctionNounId));
        dispatch(push(nounPath(lastAuctionNounId)));
      } else {
        // handle regular noun path ids on first load
        dispatch(setOnDisplayAuctionNounId(initialAuctionId));
      }
    } else {
      // no noun path id set
      if (typeof lastAuctionNounId !== 'undefined') {
        dispatch(setOnDisplayAuctionNounId(lastAuctionNounId));
      }
    }
  }, [lastAuctionNounId, dispatch, initialAuctionId, onDisplayAuction]);

  useEffect(() => {
    if (onDisplayAuction) {
      if (!onDisplayAuction.name && onDisplayAuction.tokenUri) {
        fetchFromIpfs(onDisplayAuction.tokenUri || '').then(res => {
          console.log({ res });
          setRealAuction({
            ...onDisplayAuction,
            name: res.name,
            description: res.description,
            image: res?.image,
            animation: res?.animation,
          });
        });
      } else {
        setRealAuction(onDisplayAuction);
      }
    }
  }, [onDisplayAuctionNounId]);

  const title =
    reduxChainId === CHAIN_ID ? 'DAO Only Auction | Polygon' : 'Public Auction | Ethereum';
  const isEthereum = reduxChainId === CHAIN_ID ? false : true;

  return (
    <>
      {isSwitching ? (
        <div className={`${classes.loadingWrapper} ${!isEthereum && classes.polygonWrapper}`}>
          <div className={`${classes.loader} `} title="0">
            <svg
              version="1.1"
              id="loader-1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="40px"
              height="40px"
              viewBox="0 0 40 40"
              enableBackground="new 0 0 40 40"
              xmlSpace="preserve"
            >
              <path
                opacity="0.2"
                fill="#000"
                d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
              />
              <path
                fill="#000"
                d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
              >
                <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 20 20"
                  to="360 20 20"
                  dur="0.5s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
        </div>
      ) : (
        <Auction auction={realAuction} isEthereum={isEthereum} title={title} />
      )}
      <Documentation />
    </>
  );
};
export default AuctionPage;
