# encode

*Source: [https://portal.thirdweb.com/references/typescript/v5/encode](https://portal.thirdweb.com/references/typescript/v5/encode)*

* References
* encode

Encodes a transaction object into a hexadecimal string representation of the encoded data.

## Example

`import{ encode }from"thirdweb";constencodedData=awaitencode(transaction);`
#### Signature

`functionencode(transaction:PreparedTransaction<abi,abiFn>,):Promise<`0x${string}`>;`
## Parameters

#### transaction

The transaction object to encode.

### Type

`lettransaction:PreparedTransaction<abi,abiFn>;`
## Returns

#### Return Type

`letreturnType:Promise<`0x${string}`>;`A promise that resolves to the encoded data as a hexadecimal string.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

