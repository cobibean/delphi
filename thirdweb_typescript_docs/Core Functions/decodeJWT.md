# decodeJWT

*Source: [https://portal.thirdweb.com/references/typescript/v5/decodeJWT](https://portal.thirdweb.com/references/typescript/v5/decodeJWT)*

* References
* decodeJWT

Decodes a JSON Web Token (JWT) and returns the decoded payload and signature.

## Example

`import{ decodeJWT }from"thirdweb/utils";const{payload,signature}=decodeJWT(jwt);`
#### Signature

`functiondecodeJWT(jwt:string):{payload:JWTPayload;signature:`0x${string}`;};`
## Parameters

#### jwt

The JWT string to decode.

### Type

`letjwt:string;`
## Returns

#### Return Type

`letreturnType:{payload:JWTPayload;signature:`0x${string}`};`An object containing the decoded payload and signature.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

