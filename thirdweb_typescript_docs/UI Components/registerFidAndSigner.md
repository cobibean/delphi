# registerFidAndSigner

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/registerFidAndSigner](https://portal.thirdweb.com/references/typescript/v5/farcaster/registerFidAndSigner)*

* References
* registerFidAndSigner

Registers a Farcaster fid and signer for the given wallet using the provided app account.

## Example

`import{ registerFidAndSigner }from"thirdweb/extensions/farcaster";import{ sendTransaction }from"thirdweb";consttransaction=registerFidAndSigner({client,userAccount,appAccount,recoveryAddress,signerPublicKey,});awaitsendTransaction({ transaction, account });`
#### Signature

`functionregisterFidAndSigner(options:RegisterFidAndSignerParams,):PreparedTransaction<[],AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for registering an account.

### Type

`letoptions:Prettify<{chain?:Chain;client:ThirdwebClient;disableCache?:boolean;extraStorage?:bigint|number;recoveryAddress:Address;signerPublicKey:Hex;}&(|{userAccount:Account}|{addSignature:Hex;deadline:bigint;registerSignature:Hex;userAddress:Address;})&(|{appAccount:Account}|{appAccountAddress:Address;deadline:bigint;signedKeyRequestMetadata:Hex;})>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<[],AbiFunction,PrepareTransactionOptions>;`A prepared transaction object to register the account.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

