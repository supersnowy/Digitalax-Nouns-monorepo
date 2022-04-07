`# Digitalax CC0 Fork of Nouns DAO

This fork of Nouns DAO is done by the Digitalax Team.

The smart contracts have been modified in this repository, as well as the frontend and the subsequent subgraph

###Start in this repo
Below you can find all the packages related to this and necessary to make this deployment

First you need to go into [nouns contracts](packages/nouns-contracts) and call `yarn build`

This will generate the typescript packages required by the package to function for the frontend and the subgraph code.

###Use the digitalax-contracts repo for custom deployment 
In order to deploy the contracts, you will need to copy any changes of the smart-contract code for

NounsAuctionHouse
NounsToken

into the corresponding Digitalax Repository.

The repository is located at 
[Digitalax-contracts Repo](https://github.com/DIGITALAX/digitalax-contracts/tree/develop)

You can find the corresponding contracts at the following links in case you need to make changes to the contracts

[NounsAuctionHouse](https://github.com/DIGITALAX/digitalax-contracts/blob/develop/smart-contracts/contracts/NounsAuctionHouse.sol)

[NounsToken](https://github.com/DIGITALAX/digitalax-contracts/blob/develop/smart-contracts/contracts/NounsToken.sol)

When you go into this repo, you need to do the following

`cd smart-contracts`

`yarn`

`yarn compile`

This will leave you with the smart contract compiling on our deployment repo

###Update the deployment script with your custom parameters or requirements
The next step, to actually run through the deployment script, you first need to look at the script and update any variables you need to change for your custom deployment
All these action items are marked as TODO for the developer

[Deployment script need to edit](https://github.com/DIGITALAX/digitalax-contracts/blob/develop/smart-contracts/scripts/auction_marketplace_deployment/90_nouns_deploy.js)

Once these variables are updated, you will be able to deploy this as an upgradeable contract calling

```
npx hardhat run --network matic scripts/auction_marketplace_deployment/90_nouns_deploy.js
```
Note if you are running on a network that is not matic, you should change that in the command above.

The available networks and the network RPC, gas price, config etc is based on the [hardhat config file](https://github.com/DIGITALAX/digitalax-contracts/blob/develop/smart-contracts/hardhat.config.js)

Once this is deployed, it will indicate the smart contract addresses for this.

###Flatten the contracts and verify them
Before moving back to this repo, you should flatten the nouns token and nouns auction house smart contracts in that repo

```
sol-merger --export-plugin SPDXLicenseRemovePlugin "contracts/NounsAuctionHouse.sol" ./flattened-new
```

```
sol-merger --export-plugin SPDXLicenseRemovePlugin "contracts/NounsToken.sol" ./flattened-new
```

This will leave the flattened contracts in a directory called flattened-new so you can find them in there.

To verify on polygonscan, you need to go to the address. The contract will already be verified, as it is a TransparentUpgradeableProxy. But that
doesn't mean you can interact with it. You need to click More... -> Is this a proxy?
If you go to the proxy verification page and it shows the address in red, as it is not verified yet. 
So you go to the unverified "implementation" contract, and use the flattened contract from before to verify that one and be able to "read and write" as proxy on that contract

###Specifics about process and flow
You will need access to the contract in the future, as every day after the first auction you already set up in script -  **before the auction starts** you need to set the metadata for the following day, or the DAO nft metadata for the NFT generated on the first mint and every 15 subsequent mints

For this you need to call `setDailyUris` with an array of days and uris for those days and `setNextDaoNFTUri` with one uri at a time - this on the nouns token contract.

When you call settleCurrentAndCreateNewAuction every 24 hours on the auction house contract, you should make sure that at the endtime unix time + 1 second, the appropriate URI on the nouns token so that subgraph can anticipate this afterwards.

###Getting subgraph up
Once you have things deployed with the digitalax official repo, then you should move back to this repo.

Go to packages/nouns-subgraph

Update config/<network>.json file with the right address and block number for the deployed contracts above (the deployed proxy address, not implementation address)

Then you can follow the instructions in the nouns-subgraph package README file to deploy the subgraph.

You should have already created a subgraph on thegraph.com in the hosted service or on the new decentralized service

What you want to see, is that when you deploy the subgraph you can query a few auctions and see that there is one in progress. 

###Getting frontend up

The [nouns webapp](packages/nouns-webapp) is the frontend for interacting with auctions
You can follow the instructions in the README to get your instance hosted and connected to the subgraph you have set up for your deployment

### What is novel about this fork

The two biggest things about this fork that are novel is that first of all, we have added support for 1 ERC20 token to be used as an alternative payment to ETH. The Oracle price can be set directly on the nouns auction house occassionally.
Second of all, this fork does not mint unsuccessful auctions. In order to save gas, we dont mint every time a new auction starts. We only mint if there is a settled auction with a bid that met the reserve price. For this reason we updated the subgraph to expect an "anticipated noun" which is a URI which will be minted if and only if the reserve is met.

### DAO, more info
Digitalax has not modified the code for the Nouns DAO. If you do wish to use it as well, you can deploy the DAO using this repo, or using the digitalax-contracts repo calling
```
npx hardhat run --network matic scripts/auction_marketplace_deployment/91_nouns_dao.js
```
In the subgraph project, there is a place to put in the deployed address of the DAO contract.

-----------------------------
###Original README
# nouns-monorepo

Nouns DAO is a generative avatar art collective run by a group of crypto misfits.

## Contributing

If you're interested in contributing to Nouns DAO repos we're excited to have you. Please discuss any changes in `#developers` in [discord.gg/nouns](https://discord.gg/nouns) prior to contributing to reduce duplication of effort and in case there is any prior art that may be useful to you.

## Packages

### nouns-api

The [nouns api](packages/nouns-api) is an HTTP webserver that hosts token metadata. This is currently unused because on-chain, data URIs are enabled.

### nouns-assets

The [nouns assets](packages/nouns-assets) package holds the Noun PNG and run-length encoded image data.

### nouns-bots

The [nouns bots](packages/nouns-bots) package contains a bot that monitors for changes in Noun auction state and notifies everyone via Twitter and Discord.

### nouns-contracts

The [nouns contracts](packages/nouns-contracts) is the suite of Solidity contracts powering Nouns DAO.

### nouns-sdk

The [nouns sdk](packages/nouns-sdk) exposes the Nouns contract addresses, ABIs, and instances as well as image encoding and SVG building utilities.

### nouns-subgraph

In order to make retrieving more complex data from the auction history, [nouns subgraph](packages/nouns-subgraph) contains subgraph manifests that are deployed onto [The Graph](https://thegraph.com).

### nouns-webapp

The [nouns webapp](packages/nouns-webapp) is the frontend for interacting with Noun auctions as hosted at [nouns.wtf](https://nouns.wtf).

## Quickstart

### Install dependencies

```sh
yarn
```

### Build all packages

```sh
yarn build
```

### Run Linter

```sh
yarn lint
```

### Run Prettier

```sh
yarn format
```
`
