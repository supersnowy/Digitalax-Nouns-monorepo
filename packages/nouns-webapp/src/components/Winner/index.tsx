import { Button, Row, Col } from 'react-bootstrap';
import { useAppSelector } from '../../hooks';
import classes from './Winner.module.css';
import ShortAddress from '../ShortAddress';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { isMobileScreen } from '../../utils/isMobile';
import { black, primary } from '../../utils/nounBgColors';
import { CHAIN_ID } from '../../config';

interface WinnerProps {
  winner: string;
  isNounders?: boolean;
  isEthereum?: boolean;
}

const Winner: React.FC<WinnerProps> = props => {
  const { winner, isNounders, isEthereum = false } = props;
  const activeAccount = useAppSelector(state => state.account.activeAccount);
  const reduxChainId = useAppSelector(state => state.application.chainId);

  const isCool = useAppSelector(state => state.application.isCoolBackground);
  const isMobile = isMobileScreen();

  const isWinnerYou =
    activeAccount !== undefined && activeAccount.toLocaleLowerCase() === winner.toLocaleLowerCase();

  const nonNounderNounContent = isWinnerYou ? (
    <>You</>
  ) : (
    <>
      {winner ? (
        <ShortAddress size={40} isEthereum={isEthereum} address={winner} avatar={true} />
      ) : (
        <>

        {reduxChainId === CHAIN_ID ? '0x00...000' : 'Moved to Polygon Private Auction'}
        </>
      )}
    </>
  );

  const nounderNounContent = <h2>nounders.eth</h2>;

  return (
    <>
      <div className={clsx(classes.wrapper, classes.section)}>
        <div className={classes.leftCol}>
          <h4
            style={{
              color: isEthereum ? primary : black,
            }}
          >
            Winner
          </h4>
        </div>
        <div>
          <h2
            className={classes.winnerContent}
            style={{
              color: isEthereum ? primary : black,
            }}
          >
            {isNounders ? nounderNounContent : nonNounderNounContent}
          </h2>
        </div>
      </div>
      {/* {isWinnerYou && isMobile && (
        <Row>
          <Link to="/verify" className={classes.verifyLink}>
            <Button className={classes.verifyButton}>Get Verified</Button>
          </Link>
        </Row>
      )} */}
    </>
  );
};

export default Winner;
