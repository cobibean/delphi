# TokenProvider

*Source: [https://portal.thirdweb.com/references/typescript/v5/TokenProvider](https://portal.thirdweb.com/references/typescript/v5/TokenProvider)*

* References
* TokenProvider

A React context provider component that supplies Token-related data to its child components.

This component serves as a wrapper around theTokenProviderContext.Providerand passes
the provided token data down to all of its child components through the context API.

`TokenProviderContext.Provider`
## Example

### Basic usage

`import{ TokenProvider, TokenIcon, TokenName  }from"thirdweb/react";import{ ethereum }from"thirdweb/chains";<TokenProvideraddress="0x..."client={...}chain={ethereum}><TokenIcon/><TokenName/></TokenProvider>`
### This component also works with native token!

`import{ NATIVE_TOKEN_ADDRESS }from"thirdweb";import{ ethereum }from"thirdweb/chains";<TokenProvideraddress={NATIVE_TOKEN_ADDRESS}chain={ethereum}client={client}><TokenSymbol/> // "ETH"</TokenProvider>;`
#### Signature

`functionTokenProvider(props:PropsWithChildren<TokenProviderProps>,):Element;`
## Parameters

#### props

### Type

`letprops:PropsWithChildren<TokenProviderProps>;`
## Returns

#### Return Type

`letreturnType:Element;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

