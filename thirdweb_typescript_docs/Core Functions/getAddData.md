# getAddData

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/getAddData](https://portal.thirdweb.com/references/typescript/v5/farcaster/getAddData)*

* References
* getAddData

Prepares the data required for signing an Add message according to EIP-712.

## Example

`constmessage:AddMessage={owner:"0xYourAddress",keyType:1,key:"0xYourPublicKey",metadataType:1,metadata:"0xYourMetadata",nonce:BigInt("YourNonce"),deadline:BigInt("YourDeadline"),};constdata=getAddData(message);`
#### Signature

`functiongetAddData(message:AddMessage):{domain:{readonlychainId:10;readonlyname:"Farcaster KeyGateway";readonlyverifyingContract:"0x00000000fC56947c7E7183f8Ca4B62398CaAdf0B";readonlyversion:"1";};message:AddMessage;primaryType:"Add";types:{readonlyAdd:readonly[{readonlyname:"owner";readonlytype:"address"},{readonlyname:"keyType";readonlytype:"uint32"},{readonlyname:"key";readonlytype:"bytes"},{readonlyname:"metadataType";readonlytype:"uint8"},{readonlyname:"metadata";readonlytype:"bytes"},{readonlyname:"nonce";readonlytype:"uint256"},{readonlyname:"deadline";readonlytype:"uint256"},];};};`
## Parameters

#### message

The AddMessage object containing the message to be signed.

### Type

`letmessage:{deadline:bigint;key:Hex;keyType:number;metadata:Hex;metadataType:number;nonce:bigint;owner:Address;};`
## Returns

#### Return Type

`letreturnType:{domain:{readonlychainId:10;readonlyname:"Farcaster KeyGateway";readonlyverifyingContract:"0x00000000fC56947c7E7183f8Ca4B62398CaAdf0B";readonlyversion:"1";};message:AddMessage;primaryType:"Add";types:{readonlyAdd:readonly[{readonlyname:"owner";readonlytype:"address"},{readonlyname:"keyType";readonlytype:"uint32"},{readonlyname:"key";readonlytype:"bytes"},{readonlyname:"metadataType";readonlytype:"uint8"},{readonlyname:"metadata";readonlytype:"bytes"},{readonlyname:"nonce";readonlytype:"uint256"},{readonlyname:"deadline";readonlytype:"uint256"},];};};`The data object structured according to EIP-712, ready for signing.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

