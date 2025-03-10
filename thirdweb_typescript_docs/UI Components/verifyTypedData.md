# verifyTypedData

*Source: [https://portal.thirdweb.com/references/typescript/v5/verifyTypedData](https://portal.thirdweb.com/references/typescript/v5/verifyTypedData)*

* References
* verifyTypedData

## Example

`import{ verifyTypedData }from"thirdweb/utils";constisValid=awaitverifyTypedData({address:"0x...",signature:"0x...",client,chain,domain: {name:"Ether Mail",version:"1",chainId:1,verifyingContract:"0x0000000000000000000000000000000000000000",},primaryType:"Mail",types: {Person: [{ name:"name", type:"string"},{ name:"wallet", type:"address"},],Mail: [{ name:"from", type:"Person"},{ name:"to", type:"Person"},{ name:"contents", type:"string"},],},message: {from: {name:"Cow",wallet:"0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",},to: {name:"Bob",wallet:"0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",},contents:"Hello, Bob!",},});`
#### Signature

`functionverifyTypedData(__namedParameters:VerifyTypedDataParams<typedData,primaryType>,):Promise<boolean>;`
## Parameters

#### __namedParameters

### Type

`let__namedParameters:VerifyTypedDataParams<typedData,primaryType>;`
## Returns

#### Return Type

`letreturnType:Promise<boolean>;`A promise that resolves totrueif the signature is valid, orfalseotherwise.

`true``false`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

