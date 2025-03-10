# getContractEvents

*Source: [https://portal.thirdweb.com/references/typescript/v5/getContractEvents](https://portal.thirdweb.com/references/typescript/v5/getContractEvents)*

* References
* getContractEvents

Retrieves events from a contract based on the provided options.

## Example

`import{ getContractEvents }from"thirdweb";constevents=awaitgetContractEvents({contract: myContract,fromBlock:123456n,toBlock:123456n,events: [preparedEvent, preparedEvent2],});`
#### Signature

`functiongetContractEvents(options:GetContractEventsOptions<abi,abiEvents,TStrict>,):Promise<GetContractEventsResult<abiEvents,TStrict>>;`
## Parameters

#### options

The options for retrieving events.

### Type

`letoptions:GetContractEventsOptions<abi,abiEvents,TStrict>;`
## Returns

#### Return Type

`letreturnType:ParseEventLogsResult<abiEvents,TStrict>;`A promise that resolves to an array of parsed event logs.
Note: toBlock and fromBlock are both inclusive.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

