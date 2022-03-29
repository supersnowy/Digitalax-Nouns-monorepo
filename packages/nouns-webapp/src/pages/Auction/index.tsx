import Banner from '../../components/Banner';
import Auction from '../../components/Auction';
import Documentation from '../../components/Documentation';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setOnDisplayAuctionNounId } from '../../state/slices/onDisplayAuction';
import { push } from 'connected-react-router';
import { nounPath } from '../../utils/history';
import useOnDisplayAuction from '../../wrappers/onDisplayAuction';
import { useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import { CHAIN_ID } from '../../config';

interface AuctionPageProps {
  initialAuctionId?: number;
}

const AuctionPage: React.FC<AuctionPageProps> = props => {
  const { initialAuctionId } = props;
  const { chainId } = useEthers();
  const onDisplayAuction = useOnDisplayAuction();
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
        if (onDisplayAuction === undefined) {
          // handle regular noun path ids on first load
          dispatch(setOnDisplayAuctionNounId(initialAuctionId));
        }
      }
    } else {
      // no noun path id set
      if (typeof lastAuctionNounId !== 'undefined') {
        dispatch(setOnDisplayAuctionNounId(lastAuctionNounId));
      }
    }
  }, [lastAuctionNounId, dispatch, initialAuctionId, onDisplayAuction]);

  const title = chainId === CHAIN_ID ? 'DAO Only Auction | Polygon' : 'Public Auction | Ethereum';
  const isEthereum = chainId === CHAIN_ID ? false : true;

  return (
    <>
      {/* <Auction auction={onDisplayAuction} title={'Public Auction | Ethereum'} /> */}
      <Auction auction={onDisplayAuction} isEthereum={isEthereum} title={title} />
      {/* {onDisplayAuctionNounId && onDisplayAuctionNounId !== lastAuctionNounId ? (
        <ProfileActivityFeed nounId={onDisplayAuctionNounId} />
      ) : (
        <Banner />
      )} */}
      <Documentation />
    </>
  );
};
export default AuctionPage;
