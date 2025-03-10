# parseEventLogs

*Source: [https://portal.thirdweb.com/references/typescript/v5/parseEventLogs](https://portal.thirdweb.com/references/typescript/v5/parseEventLogs)*

* References
* parseEventLogs

Parses logs and returns the corresponding events.

## Example

`import{ parseEventLogs }from"thirdweb";constevents=parseEventLogs({logs,events: [preparedEvent, preparedEvent2],});`
#### Signature

`functionparseEventLogs(options:ParseEventLogsOptions<abiEvents,TStrict>,):ParseEventLogsResult<abiEvents,TStrict>;`
## Parameters

#### options

The options for parsing logs.

### Type

`letoptions:ParseEventLogsOptions<abiEvents,TStrict>;`
## Returns

#### Return Type

`letreturnType:ParseEventLogsResult<abiEvents,TStrict>;`The parsed events.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

