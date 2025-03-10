# generateAccount

*Source: [https://portal.thirdweb.com/references/typescript/v5/generateAccount](https://portal.thirdweb.com/references/typescript/v5/generateAccount)*

* References
* generateAccount

Generates a new account with a random private key.

## Example

`import{ generateAccount }from"thirdweb/wallets";constaccount=awaitgenerateAccount({ client });`
#### Signature

`functiongenerateAccount(options:GenerateAccountOptions,):Promise<Account>;`
## Parameters

#### options

The options for generating the account.

### Type

`letoptions:{client:ThirdwebClient};`
## Returns

#### Return Type

`letreturnType:{address:Address;estimateGas?:(tx:PreparedTransaction)=>Promise<bigint>;onTransactionRequested?:(transaction:PreparedTransaction<any>,)=>Promise<void>;sendBatchTransaction?:(txs:Array<SendTransactionOption>,)=>Promise<SendTransactionResult>;sendRawTransaction?:(tx:SendRawTransactionOptions,)=>Promise<SendTransactionResult>;sendTransaction:(tx:SendTransactionOption,)=>Promise<SendTransactionResult>;signAuthorization?:(authorization:AuthorizationRequest,)=>Promise<SignedAuthorization>;signMessage:({message,originalMessage,chainId,}:{chainId?:number;message:SignableMessage;originalMessage?:string;})=>Promise<Hex>;signTransaction?:(tx:SerializableTransaction)=>Promise<Hex>;signTypedData:(_typedData:ox__TypedData.Definition<typedData,primaryType>,)=>Promise<Hex>;watchAsset?:(asset:WatchAssetParams)=>Promise<boolean>;};`A Thirdweb account.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

