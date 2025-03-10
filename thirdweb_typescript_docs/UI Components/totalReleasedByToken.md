# totalReleasedByToken

*Source: [https://portal.thirdweb.com/references/typescript/v5/split/totalReleasedByToken](https://portal.thirdweb.com/references/typescript/v5/split/totalReleasedByToken)*

* References
* totalReleasedByToken

Calls the "totalReleased" function on the contract.
Similar to thereleaseextension, however this one requires you to specify a tokenAddress

`release`
## Example

`import{ totalReleasedByToken }from"thirdweb/extensions/split";constresult=awaittotalReleasedByToken({contract,tokenAddress:"0x...",});`
#### Signature

`functiontotalReleasedByToken(options:BaseTransactionOptions<{tokenAddress:string}>,):Promise<bigint>;`
## Parameters

#### options

The options for the totalReleased function.

### Type

`letoptions:BaseTransactionOptions<{tokenAddress:string}>;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

