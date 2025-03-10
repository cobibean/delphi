# watchContractEvents

*Source: [https://portal.thirdweb.com/references/typescript/v5/watchContractEvents](https://portal.thirdweb.com/references/typescript/v5/watchContractEvents)*

* References
* watchContractEvents

Listens for  contract events from the blockchain.

## Example

### Listen to all events for a contract

`import{ watchContractEvents }from"thirdweb";constunwatch=watchContractEvents({contract: myContract,onEvents: (events)=>{// do something with the events},});`
### Listen to specific events for a contract

`import{ prepareEvent, watchContractEvents }from"thirdweb";constmyEvent=prepareEvent({event:"event MyEvent(uint256 myArg)",});constevents=awaitwatchContractEvents({contract: myContract,events: [myEvent],onEvents: (events)=>{// do something with the events},});`
#### Signature

`functionwatchContractEvents(options:{contract:Readonly<ContractOptions<abi,`0x${string}`>>;events?:abiEvents;latestBlockNumber?:bigint;onEvents:(events:ParseEventLogsResult<abiEvents,TStrict>,)=>void;strict?:TStrict;}):()=>void;`
## Parameters

#### options

The options for retrieving contract events.

### Type

`letoptions:{contract:Readonly<ContractOptions<abi,`0x${string}`>>;events?:abiEvents;latestBlockNumber?:bigint;onEvents:(events:ParseEventLogsResult<abiEvents,TStrict>,)=>void;strict?:TStrict;};`
## Returns

#### Return Type

`letreturnType:()=>void;`The unwatch function.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

