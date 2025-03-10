# Interacting with Lens protocol

*Source: [https://portal.thirdweb.com/typescript/v5/extensions/examples/lens-protocol](https://portal.thirdweb.com/typescript/v5/extensions/examples/lens-protocol)*

In Lens protocol, each profile is represented by an ERC721 token.
In this particular context, the tokenId (of the ERC721 token) is the profileId.
They can be used interchangably.

## Get Lens profile metadata from a profileId

```typescript
import { getProfileMetadata } from "thirdweb/extensions/lens"; const profileData = await getProfileMetadata({ profileId, client }); if (profileData) {  console.log("Display name: ", profileData.lens.name);  console.log("Bio: ", profileData.lens.bio);}
```

`import{ getProfileMetadata }from"thirdweb/extensions/lens";constprofileData=awaitgetProfileMetadata({ profileId, client });if(profileData) {console.log("Display name: ", profileData.lens.name);console.log("Bio: ", profileData.lens.bio);}`
## Get the owner's wallet address from their Lens handle

```typescript
import { resolveAddress } from "thirdweb/extensions/lens"; const walletAddress = await resolveAddress({  name: "vitalik",  client,});
```

`import{ resolveAddress }from"thirdweb/extensions/lens";constwalletAddress=awaitresolveAddress({name:"vitalik",client,});`Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

