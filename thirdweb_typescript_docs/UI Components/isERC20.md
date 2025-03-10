# isERC20

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/isERC20](https://portal.thirdweb.com/references/typescript/v5/erc20/isERC20)*

* References
* isERC20

Check if a contract is an ERC20 token.

## Example

`import{ isERC20 }from"thirdweb/extensions/erc20";import{ resolveContractAbi }from"thirdweb/contract";constabi=awaitresolveContractAbi(contract);constselectors=abi.filter((f)=>f.type==="function").map((f)=>toFunctionSelector(f));constresult=awaitisERC20(selectors);`
#### Signature

`functionisERC20(availableSelectors:Array<string>):boolean;`
## Parameters

#### availableSelectors

### Type

`letavailableSelectors:Array<string>;`
## Returns

#### Return Type

`letreturnType:boolean;`A boolean indicating whether the contract is an ERC20 token.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

