# ClaimButton

*Source: [https://portal.thirdweb.com/references/typescript/v5/ClaimButton](https://portal.thirdweb.com/references/typescript/v5/ClaimButton)*

* References
* ClaimButton

This button is used to claim tokens (NFT or ERC20) from a given thirdweb Drop contract.

there are 3 type of Drop contract: NFT Drop (DropERC721), Edition Drop (DropERC1155) and Token Drop (DropERC20)

Learn more: https://thirdweb.com/explore/drops

Note: This button only works with thirdweb Drop contracts.
For custom contract, please useTransactionButton

`TransactionButton`
## Example

Example for claiming NFT from an NFT Drop contract

`import{ ClaimButton }from"thirdweb/react";import{ ethereum }from"thirdweb/chains";<ClaimButtoncontractAddress="0x..."// contract address of the NFT Dropchain={ethereum}client={client}claimParams={{type:"ERC721",quantity:1n,// claim 1 token}}>Claim now</ClaimButton>;`For Edition Drop (ERC1155)

`<ClaimButtoncontractAddress="0x..."// contract address of the Edition Dropchain={ethereum}client={client}claimParams={{type:"ERC1155",quantity:1n,tokenId:0n,}}>Claim now</ClaimButton>;`For Token Drop (ERC20)

`<ClaimButtoncontractAddress="0x..."// contract address of the Token Dropchain={ethereum}client={client}claimParams={{type:"ERC20",quantity:"100",// claim 100 ERC20 tokens// instead of `quantity`, you can also use `quantityInWei` (bigint)}}>Claim now</ClaimButton>;`Attach custom Pay metadata

`<ClaimButtonpayModal={{metadata: {name:"Van Gogh Starry Night",image:"https://unsplash.com/starry-night.png",},}}>...</ClaimButton>;`Since this button uses theTransactionButton, it can take in any props that can be passed
to theTransactionButton

`TransactionButton``TransactionButton`For error handling & callbacks on transaction-sent and transaction-confirmed,
please refer to the TransactionButton docs.

#### Signature

`functionClaimButton(props:ClaimButtonProps):Element;`
## Parameters

#### props

### Type

`letprops:Omit<TransactionButtonProps,"transaction">&{chain:Chain;claimParams:ClaimParams;client:ThirdwebClient;contractAddress:string;};`
## Returns

#### Return Type

`letreturnType:Element;`A wrapper for TransactionButton

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

