# Interacting with ENS

*Source: [https://portal.thirdweb.com/typescript/v5/extensions/examples/ethereum-name-service](https://portal.thirdweb.com/typescript/v5/extensions/examples/ethereum-name-service)*

## Resolve an ENS name to an Ethereum address

```typescript
import { resolveAddress } from "thirdweb/extensions/ens"; const address = await resolveAddress({  client,  name: "vitalik.eth",}); // Expected result: "0x..."
```

`import{ resolveAddress }from"thirdweb/extensions/ens";constaddress=awaitresolveAddress({client,name:"vitalik.eth",});// Expected result: "0x..."`
## Resolve the primary name for a specified address

```typescript
import { resolveName } from "thirdweb/extensions/ens"; const name = await resolveName({  client,  address: "0x1234...",}); // Expected result: "something.eth"
```

`import{ resolveName }from"thirdweb/extensions/ens";constname=awaitresolveName({client,address:"0x1234...",});// Expected result: "something.eth"`
## Resolve an ENS name to the avatar URL.

```typescript
import { resolveAvatar } from "thirdweb/extensions/ens"; const address = await resolveAvatar({  client,  name: "vitalik.eth",}); // Expected result: An URL that points to the image of the ENS
```

`import{ resolveAvatar }from"thirdweb/extensions/ens";constaddress=awaitresolveAvatar({client,name:"vitalik.eth",});// Expected result: An URL that points to the image of the ENS`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

