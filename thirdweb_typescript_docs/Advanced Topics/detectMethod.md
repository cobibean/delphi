# detectMethod

*Source: [https://portal.thirdweb.com/references/typescript/v5/detectMethod](https://portal.thirdweb.com/references/typescript/v5/detectMethod)*

* References
* detectMethod

Detects if the specified method is present in the contract bytecode.

## Example

`import{ detectMethod }from"thirdweb/utils/extensions/detect.js";consthasDecimals=awaitdetectMethod({method:"function decimals() view returns (uint8)",availableSelectors: ["0x313ce567"],});`
#### Signature

`functiondetectMethod(options:DetectExtensionOptions):boolean;`
## Parameters

#### options

The options for detecting the extension.

### Type

`letoptions:DetectExtensionOptions;`
## Returns

#### Return Type

`letreturnType:boolean;`A promise that resolves to a boolean indicating if the extension is detected.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

