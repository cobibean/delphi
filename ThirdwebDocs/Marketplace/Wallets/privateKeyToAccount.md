# privateKeyToAccount

*Source: [https://portal.thirdweb.com/references/typescript/v5/privateKeyToAccount](https://portal.thirdweb.com/references/typescript/v5/privateKeyToAccount)*

* References
* privateKeyToAccount

Get anAccountobject from a private key.

`Account`
## Example

`import{ privateKeyToAccount }from"thirdweb/wallets";constwallet=privateKeyToAccount({client,privateKey:"...",});`
#### Signature

`functionprivateKeyToAccount(options:PrivateKeyToAccountOptions,):Account;`
## Parameters

#### options

The options forprivateKeyToAccountRefer to the typePrivateKeyToAccountOptions

`privateKeyToAccount``PrivateKeyToAccountOptions`
### Type

`letoptions:{client:ThirdwebClient;privateKey:string};`
## Returns

#### Return Type

`letreturnType:{address:Address;estimateGas?:(tx:PreparedTransaction)=>Promise<bigint>;onTransactionRequested?:(transaction:PreparedTransaction<any>,)=>Promise<void>;sendBatchTransaction?:(txs:Array<SendTransactionOption>,)=>Promise<SendTransactionResult>;sendRawTransaction?:(tx:SendRawTransactionOptions,)=>Promise<SendTransactionResult>;sendTransaction:(tx:SendTransactionOption,)=>Promise<SendTransactionResult>;signAuthorization?:(authorization:AuthorizationRequest,)=>Promise<SignedAuthorization>;signMessage:({message,originalMessage,chainId,}:{chainId?:number;message:SignableMessage;originalMessage?:string;})=>Promise<Hex>;signTransaction?:(tx:SerializableTransaction)=>Promise<Hex>;signTypedData:(_typedData:ox__TypedData.Definition<typedData,primaryType>,)=>Promise<Hex>;watchAsset?:(asset:WatchAssetParams)=>Promise<boolean>;};`TheAccountobject that represents the private key

`Account`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

