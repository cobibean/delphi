# stringify

*Source: [https://portal.thirdweb.com/references/typescript/v5/stringify](https://portal.thirdweb.com/references/typescript/v5/stringify)*

* References
* stringify

Stringify a JSON object and convert all bigint values to string

If you are getting this error: "Exception: Do not know how to serialize a BigInt",
you probably can use this function to parse the data.
Because bigint is not an accepted value of the JSON format.

## Example

`import{ stringify }from"thirdweb/utils";constobj={ tokenId:0n};conststr=stringify(obj);// "{"tokenId":"0"}"`
#### Signature

`functionstringify(value:any,replacer?:null|((this:any,key:string,value:any)=>any),space?:string|number,):string;`
## Parameters

#### value

### Type

`letvalue:any;`
#### replacer

### Type

`letreplacer:null|((this:any,key:string,value:any)=>any);`
#### space

### Type

`letspace:string|number;`
## Returns

#### Return Type

`letreturnType:string;`An object with all bigint values converted to string

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

