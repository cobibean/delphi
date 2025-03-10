# getCapabilities

*Source: [https://portal.thirdweb.com/references/typescript/v5/eip5792/getCapabilities](https://portal.thirdweb.com/references/typescript/v5/eip5792/getCapabilities)*

* References
* getCapabilities

Get the capabilities of a wallet based on theEIP-5792specification.

This function is dependent on the wallet's support for EIP-5792, but will not throw.The returned object contains amessagefield detailing any issues with the wallet's support for EIP-5792.

`message`
## Example

`import{ getCapabilities }from"thirdweb/wallets/eip5792";constwallet=createWallet("com.coinbase.wallet");constcapabilities=awaitgetCapabilities({ wallet });`
#### Signature

`functiongetCapabilities(options:GetCapabilitiesOptions<ID>,):Promise<{message?:string}>;`
## Parameters

#### options

### Type

`letoptions:GetCapabilitiesOptions<ID>;`
## Returns

#### Return Type

`letreturnType:Promise<{message?:string}>;`
* A promise that resolves to the capabilities of the wallet based on theEIP-5792spec.

A promise that resolves to the capabilities of the wallet based on theEIP-5792spec.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

