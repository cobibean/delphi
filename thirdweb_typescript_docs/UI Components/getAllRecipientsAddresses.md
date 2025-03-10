# getAllRecipientsAddresses

*Source: [https://portal.thirdweb.com/references/typescript/v5/split/getAllRecipientsAddresses](https://portal.thirdweb.com/references/typescript/v5/split/getAllRecipientsAddresses)*

* References
* getAllRecipientsAddresses

Get the addresses of all recipients of athirdweb Split contract

`thirdweb Split contract`
## Example

`import{ getAllRecipientsAddresses }from"thirdweb/extensions/split";constaddresses=awaitgetAllRecipientsAddresses({ contract });`
#### Signature

`functiongetAllRecipientsAddresses(options:BaseTransactionOptions,):Promise<Array<string>>;`
## Parameters

#### options

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:Promise<Array<string>>;`an array of wallet addresses

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

