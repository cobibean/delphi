# getTotalClaimedSupply

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/getTotalClaimedSupply](https://portal.thirdweb.com/references/typescript/v5/erc721/getTotalClaimedSupply)*

* References
* getTotalClaimedSupply

Retrieves the total claimed supply of ERC721 tokens.

## Example

`import{ getTotalClaimedSupply }from"thirdweb/extensions/erc721";consttotalClaimedSupply=awaitgetTotalClaimedSupply({contract,});`
#### Signature

`functiongetTotalClaimedSupply(options:BaseTransactionOptions,):Promise<bigint>;`
## Parameters

#### options

The base transaction options.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`A promise that resolves to the total claimed supply as a bigint.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

