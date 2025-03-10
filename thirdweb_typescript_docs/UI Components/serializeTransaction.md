# serializeTransaction

*Source: [https://portal.thirdweb.com/references/typescript/v5/serializeTransaction](https://portal.thirdweb.com/references/typescript/v5/serializeTransaction)*

* References
* serializeTransaction

Serializes a legacy, EIP-1559, EIP-2930, EIP-4844, or EIP-7702 transaction object.

## Example

`import{ serializeTransaction }from"thirdweb";constserializedTransaction=serializeTransaction({transaction: {to:"0x",value:0n,},});`
#### Signature

`functionserializeTransaction(options:SerializeTransactionOptions,):`0x${string}`;`
## Parameters

#### options

The serialization options.

### Type

`letoptions:{signature?:|ox__Signature.Signature<true,Hex>|ox__Signature.Legacy<Hex,bigint>;transaction:SerializableTransaction;};`
## Returns

#### Return Type

`letreturnType:`0x${string}`;`The serialized transaction.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

