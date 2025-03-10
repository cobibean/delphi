# Upgrading a Modular Contract

*Source: [https://portal.thirdweb.com/typescript/v5/modular/upgrade](https://portal.thirdweb.com/typescript/v5/modular/upgrade)*

### Installing a new module

These modules can be swapped at any time, and new ones can also be added post deployment. Here's how to install a new module.

```typescript
import { RoyaltyERC721 } from "thirdweb/modules"; const transaction = RoyaltyERC721.install({  contract: coreContract,  account,  params: {    royaltyRecipient: account.address,    royaltyBps: 100n,    transferValidator: ZERO_ADDRESS,  },});
```

`import{ RoyaltyERC721 }from"thirdweb/modules";consttransaction=RoyaltyERC721.install({contract: coreContract,account,params: {royaltyRecipient: account.address,royaltyBps:100n,transferValidator:ZERO_ADDRESS,},});`Theinstallfunction is available on all modules, organized by module name space.

`install`You can also use the standaloneinstallPublishedModulefunction to install custom modules.

`installPublishedModule`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

