# setMerkleRoot

*Source: [https://portal.thirdweb.com/references/typescript/v5/airdrop/setMerkleRoot](https://portal.thirdweb.com/references/typescript/v5/airdrop/setMerkleRoot)*

* References
* setMerkleRoot

Prepares a transaction to call the "setMerkleRoot" function on the contract.

## Example

`import{ sendTransaction }from"thirdweb";import{ setMerkleRoot }from"thirdweb/extensions/airdrop";consttransaction=setMerkleRoot({contract,token:...,tokenMerkleRoot:...,resetClaimStatus:...,overrides: {...}});// Send the transactionawaitsendTransaction({ transaction, account });`
#### Signature

`functionsetMerkleRoot(options:BaseTransactionOptions<|SetMerkleRootParams|{asyncParams:()=>Promise<SetMerkleRootParams> }>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for the "setMerkleRoot" function.

### Type

`letoptions:BaseTransactionOptions<|SetMerkleRootParams|{asyncParams:()=>Promise<SetMerkleRootParams> }>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

