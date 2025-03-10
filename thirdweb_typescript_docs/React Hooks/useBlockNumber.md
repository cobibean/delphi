# useBlockNumber

*Source: [https://portal.thirdweb.com/references/typescript/v5/useBlockNumber](https://portal.thirdweb.com/references/typescript/v5/useBlockNumber)*

* References
* useBlockNumber

Hook that watches for changes in the block number on a given chain.

## Example

`import{ useBlockNumber }from"thirdweb/react";constblockNumber=useBlockNumber({ client, chain });`
#### Signature

`functionuseBlockNumber(options:UseBlockNumberOptions,):undefined|bigint;`
## Parameters

#### options

The options for the hook.

### Type

`letoptions:{chain:Chain;client:ThirdwebClient;enabled?:boolean;watch?:boolean;};`
## Returns

#### Return Type

`letreturnType:undefined|bigint;`The latest block number.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

