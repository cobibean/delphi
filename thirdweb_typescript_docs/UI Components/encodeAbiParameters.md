# encodeAbiParameters

*Source: [https://portal.thirdweb.com/references/typescript/v5/encodeAbiParameters](https://portal.thirdweb.com/references/typescript/v5/encodeAbiParameters)*

* References
* encodeAbiParameters

Encodes the given ABI parameters and values into a hexadecimal string.

## Example

`import{ encodeAbiParameters }from"viem";constparams=[{ name:"param1", type:"uint256"},{ name:"param2", type:"string"},];constvalues=[123,"hello"];constdata=encodeAbiParameters(params, values);console.log(data);`
#### Signature

`functionencodeAbiParameters(params:TParams,values:TParamsextendsreadonlyArray<AbiParameter>?{[keyinstring|number|symbol]:{[keyinstring|number|symbol]:AbiParameterToPrimitiveType<TParams<TParams>[key<key>],AbiParameterKind>}[key]}:never):`0x${string}``
## Parameters

#### params

The ABI parameters.

### Type

`letparams:TParams;`
#### values

The corresponding values for the ABI parameters.

### Type

`letvalues:TParamsextendsreadonlyArray<AbiParameter>?{[keyinstring|number|symbol]:{[keyinstring|number|symbol]:AbiParameterToPrimitiveType<TParams<TParams>[key<key>],AbiParameterKind>}[key]}:never`
## Returns

#### Return Type

`letreturnType:`0x${string}`;`
* The encoded ABI parameters as a hexadecimal string.

The encoded ABI parameters as a hexadecimal string.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

