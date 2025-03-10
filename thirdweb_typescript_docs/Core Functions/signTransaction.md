# signTransaction

*Source: [https://portal.thirdweb.com/references/typescript/v5/signTransaction](https://portal.thirdweb.com/references/typescript/v5/signTransaction)*

* References
* signTransaction

Signs a transaction to be sent to a node.

## Example

`import{ signTransaction }from"thirdweb";signTransaction({transaction: {...},privateKey:"0x...",});`
#### Signature

`functionsignTransaction(options:SignTransactionOptions,):`0x${string}`;`
## Parameters

#### options

The options for signing.

### Type

`letoptions:{privateKey:Hex;transaction:SerializableTransaction;};`
## Returns

#### Return Type

`letreturnType:`0x${string}`;`The signed transaction as a hex string

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

