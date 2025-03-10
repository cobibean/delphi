# checkContractWalletSignedTypedData

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc1271/checkContractWalletSignedTypedData](https://portal.thirdweb.com/references/typescript/v5/erc1271/checkContractWalletSignedTypedData)*

* References
* checkContractWalletSignedTypedData

UseverifyTypedDatainstead

`verifyTypedData`Checks if a contract wallet signature is valid.

## Example

`import{ checkContractWalletSignedTypedData }from"thirdweb/extensions/erc1271";constisValid=awaitcheckContractWalletSignedTypedData({contract: myContract,data: {primaryType:"EIP712Domain",domain: {name:"Example",version:"1",chainId:1,verifyingContract: myContract.address,},});`
#### Signature

`functioncheckContractWalletSignedTypedData(options:CheckContractWalletSignTypedDataOptions<typedData,primaryType>,):Promise<boolean>;`
## Parameters

#### options

The options for the checkContractWalletSignature function.

### Type

`letoptions:CheckContractWalletSignTypedDataOptions<typedData,primaryType>;`
## Returns

#### Return Type

`letreturnType:Promise<boolean>;`A promise that resolves with a boolean indicating if the signature is valid.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

