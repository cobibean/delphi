# getBalance

*Source: [https://portal.thirdweb.com/references/typescript/v5/erc20/getBalance](https://portal.thirdweb.com/references/typescript/v5/erc20/getBalance)*

* References
* getBalance

Retrieves the balance of an ERC20 token for a specific address.

## Example

`import{ getBalance }from"thirdweb/extensions/erc20";constbalance=awaitgetBalance({ contract, address:"0x..."});`
#### Signature

`functiongetBalance(options:BaseTransactionOptions<GetBalanceParams>,):Promise<GetBalanceResult>;`
## Parameters

#### options

The transaction options including the address.

### Type

`letoptions:BaseTransactionOptions<GetBalanceParams>;`
## Returns

#### Return Type

`letreturnType:{decimals:number;displayValue:string;name:string;symbol:string;value:bigint;};`An object containing the balance value, display value, and symbol.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

