# encodeJWT

*Source: [https://portal.thirdweb.com/references/typescript/v5/encodeJWT](https://portal.thirdweb.com/references/typescript/v5/encodeJWT)*

* References
* encodeJWT

Builds a JSON Web Token (JWT) using the provided options.

## Example

`import{ encodeJWT }from"thirdweb/utils";constjwt=awaitencodeJWT({payload: {iss:"0x1234567890123456789012345678901234567890",sub:"0x1234567890123456789012345678901234567890",aud:"0x1234567890123456789012345678901234567890",exp:newDate(Date.now()+1000*60*60),nbf:newDate(),iat:newDate(),jti:"1234567890",ctx: {example:"example",},},wallet,});`
#### Signature

`functionencodeJWT(options:EncodeJWTParams):Promise<string>;`
## Parameters

#### options

The options for building the JWT.

### Type

`letoptions:EncodeJWTParams;`
## Returns

#### Return Type

`letreturnType:Promise<string>;`The generated JWT.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

