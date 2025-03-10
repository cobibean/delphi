# isClaimed

*Source: [https://portal.thirdweb.com/references/typescript/v5/airdrop/isClaimed](https://portal.thirdweb.com/references/typescript/v5/airdrop/isClaimed)*

* References
* isClaimed

Calls the "isClaimed" function on the contract.

## Example

`import{ isClaimed }from"thirdweb/extensions/airdrop";constresult=awaitisClaimed({contract,receiver:...,token:...,tokenId:...,});`
#### Signature

`functionisClaimed(options:BaseTransactionOptions<IsClaimedParams>,):Promise<boolean>;`
## Parameters

#### options

The options for the isClaimed function.

### Type

`letoptions:BaseTransactionOptions<IsClaimedParams>;`
## Returns

#### Return Type

`letreturnType:Promise<boolean>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

