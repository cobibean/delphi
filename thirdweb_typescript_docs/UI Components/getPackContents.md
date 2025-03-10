# getPackContents

*Source: [https://portal.thirdweb.com/references/typescript/v5/pack/getPackContents](https://portal.thirdweb.com/references/typescript/v5/pack/getPackContents)*

* References
* getPackContents

Calls the "getPackContents" function on the contract.

## Example

`import{ getPackContents }from"thirdweb/extensions/pack";constresult=awaitgetPackContents({contract,packId:...,});`
#### Signature

`functiongetPackContents(options:BaseTransactionOptions<GetPackContentsParams>):Promise<readonly[readonlyArray<{assetContract:string;tokenId:bigint;tokenType:number;totalAmount:bigint}>,readonlyArray<bigint>]>`
## Parameters

#### options

The options for the getPackContents function.

### Type

`letoptions:BaseTransactionOptions<GetPackContentsParams>;`
## Returns

#### Return Type

`letreturnType:Promise<readonly[readonlyArray<{assetContract:string;tokenId:bigint;tokenType:number;totalAmount:bigint}>,readonlyArray<bigint>]>`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

