# getRegisterData

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/getRegisterData](https://portal.thirdweb.com/references/typescript/v5/farcaster/getRegisterData)*

* References
* getRegisterData

Constructs the data required for signing a register message in the Farcaster ID Gateway.
This includes the EIP-712 domain, types, and the message to be signed.

## Example

`import{ getRegisterData }from"thirdweb/extensions/farcaster";constdata=getRegisterData(message);`
#### Signature

`functiongetRegisterData(message:RegisterMessage):{domain:{readonlychainId:10;readonlyname:"Farcaster IdGateway";readonlyverifyingContract:"0x00000000Fc25870C6eD6b6c7E41Fb078b7656f69";readonlyversion:"1";};message:RegisterMessage;primaryType:"Register";types:{readonlyRegister:readonly[{readonlyname:"to";readonlytype:"address"},{readonlyname:"recovery";readonlytype:"address"},{readonlyname:"nonce";readonlytype:"uint256"},{readonlyname:"deadline";readonlytype:"uint256"},];};};`
## Parameters

#### message

The register message containing the necessary information for the signature.

### Type

`letmessage:{deadline:bigint;nonce:bigint;recovery:Address;to:Address;};`
## Returns

#### Return Type

`letreturnType:{domain:{readonlychainId:10;readonlyname:"Farcaster IdGateway";readonlyverifyingContract:"0x00000000Fc25870C6eD6b6c7E41Fb078b7656f69";readonlyversion:"1";};message:RegisterMessage;primaryType:"Register";types:{readonlyRegister:readonly[{readonlyname:"to";readonlytype:"address"},{readonlyname:"recovery";readonlytype:"address"},{readonlyname:"nonce";readonlytype:"uint256"},{readonlyname:"deadline";readonlytype:"uint256"},];};};`An object containing the EIP-712 domain, types, and the message, ready to be signed.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

