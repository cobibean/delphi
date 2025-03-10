# getClaimCondition

*Source: [https://portal.thirdweb.com/references/typescript/v5/claimableerc721/getClaimCondition](https://portal.thirdweb.com/references/typescript/v5/claimableerc721/getClaimCondition)*

* References
* getClaimCondition

Calls the "getClaimCondition" function on the contract.

## Example

`import{ ClaimableERC721 }from"thirdweb/modules";constresult=awaitClaimableERC721.getClaimCondition({contract,});`
#### Signature

`functiongetClaimCondition(options:BaseTransactionOptions,):Promise<{allowlistMerkleRoot:`0x${string}`;auxData:string;availableSupply:bigint;currency:string;endTimestamp:number;maxMintPerWallet:bigint;pricePerUnit:bigint;startTimestamp:number;}>;`
## Parameters

#### options

The options for the getClaimCondition function.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:Promise<{allowlistMerkleRoot:`0x${string}`;auxData:string;availableSupply:bigint;currency:string;endTimestamp:number;maxMintPerWallet:bigint;pricePerUnit:bigint;startTimestamp:number;}>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

