# chat

*Source: [https://portal.thirdweb.com/references/typescript/v5/chat](https://portal.thirdweb.com/references/typescript/v5/chat)*

* References
* chat

Chat with Nebula.

## Example

`import{ Nebula }from"thirdweb/ai";constresponse=awaitNebula.chat({client:TEST_CLIENT,message:"What's the symbol of this contract: 0xe2cb0eb5147b42095c2FfA6F7ec953bb0bE347D8",contextFilter: {chains: [sepolia],},});`Multi message prompt:

`constresponse=awaitNebula.chat({client,messages: [{ role:"user", content:"What's my balance?"},{ role:"assistant", content:"Your balance is 0.023 ETH"},{ role:"user", content:"What about my NFTs?"},],contextFilter: {chains: [sepolia],},});`Extracting and sending transactions from a chat response:

`constresponse=awaitNebula.chat({...});consttransactions=response.transactions;for(consttransactionoftransactions) {awaitsendTransaction({ transaction, account });}`
#### Signature

`functionchat(input:Input):Promise<Output>;`
## Parameters

#### input

The input for the chat.

### Type

`letinput:{account?:Account;client:ThirdwebClient;contextFilter?:{chains?:Array<Chain>;contractAddresses?:Array<string>;walletAddresses?:Array<string>;};sessionId?:string;}&(|{messages:Array<{content:string;role:"user"|"assistant";}>;}|{message:string});`
## Returns

#### Return Type

`letreturnType:{message:string;sessionId:string;transactions:Array<PreparedTransaction>;};`The chat response.
This API is in early access and might change in the future.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

