# signAdd

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/signAdd](https://portal.thirdweb.com/references/typescript/v5/farcaster/signAdd)*

* References
* signAdd

Signs an Add message using the account's signTypedData method.

## Example

`constsignedMessage=awaitsignAdd({account: yourAccount,message: yourAddMessage,});`
#### Signature

`functionsignAdd(options:SignAddOptions):Promise<`0x${string}`>;`
## Parameters

#### options

The options for signing the Add message.

### Type

`letoptions:{account:Account;message:AddMessage};`
## Returns

#### Return Type

`letreturnType:Promise<`0x${string}`>;`A promise that resolves to the signature of the Add message.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

