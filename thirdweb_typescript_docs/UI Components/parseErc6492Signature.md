# parseErc6492Signature

*Source: [https://portal.thirdweb.com/references/typescript/v5/parseErc6492Signature](https://portal.thirdweb.com/references/typescript/v5/parseErc6492Signature)*

* References
* parseErc6492Signature

## Example

`import{ parseErc6492Signature }from"thirdweb/auth";constparsedSignature=parseErc6492Signature("0x1234567890123456789012345678901234567890",);`
#### Signature

`functionparseErc6492Signature(signature:`0x${string}`,):ParseErc6492SignatureReturnType;`
## Parameters

#### signature

The signature to parse

### Type

`letsignature:`0x${string}`;`
## Returns

#### Return Type

`letreturnType:OneOf<Erc6492Signature|{signature:Hex}>;`ParseErc6492SignatureReturnType The parsed (or original) signature

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

