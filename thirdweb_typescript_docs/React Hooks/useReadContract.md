# useReadContract

*Source: [https://portal.thirdweb.com/references/typescript/v5/useReadContract](https://portal.thirdweb.com/references/typescript/v5/useReadContract)*

* References
* useReadContract

## Signature#1

A hook to read state from a contract that automatically updates when the contract changes.

You can use raw read calls or readextensionsto read from a
contract.

### Example

`import{ getContract }from"thirdweb";import{ sepolia }from"thirdweb/chains";import{ useReadContract }from"thirdweb/react";constcontract=getContract({client,address:"0x...",chain: sepolia,});const{data,isLoading}=useReadContract({contract,method:"function tokenURI(uint256 tokenId) returns (string)"params: [1n],});`
#### Signature

`functionuseReadContract(options:WithPickedOnceQueryOptions<ReadContractOptions<TAbi,TMethod>>,):UseQueryResult<ReadContractResult<ParseMethod<ParseMethod<TAbi,TMethod>>["outputs"]>>;`
### Parameters

#### options

The options for reading from a contract

#### Type

`letoptions:WithPickedOnceQueryOptions<ReadContractOptions<TAbi,TMethod>>;`
### Returns

#### Return Type

`letreturnType:UseQueryResult<ReadContractResult<ParseMethod<ParseMethod<TAbi,TMethod>>["outputs"]>>;`a UseQueryResult object.

## Signature#2

A hook to read state from a contract that automatically updates when the contract changes.
You can use raw read calls or readextensionsto read from a
contract.

### Example

Read a contract extension let you do complex contract queries with less code.

`import{ useReadContract }from"thirdweb/react";import{ getOwnedNFTs } form"thirdweb/extensions/erc721";const { data, isLoading } = useReadContract(getOwnedNFTs, { contract, owner: address });`
#### Signature

`functionuseReadContract(extension:Extension<TAbi,TParams,TResult>,options:WithPickedOnceQueryOptions<BaseTransactionOptions<TParams,TAbi>>,):UseQueryResult<TResult>;`
### Parameters

#### extension

An extension to call.

#### Type

`letextension:Extension<TAbi,TParams,TResult>;`
#### options

The read extension params.

#### Type

`letoptions:WithPickedOnceQueryOptions<BaseTransactionOptions<TParams,TAbi>>;`
### Returns

#### Return Type

`letreturnType:UseQueryResult<TResult>;`a UseQueryResult object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

