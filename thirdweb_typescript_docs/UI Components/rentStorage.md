# rentStorage

*Source: [https://portal.thirdweb.com/references/typescript/v5/farcaster/rentStorage](https://portal.thirdweb.com/references/typescript/v5/farcaster/rentStorage)*

* References
* rentStorage

Rent storage for the provided farcaster fid.

## Example

`import{ rentStorage }from"thirdweb/extensions/farcaster";import{ sendTransaction }from"thirdweb";consttransaction=rentStorage({client,fid,units,});awaitsendTransaction({ transaction, account });`
#### Signature

`functionrentStorage(options:RentStorageParams,):PreparedTransaction<[],AbiFunction,PrepareTransactionOptions>;`
## Parameters

#### options

The options for calling therentStoragefunction.

`rentStorage`
### Type

`letoptions:{chain?:Chain;client:ThirdwebClient;disableCache?:boolean;fid:bigint|number|string;units?:bigint|number|string;};`
## Returns

#### Return Type

`letreturnType:PreparedTransaction<[],AbiFunction,PrepareTransactionOptions>;`A prepared transaction object to rent the storage.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

