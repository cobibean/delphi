# SiteEmbed

*Source: [https://portal.thirdweb.com/references/typescript/v5/SiteEmbed](https://portal.thirdweb.com/references/typescript/v5/SiteEmbed)*

* References
* SiteEmbed

Embeds another thirdweb-supported site for seamless in-app and ecosystem wallet connection.

Make sure the embedded site includes<AutoConnect />and supports frame ancestors, seeherefor more information.

`<AutoConnect />`The embedded site must support the connected wallet (ecosystem or in-app).

## Example

`import{ SiteEmbed }from"thirdweb/react";<SiteEmbedsrc="https://thirdweb.com"client={thirdwebClient}ecosystem={{ id:"ecosystem.thirdweb"}}/>;`
#### Signature

`functionSiteEmbed(props:{client:ThirdwebClient;ecosystem?:Ecosystem;src:string;}&ClassAttributes<HTMLIFrameElement>&IframeHTMLAttributes<HTMLIFrameElement>,):Element;`
## Parameters

#### props

The props to pass to the iframe

### Type

`letprops:{client:ThirdwebClient;ecosystem?:Ecosystem;src:string;}&ClassAttributes<HTMLIFrameElement>&IframeHTMLAttributes<HTMLIFrameElement>;`
## Returns

#### Return Type

`letreturnType:Element;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

