# isEIP155Enforced

*Source: [https://portal.thirdweb.com/references/typescript/v5/isEIP155Enforced](https://portal.thirdweb.com/references/typescript/v5/isEIP155Enforced)*

* References
* isEIP155Enforced

Checks whether EIP-155 is enforced by sending a random transaction of legacy type (pre-EIP-155)
and parsing the error message.

## Example

`import{ isEIP155Enforced }from"thirdweb/utils";constisEIP155=awaitisEIP155Enforced({ chain, client });`
#### Signature

`functionisEIP155Enforced(options:IsEIP155EnforcedOptions,):Promise<boolean>;`
## Parameters

#### options

The options for checking EIP-155 enforcement.

### Type

`letoptions:IsEIP155EnforcedOptions;`
## Returns

#### Return Type

`letreturnType:Promise<boolean>;`A promise that resolves to a boolean indicating whether EIP-155 is enforced.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

