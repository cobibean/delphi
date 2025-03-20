# SiteLink

*Source: [https://portal.thirdweb.com/references/typescript/v5/SiteLink](https://portal.thirdweb.com/references/typescript/v5/SiteLink)*

* References
* SiteLink

Creates a link to another thirdweb-supported site with wallet connection parameters.

The target site must support the connected wallet (ecosystem or in-app).

## Example

`import{ SiteLink }from"thirdweb/react";<SiteLinkhref="https://thirdweb.com"client={thirdwebClient}ecosystem={{ id:"ecosystem.thirdweb"}}>Visit Site</SiteLink>;`
#### Signature

`functionSiteLink(props:{children:ReactNode;client:ThirdwebClient;ecosystem?:Ecosystem;href:string;}&Omit<AnchorHTMLAttributes<HTMLAnchorElement>,"href">,):Element;`
## Parameters

#### props

The props to pass to the anchor tag

### Type

`letprops:{children:ReactNode;client:ThirdwebClient;ecosystem?:Ecosystem;href:string;}&Omit<AnchorHTMLAttributes<HTMLAnchorElement>,"href">;`
## Returns

#### Return Type

`letreturnType:Element;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

