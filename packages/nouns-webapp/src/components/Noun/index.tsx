import classes from './Noun.module.css';
import React from 'react';
// import Skeleton from 'ract-loading-skeleton';
import loadingNoun from '../../assets/loading-skull-noun.gif';
import Image from 'react-bootstrap/Image';
import { useEthers } from '@usedapp/core';
import { CHAIN_ID, isMainnet, MAINNET_CHAIN_ID } from '../../config';

export const LoadingNoun = () => {
  return (
    <div className={classes.imgWrapper}>
      <div className={classes.skeleton} />
    </div>
  );
};

export const requestSwitchNetwork = (chainId: number) => {
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
  window.ethereum
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
  const buttonText =
    chainId === CHAIN_ID
      ? 'Switch to Public Ethereum Auction'
      : 'Switch to DAO Only Polygon Auction';

  const switchNetwork = () => {
    if (isMainnet(chainId?.toString())) {
      requestSwitchNetwork(CHAIN_ID);
    } else {
      requestSwitchNetwork(MAINNET_CHAIN_ID);
    }
  };

  return (
    <div>
      <div className={`${classes.imgWrapper} ${wrapperClassName}`}>
        {type === 'image' ? (
          <Image
            className={`${classes.img} ${
              isEthereum ? classes.ethereumBorder : classes.polygonBorder
            } ${className}`}
            src={imgPath ? imgPath : loadingNoun}
            alt={alt}
            fluid
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
      </div>
      {/* <button onClick={switchNetwork} className={classes.switchNetwork}>
        {buttonText}
      </button> */}
      <div className={classes.switchNetwork} style={{ textAlign: 'center', width: 'fit-content' }}>
        Private Auction will be live tomorrow
      </div>
    </div>
  );
};

export default Noun;
