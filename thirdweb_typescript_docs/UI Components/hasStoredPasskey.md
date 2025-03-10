# hasStoredPasskey

*Source: [https://portal.thirdweb.com/references/typescript/v5/hasStoredPasskey](https://portal.thirdweb.com/references/typescript/v5/hasStoredPasskey)*

* References
* hasStoredPasskey

Returns whether this device has a stored passkey ready to be used for sign-in

#### Signature

`functionhasStoredPasskey(client:ThirdwebClient,ecosystemId?:`ecosystem.${string}`,storage?:AsyncStorage,):Promise<boolean>;`
## Parameters

#### client

the thirdweb client

### Type

`letclient:{readonlyclientId:string;readonlysecretKey:string|undefined;}&Readonly<ClientOptions>;`
#### ecosystemId

### Type

`letecosystemId:`ecosystem.${string}`;`
#### storage

### Type

`letstorage:{getItem:(key:string)=>Promise<null|string>;removeItem:(key:string)=>Promise<void>;setItem:(key:string,value:string)=>Promise<void>;};`
## Returns

#### Return Type

`letreturnType:Promise<boolean>;`whether the device has a stored passkey

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

