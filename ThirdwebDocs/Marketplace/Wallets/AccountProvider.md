# AccountProvider

*Source: [https://portal.thirdweb.com/references/typescript/v5/AccountProvider](https://portal.thirdweb.com/references/typescript/v5/AccountProvider)*

* References
* AccountProvider

A React context provider component that supplies Account-related data to its child components.

This component serves as a wrapper around theAccountProviderContext.Providerand passes
the provided account data down to all of its child components through the context API.

`AccountProviderContext.Provider`
## Example

`import{AccountProvider,AccountAvatar,AccountName,AccountAddress,}from"thirdweb/react";<AccountProvideraddress="0x..."client={client}><AccountAvatar/><AccountName/><AccountAddress/></AccountProvider>;`
#### Signature

`functionAccountProvider(props:PropsWithChildren<AccountProviderProps>,):Element;`
## Parameters

#### props

### Type

`letprops:PropsWithChildren<AccountProviderProps>;`
## Returns

#### Return Type

`letreturnType:Element;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

