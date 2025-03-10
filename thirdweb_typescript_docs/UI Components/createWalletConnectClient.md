# createWalletConnectClient

*Source: [https://portal.thirdweb.com/references/typescript/v5/createWalletConnectClient](https://portal.thirdweb.com/references/typescript/v5/createWalletConnectClient)*

* References
* createWalletConnectClient

Creates a new WalletConnect client for interacting with another application.

## Example

`import{ createWalletConnectClient }from"thirdweb/wallets";constclient=awaitcreateWalletConnectClient({wallet: wallet,client: client,});`Pass custom handlers:

`import{ createWalletConnectClient }from"thirdweb/wallets";constclient=awaitcreateWalletConnectClient({wallet: wallet,client: client,requestHandlers: {eth_signTransaction: ({account,chainId,params})=>{// handle transaction signing},},});`Pass connect and disconnect callbacks:

`import{ createWalletConnectClient }from"thirdweb/wallets";constclient=awaitcreateWalletConnectClient({wallet: wallet,client: client,onConnect: (session)=>{console.log("Connected to WalletConnect", session);},onDisconnect: (session)=>{console.log("Disconnected from WalletConnect", session);},});`
#### Signature

`functioncreateWalletConnectClient(options:{appMetadata?:AppMetadata;chains?:Array<Readonly<ChainOptions&{rpc:string}>>;client:ThirdwebClient;onConnect?:(session:WalletConnectSession)=>void;onDisconnect?:(session:WalletConnectSession)=>void;onError?:(error:Error)=>void;projectId?:string;requestHandlers?:{eth_sendRawTransaction?:(_:{account:Account;chainId:number;params:WalletConnectRawTransactionRequestParams;})=>Promise<`0x${string}`|WalletConnectRequestError>;eth_sendTransaction?:(_:{account:Account;chainId:number;params:WalletConnectTransactionRequestParams;})=>Promise<`0x${string}`|WalletConnectRequestError>;eth_sign?:(_:{account:Account;params:WalletConnectSignRequestPrams;})=>Promise<`0x${string}`|WalletConnectRequestError>;eth_signTransaction?:(_:{account:Account;params:WalletConnectTransactionRequestParams;})=>Promise<`0x${string}`|WalletConnectRequestError>;eth_signTypedData?:(_:{account:Account;params:WalletConnectSignTypedDataRequestParams;})=>Promise<`0x${string}`|WalletConnectRequestError>;eth_signTypedData_v4?:(_:{account:Account;params:WalletConnectSignTypedDataRequestParams;})=>Promise<`0x${string}`|WalletConnectRequestError>;personal_sign?:(_:{account:Account;params:WalletConnectSignRequestPrams;})=>Promise<`0x${string}`|WalletConnectRequestError>;wallet_addEthereumChain?:(_:{params:WalletConnectAddEthereumChainRequestParams;wallet:Wallet;})=>Promise<`0x${string}`>;wallet_switchEthereumChain?:(_:{params:WalletConnectSwitchEthereumChainRequestParams;wallet:Wallet;})=>Promise<`0x${string}`>;};wallet:Wallet;}):Promise<SignClient>;`
## Parameters

#### options

The options to use to create the WalletConnect client.

### Type

`letoptions:{appMetadata?:AppMetadata;chains?:Array<Readonly<ChainOptions&{rpc:string}>>;client:ThirdwebClient;onConnect?:(session:WalletConnectSession)=>void;onDisconnect?:(session:WalletConnectSession)=>void;onError?:(error:Error)=>void;projectId?:string;requestHandlers?:{eth_sendRawTransaction?:(_:{account:Account;chainId:number;params:WalletConnectRawTransactionRequestParams;})=>Promise<`0x${string}`|WalletConnectRequestError>;eth_sendTransaction?:(_:{account:Account;chainId:number;params:WalletConnectTransactionRequestParams;})=>Promise<`0x${string}`|WalletConnectRequestError>;eth_sign?:(_:{account:Account;params:WalletConnectSignRequestPrams;})=>Promise<`0x${string}`|WalletConnectRequestError>;eth_signTransaction?:(_:{account:Account;params:WalletConnectTransactionRequestParams;})=>Promise<`0x${string}`|WalletConnectRequestError>;eth_signTypedData?:(_:{account:Account;params:WalletConnectSignTypedDataRequestParams;})=>Promise<`0x${string}`|WalletConnectRequestError>;eth_signTypedData_v4?:(_:{account:Account;params:WalletConnectSignTypedDataRequestParams;})=>Promise<`0x${string}`|WalletConnectRequestError>;personal_sign?:(_:{account:Account;params:WalletConnectSignRequestPrams;})=>Promise<`0x${string}`|WalletConnectRequestError>;wallet_addEthereumChain?:(_:{params:WalletConnectAddEthereumChainRequestParams;wallet:Wallet;})=>Promise<`0x${string}`>;wallet_switchEthereumChain?:(_:{params:WalletConnectSwitchEthereumChainRequestParams;wallet:Wallet;})=>Promise<`0x${string}`>;};wallet:Wallet;};`
## Returns

#### Return Type

`letreturnType:Promise<SignClient>;`The WalletConnect client. Use this client to connect to a WalletConnect URI with createWalletConnectSession.

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

