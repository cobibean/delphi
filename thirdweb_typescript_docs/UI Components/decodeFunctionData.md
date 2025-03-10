# decodeFunctionData

*Source: [https://portal.thirdweb.com/references/typescript/v5/decodeFunctionData](https://portal.thirdweb.com/references/typescript/v5/decodeFunctionData)*

* References
* decodeFunctionData

Decodes the data of a function call.

## Example

`import{ decodeFunctionData }from"thirdweb/utils";constdata="0x...";constdecodedData=awaitdecodeFunctionData({ contract, data });`
#### Signature

`functiondecodeFunctionData(options:{contract:Readonly<ContractOptions<abi,`0x${string}`>>;data:`0x${string}`;}):Promise<ReturnType<ReturnType<abi,Name<abi>,undefined,AbiFunction>>>;`
## Parameters

#### options

The options object.

### Type

`letoptions:{contract:Readonly<ContractOptions<abi,`0x${string}`>>;data:`0x${string}`;};`
## Returns

#### Return Type

`letreturnType:Promise<ReturnType<ReturnType<abi,Name<abi>,undefined,AbiFunction>>>;`The decoded data.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

