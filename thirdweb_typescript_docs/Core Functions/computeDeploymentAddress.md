# computeDeploymentAddress

*Source: [https://portal.thirdweb.com/references/typescript/v5/computeDeploymentAddress](https://portal.thirdweb.com/references/typescript/v5/computeDeploymentAddress)*

* References
* computeDeploymentAddress

Computes the deployment address for a contract based on the given options.

## Example

`import{ computeDeploymentAddress }from"thirdweb/utils";constdeploymentAddress=computeDeploymentAddress({bytecode,encodedArgs,create2FactoryAddress,salt,});`
#### Signature

`functioncomputeDeploymentAddress(options:ComputeDeploymentAddressOptions,):string;`
## Parameters

#### options

The options for computing the deployment address.

### Type

`letoptions:ComputeDeploymentAddressOptions;`
## Returns

#### Return Type

`letreturnType:string;`The computed deployment address.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

