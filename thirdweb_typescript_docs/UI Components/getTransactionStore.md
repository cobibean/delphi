# getTransactionStore

*Source: [https://portal.thirdweb.com/references/typescript/v5/getTransactionStore](https://portal.thirdweb.com/references/typescript/v5/getTransactionStore)*

* References
* getTransactionStore

Retrieve the transaction store for a given address.

## Example

`import{ getTransactionStore }from"thirdweb/transaction";conststore=getTransactionStore("0x...");store.subscribe((transactions)=>{console.log(transactions);});`
#### Signature

`functiongetTransactionStore(address:string,):Store<Array<StoredTransaction>>;`
## Parameters

#### address

The address to retrieve the transaction store for.

### Type

`letaddress:string;`
## Returns

#### Return Type

`letreturnType:Store<Array<StoredTransaction>>;`A store of transactions for the given account to subscribe to.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

