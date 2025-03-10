# addSigner

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/addSigner](https://portal.thirdweb.com/references/typescript/v5/farcaster/addSigner)*

* References
* addSigner

Adds farcaster signer for the given account.

## Example

`import{ addSigner }from"thirdweb/extensions/farcaster";import{ sendTransaction }from"thirdweb";consttransaction=addSigner({client,appAccount,signerPublicKey,});awaitsendTransaction({ transaction, account });`
#### Signature

`functionaddSigner(options:AddSignerParams,):PreparedTransaction<[],AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for adding the signer.

### Type

`letoptions:Prettify<{chain?:Chain;client:ThirdwebClient;disableCache?:boolean;signerPublicKey:Hex;}&(|{appAccount:Account}|{appAccountAddress:Address;deadline:bigint;signedKeyRequestMetadata:Hex;})>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<[],AbiFunction,PrepareTransactionOptions>;`A prepared transaction object to add the signer to the account.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

