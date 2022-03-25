import { BigInt, log } from '@graphprotocol/graph-ts';
import {
  AuctionBid, AuctionBidERC20,
  AuctionCreated,
  AuctionExtended,
  AuctionSettled, AuctionTokenMinted,
} from '../generated/NounsAuctionHouse/NounsAuctionHouse';
import { Auction, Noun, Bid, AnticipatedNoun, NounAttributes } from '../generated/schema';
import { getOrCreateAccount } from './utils/helpers';
import { Bytes, ipfs, json, JSONValueKind } from '@graphprotocol/graph-ts/index';

export function handleAuctionCreated(event: AuctionCreated): void {
  let nounId = event.params.nounId.toString();
  let anticipatedNoun = new AnticipatedNoun(nounId);
  const anticipatedUri = event.params.anticipatedNoun;

    anticipatedNoun.tokenUri = anticipatedUri;
    if (anticipatedNoun.tokenUri.includes('ipfs/')) {
      let tokenHash = anticipatedNoun.tokenUri.split('ipfs/')[1];
      let tokenBytes = ipfs.cat(tokenHash);
      if (tokenBytes) {
        let data = json.try_fromBytes(tokenBytes as Bytes);
        if (data.isOk) {
          if (data.value.kind == JSONValueKind.OBJECT) {
            let res = data.value.toObject();
            if (res.get('image').kind == JSONValueKind.STRING) {
              anticipatedNoun.image = res.get('image').toString();
            }
            if (res.get('animation_url').kind == JSONValueKind.STRING) {
              anticipatedNoun.animation = res.get('animation_url').toString();
            }
            if (res.get('name').kind == JSONValueKind.STRING) {
              anticipatedNoun.name = res.get('name').toString();
            }
            if (res.get('description').kind == JSONValueKind.STRING) {
              anticipatedNoun.description = res.get('description').toString();
            }
            if (res.get('attributes').kind == JSONValueKind.ARRAY) {
              let attributes = res.get('attributes').toArray();
              for (let i = 0; i < attributes.length; i += 1) {
                if (attributes[i].kind == JSONValueKind.OBJECT) {
                  let attribute = attributes[i].toObject();
                  let nounAttributes = new NounAttributes('anticipatedNoun-' + anticipatedNoun.id + i.toString());
                  nounAttributes.trait = null;
                  nounAttributes.value = null;

                  if (attribute.get('trait_type').kind == JSONValueKind.STRING) {
                    nounAttributes.trait = attribute.get('trait_type').toString();
                  }
                  if (attribute.get('value').kind == JSONValueKind.STRING) {
                    nounAttributes.value = attribute.get('value').toString();
                  }
                  nounAttributes.save();
                  let attrs = anticipatedNoun.attributes;
                  attrs.push(nounAttributes.id);
                  anticipatedNoun.attributes = attrs;
                }
              }
            }
          }
        }
      }
    }

  anticipatedNoun.save();


  let auction = new Auction(nounId);
  auction.anticipatedNoun = anticipatedNoun.id;
  auction.amount = BigInt.fromI32(0);
  auction.startTime = event.params.startTime;
  auction.endTime = event.params.endTime;
  auction.settled = false;
  auction.save();
}

export function handleAuctionBid(event: AuctionBid): void {
  let nounId = event.params.nounId.toString();
  let bidderAddress = event.params.sender.toHex();

  let bidder = getOrCreateAccount(bidderAddress);

  let auction = Auction.load(nounId);
  if (auction == null) {
    log.error('[handleAuctionBid] Auction not found for Noun #{}. Hash: {}', [
      nounId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }

  auction.amount = event.params.value;
  auction.bidder = bidder.id;
  auction.save();

  // Save Bid
  let bid = new Bid(event.transaction.hash.toHex());
  bid.bidder = bidder.id;
  bid.amount = auction.amount;
  bid.anticipatedNoun = auction.anticipatedNoun;
  bid.txIndex = event.transaction.index;
  bid.blockNumber = event.block.number;
  bid.blockTimestamp = event.block.timestamp;
  bid.auction = auction.id;
  bid.isERC20 = false;
  bid.save();
}

export function handleAuctionBidERC20(event: AuctionBidERC20): void {
  let nounId = event.params.nounId.toString();
  let bidderAddress = event.params.sender.toHex();

  let bidder = getOrCreateAccount(bidderAddress);

  let auction = Auction.load(nounId);
  if (auction == null) {
    log.error('[handleAuctionBid] Auction not found for Noun #{}. Hash: {}', [
      nounId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }

  auction.amount = event.params.value;
  auction.bidder = bidder.id;
  auction.save();

  // Save Bid
  let bid = new Bid(event.transaction.hash.toHex());
  bid.bidder = bidder.id;
  bid.amount = auction.amount;
  bid.anticipatedNoun = auction.anticipatedNoun;
  bid.txIndex = event.transaction.index;
  bid.blockNumber = event.block.number;
  bid.blockTimestamp = event.block.timestamp;
  bid.auction = auction.id;
  bid.isERC20 = true;
  bid.save();
}

export function handleAuctionExtended(event: AuctionExtended): void {
  let nounId = event.params.nounId.toString();

  let auction = Auction.load(nounId);
  if (auction == null) {
    log.error('[handleAuctionExtended] Auction not found for Noun #{}. Hash: {}', [
      nounId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }

  auction.endTime = event.params.endTime;
  auction.save();
}

export function handleAuctionSettled(event: AuctionSettled): void {
  let nounId = event.params.nounId.toString();

  let auction = Auction.load(nounId);
  if (auction == null) {
    log.error('[handleAuctionSettled] Auction not found for Noun #{}. Hash: {}', [
      nounId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }

  auction.settled = true;
  auction.save();
}

export function handleAuctionTokenMinted(event: AuctionTokenMinted): void {
  let nounId = event.params.nounId.toString();
  let mintedTokenId = event.params.nounMintedTokenId.toString();

  let auction = Auction.load(nounId);
  if (auction == null) {
    log.error('[handleTokenMinted] Auction not found for Noun #{}. Hash: {}', [
      nounId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }

  let noun = Noun.load(nounId);
  if (noun == null) {
    log.error('[handleTokenMinted] token not found for token #{}. Hash: {}', [
      mintedTokenId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }

  auction.noun = noun.id;
  auction.save();
}
