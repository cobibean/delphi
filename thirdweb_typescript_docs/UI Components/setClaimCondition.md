# setClaimCondition

*Source: [https://portal.thirdweb.com/references/typescript/v5/claimableerc721/setClaimCondition](https://portal.thirdweb.com/references/typescript/v5/claimableerc721/setClaimCondition)*

* References
* setClaimCondition

Sets the claim conditions for a given token ID.

## Example

`import{ ClaimableERC721 }from"thirdweb/modules";consttransaction=ClaimableERC721.setClaimCondition({contract: contract,pricePerToken:"1",// in ETHmaxClaimableSupply:"1000000",maxClaimablePerWallet:"1",});awaitsendTransaction({ transaction, account });`
#### Signature

`functionsetClaimCondition(options:BaseTransactionOptions<ClaimConditionInput>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for setting the claim conditions.

### Type

`letoptions:BaseTransactionOptions<ClaimConditionInput>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`A transaction to set the claim conditions.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

