# useChainMetadata

*Source: [https://portal.thirdweb.com/references/typescript/v5/useChainMetadata](https://portal.thirdweb.com/references/typescript/v5/useChainMetadata)*

* References
* useChainMetadata

Retrieves metadata for a chain such as name, icon, available faucets, block explorers, etc.

## Example

`import { useChainMetadata } from "thirdweb/react";const { data: chainMetadata } = useChainMetadata(defineChain(11155111));console.log("Name:", chainMetadata.name); // Sepoliaconsole.log("Faucets:", chainMetadata.faucets); // ["https://thirdweb.com/sepolia/faucet"]console.log("Explorers:", chainMetadata.explorers); // ["https://sepolia.etherscan.io/"]`
#### Signature

`functionuseChainMetadata(chain?:Readonly<ChainOptions&{rpc:string}>,):UseQueryResult<ChainMetadata>;`
## Parameters

#### chain

Chain to retrieve metadata for, seedefineChainfor how to create a chain from a chain ID.

### Type

`letchain:Readonly<ChainOptions&{rpc:string}>;`
## Returns

#### Return Type

`letreturnType:UseQueryResult<ChainMetadata>;`A React Query result containing the chain metadata

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

