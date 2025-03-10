# signAuthorization

*Source: [https://portal.thirdweb.com/references/typescript/v5/signAuthorization](https://portal.thirdweb.com/references/typescript/v5/signAuthorization)*

* References
* signAuthorization

Sign the given EIP-7702 authorization object.

#### Signature

`functionsignAuthorization(options:{account:Account;request:AuthorizationRequest;}):Promise<{address:string;chainId:number;nonce:bigint;r:bigint;s:bigint;yParity:number;}>;`
## Parameters

#### options

The options forsignAuthorizationRefer to the typeSignAuthorizationOptions

`signAuthorization``SignAuthorizationOptions`
### Type

`letoptions:{account:Account;request:AuthorizationRequest};`
## Returns

#### Return Type

`letreturnType:Promise<{address:string;chainId:number;nonce:bigint;r:bigint;s:bigint;yParity:number;}>;`The signed authorization object

`import{ signAuthorization }from"thirdweb";constauthorization=awaitsignAuthorization({request: {address:"0x...",chainId:911867,nonce:100n,},account: myAccount,});`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

