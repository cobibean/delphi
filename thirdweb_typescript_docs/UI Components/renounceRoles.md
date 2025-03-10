# renounceRoles

*Source: [https://portal.thirdweb.com/references/typescript/v5/modules/renounceRoles](https://portal.thirdweb.com/references/typescript/v5/modules/renounceRoles)*

* References
* renounceRoles

Prepares a transaction to call the "renounceRoles" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ renounceRoles }from"thirdweb/extensions/modules";consttransaction=renounceRoles({contract,roles:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionrenounceRoles(options:BaseTransactionOptions<|RenounceRolesParams|{asyncParams:()=>Promise<RenounceRolesParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "renounceRoles" function.

### Type

`letoptions:BaseTransactionOptions<|RenounceRolesParams|{asyncParams:()=>Promise<RenounceRolesParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

