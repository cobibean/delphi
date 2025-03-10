# waitForBundle

*Source: [https://portal.thirdweb.com/references/typescript/v5/eip5792/waitForBundle](https://portal.thirdweb.com/references/typescript/v5/eip5792/waitForBundle)*

* References
* waitForBundle

Waits for theEIP-5792bundle to be confirmed.

This function is dependent on the wallet's support for EIP-5792 and could fail.

## Example

`import{ waitForBundle }from"thirdweb/wallets/eip5792";constresult=awaitwaitForBundle({client,chain,wallet,bundleId:"0x123...",});`
#### Signature

`functionwaitForBundle(options:{bundleId:string;chain:Readonly;client:ThirdwebClient;maxBlocksWaitTime?:number;wallet:Wallet;}):Promise<GetCallsStatusResponse>;`
## Parameters

#### options

The options for waiting for the bundle.
By default, the max wait time is 100 blocks.

### Type

`letoptions:{bundleId:string;chain:Readonly;client:ThirdwebClient;maxBlocksWaitTime?:number;wallet:Wallet;};`
## Returns

#### Return Type

`letreturnType:{receipts:Array<WalletCallReceipt<bigint,"success"|"reverted">>;status:"PENDING"|"CONFIRMED";};`A promise that resolves with the final getCallsStatus result.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

