# Chain

*Source: [https://portal.thirdweb.com/typescript/v5/chain](https://portal.thirdweb.com/typescript/v5/chain)*

The thirdweb SDK works withany EVM chain.

All you need to connect a chain is its chain id. RPC connection to the chain is handled for you.

```typescript
import { defineChain } from "thirdweb"; const myChain = defineChain(myChainId);
```

`import{ defineChain }from"thirdweb";constmyChain=defineChain(myChainId);`The SDK comes with predefined popular chains likebase,polygon, and more exported from thethirdweb/chainsentrypoint.

`base``polygon``thirdweb/chains````typescript
import { polygon } from "thirdweb/chains"; const myChain = polygon;
```

`import{ polygon }from"thirdweb/chains";constmyChain=polygon;`
### Configuring chains (Advanced)

You can also configure chains with custom RPC endpoints, native currency, block explorers, and more.

```typescript
const myChain = defineChain({  id: myChainId,  rpc: "https://my-custom-rpc.com",  ...})
```

`constmyChain=defineChain({id: myChainId,rpc:"https://my-custom-rpc.com",...})`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

