# allowance

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/allowance](https://portal.thirdweb.com/references/typescript/v5/erc20/allowance)*

* References
* allowance

Calls the "allowance" function on the contract.

## Example

`import{ allowance }from"thirdweb/extensions/erc20";constresult=awaitallowance({contract,owner:...,spender:...,});`
#### Signature

`functionallowance(options:BaseTransactionOptions<AllowanceParams>,):Promise<bigint>;`
## Parameters

#### options

The options for the allowance function.

### Type

`letoptions:BaseTransactionOptions<AllowanceParams>;`
## Returns

#### Return Type

`letreturnType:Promise<bigint>;`The parsed result of the function call.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

