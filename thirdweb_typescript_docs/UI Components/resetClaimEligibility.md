# resetClaimEligibility

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/resetClaimEligibility](https://portal.thirdweb.com/references/typescript/v5/erc20/resetClaimEligibility)*

* References
* resetClaimEligibility

Reset the claim eligibility for all users.

## Example

`import{ resetClaimEligibility }from"thirdweb/extensions/erc20";import{ sendTransaction }from"thirdweb";consttransaction=resetClaimEligibility({contract,});awaitsendTransaction({ transaction, account });`
#### Signature

`functionresetClaimEligibility(options:BaseTransactionOptions,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`the prepared transaction

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

