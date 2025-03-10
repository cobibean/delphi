# decodeFunctionResult

*Source: [https://portal.thirdweb.com/references/typescript/v5/decodeFunctionResult](https://portal.thirdweb.com/references/typescript/v5/decodeFunctionResult)*

* References
* decodeFunctionResult

Decodes the result of a function call.

## Example

`import{ decodeFunctionResult }from"thirdweb/utils";constdata="0x...";constresult=awaitdecodeFunctionResult({ contract, data });`
#### Signature

`functiondecodeFunctionResult(options:{contract:Readonly<ContractOptions<abi,`0x${string}`>>;data:`0x${string}`;}):Promise<ReturnType<ReturnType<abi,Name<abi>,undefined,AbiFunction>,"Array">>;`
## Parameters

#### options

The options object.

### Type

`letoptions:{contract:Readonly<ContractOptions<abi,`0x${string}`>>;data:`0x${string}`;};`
## Returns

#### Return Type

`letreturnType:Promise<ReturnType<ReturnType<abi,Name<abi>,undefined,AbiFunction>,"Array">>;`The decoded result.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

