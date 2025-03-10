# registerFid

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/registerFid](https://portal.thirdweb.com/references/typescript/v5/farcaster/registerFid)*

* References
* registerFid

Registers a Farcaster fid for the given wallet.

## Example

`import{ registerFid }from"thirdweb/extensions/farcaster";import{ sendTransaction }from"thirdweb";consttransaction=registerFid({client,recoveryAddress,});awaitsendTransaction({ transaction, account });`
#### Signature

`functionregisterFid(options:RegisterFidParams,):PreparedTransaction<[],AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for registering an account.

### Type

`letoptions:{chain?:Chain;client:ThirdwebClient;disableCache?:boolean;extraStorage?:bigint|string|number;recoveryAddress:Address;};`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<[],AbiFunction,PrepareTransactionOptions>;`A prepared transaction object to register the account.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

