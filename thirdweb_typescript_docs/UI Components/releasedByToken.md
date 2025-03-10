# releasedByToken

*Source: [https://portal.thirdweb.com/references/typescript/v5/split/releasedByToken](https://portal.thirdweb.com/references/typescript/v5/split/releasedByToken)*

* References
* releasedByToken

Calls the "released" function on the contract.
Similar to thereleasedextension, however this one requires you to specify a tokenAddress

`released`
## Example

`import{ releasedByToken }from"thirdweb/extensions/split";constresult=awaitreleasedByToken({contract,account:"0x...",tokenAddress:"0x...",});`
#### Signature

`functionreleasedByToken(options:BaseTransactionOptions<ReleasedParams&{tokenAddress:string}>,):Promise<bigint>;`
## Parameters

#### options

The options for the released function.

### Type

`letoptions:BaseTransactionOptions<ReleasedParams&{tokenAddress:string}>;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

