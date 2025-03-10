# darkTheme

*Source: [https://portal.thirdweb.com/references/typescript/v5/darkTheme](https://portal.thirdweb.com/references/typescript/v5/darkTheme)*

* References
* darkTheme

Create a custom dark theme object by using the default dark theme as a base and applying overrides.

## Example

### Get the default dark theme

`constdefaultDarkTheme=darkTheme();`
### Create a custom dark theme

`constcustomTheme=darkTheme({colors: {modalBg:"red",},});`
#### Signature

`functiondarkTheme(overrides?:ThemeOverrides):Theme;`
## Parameters

#### overrides

The overrides to apply to the default dark theme.

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

