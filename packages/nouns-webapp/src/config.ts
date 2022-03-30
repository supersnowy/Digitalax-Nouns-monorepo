import {
  ContractAddresses as NounsContractAddresses,
  getContractAddressesForChainOrThrow,
} from '@digitalax/nouns-sdk';
import { ChainId } from '@usedapp/core';
import { BigNumber } from 'ethers';

interface ExternalContractAddresses {
  lidoToken: string | undefined;
}

export type ContractAddresses = NounsContractAddresses & ExternalContractAddresses;

interface AppConfig {
  jsonRpcUri: string;
  wsRpcUri: string;
  subgraphApiUri: string;
  enableHistory: boolean;
}

type SupportedChains =
  | ChainId.Rinkeby
  | ChainId.Mainnet
  | ChainId.Hardhat
  | ChainId.Polygon
  | ChainId.Mumbai;

export const CHAIN_ID: SupportedChains = parseInt(process.env.REACT_APP_CHAIN_ID ?? '137');

export const MAINNET_CHAIN_ID = 1;

export const ETHERSCAN_API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY ?? '';

const INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID;

export const EXCHANGE_API = 'https://api.coingecko.com/api/v3';

export const createNetworkHttpUrl = (network: string): string => {
  const custom = process.env[`REACT_APP_${network.toUpperCase()}_JSONRPC`];
  return custom || `https://eth-${network}.alchemyapi.io/v2/UN5z0qze-a7hJuNOqFMUs9t2blMsxcN7`;
};

export const createNetworkWsUrl = (network: string): string => {
  const custom = process.env[`REACT_APP_${network.toUpperCase()}_WSRPC`];
  return custom || `wss://eth-${network}.alchemyapi.io/v2/UN5z0qze-a7hJuNOqFMUs9t2blMsxcN7`;
};

const app: Record<SupportedChains, AppConfig> = {
  [ChainId.Rinkeby]: {
    jsonRpcUri: createNetworkHttpUrl('rinkeby'),
    wsRpcUri: createNetworkWsUrl('rinkeby'),
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph-rinkeby-v4',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
  [ChainId.Mainnet]: {
    jsonRpcUri: createNetworkHttpUrl('mainnet'),
    wsRpcUri: createNetworkWsUrl('mainnet'),
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/digitalax/nouns-subgraph-mainnet',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
  [ChainId.Hardhat]: {
    jsonRpcUri: 'http://localhost:8545',
    wsRpcUri: 'ws://localhost:8545',
    subgraphApiUri: '',
    enableHistory: false,
  },
  [ChainId.Mumbai]: {
    jsonRpcUri: 'https://matic-mumbai.chainstacklabs.com/',
    wsRpcUri: 'wss://ws-matic-mumbai.chainstacklabs.com',
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/digitalax/nouns-subgraph-mumbai',
    enableHistory: true,
  },
  [ChainId.Polygon]: {
    jsonRpcUri: 'https://polygon-mainnet.g.alchemy.com/v2/l_-zZAI0v9EWjrG1dee494hg1XDh38A8',
    wsRpcUri: 'wss://polygon-mainnet.g.alchemy.com/v2/l_-zZAI0v9EWjrG1dee494hg1XDh38A8',
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/digitalax/nouns-subgraph-matic',
    enableHistory: true,
  },
};

const externalAddresses: Record<SupportedChains, ExternalContractAddresses> = {
  [ChainId.Rinkeby]: {
    lidoToken: '0xF4242f9d78DB7218Ad72Ee3aE14469DBDE8731eD',
  },
  [ChainId.Mainnet]: {
    lidoToken: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
  },
  [ChainId.Hardhat]: {
    lidoToken: undefined,
  },
  [ChainId.Polygon]: {
    lidoToken: '0x6968105460f67c3BF751bE7C15f92F5286Fd0CE5',
  },
  [ChainId.Mumbai]: {
    lidoToken: '0xefd3d060ddcfed7903806503440db1089031af3a',
  },
};

const getAddresses = (chainId: SupportedChains): ContractAddresses => {
  let nounsAddresses = {} as NounsContractAddresses;
  try {
    nounsAddresses = getContractAddressesForChainOrThrow(chainId);
  } catch (e) {
    console.log({ e });
  }
  return { ...nounsAddresses, ...externalAddresses[chainId] };
};

const config = {
  app: app[CHAIN_ID],
  addresses: getAddresses(CHAIN_ID),
};

export const mainnetConfig = {
  app: app[MAINNET_CHAIN_ID],
  addresses: getAddresses(MAINNET_CHAIN_ID),
};

export const isPolygon = (chainId: string = '137') => {
  return BigNumber.from(chainId).toNumber() === CHAIN_ID;
};

export const isMainnet = (chainId: string = '1') => {
  return BigNumber.from(chainId).toNumber() === MAINNET_CHAIN_ID;
};

export const getCurrentConfig = (chainId: string = '1') => {
  if (BigNumber.from(chainId).toNumber() === CHAIN_ID) return config;
  return mainnetConfig;
};

export default config;
