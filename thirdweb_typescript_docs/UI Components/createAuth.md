# createAuth

*Source: [https://portal.thirdweb.com/references/typescript/v5/createAuth](https://portal.thirdweb.com/references/typescript/v5/createAuth)*

* References
* createAuth

Creates an authentication object with the given options.

## Example

`import{ createAuth }from'thirdweb/auth';constauth=createAuth({...});// 1. generate a login payload for a client on the server sideconstloginPayload=awaitauth.generatePayload({ address:'0x123...'});// 2. send the login payload to the client// 3. verify the login payload that the client sends back laterconstverifiedPayload=awaitauth.verifyPayload({ payload: loginPayload, signature:'0x123...'});// 4. generate a JWT for the clientconstjwt=awaitauth.generateJWT({ payload: verifiedPayload });// 5. set the JWT as a cookie or otherwise provide it to the client// 6. authenticate the client based on the JWT on subsequent callsconst{valid,parsedJWT}=awaitauth.verifyJWT({ jwt });`
#### Signature

`functioncreateAuth(options:AuthOptions):{generateJWT:(params:GenerateJWTParams)=>Promise<string>;generatePayload:(__namedParameters:GenerateLoginPayloadParams,)=>Promise<LoginPayload>;verifyJWT:(params:VerifyJWTParams)=>Promise<VerifyJWTResult>;verifyPayload:(__namedParameters:VerifyLoginPayloadParams,)=>Promise<VerifyLoginPayloadResult>;};`
## Parameters

#### options

The options for creating the authentication object.

### Type

`letoptions:{adminAccount?:Account;client?:ThirdwebClient;domain:string;jwt?:{expirationTimeSeconds?:number;jwtId?:{generate:()=>string|Promise<string>;validate:(jwtId:string)=>boolean|Promise<boolean>;};};login?:{nonce?:{generate:()=>string|Promise<string>;validate:(nonce:string)=>boolean|Promise<boolean>;};payloadExpirationTimeSeconds?:number;resources?:Array<string>;statement?:string;uri?:string;version?:string;};};`
## Returns

#### Return Type

`letreturnType:{generateJWT:(params:GenerateJWTParams)=>Promise<string>;generatePayload:(__namedParameters:GenerateLoginPayloadParams,)=>Promise<LoginPayload>;verifyJWT:(params:VerifyJWTParams)=>Promise<VerifyJWTResult>;verifyPayload:(__namedParameters:VerifyLoginPayloadParams,)=>Promise<VerifyLoginPayloadResult>;};`The created authentication object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

