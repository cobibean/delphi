# prepareMethod

*Source: [https://portal.thirdweb.com/references/typescript/v5/prepareMethod](https://portal.thirdweb.com/references/typescript/v5/prepareMethod)*

* References
* prepareMethod

Prepares a method for usage by converting it into a prepared method object.

## Example

`import{ prepareMethod }from"thirdweb/utils";constmethod="function transfer(address to, uint256 value)";constpreparedMethod=prepareMethod(method);`
#### Signature

`functionprepareMethod(method:TMethod):PreparedMethod<TMethod>;`
## Parameters

#### method

The method to prepare.

### Type

`letmethod:TMethod;`
## Returns

#### Return Type

`letreturnType:PreparedMethod<TMethod>;`The prepared method object.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

