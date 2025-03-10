# canClaim

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/canClaim](https://portal.thirdweb.com/references/typescript/v5/erc20/canClaim)*

* References
* canClaim

Check if a user can claim a drop.

## Example

`constclaimResult=awaitcanClaim({contract: contract,claimer:"0x1234567890123456789012345678901234567890",quantity:"1",});`
#### Signature

`functioncanClaim(options:BaseTransactionOptions<CanClaimParams>,):Promise<CanClaimResult>;`
## Parameters

#### options

The options for the transaction.

### Type

`letoptions:BaseTransactionOptions<CanClaimParams>;`
## Returns

#### Return Type

`letreturnType:{reason?:string;result:boolean};`Whether the user can claim the drop.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

