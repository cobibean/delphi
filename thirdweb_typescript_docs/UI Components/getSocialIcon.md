# getSocialIcon

*Source: [https://portal.thirdweb.com/references/typescript/v5/getSocialIcon](https://portal.thirdweb.com/references/typescript/v5/getSocialIcon)*

* References
* getSocialIcon

Gets the icon URI for a given social authentication provider

## Example

`constgoogleIcon=getSocialIcon("google");constappleIcon=getSocialIcon("apple");`
#### Signature

`functiongetSocialIcon(provider:|"google"|"apple"|"facebook"|"discord"|"line"|"x"|"coinbase"|"farcaster"|"telegram"|"github"|"twitch"|"steam"|"guest"|"backend"|"email"|"phone"|"passkey"|"wallet"|({}&string),):string;`
## Parameters

#### provider

The authentication provider to get the icon for

### Type

`letprovider:|"google"|"apple"|"facebook"|"discord"|"line"|"x"|"coinbase"|"farcaster"|"telegram"|"github"|"twitch"|"steam"|"guest"|"backend"|"email"|"phone"|"passkey"|"wallet"|({}&string);`
## Returns

#### Return Type

`letreturnType:string;`A data URI containing the SVG icon for the provider, or a generic wallet icon if the provider is not recognized

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

