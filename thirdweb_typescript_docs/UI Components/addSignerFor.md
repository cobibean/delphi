# addSignerFor

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/addSignerFor](https://portal.thirdweb.com/references/typescript/v5/farcaster/addSignerFor)*

* References
* addSignerFor

Adds farcaster signer for a given user. Helpful if you want to cover the gas fee for a user.

## Example

`import{ addSignerFor }from"thirdweb/extensions/farcaster";import{ sendTransaction }from"thirdweb";consttransaction=addSignerFor({client,appAccount,userAccount,signerPublicKey,});awaitsendTransaction({ transaction, account });`
#### Signature

`functionaddSignerFor(options:AddSignerForParams,):PreparedTransaction<[],AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for adding the signer.

### Type

`letoptions:Prettify<{chain?:Chain;client:ThirdwebClient;disableCache?:boolean;signerPublicKey:Hex;}&(|{appAccount:Account}|{appAccountAddress:Address;deadline:bigint;signedKeyRequestMetadata:Hex;})&(|{userAccount:Account}|{addSignature:Hex;deadline:bigint;userAddress:Address})>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<[],AbiFunction,PrepareTransactionOptions>;`A prepared transaction object to add the signer to the account.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

