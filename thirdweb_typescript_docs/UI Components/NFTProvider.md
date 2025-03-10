# NFTProvider

*Source: [https://portal.thirdweb.com/references/typescript/v5/NFTProvider](https://portal.thirdweb.com/references/typescript/v5/NFTProvider)*

* References
* NFTProvider

A React context provider component that supplies NFT-related data to its child components.

This component serves as a wrapper around theNFTProviderContext.Providerand passes
the provided NFT data down to all of its child components through the context API.

`NFTProviderContext.Provider`
## Example

`import{ getContract }from"thirdweb";import{NFTProvider,NFTMedia,NFTDescription,NFTName,}from"thirdweb/react";constcontract=getContract({address:"0x...",chain: ethereum,client: yourThirdwebClient,});<NFTProvidercontract={contract}tokenId={0n}><NFTMedia/><NFTDescription/><NFTName/></NFTProvider>;`
#### Signature

`functionNFTProvider(props:PropsWithChildren<NFTProviderProps>,):Element;`
## Parameters

#### props

The props for the NFT provider

### Type

`letprops:PropsWithChildren<NFTProviderProps>;`
## Returns

#### Return Type

`letreturnType:Element;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

