# engineAccount

*Source: [https://portal.thirdweb.com/references/typescript/v5/engineAccount](https://portal.thirdweb.com/references/typescript/v5/engineAccount)*

* References
* engineAccount

Creates an account that uses your engine backend wallet for sending transactions and signing messages.

## Example

`import{ engineAccount }from"thirdweb/wallets/engine";constengineAcc=engineAccount({engineUrl:"https://engine.thirdweb.com",authToken:"your-auth-token",walletAddress:"0x...",});// then use the account as you would any other accountconsttransaction=claimTo({contract,to:"0x...",quantity:1n,});constresult=awaitsendTransaction({transaction,account: engineAcc,});console.log("Transaction sent:", result.transactionHash);`
#### Signature

`functionengineAccount(options:EngineAccountOptions):Account;`
## Parameters

#### options

The options for the engine account.

### Type

`letoptions:{authToken:string;chain?:Chain;engineUrl:string;walletAddress:string;};`
## Returns

#### Return Type

`letreturnType:{address:Address;estimateGas?:(tx:PreparedTransaction)=>Promise<bigint>;onTransactionRequested?:(transaction:PreparedTransaction<any>,)=>Promise<void>;sendBatchTransaction?:(txs:Array<SendTransactionOption>,)=>Promise<SendTransactionResult>;sendRawTransaction?:(tx:SendRawTransactionOptions,)=>Promise<SendTransactionResult>;sendTransaction:(tx:SendTransactionOption,)=>Promise<SendTransactionResult>;signAuthorization?:(authorization:AuthorizationRequest,)=>Promise<SignedAuthorization>;signMessage:({message,originalMessage,chainId,}:{chainId?:number;message:SignableMessage;originalMessage?:string;})=>Promise<Hex>;signTransaction?:(tx:SerializableTransaction)=>Promise<Hex>;signTypedData:(_typedData:ox__TypedData.Definition<typedData,primaryType>,)=>Promise<Hex>;watchAsset?:(asset:WatchAssetParams)=>Promise<boolean>;};`An account that uses your engine backend wallet.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

