# decodeError

*Source: [https://portal.thirdweb.com/references/typescript/v5/decodeError](https://portal.thirdweb.com/references/typescript/v5/decodeError)*

* References
* decodeError

Decodes an error.

## Example

`import{ decodeError }from"thirdweb/utils";constdata="0x...";consterror=awaitdecodeError({ contract, data });`
#### Signature

`functiondecodeError(options:{contract:Readonly<ContractOptions<abi,`0x${string}`>>;data:`0x${string}`;}):Promise<unknown>;`
## Parameters

#### options

The options object.

### Type

`letoptions:{contract:Readonly<ContractOptions<abi,`0x${string}`>>;data:`0x${string}`;};`
## Returns

#### Return Type

`letreturnType:Promise<unknown>;`The decoded error.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

