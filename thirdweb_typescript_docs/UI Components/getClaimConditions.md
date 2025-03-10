# getClaimConditions

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/getClaimConditions](https://portal.thirdweb.com/references/typescript/v5/erc20/getClaimConditions)*

* References
* getClaimConditions

Retrieves all claim conditions.

## Example

`import{ getClaimConditions }from"thirdweb/extensions/erc20";constconditions=awaitgetClaimConditions({ contract });`
#### Signature

`functiongetClaimConditions(options:BaseTransactionOptions,):Promise<Array<ClaimCondition>>;`
## Parameters

#### options

The transaction options.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:Promise<Array<ClaimCondition>>;`A promise that resolves to all claim conditions.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

