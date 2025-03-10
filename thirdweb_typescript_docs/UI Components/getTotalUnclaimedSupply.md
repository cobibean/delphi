# getTotalUnclaimedSupply

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/getTotalUnclaimedSupply](https://portal.thirdweb.com/references/typescript/v5/erc721/getTotalUnclaimedSupply)*

* References
* getTotalUnclaimedSupply

Retrieves the total unclaimed supply of ERC721 tokens.

## Example

`import{ getTotalUnclaimedSupply }from"thirdweb/extensions/erc721";consttotalUnclaimedSupply=awaitgetTotalUnclaimedSupply({contract,});`
#### Signature

`functiongetTotalUnclaimedSupply(options:BaseTransactionOptions,):Promise<bigint>;`
## Parameters

#### options

The base transaction options.

### Type

`letoptions:{contract:ThirdwebContract<abi> }&T;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`A promise that resolves to the total unclaimed supply as a bigint.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

