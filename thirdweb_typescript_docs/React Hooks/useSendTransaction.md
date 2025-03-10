# useSendTransaction

*Source: [https://portal.thirdweb.com/references/typescript/v5/useSendTransaction](https://portal.thirdweb.com/references/typescript/v5/useSendTransaction)*

* References
* useSendTransaction

A hook to send a transaction with from the user's connected wallet.

You can send a transaction with aprepared contract call, aprepared transaction, or using a writeExtension.

## Example

### Sending a prepared contract call

`import{ useSendTransaction }from"thirdweb/react";import{ getContract, prepareContractCall }from"thirdweb";import{ sepolia }from"thirdweb/chains";constcontract=getContract({address:"0x...",chain: sepolia,client,});const{mutate:sendTx,data:transactionResult}=useSendTransaction();constonClick=()=>{consttransaction=prepareContractCall({contract,method:"function transfer(address to, uint256 value)",params: [to, value],});sendTx(transaction);};`
### Using a write extension

`import{ useSendTransaction }from"thirdweb/react";import{ mintTo }from"thirdweb/extensions/erc721";const{mutate:sendTx,data:transactionResult}=useSendTransaction();constonClick=()=>{consttransaction=mintTo({contract,to:"0x...",nft: {name:"NFT Name",description:"NFT Description",image:"https://example.com/image.png",},});sendTx(transaction);};`
### Sending a prepared transaction

`import{ useSendTransaction }from"thirdweb/react";import{ prepareTransaction }from"thirdweb";import{ sepolia }from"thirdweb/chains";const{mutate:sendTx,data:transactionResult}=useSendTransaction();constonClick=()=>{// Send 0.1 SepoliaETH to an addressconsttransaction=prepareTransaction({to:"0x...",value:toWei("0.1"),chain: sepolia,client: thirdwebClient,});sendTx(transaction);};`
#### Signature

`functionuseSendTransaction(config:SendTransactionConfig,):UseMutationResult<{chain:Readonly;client:ThirdwebClient;maxBlocksWaitTime?:number;readonlytransactionHash:`0x${string}`;},Error,PreparedTransaction>;`
## Parameters

#### config

Configuration for theuseSendTransactionhook.
Refer toSendTransactionConfigfor more details.

`useSendTransaction``SendTransactionConfig`
### Type

`letconfig:{gasless?:GaslessOptions;payModal?:SendTransactionPayModalConfig;};`
## Returns

#### Return Type

`letreturnType:UseMutationResult<{chain:Readonly;client:ThirdwebClient;maxBlocksWaitTime?:number;readonlytransactionHash:`0x${string}`;},Error,PreparedTransaction>;`A UseMutationResult object to send a transaction.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

