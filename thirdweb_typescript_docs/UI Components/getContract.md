# getContract

*Source: [https://portal.thirdweb.com/references/typescript/v5/getContract](https://portal.thirdweb.com/references/typescript/v5/getContract)*

* References
* getContract

Creates a Thirdweb contract by combining the Thirdweb client and contract options.

## Example

`import{ createThirdwebClient, getContract }from"thirdweb";import{ sepolia }from"thirdweb/chains";constclient=createThirdwebClient({ clientId:"..."});constcontract=getContract({client,chain: sepolia,address:"0x123...",// optional ABIabi: [...],});`
#### Signature

`functiongetContract(options:ContractOptions<abi>,):Readonly<ContractOptions<abi,`0x${string}`>>;`
## Parameters

#### options

The options for creating the contract.

### Type

`letoptions:ContractOptions<abi>;`
## Returns

#### Return Type

`letreturnType:Readonly<ContractOptions<abi,`0x${string}`>>;`The Thirdweb contract.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

