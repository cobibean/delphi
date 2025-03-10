# getUserOpReceiptRaw

*Source: [https://portal.thirdweb.com/references/typescript/v5/getUserOpReceiptRaw](https://portal.thirdweb.com/references/typescript/v5/getUserOpReceiptRaw)*

* References
* getUserOpReceiptRaw

Get the receipt of a user operation.

## Example

`import{ getUserOpReceiptRaw }from"thirdweb/wallets/smart";constreceipt=awaitgetUserOpReceiptRaw({client,chain,userOpHash,});`
#### Signature

`functiongetUserOpReceiptRaw(args:BundlerOptions&{userOpHash:`0x${string}`},):Promise<undefined|UserOperationReceipt>;`
## Parameters

#### args

The options for getting the receipt of a user operation.

### Type

`letargs:BundlerOptions&{userOpHash:`0x${string}`};`
## Returns

#### Return Type

`letreturnType:Promise<undefined|UserOperationReceipt>;`The raw receipt of the user operation.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

