# checkVerificationStatus

*Source: [https://portal.thirdweb.com/references/typescript/v5/checkVerificationStatus](https://portal.thirdweb.com/references/typescript/v5/checkVerificationStatus)*

* References
* checkVerificationStatus

Checks the verification status of a contract.

## Example

`import{ checkVerificationStatus }from"thirdweb/contract";constverificationStatus=awaitcheckVerificationStatus({explorerApiUrl:"https://api.polygonscan.com/api",explorerApiKey:"YOUR_API_KEY",guid:"YOUR_GUID",});console.log(verificationStatus);`
#### Signature

`functioncheckVerificationStatus(options:CheckVerificationStatusOptions,):Promise<unknown>;`
## Parameters

#### options

The options for checking the verification status.

### Type

`letoptions:CheckVerificationStatusOptions;`
## Returns

#### Return Type

`letreturnType:Promise<unknown>;`A promise that resolves with the verification status data.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

