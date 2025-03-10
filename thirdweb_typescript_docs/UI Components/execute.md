# execute

*Source: [https://portal.thirdweb.com/references/typescript/v5/execute](https://portal.thirdweb.com/references/typescript/v5/execute)*

* References
* execute

Execute a transaction based on a prompt.

## Example

`import{ Nebula }from"thirdweb/ai";constwallet=createWallet("io.metamask");constaccount=wallet.connect({ client });constresult=awaitNebula.execute({client,account,// transactions will be sent from this accountmessage:"send 0.0001 ETH to vitalik.eth",contextFilter: {chains: [sepolia],},});`Multi message prompt:

`Nebula.execute({client,account,messages: [{ role:"user", content:"What's the address of vitalik.eth"},{role:"assistant",content:"The address of vitalik.eth is 0xd8dA6BF26964aF8E437eEa5e3616511D7G3a3298",},{ role:"user", content:"Send them 0.0001 ETH"},],contextFilter: {chains: [sepolia],},});`
#### Signature

`functionexecute(input:Input&{account:Account},):Promise<SendTransactionResult>;`
## Parameters

#### input

The input for the transaction.

### Type

`letinput:Input&{account:Account};`
## Returns

#### Return Type

`letreturnType:Promise<SendTransactionResult>;`The transaction hash.
This API is in early access and might change in the future.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

