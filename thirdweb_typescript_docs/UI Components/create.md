# Writing your own extensions

*Source: [https://portal.thirdweb.com/typescript/v5/extensions/create](https://portal.thirdweb.com/typescript/v5/extensions/create)*

You can create your own extensions. They are just regular functions that pre-define the behavior of aprepareContractCall()orreadContract()function.

`prepareContractCall()``readContract()`The goal of extensions is to add a layer of convenience to direct contract calls, either to simplify the inputs or to give richer outputs.

### Example: Creating thegetBalanceextension for ERC20 tokens

`getBalance`Theerc20/getBalanceextension is a very convenient and efficient way to fetch all the information needed to display an ERC20 token balance to a user, a very common usecase for applications. Here is how it is implemented in the SDK.

`erc20/getBalance````typescript
// Define your extension functionexport function getBalance(	// The base options include everything that is needed to interact with the contract, *except* the specific params for your function, in this case, "address"	options: BaseTransactionOptions<{ address: string }>,) {	// The extension conveniently fetches all the relevant information from the contract to display a readable balance	const [balanceWei, decimals_, symbol_, name_] = await Promise.all([		balanceOf(options),		decimals(options),		symbol(options),		name(options),	]);	return {		value: balanceWei,		decimals: decimals_,		// The `toTokens` function converts the balance from wei to a human-readable format		displayValue: toTokens(balanceWei, decimals_),		symbol: symbol_,		name: name_,	};}
```

`// Define your extension functionexportfunctiongetBalance(// The base options include everything that is needed to interact with the contract, *except* the specific params for your function, in this case, "address"options:BaseTransactionOptions<{address:string}>,) {// The extension conveniently fetches all the relevant information from the contract to display a readable balanceconst[balanceWei,decimals_,symbol_,name_]=awaitPromise.all([balanceOf(options),decimals(options),symbol(options),name(options),]);return{value: balanceWei,decimals: decimals_,// The `toTokens` function converts the balance from wei to a human-readable formatdisplayValue:toTokens(balanceWei, decimals_),symbol: symbol_,name: name_,};}`
### Example: Creating themintToextension for ERC721 tokens

`mintTo`Theerc721/mintToextension handles uploading the NFT metadata to IPFS before minting. Here is how it is implemented in the SDK.

`erc721/mintTo````typescript
import {  prepareContractCall,  type BaseTransactionOptions,} from "thirdweb"; // Define your extension functionexport function mintTo(  // The base options include everything that is needed to interact with the contract, *except* the specific params for your function, in this case "to" and "nft"  options: BaseTransactionOptions<{ to: string; nft: NFTMetadata }>,) {  return prepareContractCall({    // Pass the contract from the options    contract: options.contract,    // Pre-define the function to call on the smart contract    method: "function mintTo(address to, string uri)",    // The function params can be async    params: async () => {      // Upload the metadata to IPFS      const tokenURI = (await upload({        client: options.contract.client,        files: [options.nft],      })[0]) as string;      // return the contract params      return [options.to, tokenURI] as const;    },  });}
```

`import{prepareContractCall,typeBaseTransactionOptions,}from"thirdweb";// Define your extension functionexportfunctionmintTo(// The base options include everything that is needed to interact with the contract, *except* the specific params for your function, in this case "to" and "nft"options:BaseTransactionOptions<{to:string;nft:NFTMetadata}>,) {returnprepareContractCall({// Pass the contract from the optionscontract: options.contract,// Pre-define the function to call on the smart contractmethod:"function mintTo(address to, string uri)",// The function params can be asyncparams:async()=>{// Upload the metadata to IPFSconsttokenURI=(awaitupload({client: options.contract.client,files: [options.nft],})[0])asstring;// return the contract paramsreturn[options.to, tokenURI]asconst;},});}`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

