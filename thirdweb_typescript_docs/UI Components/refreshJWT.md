# refreshJWT

*Source: [https://portal.thirdweb.com/references/typescript/v5/refreshJWT](https://portal.thirdweb.com/references/typescript/v5/refreshJWT)*

* References
* refreshJWT

Refreshes a JSON Web Token (JWT) by encoding a new payload with updated expiration time.

## Example

`import{ refreshJWT }from"thirdweb/utils";constjwt=awaitrefreshJWT({account,jwt,expirationTime:1000*60*60,});`
#### Signature

`functionrefreshJWT(options:RefreshJWTParams):Promise<string>;`
## Parameters

#### options

The options for refreshing the JWT.

### Type

`letoptions:{account:Account;expirationTime?:number;jwt:string;};`
## Returns

#### Return Type

`letreturnType:Promise<string>;`A Promise that resolves to the refreshed JWT.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

