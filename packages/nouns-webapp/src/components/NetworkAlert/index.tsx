import { Modal } from 'react-bootstrap';
import { CHAIN_ID } from '../../config';

const networkName = () => {
  switch (Number(CHAIN_ID)) {
    case 1:
      return 'Ethereum Mainnet';
    case 4:
      return 'the Rinkeby network';
    case 137:
      return 'Polygon Mainnet';
    default:
      return `Network ${CHAIN_ID}`;
  }
};

const metamaskNetworkName = () => {
  switch (Number(CHAIN_ID)) {
    case 1:
      return 'Ethereum Mainnet';
    case 4:
      return 'Rinkeby Test Network';
    case 137:
      return 'Polygon Mainnet';
    default:
      return `Network ${CHAIN_ID}`;
  }
};

const NetworkAlert = () => {
  return (
    <>
      <Modal show={true} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Wrong Network Detected</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            CC0 DAO auctions require you to switch over Ethereum or Polygon to be able to
            participate.
          </p>
          <p>
            <b>To get started, please switch your network by following the instructions below:</b>
          </p>
          <ol>
            <li>Open Metamask</li>
            <li>Click the network select dropdown</li>
            <li>Click on "Ethereum Mainnet" or "Polygon Mainnet"</li>
          </ol>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default NetworkAlert;
