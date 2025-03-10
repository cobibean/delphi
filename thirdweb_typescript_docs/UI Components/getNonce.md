# getNonce

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/getNonce](https://portal.thirdweb.com/references/typescript/v5/farcaster/getNonce)*

* References
* getNonce

Retrieves the current key gateway nonce for an account.

## Example

`import{ getNonce }from"thirdweb/extensions/farcaster";constnonce=awaitgetNonce({client,address,});`
#### Signature

`functiongetNonce(options:GetNonceParams):Promise<bigint>;`
## Parameters

#### options

Parameters to pass to the function.

### Type

`letoptions:{address:Address;chain?:Chain;client:ThirdwebClient;disableCache?:boolean;};`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`A promise that resolves to the current nonce.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

