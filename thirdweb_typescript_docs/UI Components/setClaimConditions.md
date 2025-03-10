# setClaimConditions

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/setClaimConditions](https://portal.thirdweb.com/references/typescript/v5/erc20/setClaimConditions)*

* References
* setClaimConditions

Set the claim conditions for a ERC20 drop

## Example

`import{ setClaimConditions }from"thirdweb/extensions/erc20";import{ sendTransaction }from"thirdweb";consttransaction=setClaimConditions({contract,phases: [{maxClaimableSupply:100n,maxClaimablePerWallet:1n,currencyAddress:"0x...",price:0.1,startTime:newDate(),},],});awaitsendTransaction({ transaction, account });`
#### Signature

`functionsetClaimConditions(options:BaseTransactionOptions<SetClaimConditionsParams>,):PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

### Type

`letoptions:BaseTransactionOptions<SetClaimConditionsParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,AbiFunction,PrepareTransactionOptions>;`the prepared transaction

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

