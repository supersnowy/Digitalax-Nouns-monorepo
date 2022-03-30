import { useState } from 'react';
import { black, primary } from '../../utils/nounBgColors';
import classes from './AuctionDescription.module.css';

const AuctionDescription: React.FC<{ isEthereum?: boolean; description: string }> = props => {
  const { isEthereum = false, description } = props;
  const [show, setShow] = useState(false);

  return (
    <div
      className={classes.wrapper}
      style={{
        backgroundColor: isEthereum ? 'rgba(30, 228, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
      }}
      onClick={() => setShow(!show)}
    >
      <p
        style={{
          color: isEthereum ? primary : black,
          WebkitLineClamp: show ? 'none' : 2,
          WebkitBoxOrient: show ? 'unset' : 'vertical',
          overflow: show ? 'unset' : 'hidden',
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default AuctionDescription;
