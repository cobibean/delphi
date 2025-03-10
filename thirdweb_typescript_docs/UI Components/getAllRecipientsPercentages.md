# getAllRecipientsPercentages

*Source: [https://portal.thirdweb.com/references/typescript/v5/split/getAllRecipientsPercentages](https://portal.thirdweb.com/references/typescript/v5/split/getAllRecipientsPercentages)*

* References
* getAllRecipientsPercentages

Get all the recipients of a Split contracts

## Example

`import{ getAllRecipientsPercentages }from"thirdweb/extensions/split";constallRecipients=awaitgetAllRecipientsPercentages({ contract });// Example result:[{address:"0x1...",splitPercentage:25,// 25%},{address:"0x2...",splitPercentage:75,// 75%},];`
#### Signature

`functiongetAllRecipientsPercentages(options:BaseTransactionOptions,):Promise<Array<SplitRecipient>>;`
## Parameters

#### options

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:{address:string;splitPercentage:number};`an array of recipients' addresses and split percentage of each

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

