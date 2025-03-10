# getOwnedTokenIds

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc721/getOwnedTokenIds](https://portal.thirdweb.com/references/typescript/v5/erc721/getOwnedTokenIds)*

* References
* getOwnedTokenIds

Retrieves the token IDs owned by a specific address.

## Example

`import{ getOwnedTokenIds }from"thirdweb/extensions/erc721";constownedTokenIds=awaitgetOwnedTokenIds({contract,owner:"0x1234...",});`
#### Signature

`functiongetOwnedTokenIds(options:BaseTransactionOptions<BalanceOfParams>,):Promise<Array<bigint>>;`
## Parameters

#### options

The options for retrieving the owned token IDs.

### Type

`letoptions:BaseTransactionOptions<BalanceOfParams>;`
## Returns

#### Return Type

`letreturnType:Promise<Array<bigint>>;`A promise that resolves to an array of bigint representing the owned token IDs.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

