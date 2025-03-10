# getClaimConditionById

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/getClaimConditionById](https://portal.thirdweb.com/references/typescript/v5/erc20/getClaimConditionById)*

* References
* getClaimConditionById

Calls the "getClaimConditionById" function on the contract.

## Example

`import{ getClaimConditionById }from"thirdweb/extensions/erc20";constresult=awaitgetClaimConditionById({contract,conditionId:...,});`
#### Signature

`functiongetClaimConditionById(options:BaseTransactionOptions<GetClaimConditionByIdParams>,):Promise<{currency:string;maxClaimableSupply:bigint;merkleRoot:`0x${string}`;metadata:string;pricePerToken:bigint;quantityLimitPerWallet:bigint;startTimestamp:bigint;supplyClaimed:bigint;}>;`
## Parameters

#### options

The options for the getClaimConditionById function.

### Type

`letoptions:BaseTransactionOptions<GetClaimConditionByIdParams>;`
## Returns

#### Return Type

`letreturnType:Promise<{currency:string;maxClaimableSupply:bigint;merkleRoot:`0x${string}`;metadata:string;pricePerToken:bigint;quantityLimitPerWallet:bigint;startTimestamp:bigint;supplyClaimed:bigint;}>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

