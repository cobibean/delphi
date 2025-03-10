# serializeErc6492Signature

*Source: [https://portal.thirdweb.com/references/typescript/v5/serializeErc6492Signature](https://portal.thirdweb.com/references/typescript/v5/serializeErc6492Signature)*

* References
* serializeErc6492Signature

## Example

`import{ serializeErc6492Signature }from"thirdweb/auth";constserializedSignature=serializeErc6492Signature({address:"0x...",data:"0x...",signature:"0x...",});// 0x000000000000000000000000cafebabecafebabecafebabecafebabecafebabe000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000004deadbeef000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041a461f509887bd19e312c0c58467ce8ff8e300d3c1a90b608a760c5b80318eaf15fe57c96f9175d6cd4daad4663763baa7e78836e067d0163e9a2ccf2ff753f5b1b000000000000000000000000000000000000000000000000000000000000006492649264926492649264926492649264926492649264926492649264926492`
#### Signature

`functionserializeErc6492Signature(__namedParameters:Erc6492Signature,):`0x${string}`;`
## Parameters

#### __namedParameters

### Type

`let__namedParameters:{address:string;data:Hex;signature:Hex};`
## Returns

#### Return Type

`letreturnType:`0x${string}`;`The serialized signature

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

