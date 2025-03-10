# useLinkProfile

*Source: [https://portal.thirdweb.com/references/typescript/v5/useLinkProfile](https://portal.thirdweb.com/references/typescript/v5/useLinkProfile)*

* References
* useLinkProfile

Links a web2 or web3 profile to the connected in-app or ecosystem account.When a profile is linked to the account, that profile can then be used to sign into the same account.

## Example

### Linking a social profile

`import{ useLinkProfile }from"thirdweb/react";const{mutate:linkProfile}=useLinkProfile();constonClick=()=>{linkProfile({client,strategy:"discord",// or "google", "x", "telegram", etc});};`
### Linking an email

`import{ useLinkProfile }from"thirdweb/react";import{ preAuthenticate }from"thirdweb/wallets";const{mutate:linkProfile}=useLinkProfile();// send a verification email firstconstsendEmail=async()=>{constemail=awaitpreAuthenticate({client,strategy:"email",email:"[email protected]",});};// then link the profile with the verification codeconstonClick=(code:string)=>{linkProfile({client,strategy:"email",email:"[email protected]",verificationCode: code,});};`The same process can be used for phone and email, simply swap out thestrategyparameter.

`strategy`
### Linking a wallet

`import{ useLinkProfile }from"thirdweb/react";const{mutate:linkProfile}=useLinkProfile();constonClick=()=>{linkProfile({client,strategy:"wallet",wallet:createWallet("io.metamask"),// autocompletion for 400+ wallet idschain: sepolia,// any chain works, needed for SIWE signature});};`
#### Signature

`functionuseLinkProfile():UseMutationResult<Array<Profile>,Error,AuthArgsType,unknown>;`
## Returns

#### Return Type

`letreturnType:UseMutationResult<Array<Profile>,Error,AuthArgsType,unknown>;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

