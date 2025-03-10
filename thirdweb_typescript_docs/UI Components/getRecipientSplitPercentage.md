# getRecipientSplitPercentage

*Source: [https://portal.thirdweb.com/references/typescript/v5/split/getRecipientSplitPercentage](https://portal.thirdweb.com/references/typescript/v5/split/getRecipientSplitPercentage)*

* References
* getRecipientSplitPercentage

Get the split percentage of a recipient

## Example

`import{ getRecipientSplitPercentage }from"thirdweb/extensions/split";constpercentage=awaitgetRecipientSplitPercentage({recipientAddress:"0x...",});`
#### Signature

`functiongetRecipientSplitPercentage(options:BaseTransactionOptions<{recipientAddress:string}>,):Promise<SplitRecipient>;`
## Parameters

#### options

The options for the transaction

### Type

`letoptions:BaseTransactionOptions<{recipientAddress:string}>;`
## Returns

#### Return Type

`letreturnType:{address:string;splitPercentage:number};`The split percentage of the recipient

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

