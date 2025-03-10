# hashMessage

*Source: [https://portal.thirdweb.com/references/typescript/v5/hashMessage](https://portal.thirdweb.com/references/typescript/v5/hashMessage)*

* References
* hashMessage

Ethereum Signed Message hashing

## Example

`import{ hashMessage }from"thirdweb/utils";consthash=hashMessage("hello world");`
#### Signature

`functionhashMessage(message:SignableMessage,to_?:TTo,):HashMessage<TTo>;`
## Parameters

#### message

The message to hash, either as a string, a Uint8Array, or an object with arawproperty containing a Uint8Array.

`raw`
### Type

`letmessage:SignableMessage;`
#### to_

The desired output format of the hash (optional). Defaults to 'hex'.

### Type

`letto_:TTo;`
## Returns

#### Return Type

`letreturnType:HashMessage<TTo>;`The Ethereum Signed Message hash of the message in the specified format.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

