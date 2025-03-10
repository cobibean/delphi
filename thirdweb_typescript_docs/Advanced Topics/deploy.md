# Deploying a Modular Contract

*Source: [https://portal.thirdweb.com/typescript/v5/modular/deploy](https://portal.thirdweb.com/typescript/v5/modular/deploy)*

To deploy a modular contract, you can use thedeployModularContractfunction. You can deploy just the core contract, or decide to deploy a core with specific modules preinstalled.

`deployModularContract`Here's an example of deploying a modular ERC721 contract with theClaimableERC721andBatchMetadataERC721modules, which recreate a NFT Drop behavior.

`ClaimableERC721``BatchMetadataERC721````typescript
import {  ClaimableERC721,  BatchMetadataERC721,  deployModularContract,} from "thirdweb/modules"; const deployed = deployModularContract({  client,  chain,  account,  core: "ERC721", // or "ERC20" or "ERC1155"  params: {    name: "My Modular NFT Contract",  },  modules: [    ClaimableERC721.module({      primarySaleRecipient: "0x...",    }),    BatchMetadataERC721.module(),  ],});
```

`import{ClaimableERC721,BatchMetadataERC721,deployModularContract,}from"thirdweb/modules";constdeployed=deployModularContract({client,chain,account,core:"ERC721",// or "ERC20" or "ERC1155"params: {name:"My Modular NFT Contract",},modules: [ClaimableERC721.module({primarySaleRecipient:"0x...",}),BatchMetadataERC721.module(),],});`Check out thedeployModularContractreference for more information.

`deployModularContract`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

