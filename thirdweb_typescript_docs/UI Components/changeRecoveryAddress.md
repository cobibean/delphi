# changeRecoveryAddress

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/changeRecoveryAddress](https://portal.thirdweb.com/references/typescript/v5/farcaster/changeRecoveryAddress)*

* References
* changeRecoveryAddress

Prepares a transaction to call the "changeRecoveryAddress" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ changeRecoveryAddress }from"thirdweb/extensions/farcaster";consttransaction=changeRecoveryAddress({contract,recovery:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionchangeRecoveryAddress(options:BaseTransactionOptions<|ChangeRecoveryAddressParams|{asyncParams:()=>Promise<ChangeRecoveryAddressParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "changeRecoveryAddress" function.

### Type

`letoptions:BaseTransactionOptions<|ChangeRecoveryAddressParams|{asyncParams:()=>Promise<ChangeRecoveryAddressParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

