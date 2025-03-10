# signMessage

*Source: [https://portal.thirdweb.com/references/typescript/v5/signMessage](https://portal.thirdweb.com/references/typescript/v5/signMessage)*

* References
* signMessage

## Signature#1

Signs a string message with a given private key.

### Example

`import{ signMessage }from"thirdweb/utils";signMessage({message:"Hello, world!",privateKey:"0x...",});`
#### Signature

`functionsignMessage(options:SignMessageOptions):`0x${string}`;`
### Parameters

#### options

The options for signing.

#### Type

`letoptions:{message:Message;privateKey:Hex};`
### Returns

#### Return Type

`letreturnType:`0x${string}`;`The signature as a hex string

## Signature#2

Signs a string message with a given account.

### Example

`import{ signMessage }from"thirdweb/utils";awaitsignMessage({message:"Hello, world!",account,});`
#### Signature

`functionsignMessage(options:{account:Account;message:Message;}):Promise<`0x${string}`>;`
### Parameters

#### options

The options for signing.

#### Type

`letoptions:{account:Account;message:Message};`
### Returns

#### Return Type

`letreturnType:Promise<`0x${string}`>;`The signature as a hex string

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

