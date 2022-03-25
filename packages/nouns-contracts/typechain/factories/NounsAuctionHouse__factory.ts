/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { NounsAuctionHouse } from "../NounsAuctionHouse";

export class NounsAuctionHouse__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<NounsAuctionHouse> {
    return super.deploy(overrides || {}) as Promise<NounsAuctionHouse>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): NounsAuctionHouse {
    return super.attach(address) as NounsAuctionHouse;
  }
  connect(signer: Signer): NounsAuctionHouse__factory {
    return super.connect(signer) as NounsAuctionHouse__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NounsAuctionHouse {
    return new Contract(address, _abi, signerOrProvider) as NounsAuctionHouse;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "nounId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "extended",
        type: "bool",
      },
    ],
    name: "AuctionBid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "nounId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "extended",
        type: "bool",
      },
    ],
    name: "AuctionBidERC20",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "nounId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "anticipatedNoun",
        type: "string",
      },
    ],
    name: "AuctionCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "nounId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
    ],
    name: "AuctionExtended",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "minBidIncrementPercentage",
        type: "uint256",
      },
    ],
    name: "AuctionMinBidIncrementPercentageUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "reservePrice",
        type: "uint256",
      },
    ],
    name: "AuctionReservePriceUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "nounId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "AuctionSettled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "timeBuffer",
        type: "uint256",
      },
    ],
    name: "AuctionTimeBufferUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "nounId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "nounMintedTokenId",
        type: "uint256",
      },
    ],
    name: "AuctionTokenMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountInETH",
        type: "uint256",
      },
    ],
    name: "_estimateERC20Amount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountInERC20",
        type: "uint256",
      },
    ],
    name: "_estimateETHAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "auction",
    outputs: [
      {
        internalType: "uint256",
        name: "nounId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "bidder",
        type: "address",
      },
      {
        internalType: "bool",
        name: "settled",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "lastBidType",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "useERC20",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nounId",
        type: "uint256",
      },
    ],
    name: "createBid",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "duration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "freezeERC20Bid",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "freezeETHBid",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract INounsToken",
        name: "_nouns",
        type: "address",
      },
      {
        internalType: "address",
        name: "_weth",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_timeBuffer",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_reservePrice",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_minBidIncrementPercentage",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minBidIncrementPercentage",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "monaToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nouns",
    outputs: [
      {
        internalType: "contract INounsToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "oracle",
    outputs: [
      {
        internalType: "contract IDigitalaxMonaOracle",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "oraclePrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reservePrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_minBidIncrementPercentage",
        type: "uint8",
      },
    ],
    name: "setMinBidIncrementPercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_reservePrice",
        type: "uint256",
      },
    ],
    name: "setReservePrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_timeBuffer",
        type: "uint256",
      },
    ],
    name: "setTimeBuffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "settleAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "settleCurrentAndCreateNewAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "timeBuffer",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "toggleFreezeERC20Bid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "toggleFreezeETHBid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
    ],
    name: "updateAuctionEndTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
    ],
    name: "updateDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_monaToken",
        type: "address",
      },
    ],
    name: "updateMonaToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IDigitalaxMonaOracle",
        name: "_oracle",
        type: "address",
      },
    ],
    name: "updateOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "updateOraclePrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "weth",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50612ad0806100206000396000f3fe6080604052600436106102195760003560e01c806387f49f541161011d578063ce9c7c0d116100b0578063ec91f2a41161007f578063f25efffc11610064578063f25efffc1461062d578063f2fde38b14610642578063f4ad10301461066257600080fd5b8063ec91f2a4146105f8578063efb6660a1461060e57600080fd5b8063ce9c7c0d14610598578063db2e1eed146105b8578063e1dec75a146105ce578063e8bba73a146105e357600080fd5b8063aed41694116100ec578063aed416941461051f578063b296024d1461053f578063b7751c711461056b578063c7802c0c1461057e57600080fd5b806387f49f54146104ac5780638da5cb5b146104cc5780639f94f70d146104ea578063a4d0a17e1461050a57600080fd5b80635c975abb116101b05780637120334b1161017f5780637d9f6db5116101645780637d9f6db5146103e55780637dc0d1d0146104775780638456cb591461049757600080fd5b80637120334b146103b0578063715018a6146103d057600080fd5b80635c975abb146103365780635ead3c5d1461035a5780635fab80781461037a578063668aa8241461039a57600080fd5b80632de45f18116101ec5780632de45f18146102c157806336ebdb38146102e15780633f4ba83a146103015780633fc8cef31461031657600080fd5b806304cd84af1461021e5780630fb5a6b41461025b5780631b50ad091461027f5780631cb44dfc146102a1575b600080fd5b34801561022a57600080fd5b5060cb5461023e906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561026757600080fd5b5061027160d15481565b604051908152602001610252565b34801561028b57600080fd5b5061029f61029a366004612866565b610682565b005b3480156102ad57600080fd5b5061029f6102bc3660046126f2565b6106e6565b3480156102cd57600080fd5b5060c95461023e906001600160a01b031681565b3480156102ed57600080fd5b5061029f6102fc3660046128ba565b61077a565b34801561030d57600080fd5b5061029f61081d565b34801561032257600080fd5b5060cd5461023e906001600160a01b031681565b34801561034257600080fd5b5060335460ff165b6040519015158152602001610252565b34801561036657600080fd5b5061029f610375366004612866565b6108b7565b34801561038657600080fd5b50610271610395366004612866565b610916565b3480156103a657600080fd5b5061027160d95481565b3480156103bc57600080fd5b5061029f6103cb366004612866565b61093f565b3480156103dc57600080fd5b5061029f6109ce565b3480156103f157600080fd5b5060d25460d35460d45460d55460d65460d75461043795949392916001600160a01b038116917401000000000000000000000000000000000000000090910460ff169087565b6040805197885260208801969096529486019390935260608501919091526001600160a01b03166080840152151560a083015260c082015260e001610252565b34801561048357600080fd5b5060ca5461023e906001600160a01b031681565b3480156104a357600080fd5b5061029f610a32565b3480156104b857600080fd5b5061029f6104c7366004612738565b610a94565b3480156104d857600080fd5b506097546001600160a01b031661023e565b3480156104f657600080fd5b5061029f6105053660046126f2565b610be4565b34801561051657600080fd5b5061029f610c78565b34801561052b57600080fd5b5061029f61053a366004612866565b610d31565b34801561054b57600080fd5b5060d0546105599060ff1681565b60405160ff9091168152602001610252565b61029f610579366004612898565b610dcb565b34801561058a57600080fd5b5060d85461034a9060ff1681565b3480156105a457600080fd5b5061029f6105b3366004612866565b61159e565b3480156105c457600080fd5b5061027160cf5481565b3480156105da57600080fd5b5061029f61162d565b3480156105ef57600080fd5b5061029f61169b565b34801561060457600080fd5b5061027160ce5481565b34801561061a57600080fd5b5060d85461034a90610100900460ff1681565b34801561063957600080fd5b5061029f611712565b34801561064e57600080fd5b5061029f61065d3660046126f2565b6117cd565b34801561066e57600080fd5b5061027161067d366004612866565b6118af565b6097546001600160a01b031633146106e15760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b60d155565b6097546001600160a01b031633146107405760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106d8565b60ca80547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b6097546001600160a01b031633146107d45760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106d8565b60d0805460ff191660ff83169081179091556040519081527fec5ccd96cc77b6219e9d44143df916af68fc169339ea7de5008ff15eae13450d906020015b60405180910390a150565b6097546001600160a01b031633146108775760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106d8565b61087f6118c7565b60d45415806108a8575060d65474010000000000000000000000000000000000000000900460ff165b156108b5576108b5611963565b565b6097546001600160a01b031633146109115760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106d8565b60d955565b6000670de0b6b3a764000060d9548361092f91906129a3565b6109399190612968565b92915050565b6097546001600160a01b031633146109995760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106d8565b60ce8190556040518181527f1b55d9f7002bda4490f467e326f22a4a847629c0f2d1ed421607d318d25b410d90602001610812565b6097546001600160a01b03163314610a285760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106d8565b6108b56000611afb565b6097546001600160a01b03163314610a8c5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106d8565b6108b5611b65565b600054610100900460ff1680610aad575060005460ff16155b610b1f5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a656400000000000000000000000000000000000060648201526084016106d8565b600054610100900460ff16158015610b41576000805461ffff19166101011790555b610b49611bed565b610b51611cbe565b610b59611d73565b610b61611b65565b60c980546001600160a01b03808a167fffffffffffffffffffffffff00000000000000000000000000000000000000009283161790925560cd80549289169290911691909117905560ce85905560cf84905560d0805460ff851660ff1990911617905560d18290558015610bdb576000805461ff00191690555b50505050505050565b6097546001600160a01b03163314610c3e5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106d8565b60cb80547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b60335460ff16610cca5760405162461bcd60e51b815260206004820152601460248201527f5061757361626c653a206e6f742070617573656400000000000000000000000060448201526064016106d8565b60026065541415610d1d5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016106d8565b6002606555610d2a611e30565b6001606555565b6097546001600160a01b03163314610d8b5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106d8565b60d581905560d280546040518381527f6e912a3a9105bdd2af817ba5adc14e6c127c1035b5b648faa29ca0d58ab8ff4e9060200160405180910390a25050565b60026065541415610e1e5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016106d8565b600260655560d280548214610e755760405162461bcd60e51b815260206004820152601760248201527f4e6f756e206e6f7420757020666f722061756374696f6e00000000000000000060448201526064016106d8565b80600301544210610ec85760405162461bcd60e51b815260206004820152600f60248201527f41756374696f6e2065787069726564000000000000000000000000000000000060448201526064016106d8565b826110215760d85460ff1615610f205760405162461bcd60e51b815260206004820152601d60248201527f4554482062696473206172652063757272656e746c792066726f7a656e00000060448201526064016106d8565b60cf54341015610f725760405162461bcd60e51b815260206004820152601f60248201527f4d7573742073656e64206174206c65617374207265736572766550726963650060448201526064016106d8565b60d0546001820154606491610f8c9160ff909116906129a3565b610f969190612968565b8160010154610fa59190612950565b34101561101c576040805162461bcd60e51b81526020600482015260248101919091527f4d7573742073656e64206d6f7265207468616e206c617374206269642062792060448201527f6d696e426964496e6372656d656e7450657263656e7461676520616d6f756e7460648201526084016106d8565b6112a5565b60d854610100900460ff16156110795760405162461bcd60e51b815260206004820152601f60248201527f45524332302062696473206172652063757272656e746c792066726f7a656e0060448201526064016106d8565b600060cf54826001015411156110c35760d05460018301546064916110a39160ff909116906129a3565b6110ad9190612968565b82600101546110bc9190612950565b90506110c8565b5060cf545b60006110d3826118af565b60cb546040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815233600482015230602482015291925082916001600160a01b039091169063dd62ed3e9060440160206040518083038186803b15801561113a57600080fd5b505afa15801561114e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611172919061287f565b10156111c05760405162461bcd60e51b815260206004820152601660248201527f496e73756666696369656e7420616c6c6f77616e63650000000000000000000060448201526064016106d8565b60cb546040517f70a0823100000000000000000000000000000000000000000000000000000000815233600482015282916001600160a01b0316906370a082319060240160206040518083038186803b15801561121c57600080fd5b505afa158015611230573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611254919061287f565b10156112a25760405162461bcd60e51b815260206004820152601460248201527f496e73756666696369656e742062616c616e636500000000000000000000000060448201526064016106d8565b50505b8060050154600114156112d457600481015460018201546112cf916001600160a01b03169061223a565b611397565b806005015460021415611397576001810154156113975760cb5460048281015460018401546040517fa9059cbb0000000000000000000000000000000000000000000000000000000081526001600160a01b039283169381019390935260248301529091169063a9059cbb90604401602060405180830381600087803b15801561135d57600080fd5b505af1158015611371573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113959190612716565b505b826113b057346001808301919091556005820155611463565b600181018390556002600582015560cb546040517f23b872dd000000000000000000000000000000000000000000000000000000008152336004820152306024820152604481018590526001600160a01b03909116906323b872dd90606401602060405180830381600087803b15801561142957600080fd5b505af115801561143d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114619190612716565b505b6004810180547fffffffffffffffffffffffff0000000000000000000000000000000000000000163317905560ce546003820154600091906114a69042906129e0565b10905080156114c25760ce546114bc9042612950565b60038301555b8361150e578154604080513381523460208201528315158183015290517f1159164c56f277e6fc99c11731bd380e0347deb969b75523398734c252706ea39181900360600190a2611552565b815460408051338152602081018790528315158183015290517f13c63c90924cb0346fa8096f70f06178975907b230e5cf24906c680caf1e67369181900360600190a25b801561159357815460038301546040519081527f6e912a3a9105bdd2af817ba5adc14e6c127c1035b5b648faa29ca0d58ab8ff4e9060200160405180910390a25b505060016065555050565b6097546001600160a01b031633146115f85760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106d8565b60cf8190556040518181527f6ab2e127d7fdf53b8f304e59d3aab5bfe97979f52a85479691a6fab27a28a6b290602001610812565b6097546001600160a01b031633146116875760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106d8565b60d8805460ff19811660ff90911615179055565b6097546001600160a01b031633146116f55760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106d8565b60d8805461ff001981166101009182900460ff1615909102179055565b600260655414156117655760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016106d8565b600260655560335460ff16156117bd5760405162461bcd60e51b815260206004820152601060248201527f5061757361626c653a207061757365640000000000000000000000000000000060448201526064016106d8565b6117c5611e30565b610d2a611963565b6097546001600160a01b031633146118275760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106d8565b6001600160a01b0381166118a35760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016106d8565b6118ac81611afb565b50565b60d95460009061092f83670de0b6b3a76400006129a3565b60335460ff166119195760405162461bcd60e51b815260206004820152601460248201527f5061757361626c653a206e6f742070617573656400000000000000000000000060448201526064016106d8565b6033805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b60d15442906000906119759083612950565b6040805160e08101825260cc54808252600060208301819052928201869052606082018490526080820183905260a0820183905260c090910182905260d281905560d382905560d485905560d583905560d680547fffffffffffffffffffffff00000000000000000000000000000000000000000016905560d791909155909150611a01906001612950565b60cc5560c9546000906001600160a01b031663b7662193611a23600185612950565b6040518263ffffffff1660e01b8152600401611a4191815260200190565b60006040518083038186803b158015611a5957600080fd5b505afa158015611a6d573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052611ab3919081019061279b565b905060d2600001547f573db038d6714774a502eb5b1f24e574ce2ce03b7538d7d18610253ccc87560d848484604051611aee939291906128f1565b60405180910390a2505050565b609780546001600160a01b038381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60335460ff1615611bb85760405162461bcd60e51b815260206004820152601060248201527f5061757361626c653a207061757365640000000000000000000000000000000060448201526064016106d8565b6033805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586119463390565b600054610100900460ff1680611c06575060005460ff16155b611c785760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a656400000000000000000000000000000000000060648201526084016106d8565b600054610100900460ff16158015611c9a576000805461ffff19166101011790555b611ca2612357565b611caa612417565b80156118ac576000805461ff001916905550565b600054610100900460ff1680611cd7575060005460ff16155b611d495760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a656400000000000000000000000000000000000060648201526084016106d8565b600054610100900460ff16158015611d6b576000805461ffff19166101011790555b611caa6124e2565b600054610100900460ff1680611d8c575060005460ff16155b611dfe5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a656400000000000000000000000000000000000060648201526084016106d8565b600054610100900460ff16158015611e20576000805461ffff19166101011790555b611e28612357565b611caa6125a8565b60d45460d290611e825760405162461bcd60e51b815260206004820152601460248201527f41756374696f6e206861736e277420626567756e00000000000000000000000060448201526064016106d8565b600481015474010000000000000000000000000000000000000000900460ff1615611eef5760405162461bcd60e51b815260206004820181905260248201527f41756374696f6e2068617320616c7265616479206265656e20736574746c656460448201526064016106d8565b8060030154421015611f435760405162461bcd60e51b815260206004820152601860248201527f41756374696f6e206861736e277420636f6d706c65746564000000000000000060448201526064016106d8565b60d680547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff167401000000000000000000000000000000000000000017905560048101546001600160a01b0316156120ec5760c954604080517f1249c58b00000000000000000000000000000000000000000000000000000000815290516000926001600160a01b031691631249c58b91600480830192602092919082900301818787803b158015611ff457600080fd5b505af1158015612008573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061202c919061287f565b60c9546004848101546040517f23b872dd00000000000000000000000000000000000000000000000000000000815230928101929092526001600160a01b039081166024830152604482018490529293509116906323b872dd90606401600060405180830381600087803b1580156120a357600080fd5b505af11580156120b7573d6000803e3d6000fd5b505083546040518493509091507fd9a5e121292eca774613938ddbb0c4f7bd958bfd6f253ce7a46584a586f49a6090600090a3505b6001810154156121e757806005015460011415612127576121226121186097546001600160a01b031690565b826001015461223a565b6121e7565b60cb546001600160a01b031663a9059cbb61214a6097546001600160a01b031690565b60018401546040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b1681526001600160a01b0390921660048301526024820152604401602060405180830381600087803b1580156121ad57600080fd5b505af11580156121c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906121e59190612716565b505b805460048201546001830154604080516001600160a01b03909316835260208301919091527fc9f72b276a388619c6d185d146697036241880c36654b1a3ffdad07c24038d99910160405180910390a250565b612244828261265e565b6123535760cd60009054906101000a90046001600160a01b03166001600160a01b031663d0e30db0826040518263ffffffff1660e01b81526004016000604051808303818588803b15801561229857600080fd5b505af11580156122ac573d6000803e3d6000fd5b505060cd546040517fa9059cbb0000000000000000000000000000000000000000000000000000000081526001600160a01b03878116600483015260248201879052909116935063a9059cbb92506044019050602060405180830381600087803b15801561231957600080fd5b505af115801561232d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123519190612716565b505b5050565b600054610100900460ff1680612370575060005460ff16155b6123e25760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a656400000000000000000000000000000000000060648201526084016106d8565b600054610100900460ff16158015611caa576000805461ffff191661010117905580156118ac576000805461ff001916905550565b600054610100900460ff1680612430575060005460ff16155b6124a25760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a656400000000000000000000000000000000000060648201526084016106d8565b600054610100900460ff161580156124c4576000805461ffff19166101011790555b6033805460ff1916905580156118ac576000805461ff001916905550565b600054610100900460ff16806124fb575060005460ff16155b61256d5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a656400000000000000000000000000000000000060648201526084016106d8565b600054610100900460ff1615801561258f576000805461ffff19166101011790555b600160655580156118ac576000805461ff001916905550565b600054610100900460ff16806125c1575060005460ff16155b6126335760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a656400000000000000000000000000000000000060648201526084016106d8565b600054610100900460ff16158015612655576000805461ffff19166101011790555b611caa33611afb565b6040805160008082526020820190925281906001600160a01b0385169061753090859060405161268e91906128d5565b600060405180830381858888f193505050503d80600081146126cc576040519150601f19603f3d011682016040523d82523d6000602084013e6126d1565b606091505b509095945050505050565b803560ff811681146126ed57600080fd5b919050565b60006020828403121561270457600080fd5b813561270f81612a85565b9392505050565b60006020828403121561272857600080fd5b8151801515811461270f57600080fd5b60008060008060008060c0878903121561275157600080fd5b863561275c81612a85565b9550602087013561276c81612a85565b94506040870135935060608701359250612788608088016126dc565b915060a087013590509295509295509295565b6000602082840312156127ad57600080fd5b815167ffffffffffffffff808211156127c557600080fd5b818401915084601f8301126127d957600080fd5b8151818111156127eb576127eb612a56565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f0116810190838211818310171561283157612831612a56565b8160405282815287602084870101111561284a57600080fd5b61285b8360208301602088016129f7565b979650505050505050565b60006020828403121561287857600080fd5b5035919050565b60006020828403121561289157600080fd5b5051919050565b600080604083850312156128ab57600080fd5b50508035926020909101359150565b6000602082840312156128cc57600080fd5b61270f826126dc565b600082516128e78184602087016129f7565b9190910192915050565b838152826020820152606060408201526000825180606084015261291c8160808501602087016129f7565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01691909101608001949350505050565b6000821982111561296357612963612a27565b500190565b60008261299e577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156129db576129db612a27565b500290565b6000828210156129f2576129f2612a27565b500390565b60005b83811015612a125781810151838201526020016129fa565b83811115612a21576000848401525b50505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6001600160a01b03811681146118ac57600080fdfea26469706673582212208229707dc51628f979b3304f55032a7714f340466bf60f44f6993e9b01902f5964736f6c63430008060033";
