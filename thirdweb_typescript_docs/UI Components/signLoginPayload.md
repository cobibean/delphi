# signLoginPayload

*Source: [https://portal.thirdweb.com/references/typescript/v5/signLoginPayload](https://portal.thirdweb.com/references/typescript/v5/signLoginPayload)*

* References
* signLoginPayload

Signs the login payload using the provided account.

## Example

`import{ signLoginPayload }from"thirdweb/auth";const{signature,payload}=awaitsignLoginPayload({payload: loginPayload,account: account,});`
#### Signature

`functionsignLoginPayload(options:SignLoginPayloadParams,):Promise<{payload:LoginPayload;signature:`0x${string}`}>;`
## Parameters

#### options

The options for signing the login payload.

### Type

`letoptions:{account:Account;payload:LoginPayload};`
## Returns

#### Return Type

`letreturnType:{address:string;chain_id?:string;domain:string;expiration_time:string;invalid_before:string;issued_at:string;nonce:string;resources?:Array<string>;statement:string;uri?:string;version:string;};`An object containing the signature and the payload.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

