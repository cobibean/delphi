# Core Functions

*Source: [https://portal.thirdweb.com/references/typescript/v5/functions](https://portal.thirdweb.com/references/typescript/v5/functions)*

#### Extensions

#### EIP1193

### fromProvider

### toProvider

#### DEPLOY

### prepareDirectDeployTransaction

### computePublishedContractAddress

### deployContract

### deployERC1155Contract

### deployERC20Contract

### deployERC721Contract

### deployPackContract

### deployPublishedContract

### deploySplitContract

### prepareDeterministicDeployTransaction

#### MARKETPLACE

### deployMarketplaceContract

### acceptedOfferEvent

### acceptOffer

### approveBuyerForListing

### approveCurrencyForListing

### auctionClosedEvent

### bidInAuction

### buyerApprovedForListingEvent

### buyFromListing

### buyoutAuction

### cancelAuction

### cancelledAuctionEvent

### cancelledListingEvent

### cancelledOfferEvent

### cancelListing

### cancelOffer

### collectAuctionPayout

### collectAuctionTokens

### createAuction

### createListing

### currencyApprovedForListingEvent

### currencyPriceForListing

### executeSale

### getAllAuctions

### getAllListings

### getAllOffers

### getAllValidAuctions

### getAllValidListings

### getAllValidOffers

### getAuction

### getListing

### getOffer

### getWinningBid

### isBidInAuctionSupported

### isBuyerApprovedForListing

### isBuyFromListingSupported

### isCancelAuctionSupported

### isCancelListingSupported

### isCreateAuctionSupported

### isCreateListingSupported

### isCurrencyApprovedForListing

### isGetAuctionSupported

### isGetListingSupported

### isGetWinningBidSupported

### isNewWinningBid

### makeOffer

### newAuctionEvent

### newBidEvent

### newListingEvent

### newOfferEvent

### newSaleEvent

### totalAuctions

### totalListings

### totalOffers

### updatedListingEvent

### updateListing

#### AIRDROP

### airdropERC1155

### airdropERC1155WithSignature

### airdropERC20

### airdropERC20WithSignature

### airdropERC721

### airdropERC721WithSignature

### airdropNativeToken

### claimERC1155

### claimERC20

### claimERC721

### fetchProofsERC1155

### fetchProofsERC20

### fetchProofsERC721

### generateAirdropSignatureERC1155

### generateAirdropSignatureERC20

### generateAirdropSignatureERC721

### generateMerkleTreeInfoERC1155

### generateMerkleTreeInfoERC20

### generateMerkleTreeInfoERC721

### isClaimed

### saveSnapshot

### setMerkleRoot

### tokenConditionId

### tokenMerkleRoot

#### COMMON

### contractURI

### getContractMetadata

### getDefaultRoyaltyInfo

### getPlatformFeeInfo

### getRoyaltyInfoForToken

### isGetContractMetadataSupported

### isGetDefaultRoyaltyInfoSupported

### isGetPlatformFeeInfoSupported

### isGetRoyaltyInfoForTokenSupported

### isMulticallSupported

### isNameSupported

### isOwnerSupported

### isPrimarySaleRecipientSupported

### isSetContractURISupported

### isSetDefaultRoyaltyInfoSupported

### isSetPlatformFeeInfoSupported

### isSetPrimarySaleRecipientSupported

### isSetRoyaltyInfoForTokenSupported

### isSymbolSupported

### multicall

### name

### owner

### ownerUpdatedEvent

### primarySaleRecipient

### setContractMetadata

### setContractURI

### setDefaultRoyaltyInfo

### setOwner

### setPlatformFeeInfo

### setPrimarySaleRecipient

### setRoyaltyInfoForToken

### symbol

#### ENS

### parseNftUri

### parseAvatarRecord

### resolveAddress

### resolveAvatar

### resolveL2Name

### resolveName

### resolveText

#### ERC1155

### approvalForAllEvent

### balanceOf

### balanceOfBatch

### batchMetadataUpdateEvent

### burn

### burnBatch

### canClaim

### claimTo

### createPack

### encodeSafeTransferFrom

### freezeMetadata

### generateMintSignature

### getActiveClaimCondition

### getClaimConditionById

### getClaimConditions

### getNFT

### getNFTs

### getOwnedNFTs

### getOwnedTokenIds

### isApprovedForAll

### isBurnSupported

### isClaimToSupported

### isERC1155

### isGetActiveClaimConditionSupported

### isGetClaimConditionByIdSupported

### isGetClaimConditionsSupported

### isGetNFTsSupported

### isGetNFTSupported

### isLazyMintSupported

### isMintAdditionalSupplyToSupported

### isMintToSupported

### isNextTokenIdToMintSupported

### isResetClaimEligibilitySupported

### isSetClaimConditionsSupported

### isTotalSupplySupported

### isUpdateTokenURISupported

### lazyMint

### metadataFrozenEvent

### metadataUpdateEvent

### mintAdditionalSupplyTo

### mintAdditionalSupplyToBatch

### mintTo

### mintToBatch

### mintWithSignature

### nextTokenId

### nextTokenIdToMint

### openPack

### packCreatedEvent

### packOpenedEvent

### packUpdatedEvent

### resetClaimEligibility

### safeBatchTransferFrom

### safeTransferFrom

### setApprovalForAll

### setClaimConditions

### setTokenURI

### tokensClaimedEvent

### tokensLazyMintedEvent

### tokensMintedWithSignatureEvent

### totalSupply

### transferBatchEvent

### transferSingleEvent

### updateMetadata

### updateTokenURI

### uri

#### ERC721

### isUpdateMetadataSupported

### isGetClaimConditionsSupported

### approvalEvent

### approvalForAllEvent

### approve

### balanceOf

### burn

### canClaim

### claimConditionsUpdatedEvent

### claimTo

### claimToBatch

### createDelayedRevealBatch

### generateMintSignature

### getActiveClaimCondition

### getActiveClaimConditionId

### getAllOwners

### getBatchesToReveal

### getClaimConditionById

### getClaimConditions

### getNFT

### getNFTs

### getOwnedNFTs

### getOwnedTokenIds

### getTotalClaimedSupply

### getTotalUnclaimedSupply

### isApprovedForAll

### isBurnSupported

### isClaimToSupported

### isCreateDelayedRevealBatchSupported

### isERC721

### isGetActiveClaimConditionIdSupported

### isGetActiveClaimConditionSupported

### isGetBatchesToRevealSupported

### isGetClaimConditionByIdSupported

### isGetClaimConditionsSupported

### isGetNFTsSupported

### isGetNFTSupported

### isLazyMintSupported

### isMintToSupported

### isNextTokenIdToMintSupported

### isResetClaimEligibilitySupported

### isRevealSupported

### isSetClaimConditionsSupported

### isSetSharedMetadataSupported

### isSharedMetadataSupported

### isTokenByIndexSupported

### isTotalSupplySupported

### isUpdateMetadataSupported

### isUpdateTokenURISupported

### lazyMint

### mintTo

### mintWithSignature

### nextTokenIdToMint

### ownerOf

### resetClaimEligibility

### reveal

### setApprovalForAll

### setClaimConditions

### setSharedMetadata

### setTokenURI

### sharedMetadata

### sharedMetadataUpdatedEvent

### startTokenId

### tokenOfOwnerByIndex

### tokensClaimedEvent

### tokensLazyMintedEvent

### tokensMintedWithSignatureEvent

### tokensOfOwner

### tokenURI

### tokenURIRevealedEvent

### totalSupply

### transferEvent

### transferFrom

### updateMetadata

### updateTokenURI

#### ERC1271

### checkContractWalletSignature

### checkContractWalletSignedTypedData

#### ERC20

### allowance

### approvalEvent

### approve

### balanceOf

### burn

### burnFrom

### canClaim

### claimConditionsUpdatedEvent

### claimTo

### decimals

### delegate

### delegates

### deposit

### generateMintSignature

### getActiveClaimCondition

### getActiveClaimConditionId

### getBalance

### getClaimConditionById

### getClaimConditions

### getCurrencyMetadata

### isClaimToSupported

### isERC20

### isGetActiveClaimConditionIdSupported

### isGetActiveClaimConditionSupported

### isGetClaimConditionByIdSupported

### isMintToSupported

### isResetClaimEligibilitySupported

### isSetClaimConditionsSupported

### mintTo

### mintWithSignature

### resetClaimEligibility

### setClaimConditions

### tokensClaimedEvent

### tokensMintedEvent

### tokensMintedWithSignatureEvent

### totalSupply

### transfer

### transferBatch

### transferEvent

### transferFrom

### withdraw

#### ERC4337

### accountDeployedEvent

### addAdmin

### addSessionKey

### adminUpdatedEvent

### createAccount

### getAccounts

### getAccountsOfSigner

### getAllAccounts

### getAllActiveSigners

### getAllAdmins

### getAllSigners

### getPermissionsForSigner

### getUserOpHash

### isAccountDeployed

### isActiveSigner

### isAddAdminSupported

### isAddSessionKeySupported

### isAdmin

### isCreateAccountSupported

### isGetAccountsOfSignerSupported

### isGetAccountsSupported

### isGetAllAccountsSupported

### isGetAllActiveSignersSupported

### isGetAllAdminsSupported

### isGetAllSignersSupported

### isIsAccountDeployedSupported

### isIsActiveSignerSupported

### isIsAdminSupported

### isRegistered

### isRemoveAdminSupported

### isRemoveSessionKeySupported

### isTotalAccountsSupported

### isValidateUserOpSupported

### predictAccountAddress

### removeAdmin

### removeSessionKey

### signerPermissionsUpdatedEvent

### simulateHandleOp

### totalAccounts

### userOperationEventEvent

### userOperationRevertReasonEvent

#### ERC4626

### asset

### convertToAssets

### convertToShares

### deposit

### depositEvent

### maxDeposit

### maxMint

### maxRedeem

### maxWithdraw

### mint

### previewDeposit

### previewMint

### previewRedeem

### previewWithdraw

### redeem

### totalAssets

### withdraw

### withdrawEvent

#### FARCASTER

### addSigner

### addSignerFor

### createEd25519Keypair

### encodeSignedKeyRequestMetadata

### getAddData

### getBundler

### getFid

### getIdGateway

### getIdRegistry

### getKeyGateway

### getKeyRequestData

### getNonce

### getRegisterData

### getRegistrationPrice

### getSignedKeyRequestMetadata

### getStoragePrice

### getStorageRegistry

### getUsdRegistrationPrice

### getUsdStoragePrice

### registerFid

### registerFidAndSigner

### rentStorage

### signAdd

### signKeyRequest

### signRegister

### idGateway

### keyGateway

### price

### register

### idRegistry

### price

### register

### REGISTER_TYPEHASH

### registerFor

### setStorageRegistryEvent

### storageRegistry

### adminResetEvent

### CHANGE_RECOVERY_ADDRESS_TYPEHASH

### changeRecoveryAddress

### changeRecoveryAddressEvent

### custodyOf

### freezeIdGatewayEvent

### gatewayFrozen

### idCounter

### idGateway

### idOf

### recover

### recoverEvent

### recoverFor

### recoveryOf

### registerEvent

### setIdCounterEvent

### setIdGatewayEvent

### transfer

### TRANSFER_AND_CHANGE_RECOVERY_TYPEHASH

### TRANSFER_TYPEHASH

### transferAndChangeRecovery

### transferEvent

### transferFor

### verifyFidSignature

### add

### ADD_TYPEHASH

### addFor

### keyRegistry

### nonces

### addEvent

### adminResetEvent

### freezeKeyGatewayEvent

### gatewayFrozen

### idRegistry

### keyAt

### keyDataOf

### keyGateway

### keysOf

### maxKeysPerFid

### remove

### REMOVE_TYPEHASH

### removeEvent

### removeFor

### setIdRegistryEvent

### setKeyGatewayEvent

### setMaxKeysPerFidEvent

### setValidatorEvent

### totalKeys

### batchRent

### deprecationTimestamp

### maxUnits

### price

### rent

### rentedUnits

### unitPrice

### usdUnitPrice

#### LENS

### exists

### getContentURI

### getDefaultHandle

### getFollowData

### getFollowerCount

### getFollowerProfileId

### getFollowTokenId

### getFullProfile

### getHandle

### getHandleFromProfileId

### getHandleTokenURIContract

### getLocalName

### getModuleTypes

### getOriginalFollowTimestamp

### getProfile

### getProfileIdAllowedToRecover

### getProfileIdByHandleHash

### getProfileMetadata

### getPublication

### getTokenId

### isErc20CurrencyRegistered

### isFollowing

### isModuleRegistered

### isModuleRegisteredAs

### mintTimestampOf

### mintTimestampOfFollowNFT

### nonces

### resolve

### resolveAddress

### tokenDataOf

#### MULTICALL3

### aggregate

### aggregate3

### aggregate3Value

### blockAndAggregate

### getBasefee

### getBlockHash

### getBlockNumber

### getChainId

### getCurrentBlockCoinbase

### getCurrentBlockDifficulty

### getCurrentBlockGasLimit

### getCurrentBlockTimestamp

### getEthBalance

### getLastBlockHash

### tryAggregate

### tryBlockAndAggregate

#### PACK

### createNewPack

### createPack

### getPackContents

### getTokenCountOfBundle

### openPack

### packCreatedEvent

### packOpenedEvent

### packUpdatedEvent

#### PERMISSIONS

### getAllRoleMembers

### getRoleAdmin

### getRoleHash

### getRoleMember

### getRoleMemberCount

### grantRole

### hasRole

### isGetAllRoleMembersSupported

### isGetRoleAdminSupported

### isGetRoleMemberCountSupported

### isGetRoleMemberSupported

### isGrantRoleSupported

### isHasRoleSupported

### isRenounceRoleSupported

### isRevokeRoleSupported

### renounceRole

### revokeRole

### roleAdminChangedEvent

### roleGrantedEvent

### roleRevokedEvent

#### SPLIT

### distribute

### distributeByToken

### getAllRecipientsAddresses

### getAllRecipientsPercentages

### getRecipientSplitPercentage

### payee

### payeeCount

### releasable

### releasableByToken

### release

### releaseByToken

### released

### releasedByToken

### shares

### totalReleased

### totalReleasedByToken

#### THIRDWEB

### add

### contractType

### count

### deployProxyByImplementation

### getAll

### getAllPublishedContracts

### getMetadataUri

### getPublishedContract

### getPublishedContractVersions

### getPublishedUriFromCompilerUri

### getPublisherProfileUri

### isContractTypeSupported

### remove

### setPublisherProfileUri

### unpublishContract

#### thirdweb

### publishContract

#### UNISWAP

### createPool

### enableFeeAmount

### exactInput

### exactInputSingle

### exactOutput

### exactOutputSingle

### feeAmountEnabledEvent

### feeAmountTickSpacing

### getPool

### getUniswapV3Pool

### owner

### ownerChangedEvent

### poolCreatedEvent

### quoteExactInput

### quoteExactInputSingle

### quoteExactOutput

### quoteExactOutputSingle

### setOwner

#### UNSTOPPABLE-DOMAINS

### namehash

### resolveAddress

### resolveName

### reverseNameOf

#### VOTE

### canExecute

### castVote

### castVoteBySig

### castVoteWithReason

### castVoteWithReasonAndParams

### castVoteWithReasonAndParamsBySig

### execute

### executeProposal

### getAll

### getAllProposals

### getProposalVoteCounts

### getVotes

### getVotesWithParams

### hashProposal

### hasVoted

### proposalDeadline

### proposalExists

### proposalIndex

### proposals

### proposalSnapshot

### proposalThreshold

### proposalVotes

### propose

### quorum

### quorumDenominator

### quorumNumeratorByBlockNumber

### relay

### setProposalThreshold

### setVotingDelay

### setVotingPeriod

### state

### token

### updateQuorumNumerator

### votingDelay

### votingPeriod

#### MODULES

### cancelOwnershipHandover

### completeOwnershipHandover

### getInstalledModules

### getModuleConfig

### getSupportedCallbackFunctions

### grantRoles

### hasAllRoles

### hasAnyRole

### installModule

### isGetInstalledModulesSupported

### isGetModuleConfigSupported

### isGetSupportedCallbackFunctionsSupported

### isInstallModuleSupported

### isUninstallModuleSupported

### moduleInstalledEvent

### owner

### ownershipHandoverExpiresAt

### renounceOwnership

### renounceRoles

### requestOwnershipHandover

### revokeRoles

### rolesOf

### transferOwnership

### uninstallModule

### encodeMintParams

### encodeMintParams

### encodeMintParams

#### EIP5792

### getCallsStatus

### getCapabilities

### sendCalls

### waitForBundle

#### Modules

#### Common

### checkModulesCompatibility

### deployModularContract

### getDeployedModule

### getOrDeployModule

### grantMinterRole

### installPublishedModule

### uninstallModuleByProxy

### uninstallPublishedModule

#### BatchMetadataERC1155

### batchMetadataUpdateEvent

### encodeInstall

### install

### module

### uploadMetadata

#### BatchMetadataERC721

### batchMetadataUpdateEvent

### encodeInstall

### install

### module

### uploadMetadata

#### ClaimableERC1155

### encodeInstall

### getClaimCondition

### getSaleConfig

### install

### mint

### module

### setClaimCondition

### setSaleConfig

#### ClaimableERC20

### encodeInstall

### getClaimCondition

### getSaleConfig

### install

### mint

### module

### setClaimCondition

### setSaleConfig

#### ClaimableERC721

### encodeInstall

### getClaimCondition

### getSaleConfig

### install

### mint

### module

### setClaimCondition

### setSaleConfig

#### MintableERC1155

### encodeInstall

### generateMintSignature

### getSaleConfig

### install

### mintWithRole

### mintWithSignature

### module

### setSaleConfig

#### MintableERC20

### encodeInstall

### generateMintSignature

### getSaleConfig

### install

### mintWithRole

### mintWithSignature

### module

### setSaleConfig

#### MintableERC721

### encodeInstall

### generateMintSignature

### getSaleConfig

### install

### mintWithRole

### mintWithSignature

### module

### setSaleConfig

#### OpenEditionMetadataERC721

### batchMetadataUpdateEvent

### encodeInstall

### install

### module

### setSharedMetadata

### sharedMetadataUpdatedEvent

#### RoyaltyERC1155

### encodeInstall

### getDefaultRoyaltyInfo

### getRoyaltyInfoForToken

### getTransferValidationFunction

### getTransferValidator

### install

### module

### royaltyInfo

### setDefaultRoyaltyInfo

### setRoyaltyInfoForToken

### setTransferValidator

#### RoyaltyERC721

### encodeInstall

### getDefaultRoyaltyInfo

### getRoyaltyInfoForToken

### getTransferValidationFunction

### getTransferValidator

### install

### module

### royaltyInfo

### setDefaultRoyaltyInfo

### setRoyaltyInfoForToken

### setTransferValidator

#### SequentialTokenIdERC1155

### encodeInstall

### install

### module

#### TransferableERC1155

### encodeInstall

### install

### isTransferEnabled

### isTransferEnabledFor

### module

### setTransferable

### setTransferableFor

#### TransferableERC20

### encodeInstall

### install

### isTransferEnabled

### isTransferEnabledFor

### module

### setTransferable

### setTransferableFor

#### TransferableERC721

### encodeInstall

### install

### isTransferEnabled

### isTransferEnabledFor

### module

### setTransferable

### setTransferableFor

#### Client

### createThirdwebClient

#### Wallets

### AccountAvatar

### AccountBalance

### AccountName

### WalletIcon

### deploySmartAccount

### getUser

### authenticate

### authenticateWithRedirect

### createWallet

### createWalletAdapter

### createWalletConnectClient

### createWalletConnectSession

### disconnectWalletConnectSession

### ecosystemWallet

### getActiveWalletConnectSessions

### getProfiles

### getUserEmail

### getUserPhoneNumber

### inAppWallet

### linkProfile

### preAuthenticate

### privateKeyToAccount

### smartWallet

### unlinkProfile

### walletConnect

### engineAccount

### erc7579

#### Wallet Connection

### autoConnect

#### Wallet Utilities

### generateAccount

### getWalletBalance

### injectedProvider

### getSocialIcon

### hasStoredPasskey

### bundleUserOp

### createAndSignUserOp

### createUnsignedUserOp

### estimateUserOpGas

### estimateUserOpGasCost

### getPaymasterAndData

### getUserOpGasFees

### getUserOpHash

### getUserOpReceipt

### getUserOpReceiptRaw

### predictAddress

### predictSmartAccountAddress

### signUserOp

### waitForUserOpReceipt

#### Chain

### defineChain

### getChainMetadata

### getRpcUrlForChain

### ChainIcon

### ChainName

### isZkSyncChain

#### Contract

### checkVerificationStatus

### fetchPublishedContract

### getBytecode

### getCompilerMetadata

### getContract

### prepareMethod

### resolveAbiFromBytecode

### resolveAbiFromContractApi

### resolveCompositeAbi

### resolveContractAbi

### verifyContract

### getInitializeTransaction

### getOrDeployInfraForPublishedContract

### getContractEvents

### parseEventLogs

### prepareEvent

### watchContractEvents

### resolveMethod

### detectMethod

### isContractDeployed

### resolveImplementation

#### Transactions

### getApprovalForTransaction

### createContractQuery

### encode

### estimateGas

### estimateGasCost

### prepareContractCall

### prepareTransaction

### readContract

### sendAndConfirmTransaction

### sendBatchTransaction

### sendTransaction

### serializeTransaction

### signAuthorization

### signTransaction

### simulateTransaction

### toSerializableTransaction

### waitForReceipt

### getTransactionStore

#### Nebula

### chat

### execute

#### Social API

### getSocialProfiles

#### Auth

### createAuth

### isErc6492Signature

### parseErc6492Signature

### serializeErc6492Signature

### signLoginPayload

### verifyContractWalletSignature

### verifyEOASignature

### verifySignature

### verifyTypedData

### decodeJWT

### encodeJWT

### refreshJWT

#### NFT

### NFTDescription

### NFTMedia

### NFTName

#### Buy Crypto

### convertCryptoToFiat

### convertFiatToCrypto

### getBuyHistory

### getBuyWithCryptoHistory

### getBuyWithCryptoQuote

### getBuyWithCryptoStatus

### getBuyWithCryptoTransfer

### getBuyWithFiatHistory

### getBuyWithFiatQuote

### getBuyWithFiatStatus

### getPostOnRampQuote

### isSwapRequiredPostOnramp

#### Tokens

### TokenIcon

### TokenName

### TokenSymbol

#### Storage

### download

### resolveArweaveScheme

### resolveScheme

### unpin

### upload

### uploadMobile

#### RPC

### eth_blockNumber

### eth_call

### eth_estimateGas

### eth_gasPrice

### eth_getBalance

### eth_getBlockByHash

### eth_getBlockByNumber

### eth_getCode

### eth_getLogs

### eth_getStorageAt

### eth_getTransactionByHash

### eth_getTransactionCount

### eth_getTransactionReceipt

### eth_maxPriorityFeePerGas

### eth_sendRawTransaction

### getRpcClient

### watchBlockNumber

#### Theme

### darkTheme

### lightTheme

#### Utils

### getContractPublisher

### getDefaultToken

### getLastAuthProvider

### boolToBytes

### boolToHex

### bytesToBigInt

### bytesToBool

### bytesToNumber

### bytesToString

### concatHex

### fromBytes

### fromGwei

### fromHex

### getAddress

### getGasPrice

### hexToBigInt

### hexToBool

### hexToBytes

### hexToNumber

### hexToString

### hexToUint8Array

### isAddress

### isHex

### keccak256

### numberToBytes

### numberToHex

### padHex

### sha256

### stringToBytes

### stringToHex

### toBytes

### toEther

### toHex

### toTokens

### toUnits

### toWei

### uint8ArrayToHex

### checksumAddress

### computeDeploymentAddress

### decodeError

### decodeFunctionData

### decodeFunctionResult

### encodeAbiParameters

### ensureBytecodePrefix

### extractIPFSUri

### extractMinimalProxyImplementationAddress

### formatNumber

### getClaimParams

### getInitBytecodeWithSalt

### getSaltHash

### hashMessage

### isEIP155Enforced

### keccakId

### max

### min

### parseAbiParams

### resolveSignature

### resolveSignatures

### shortenAddress

### shortenHex

### shortenLargeNumber

### sign

### signatureToHex

### signMessage

### signTypedData

### stringify

#### Miscellaneous

### shouldUpdateSessionKey

### WalletName

### decodeAbiParameters

### encodePacked

### isBytes

### isValidENSName

### toEventSelector

### toFunctionSelector

### randomPrivateKey

Was this page helpful?

* Need help?Visit our support site
* Watch ourVideo Tutorials
* View ourChangelog

Subscribe for the latest dev updates

