# encodeSafeTransferFrom

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc1155/encodeSafeTransferFrom](https://portal.thirdweb.com/references/typescript/v5/erc1155/encodeSafeTransferFrom)*

* References
* encodeSafeTransferFrom

Encodes the "safeTransferFrom" function into a Hex string with its parameters.

## Example

`import{ encodeSafeTransferFrom }from"thirdweb/extensions/erc1155";constresult=encodeSafeTransferFrom({from:...,to:...,tokenId:...,value:...,data:...,});`
#### Signature

`functionencodeSafeTransferFrom(options:SafeTransferFromParams,):`0xf242432a${string}`;`
## Parameters

#### options

The options for the safeTransferFrom function.

### Type

`letoptions:WithOverrides<{data:AbiParameterToPrimitiveType<{name:"_data";type:"bytes"}>;from:AbiParameterToPrimitiveType<{name:"_from";type:"address";}>;to:AbiParameterToPrimitiveType<{name:"_to";type:"address"}>;tokenId:AbiParameterToPrimitiveType<{name:"tokenId";type:"uint256";}>;value:AbiParameterToPrimitiveType<{name:"_value";type:"uint256";}>;}>;`
## Returns

#### Return Type

`letreturnType:`0xf242432a${string}`;`The encoded hexadecimal string.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

