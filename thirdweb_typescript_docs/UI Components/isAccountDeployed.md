# isAccountDeployed

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc4337/isAccountDeployed](https://portal.thirdweb.com/references/typescript/v5/erc4337/isAccountDeployed)*

* References
* isAccountDeployed

Adds admin permissions for a specified address.

## Example

`import{ isAccountDeployed }from"thirdweb/extensions/erc4337";constisDeployed=awaitisAccountDeployed({contract,account,adminSigner:"0x...",});awaitisAccountDeployed({ contract, adminSigner });`
#### Signature

`functionisAccountDeployed(options:BaseTransactionOptions<GetAddressParams>,):Promise<boolean>;`
## Parameters

#### options

The options for the addAdmin function.

### Type

`letoptions:BaseTransactionOptions<GetAddressParams>;`
## Returns

#### Return Type

`letreturnType:Promise<boolean>;`The transaction object to be sent.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

