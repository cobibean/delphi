# propose

*Source: [https://portal.thirdweb.com/references/typescript/v5/vote/propose](https://portal.thirdweb.com/references/typescript/v5/vote/propose)*

* References
* propose

Prepares a transaction to call the "propose" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ propose }from"thirdweb/extensions/vote";consttransaction=propose({contract,targets:...,values:...,calldatas:...,description:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionpropose(options:BaseTransactionOptions<ProposeParams|{asyncParams:()=>Promise<ProposeParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "propose" function.

### Type

`letoptions:BaseTransactionOptions<ProposeParams|{asyncParams:()=>Promise<ProposeParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

