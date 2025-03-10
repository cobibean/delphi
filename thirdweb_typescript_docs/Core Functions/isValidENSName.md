# isValidENSName

*Source: [https://portal.thirdweb.com/references/typescript/v5/isValidENSName](https://portal.thirdweb.com/references/typescript/v5/isValidENSName)*

* References
* isValidENSName

Checks if a string is a valid ENS name.
It does not check if the ENS name is currently registered or resolves to an address - it only validates the string format.

## Example

`isValidENSName("thirdweb.eth");// trueisValidENSName("foo.bar.com");// trueisValidENSName("xyz");// false`
#### Signature

`functionisValidENSName(name:string):boolean;`
## Parameters

#### name

The ENS name to check.

### Type

`letname:string;`
## Returns

#### Return Type

`letreturnType:boolean;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

