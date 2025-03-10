# getActiveClaimCondition

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/getActiveClaimCondition](https://portal.thirdweb.com/references/typescript/v5/erc20/getActiveClaimCondition)*

* References
* getActiveClaimCondition

Retrieves the active claim condition.

## Example

`import{ getActiveClaimCondition }from"thirdweb/extensions/erc20";constactiveClaimCondition=awaitgetActiveClaimCondition({contract,});`
#### Signature

`functiongetActiveClaimCondition(options:BaseTransactionOptions,):Promise<ClaimCondition>;`
## Parameters

#### options

The transaction options.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:Promise<ClaimCondition>;`A promise that resolves to the active claim condition.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

