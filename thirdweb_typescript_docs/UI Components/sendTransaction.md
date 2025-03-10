# sendTransaction

*Source: [https://portal.thirdweb.com/references/typescript/v5/sendTransaction](https://portal.thirdweb.com/references/typescript/v5/sendTransaction)*

* References
* sendTransaction

Sends a transaction using the provided account.

You can send a transaction with aprepared contract call, aprepared transaction, or using a writeExtension.

## Example

### Using a prepared contract call

`import{sendTransaction,getContract,prepareContractCall,}from"thirdweb";import{ sepolia }from"thirdweb/chains";constcontract=getContract({address:"0x...",chain: sepolia,client,});consttransaction=prepareContractCall({contract,method:"function transfer(address to, uint256 value)",params: [to, value],});const{transactionHash}=awaitsendTransaction({account,transaction,});`
### Using a write extension

`import{ sendTransaction, getContract }from"thirdweb";import{ sepolia }from"thirdweb/chains";import{ mintTo }from"thirdweb/extensions/erc721";constcontract=getContract({address:"0x...",chain: sepolia,client,});consttransaction=mintTo({contract,to:"0x...",nft: {name:"NFT Name",description:"NFT Description",image:"https://example.com/image.png",},});const{transactionHash}=awaitsendTransaction({account,transaction,});`
### Using a prepared transaction

`import{sendTransaction,getContract,prepareTransaction,}from"thirdweb";import{ sepolia }from"thirdweb/chains";constcontract=getContract({address:"0x...",chain: sepolia,client,});consttransaction=prepareTransaction({contract,to:"0x...",value:toWei("0.1"),});const{transactionHash}=awaitsendTransaction({account,transaction,});`
### Send an EIP-7702 Transaction

Note: This feature is in beta and is subject to breaking changes

`import{sendTransaction,prepareTransaction,signAuthorization,}from"thirdweb";import{ sepolia }from"thirdweb/chains";constauthorization=awaitsignAuthorization({request: {address:"0x...",chainId:1,nonce:0n,},account: myAccount,});consttransaction=prepareTransaction({chain: sepolia,client: client,to:"0x...",value:0n,authorizationList: [authorization],});const{transactionHash}=awaitsendTransaction({account,transaction,});`
### Gasless usage withthirdweb Engine

`const{transactionHash}=awaitsendTransaction({account,transaction,gasless: {provider:"engine",relayerUrl:"https://thirdweb.engine-***.thirdweb.com/relayer/***",relayerForwarderAddress:"0x...",},});`
### Gasless usage with OpenZeppelin

`const{transactionHash}=awaitsendTransaction({account,transaction,gasless: {provider:"openzeppelin",relayerUrl:"https://...",relayerForwarderAddress:"0x...",},});`
#### Signature

`functionsendTransaction(options:SendTransactionOptions,):Promise<{chain:Readonly;client:ThirdwebClient;maxBlocksWaitTime?:number;readonlytransactionHash:`0x${string}`;}>;`
## Parameters

#### options

The options for sending the transaction.

### Type

`letoptions:{account:Account;gasless:GaslessOptions;transaction:PreparedTransaction<any>;};`
## Returns

#### Return Type

`letreturnType:Promise<{chain:Readonly;client:ThirdwebClient;maxBlocksWaitTime?:number;readonlytransactionHash:`0x${string}`;}>;`A promise that resolves to the transaction result.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

