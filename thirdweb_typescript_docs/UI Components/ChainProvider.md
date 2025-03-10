# ChainProvider

*Source: [https://portal.thirdweb.com/references/typescript/v5/ChainProvider](https://portal.thirdweb.com/references/typescript/v5/ChainProvider)*

* References
* ChainProvider

A React context provider component that supplies Chain-related data to its child components.

This component serves as a wrapper around theChainProviderContext.Providerand passes
the provided chain data down to all of its child components through the context API.

`ChainProviderContext.Provider`
## Example

### Basic usage

`import{ ChainProvider, ChainIcon, ChainName }from"thirdweb/react";import{ ethereum }from"thirdweb/chains";<ChainProviderchain={ethereum}><ChainIcon/><ChainName/></ChainProvider>;`
### Usage with defineChain

`import{ defineChain }from"thirdweb/chains"limport{ ChainProvider, ChainName }from"thirdweb/react";constchainId=someNumber;<ChainProviderchain={defineChain(chainId)}><ChainName/></ChainProvider>`
#### Signature

`functionChainProvider(props:PropsWithChildren<ChainProviderProps>,):Element;`
## Parameters

#### props

### Type

`letprops:PropsWithChildren<ChainProviderProps>;`
## Returns

#### Return Type

`letreturnType:Element;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

