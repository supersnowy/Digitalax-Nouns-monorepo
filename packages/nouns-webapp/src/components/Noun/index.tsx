import classes from './Noun.module.css';
import React, { useCallback, useState } from 'react';
// import Skeleton from 'ract-loading-skeleton';
import loadingNoun from '../../assets/loading-skull-noun.gif';
import Image from 'react-bootstrap/Image';
import { useEthers } from '@usedapp/core';
import { CHAIN_ID, isMainnet, MAINNET_CHAIN_ID } from '../../config';
import { AlertModal, setAlertModal, setChainId } from '../../state/slices/application';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks';
import WalletConnectModal from '../WalletConnectModal';
import { setShowConnectModal } from '../../state/slices/account';

export const LoadingNoun = () => {
  const { chainId } = useEthers();
  return (
    <div className={classes.imgWrapper}>
      <div
        className={`${classes.loader} ${chainId?.toString() === '137' && classes.polygonLoader}`}
        title="0"
      >
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
      {/* <div className={classes.skeleton} /> */}
    </div>
  );
};

export const requestSwitchNetwork = async (chainId: number) => {
  const mainnetParams = {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    rpcUrls: ['https://mainnet.infura.io/v3/'],
    blockExplorerUrls: ['https://etherscan.io'],
  };
  const polygonParams = {
    chainId: '0x89',
    chainName: 'Matic Main Network',
    rpcUrls: ['https://matic-mainnet.chainstacklabs.com'],
    blockExplorerUrls: ['https://explorer-mainnet.maticvigil.com'],
  };
  return window.ethereum
    .request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: chainId === CHAIN_ID ? '0x89' : '0x1',
        },
      ],
    })
    .then(() => {})
    .catch((err: any) => {
      window.ethereum
        .request({
          method: 'wallet_addEthereumChain',
          params: [chainId === CHAIN_ID ? polygonParams : mainnetParams],
        })
        .then(() => {})
        .catch((err: any) => {
          console.log(err);
        });
    });
};

const Noun: React.FC<{
  imgPath: string;
  alt?: string;
  type?: 'animation' | 'image';
  isEthereum?: boolean;
  className?: string;
  wrapperClassName?: string;
}> = props => {
  const { imgPath, type, alt, className, wrapperClassName, isEthereum = false } = props;
  const { chainId } = useEthers();
  const reduxChainId = useAppSelector(state => state.application.chainId);
  const activeAccount = useAppSelector(state => state.account.activeAccount);
  const currentAuctionId = useAppSelector(state => state.onDisplayAuction.onDisplayAuctionNounId);
  const dispatch = useAppDispatch();
  const [zoom, setZoom] = useState(false);
  const setModal = useCallback((modal: AlertModal) => dispatch(setAlertModal(modal)), [dispatch]);
  const buttonText =
    reduxChainId === CHAIN_ID
      ? 'Switch to Public Ethereum Auction'
      : 'Switch to DAO Only Polygon Auction';

  const switchNetwork = () => {
    // setModal({
    //   show: true,
    //   isEthereum,
    //   title: 'Soooonnnnnn',
    //   message: 'Private auction will be live tomorrow',
    // });

    // if (!activeAccount) {
    //   dispatch(setShowConnectModal(true));
    //   return;
    // }

    if (activeAccount) {
      if (isMainnet(chainId?.toString())) {
        requestSwitchNetwork(CHAIN_ID);
      } else {
        requestSwitchNetwork(MAINNET_CHAIN_ID);
      }
      return;
    }

    dispatch(setChainId(reduxChainId === CHAIN_ID ? MAINNET_CHAIN_ID : CHAIN_ID));
  };

  return (
    <div>
      <div className={`${!zoom ? classes.imgWrapper : classes.imgZoomWrapper} ${wrapperClassName}`}>
        {currentAuctionId === 9 || currentAuctionId === 12 ? (
          <img
            className={`${classes.img} ${
              isEthereum ? classes.ethereumBorder : classes.polygonBorder
            } ${className}`}
            src={imgPath ? imgPath : loadingNoun}
            alt={alt}
          />
        ) : (
          <>
            {type === 'image' ? (
              <img
                className={`${classes.img} ${
                  isEthereum ? classes.ethereumBorder : classes.polygonBorder
                } ${className}`}
                src={imgPath ? imgPath : loadingNoun}
                alt={alt}
              />
            ) : (
              <video
                autoPlay
                loop
                muted
                className={`${classes.video} ${
                  isEthereum ? classes.ethereumBorder : classes.polygonBorder
                } ${className}`}
              >
                <source src={imgPath} />
              </video>
            )}
          </>
        )}
        <button className={classes.zoomBtn} onClick={() => setZoom(!zoom)}>
          <img src="/zoom_btn.png" />
        </button>
      </div>
      <button onClick={switchNetwork} className={classes.switchNetwork}>
        {buttonText}
      </button>
    </div>
  );
};

export default Noun;
