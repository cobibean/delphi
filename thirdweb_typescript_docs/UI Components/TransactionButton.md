# TransactionButton

*Source: [https://portal.thirdweb.com/references/typescript/v5/TransactionButton](https://portal.thirdweb.com/references/typescript/v5/TransactionButton)*

* References
* TransactionButton

TransactionButton component is used to render a button that triggers a transaction.
It shows a "Switch Network" button if the connected wallet is on a different chain than the transaction.

## Example

### Basic usage

`<TransactionButtontransaction={()=>{}}onTransactionConfirmed={handleSuccess}onError={handleError}>Confirm Transaction</TransactionButton>;`
### Customize the styling by passing theunstyledprop and your inline styles and/or classes:

`unstyled``<TransactionButtontransaction={()=>{}}unstyledclassName="bg-white text-black rounded-md p-4 flex items-center justify-center">Confirm Transaction</TransactionButton>;`
### Handle errors

`<TransactionButtontransaction={()=>...}onError={(err)=>{alert(err.message);// Add your own logic here}}>Confirm Transaction</TransactionButton>`
### Alert when a transaction is sent

`<TransactionButtontransaction={()=>...}onTransactionSent={(tx)=>{alert("transaction sent!");// Add your own logic here. For example, a toast}}>Confirm Transaction</TransactionButton>`
### Alert when a transaction is completed

`<TransactionButtontransaction={()=>...}onTransactionConfirmed={(tx)=>{alert("transaction sent!");console.log(tx);// Add your own logic here. For example, a toast}}>Confirm Transaction</TransactionButton>`
### The onClick prop, if provided, will be called before the transaction is sent.

`<TransactionButtononClick={()=>alert("Transaction is about to be sent")}transaction={...}>...</TransactionButton>`
### Attach custom Pay metadata

`<TransactionButtonpayModal={{// This image & title will show up in the Pay modalmetadata: {name:"Van Gogh Starry Night",image:"https://unsplash.com/starry-night.png",},}}>...</TransactionButton>;`
### Gasless usage withthirdweb Engine

`<TransactionButtongasless={{provider:"engine",relayerUrl:"https://thirdweb.engine-***.thirdweb.com/relayer/***",relayerForwarderAddress:"0x...",}}>...</TransactionButton>;`
### Gasless usage with OpenZeppelin

`<TransactionButtongasless={{provider:"openzeppelin",relayerUrl:"https://...",relayerForwarderAddress:"0x...",}}>...</TransactionButton>;`
#### Signature

`functionTransactionButton(props:TransactionButtonProps):Element;`
## Parameters

#### props

The props for this component.
Refer toTransactionButtonPropsfor details.

### Type

`letprops:{children:React.ReactNode;className?:string;disabled?:boolean;gasless?:GaslessOptions;onClick?:()=>void;onError?:(error:Error)=>void;onTransactionConfirmed?:(receipt:TransactionReceipt)=>void;onTransactionSent?:(transactionResult:WaitForReceiptOptions,)=>void;payModal?:SendTransactionPayModalConfig;style?:React.CSSProperties;theme?:"dark"|"light"|Theme;transaction:()=>|PreparedTransaction<any>|Promise<PreparedTransaction<any>>;type?:HTMLButtonElement["type"];unstyled?:boolean;};`
## Returns

#### Return Type

`letreturnType:Element;`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

