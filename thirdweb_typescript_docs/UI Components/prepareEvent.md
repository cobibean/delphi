# prepareEvent

*Source: [https://portal.thirdweb.com/references/typescript/v5/prepareEvent](https://portal.thirdweb.com/references/typescript/v5/prepareEvent)*

* References
* prepareEvent

Prepares an event by parsing the signature, generating the event hash, and encoding the event topics.

## Example

`import{ prepareEvent }from"thirdweb";constmyEvent=prepareEvent({signature:"event MyEvent(uint256 myArg)",});`
#### Signature

`functionprepareEvent(options:PrepareEventOptions<TSignature>,):PreparedEvent<ParseEvent<TSignature>>;`
## Parameters

#### options

The options for preparing the event.

### Type

`letoptions:PrepareEventOptions<TSignature>;`
## Returns

#### Return Type

`letreturnType:PreparedEvent<ParseEvent<TSignature>>;`The prepared event object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

