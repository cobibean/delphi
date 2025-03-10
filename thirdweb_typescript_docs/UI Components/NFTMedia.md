# NFTMedia

*Source: [https://portal.thirdweb.com/references/typescript/v5/NFTMedia](https://portal.thirdweb.com/references/typescript/v5/NFTMedia)*

* References
* NFTMedia

This component fetches and displays an NFT's media. It uses thirdwebMediaRendererunder the hood
so you can style it just like how you would style a MediaRenderer.

`MediaRenderer`
## Example

### Basic usage

`import{ NFTProvider, NFTMedia }from"thirdweb/react";<NFTProvider><NFTMedia/></NFTProvider>;`
### Show a loading sign while the media is being fetched

`import{ NFTProvider, NFTMedia }from"thirdweb/react";<NFTProvider><NFTMedialoadingComponent={<YourLoadingSign/>}/></NFTProvider>;`
### Show something in case the media failed to resolve

`import{ NFTProvider, NFTMedia }from"thirdweb/react";<NFTProvider><NFTMediafallbackComponent={<span>Failed to load media</span>}/></NFTProvider>;`
### Custom query options for useQuery (tanstack-query)

`import{ NFTProvider, NFTMedia }from"thirdweb/react";<NFTProvider><NFTMediaqueryOptions={{ retry:3, enabled:false}}/></NFTProvider>;`
### Basic stylings

You can style NFTMedia with thestyleandclassNameprops.

`style``className``<NFTMediastyle={{ borderRadius:"8px"}}className="mx-auto"/>;`
### Override the media with themediaResolverprop

`mediaResolver`If you already have the url, you can skip the network requests and pass it directly to the NFTMedia

`<NFTMediamediaResolver={{src:"/cat_video.mp4",// Poster is applicable to medias that are videos and audiosposter:"/cat-image.png",}}/>;`You can also pass in your own custom (async) function that retrieves the media url

`constgetMedia=async()=>{consturl=getNFTMedia(props);returnurl;};<NFTMediamediaResolver={getMedia}/>;`
#### Signature

`functionNFTMedia(__namedParameters:NFTMediaProps):null|Element;`
## Parameters

#### __namedParameters

### Type

`let__namedParameters:Omit<MediaRendererProps,"src"|"poster"|"client">&{fallbackComponent?:JSX.Element;loadingComponent?:JSX.Element;mediaResolver?:|NFTMediaInfo|(()=>NFTMediaInfo)|(()=>Promise<NFTMediaInfo>);queryOptions?:Omit<UseQueryOptions<NFTMediaInfo>,"queryFn"|"queryKey">;};`
## Returns

#### Return Type

`letreturnType:null|Element;`A MediaRenderer component

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

