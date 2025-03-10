# isHex

*Source: [https://portal.thirdweb.com/references/typescript/v5/isHex](https://portal.thirdweb.com/references/typescript/v5/isHex)*

* References
* isHex

Checks if a value is a valid hexadecimal string.

## Example

`import{ isHex }from"thirdweb/utils";constresult=isHex("0x1a4");console.log(result);// true`
#### Signature

`functionisHex(value:unknown,options:Options,):valueis`0x${string}`;`
## Parameters

#### value

The value to be checked.

### Type

`letvalue:unknown;`
#### options

Optional configuration for the validation.

### Type

`letoptions:Options;`
## Returns

#### Return Type

`letreturnType:valueis(`0x${string}`)`True if the value is a valid hexadecimal string, false otherwise.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

