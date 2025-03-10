# getLastAuthProvider

*Source: [https://portal.thirdweb.com/references/typescript/v5/getLastAuthProvider](https://portal.thirdweb.com/references/typescript/v5/getLastAuthProvider)*

* References
* getLastAuthProvider

Retrieves the last authentication provider used from local storage.

This function is designed to work only in a browser environment.

## Example

`import{ getLastAuthProvider }from"thirdweb/react";constlastAuthProvider=awaitgetLastAuthProvider();`
#### Signature

`functiongetLastAuthProvider():Promise<|null|OAuthOption|"backend"|"email"|"phone"|"passkey"|"wallet"|"jwt"|"auth_endpoint"|"iframe_email_verification"|"iframe">;`
## Returns

#### Return Type

`letreturnType:Promise<|null|OAuthOption|"backend"|"email"|"phone"|"passkey"|"wallet"|"jwt"|"auth_endpoint"|"iframe_email_verification"|"iframe">;`A promise that resolves to the last
authentication provider strategy used, ornullif none is found.

`null`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

