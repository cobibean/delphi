# Marketplace Smart Contract Code Examples 

## Write Functions -> 

### Disable Function In Extension (_disableFunctionInExtension) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function _disableFunctionInExtension(string _extensionName, bytes4 _functionSelector)",
      params: [_extensionName, _functionSelector],
    });
    sendTransaction(transaction);
  };
}


### Add Extension (addExtension) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function addExtension(((string name, string metadataURI, address implementation) metadata, (bytes4 functionSelector, string functionSignature)[] functions) _extension)",
      params: [_extension],
    });
    sendTransaction(transaction);
  };
}


### Disable Function In Extension (disableFunctionInExtension) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function disableFunctionInExtension(string _extensionName, bytes4 _functionSelector)",
      params: [_extensionName, _functionSelector],
    });
    sendTransaction(transaction);
  };
}


### Enable Function In Extension (enableFunctionInExtension) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function enableFunctionInExtension(string _extensionName, (bytes4 functionSelector, string functionSignature) _function)",
      params: [_extensionName, _function],
    });
    sendTransaction(transaction);
  };
}


### Get Royalty (getRoyalty) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function getRoyalty(address tokenAddress, uint256 tokenId, uint256 value) returns (address[] recipients, uint256[] amounts)",
      params: [tokenAddress, tokenId, value],
    });
    sendTransaction(transaction);
  };
}


### Grant Role (grantRole) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function grantRole(bytes32 role, address account)",
      params: [role, account],
    });
    sendTransaction(transaction);
  };
}


### Initialize (initialize) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function initialize(address _defaultAdmin, string _contractURI, address[] _trustedForwarders, address _platformFeeRecipient, uint16 _platformFeeBps)",
      params: [
        _defaultAdmin,
        _contractURI,
        _trustedForwarders,
        _platformFeeRecipient,
        _platformFeeBps,
      ],
    });
    sendTransaction(transaction);
  };
}


### Multicall (multicall) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function multicall(bytes[] data) returns (bytes[] results)",
      params: [data],
    });
    sendTransaction(transaction);
  };
}


### OnERC1155 Batch Received (onERC1155BatchReceived) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function onERC1155BatchReceived(address, address, uint256[], uint256[], bytes) returns (bytes4)",
      params: [],
    });
    sendTransaction(transaction);
  };
}


### OnERC1155 Received (onERC1155Received) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function onERC1155Received(address, address, uint256, uint256, bytes) returns (bytes4)",
      params: [],
    });
    sendTransaction(transaction);
  };
}


### OnERC721 Received (onERC721Received) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function onERC721Received(address, address, uint256, bytes) returns (bytes4)",
      params: [],
    });
    sendTransaction(transaction);
  };
}


### Remove Extension (removeExtension) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function removeExtension(string _extensionName)",
      params: [_extensionName],
    });
    sendTransaction(transaction);
  };
}


### Renounce Role (renounceRole) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function renounceRole(bytes32 role, address account)",
      params: [role, account],
    });
    sendTransaction(transaction);
  };
}


### Replace Extension (replaceExtension) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function replaceExtension(((string name, string metadataURI, address implementation) metadata, (bytes4 functionSelector, string functionSignature)[] functions) _extension)",
      params: [_extension],
    });
    sendTransaction(transaction);
  };
}


### Revoke Role (revokeRole) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function revokeRole(bytes32 role, address account)",
      params: [role, account],
    });
    sendTransaction(transaction);
  };
}


### Set ContractURI (setContractURI) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method: "function setContractURI(string _uri)",
      params: [_uri],
    });
    sendTransaction(transaction);
  };
}


### Set Flat Platform Fee Info (setFlatPlatformFeeInfo) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function setFlatPlatformFeeInfo(address _platformFeeRecipient, uint256 _flatFee)",
      params: [_platformFeeRecipient, _flatFee],
    });
    sendTransaction(transaction);
  };
}


### Set Platform Fee Info (setPlatformFeeInfo) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function setPlatformFeeInfo(address _platformFeeRecipient, uint256 _platformFeeBps)",
      params: [_platformFeeRecipient, _platformFeeBps],
    });
    sendTransaction(transaction);
  };
}


### Set Platform Fee Type (setPlatformFeeType) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method: "function setPlatformFeeType(uint8 _feeType)",
      params: [_feeType],
    });
    sendTransaction(transaction);
  };
}


### Set Royalty Engine (setRoyaltyEngine) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function setRoyaltyEngine(address _royaltyEngineAddress)",
      params: [_royaltyEngineAddress],
    });
    sendTransaction(transaction);
  };
}


### Approve Buyer For Listing (approveBuyerForListing) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function approveBuyerForListing(uint256 _listingId, address _buyer, bool _toApprove)",
      params: [_listingId, _buyer, _toApprove],
    });
    sendTransaction(transaction);
  };
}


### Approve Currency For Listing (approveCurrencyForListing) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function approveCurrencyForListing(uint256 _listingId, address _currency, uint256 _pricePerTokenInCurrency)",
      params: [
        _listingId,
        _currency,
        _pricePerTokenInCurrency,
      ],
    });
    sendTransaction(transaction);
  };
}


### Buy From Listing (buyFromListing) payable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function buyFromListing(uint256 _listingId, address _buyFor, uint256 _quantity, address _currency, uint256 _expectedTotalPrice) payable",
      params: [
        _listingId,
        _buyFor,
        _quantity,
        _currency,
        _expectedTotalPrice,
      ],
    });
    sendTransaction(transaction);
  };
}


### Cancel Listing (cancelListing) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method: "function cancelListing(uint256 _listingId)",
      params: [_listingId],
    });
    sendTransaction(transaction);
  };
}


### Create Listing (createListing) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function createListing((address assetContract, uint256 tokenId, uint256 quantity, address currency, uint256 pricePerToken, uint128 startTimestamp, uint128 endTimestamp, bool reserved) _params) returns (uint256 listingId)",
      params: [_params],
    });
    sendTransaction(transaction);
  };
}


### Update Listing (updateListing) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function updateListing(uint256 _listingId, (address assetContract, uint256 tokenId, uint256 quantity, address currency, uint256 pricePerToken, uint128 startTimestamp, uint128 endTimestamp, bool reserved) _params)",
      params: [_listingId, _params],
    });
    sendTransaction(transaction);
  };
}


### Bid In Auction (bidInAuction) payable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function bidInAuction(uint256 _auctionId, uint256 _bidAmount) payable",
      params: [_auctionId, _bidAmount],
    });
    sendTransaction(transaction);
  };
}


### Cancel Auction (cancelAuction) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method: "function cancelAuction(uint256 _auctionId)",
      params: [_auctionId],
    });
    sendTransaction(transaction);
  };
}


### Collect Auction Payout (collectAuctionPayout) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function collectAuctionPayout(uint256 _auctionId)",
      params: [_auctionId],
    });
    sendTransaction(transaction);
  };
}


### Collect Auction Tokens (collectAuctionTokens) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function collectAuctionTokens(uint256 _auctionId)",
      params: [_auctionId],
    });
    sendTransaction(transaction);
  };
}


### Create Auction (createAuction) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function createAuction((address assetContract, uint256 tokenId, uint256 quantity, address currency, uint256 minimumBidAmount, uint256 buyoutBidAmount, uint64 timeBufferInSeconds, uint64 bidBufferBps, uint64 startTimestamp, uint64 endTimestamp) _params) returns (uint256 auctionId)",
      params: [_params],
    });
    sendTransaction(transaction);
  };
}


### Accept Offer (acceptOffer) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method: "function acceptOffer(uint256 _offerId)",
      params: [_offerId],
    });
    sendTransaction(transaction);
  };
}


### Cancel Offer (cancelOffer) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method: "function cancelOffer(uint256 _offerId)",
      params: [_offerId],
    });
    sendTransaction(transaction);
  };
}


### Make Offer (makeOffer) nonpayable

import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function makeOffer((address assetContract, uint256 tokenId, uint256 quantity, address currency, uint256 totalPrice, uint256 expirationTimestamp) _params) returns (uint256 _offerId)",
      params: [_params],
    });
    sendTransaction(transaction);
  };
}

----

## Read Functions -> 

### DEFAULT_ADMIN_ROLE (DEFAULT_ADMIN_ROLE) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function DEFAULT_ADMIN_ROLE() view returns (bytes32)",
    params: [],
  });
}



### Contract Type (contractType) pure

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function contractType() pure returns (bytes32)",
    params: [],
  });
}




### ContractURI (contractURI) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method: "function contractURI() view returns (string)",
    params: [],
  });
}



### Contract Version (contractVersion) pure

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function contractVersion() pure returns (uint8)",
    params: [],
  });
}



### Default Extensions (defaultExtensions) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function defaultExtensions() view returns (address)",
    params: [],
  });
}



### Get All Extensions (getAllExtensions) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getAllExtensions() view returns (((string name, string metadataURI, address implementation) metadata, (bytes4 functionSelector, string functionSignature)[] functions)[] allExtensions)",
    params: [],
  });
}


### Get Extension (getExtension) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getExtension(string extensionName) view returns (((string name, string metadataURI, address implementation) metadata, (bytes4 functionSelector, string functionSignature)[] functions))",
    params: [extensionName],
  });
}



### Get Flat Platform Fee Info (getFlatPlatformFeeInfo) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getFlatPlatformFeeInfo() view returns (address, uint256)",
    params: [],
  });
}



### Get Implementation For Function (getImplementationForFunction) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getImplementationForFunction(bytes4 _functionSelector) view returns (address)",
    params: [_functionSelector],
  });
}



### Get Metadata For Function (getMetadataForFunction) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getMetadataForFunction(bytes4 functionSelector) view returns ((string name, string metadataURI, address implementation))",
    params: [functionSelector],
  });
}



### Get Platform Fee Info (getPlatformFeeInfo) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getPlatformFeeInfo() view returns (address, uint16)",
    params: [],
  });
}



### Get Platform Fee Type (getPlatformFeeType) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getPlatformFeeType() view returns (uint8)",
    params: [],
  });
}



### Get Role Admin (getRoleAdmin) view


### Get Role Member (getRoleMember) view

### Get Role Member Count (getRoleMemberCount) view

### Get Royalty Engine Address (getRoyaltyEngineAddress) view


### Has Role (hasRole) view

### Has Role With Switch (hasRoleWithSwitch) view

### Is Trusted Forwarder (isTrustedForwarder) view


### Supports Interface (supportsInterface) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function supportsInterface(bytes4 interfaceId) view returns (bool)",
    params: [interfaceId],
  });
}


### Msg Data (_msgData) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method: "function _msgData() view returns (bytes)",
    params: [],
  });
}



### Msg Sender (_msgSender) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function _msgSender() view returns (address sender)",
    params: [],
  });
}


### Currency Price For Listing (currencyPriceForListing) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function currencyPriceForListing(uint256 _listingId, address _currency) view returns (uint256)",
    params: [_listingId, _currency],
  });
}


### Get All Listings (getAllListings) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getAllListings(uint256 _startId, uint256 _endId) view returns ((uint256 listingId, uint256 tokenId, uint256 quantity, uint256 pricePerToken, uint128 startTimestamp, uint128 endTimestamp, address listingCreator, address assetContract, address currency, uint8 tokenType, uint8 status, bool reserved)[] _allListings)",
    params: [_startId, _endId],
  });
}


### Get All Valid Listings (getAllValidListings) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getAllValidListings(uint256 _startId, uint256 _endId) view returns ((uint256 listingId, uint256 tokenId, uint256 quantity, uint256 pricePerToken, uint128 startTimestamp, uint128 endTimestamp, address listingCreator, address assetContract, address currency, uint8 tokenType, uint8 status, bool reserved)[] _validListings)",
    params: [_startId, _endId],
  });
}



### Get Listing (getListing) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getListing(uint256 _listingId) view returns ((uint256 listingId, uint256 tokenId, uint256 quantity, uint256 pricePerToken, uint128 startTimestamp, uint128 endTimestamp, address listingCreator, address assetContract, address currency, uint8 tokenType, uint8 status, bool reserved) listing)",
    params: [_listingId],
  });
}


### Is Buyer Approved For Listing (isBuyerApprovedForListing) view


import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function isBuyerApprovedForListing(uint256 _listingId, address _buyer) view returns (bool)",
    params: [_listingId, _buyer],
  });
}


### Is Currency Approved For Listing (isCurrencyApprovedForListing) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function isCurrencyApprovedForListing(uint256 _listingId, address _currency) view returns (bool)",
    params: [_listingId, _currency],
  });
}


### Total Listings (totalListings) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function totalListings() view returns (uint256)",
    params: [],
  });
}


### Get All Auctions (getAllAuctions) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getAllAuctions(uint256 _startId, uint256 _endId) view returns ((uint256 auctionId, uint256 tokenId, uint256 quantity, uint256 minimumBidAmount, uint256 buyoutBidAmount, uint64 timeBufferInSeconds, uint64 bidBufferBps, uint64 startTimestamp, uint64 endTimestamp, address auctionCreator, address assetContract, address currency, uint8 tokenType, uint8 status)[] _allAuctions)",
    params: [_startId, _endId],
  });
}


### Get All Valid Auctions (getAllValidAuctions) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getAllValidAuctions(uint256 _startId, uint256 _endId) view returns ((uint256 auctionId, uint256 tokenId, uint256 quantity, uint256 minimumBidAmount, uint256 buyoutBidAmount, uint64 timeBufferInSeconds, uint64 bidBufferBps, uint64 startTimestamp, uint64 endTimestamp, address auctionCreator, address assetContract, address currency, uint8 tokenType, uint8 status)[] _validAuctions)",
    params: [_startId, _endId],
  });
}


### Get Auction (getAuction) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getAuction(uint256 _auctionId) view returns ((uint256 auctionId, uint256 tokenId, uint256 quantity, uint256 minimumBidAmount, uint256 buyoutBidAmount, uint64 timeBufferInSeconds, uint64 bidBufferBps, uint64 startTimestamp, uint64 endTimestamp, address auctionCreator, address assetContract, address currency, uint8 tokenType, uint8 status) _auction)",
    params: [_auctionId],
  });
}


### Get Winning Bid (getWinningBid) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getWinningBid(uint256 _auctionId) view returns (address _bidder, address _currency, uint256 _bidAmount)",
    params: [_auctionId],
  });
}


### Is Auction Expired (isAuctionExpired) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function isAuctionExpired(uint256 _auctionId) view returns (bool)",
    params: [_auctionId],
  });
}


### Is New Winning Bid (isNewWinningBid) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function isNewWinningBid(uint256 _auctionId, uint256 _bidAmount) view returns (bool)",
    params: [_auctionId, _bidAmount],
  });
}


### Total Auctions (totalAuctions) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function totalAuctions() view returns (uint256)",
    params: [],
  });
}


### Get All Offers (getAllOffers) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getAllOffers(uint256 _startId, uint256 _endId) view returns ((uint256 offerId, uint256 tokenId, uint256 quantity, uint256 totalPrice, uint256 expirationTimestamp, address offeror, address assetContract, address currency, uint8 tokenType, uint8 status)[] _allOffers)",
    params: [_startId, _endId],
  });
}


### Get All Valid Offers (getAllValidOffers) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getAllValidOffers(uint256 _startId, uint256 _endId) view returns ((uint256 offerId, uint256 tokenId, uint256 quantity, uint256 totalPrice, uint256 expirationTimestamp, address offeror, address assetContract, address currency, uint8 tokenType, uint8 status)[] _validOffers)",
    params: [_startId, _endId],
  });
}


### Get Offer (getOffer) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getOffer(uint256 _offerId) view returns ((uint256 offerId, uint256 tokenId, uint256 quantity, uint256 totalPrice, uint256 expirationTimestamp, address offeror, address assetContract, address currency, uint8 tokenType, uint8 status) _offer)",
    params: [_offerId],
  });
}


### Total Offers (totalOffers) view

import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isPending } = useReadContract({
    contract,
    method: "function totalOffers() view returns (uint256)",
    params: [],
  });
}
















