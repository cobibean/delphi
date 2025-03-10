# unpin

*Source: [https://portal.thirdweb.com/references/typescript/v5/unpin](https://portal.thirdweb.com/references/typescript/v5/unpin)*

* References
* unpin

Unpins a file from IPFS.
For security purposes, this method requires a secret key to be set in the ThirdwebClient instance.

## Example

`import{ unpin }from"thirdweb";constresult=awaitunpin({client: thirdwebClient,cid:"QmTzQ1N1z1Q1N1z1Q1N1z1Q1N1z1Q1N1z1Q1N1z1Q1N1z1",});`
#### Signature

`functionunpin(options:UnpinOptions):Promise<void>;`
## Parameters

#### options

The options for unpinning the file.

### Type

`letoptions:{cid:string;client:ThirdwebClient};`
## Returns

#### Return Type

`letreturnType:Promise<void>;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

