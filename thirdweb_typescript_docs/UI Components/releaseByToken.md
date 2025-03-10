# releaseByToken

*Source: [https://portal.thirdweb.com/references/typescript/v5/split/releaseByToken](https://portal.thirdweb.com/references/typescript/v5/split/releaseByToken)*

* References
* releaseByToken

Similar to thereleaseextension, however this one requires you to specify a tokenAddress to release

`release`
## Example

`import{ releaseByToken }from"thirdweb/extensions/split";consttransaction=releaseByToken({contract,account:...,overrides: {...}});// Send the transaction...`
#### Signature

`functionreleaseByToken(options:BaseTransactionOptions<ReleaseByTokenParams>,):PreparedTransaction<any,{readonlyinputs:readonly[{readonlyname:"token";readonlytype:"address"},{readonlyname:"account";readonlytype:"address"},];readonlyname:"release";readonlyoutputs:readonly[];readonlystateMutability:"nonpayable";readonlytype:"function";},PrepareTransactionOptions>;`
## Parameters

#### options

### Type

`letoptions:BaseTransactionOptions<ReleaseByTokenParams>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,{readonlyinputs:readonly[{readonlyname:"token";readonlytype:"address"},{readonlyname:"account";readonlytype:"address"},];readonlyname:"release";readonlyoutputs:readonly[];readonlystateMutability:"nonpayable";readonlytype:"function";},PrepareTransactionOptions>;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

