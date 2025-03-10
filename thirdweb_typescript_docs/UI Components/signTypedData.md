# signTypedData

*Source: [https://portal.thirdweb.com/references/typescript/v5/signTypedData](https://portal.thirdweb.com/references/typescript/v5/signTypedData)*

* References
* signTypedData

Signs a typed data object with a given private key according to EIP712.

## Example

`import{ signTypedData }from"thirdweb/utils";signTypedData({privateKey:"0x...",...typedData,});`
#### Signature

`functionsignTypedData(options:SignTypedDataOptions<typedData,primaryType>,):`0x${string}`;`
## Parameters

#### options

The typed data is passed within options alongside the private key

### Type

`letoptions:SignTypedDataOptions<typedData,primaryType>;`
## Returns

#### Return Type

`letreturnType:`0x${string}`;`The signature as a hex string

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

