# toSerializableTransaction

*Source: [https://portal.thirdweb.com/references/typescript/v5/toSerializableTransaction](https://portal.thirdweb.com/references/typescript/v5/toSerializableTransaction)*

* References
* toSerializableTransaction

Converts a prepared transaction to a transaction with populated options.

## Example

`import{prepareTransaction,toSerializableTransaction,}from"thirdweb";consttransaction=awaitprepareTransaction({transaction: {to:"0x...",value:100,},});constfinalTx=awaittoSerializableTransaction({transaction,});account.sendTransaction(finalTx);`
#### Signature

`functiontoSerializableTransaction(options:ToSerializableTransactionOptions,):Promise<|{accessList:undefined|AccessList;authorizationList:|undefined|Array<{address:string;chainId:number;nonce:bigint;r:bigint;s:bigint;yParity:number;}>;chainId:number;data:`0x${string}`;gas:bigint;gasPrice?:undefined;maxFeePerGas?:bigint;maxPriorityFeePerGas?:bigint;nonce:undefined|number;to:undefined|string;type:undefined|TransactionType;value:undefined|bigint;}|{accessList:undefined|AccessList;authorizationList:|undefined|Array<{address:string;chainId:number;nonce:bigint;r:bigint;s:bigint;yParity:number;}>;chainId:number;data:`0x${string}`;gas:bigint;gasPrice?:bigint;maxFeePerGas?:undefined;maxPriorityFeePerGas?:undefined;nonce:undefined|number;to:undefined|string;type:undefined|TransactionType;value:undefined|bigint;}>;`
## Parameters

#### options

The transaction and additional options for conversion

### Type

`letoptions:{from?:string|Account;transaction:PreparedTransaction<any>;};`
## Returns

#### Return Type

`letreturnType:Promise<|{accessList:undefined|AccessList;authorizationList:|undefined|Array<{address:string;chainId:number;nonce:bigint;r:bigint;s:bigint;yParity:number;}>;chainId:number;data:`0x${string}`;gas:bigint;gasPrice?:undefined;maxFeePerGas?:bigint;maxPriorityFeePerGas?:bigint;nonce:undefined|number;to:undefined|string;type:undefined|TransactionType;value:undefined|bigint;}|{accessList:undefined|AccessList;authorizationList:|undefined|Array<{address:string;chainId:number;nonce:bigint;r:bigint;s:bigint;yParity:number;}>;chainId:number;data:`0x${string}`;gas:bigint;gasPrice?:bigint;maxFeePerGas?:undefined;maxPriorityFeePerGas?:undefined;nonce:undefined|number;to:undefined|string;type:undefined|TransactionType;value:undefined|bigint;}>;`A serializable transaction for inspection or submission to an account.

For easier transaction sending, sendTransaction

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

