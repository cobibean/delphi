# useContractEvents

*Source: [https://portal.thirdweb.com/references/typescript/v5/useContractEvents](https://portal.thirdweb.com/references/typescript/v5/useContractEvents)*

* References
* useContractEvents

Watches contract events and returns the parsed logs.

## Example

### Using event extensions

Thethirdweb/extesionsexport contains event definitions for many popular contracts.
You can use these event definitions to watch for specific events with a type-safe API.

`thirdweb/extesions``import{ useContractEvents }from"thirdweb/react";import{ tokensClaimedEvent }from"thirdweb/extensions/erc721";constaccount=useActiveAccount();constcontractEvents=useContractEvents({contract,events: [tokensClaimedEvent({ claimer: account?.address })],});`
### Using custom events

You can also watch for custom events by passing an array ofprepared events.

`import{ useContractEvents }from"thirdweb/react";import{ prepareEvent }from"thirdweb";constmyEvent=prepareEvent({signature:"event MyEvent(uint256 myArg)",});constcontractEvents=useContractEvents({contract,events: [myEvent],});`
#### Signature

`functionuseContractEvents(options:UseContractEventsOptions<abi,abiEvents>,):UseQueryResult<ParseEventLogsResult<abiEvents,true>,Error>;`
## Parameters

#### options

The options for watching contract events.

### Type

`letoptions:UseContractEventsOptions<abi,abiEvents>;`
## Returns

#### Return Type

`letreturnType:UseQueryResult<ParseEventLogsResult<abiEvents,true>,Error>;`The contract events of the watched contract events.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

