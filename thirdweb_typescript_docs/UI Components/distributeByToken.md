# distributeByToken

*Source: [https://portal.thirdweb.com/references/typescript/v5/split/distributeByToken](https://portal.thirdweb.com/references/typescript/v5/split/distributeByToken)*

* References
* distributeByToken

This extension is similar to thedistributeextension,
however it require you to specify the token (address) that you want to distribute

`distribute`
## Example

`import{ distributeByToken }from"thirdweb/extensions/split";consttransaction=distributeByToken();// Send the transaction...`
#### Signature

`functiondistributeByToken(options:BaseTransactionOptions<{tokenAddress:string}>,):PreparedTransaction<any,{readonlyinputs:readonly[{readonlyname:"token";readonlytype:"address"},];readonlyname:"distribute";readonlyoutputs:readonly[];readonlystateMutability:"nonpayable";readonlytype:"function";},PrepareTransactionOptions>;`
## Parameters

#### options

### Type

`letoptions:BaseTransactionOptions<{tokenAddress:string}>;`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<any,{readonlyinputs:readonly[{readonlyname:"token";readonlytype:"address"},];readonlyname:"distribute";readonlyoutputs:readonly[];readonlystateMutability:"nonpayable";readonlytype:"function";},PrepareTransactionOptions>;`A prepared transaction object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

