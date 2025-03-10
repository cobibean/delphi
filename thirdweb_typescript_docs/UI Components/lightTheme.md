# lightTheme

*Source: [https://portal.thirdweb.com/references/typescript/v5/lightTheme](https://portal.thirdweb.com/references/typescript/v5/lightTheme)*

* References
* lightTheme

Create a custom light theme object by using the default dark theme as a base and applying overrides.

## Example

### Get the default light theme

`constdefaultLightTheme=lightTheme();`
### Create a custom light theme

`constcustomTheme=lightTheme({colors: {modalBg:"red",},});`
#### Signature

`functionlightTheme(overrides?:ThemeOverrides):Theme;`
## Parameters

#### overrides

The overrides to apply to the default light theme.

### Type

`letoverrides:{[keyinExclude<keyofTheme,"type">]:Partial<Theme[key]>;};`
## Returns

#### Return Type

`letreturnType:{colors:{accentButtonBg:string;accentButtonText:string;accentText:string;borderColor:string;connectedButtonBg:string;connectedButtonBgHover:string;danger:string;inputAutofillBg:string;modalBg:string;modalOverlayBg:string;primaryButtonBg:string;primaryButtonText:string;primaryText:string;scrollbarBg:string;secondaryButtonBg:string;secondaryButtonHoverBg:string;secondaryButtonText:string;secondaryIconColor:string;secondaryIconHoverBg:string;secondaryIconHoverColor:string;secondaryText:string;selectedTextBg:string;selectedTextColor:string;separatorLine:string;skeletonBg:string;success:string;tertiaryBg:string;tooltipBg:string;tooltipText:string;};fontFamily:string;type:"light"|"dark";};`Theme object

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

