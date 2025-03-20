# Wallet Feature

This directory contains components and hooks related to blockchain wallet connectivity and transaction management.

## Purpose

The Wallet domain handles all aspects of wallet integration, including:

- Wallet connection and authentication
- Transaction creation and submission
- Transaction status tracking and notifications
- Wallet balance display
- Smart contract interactions

## Directory Structure

- `components/`: Wallet-specific UI components
- `hooks/`: Wallet-specific hooks and logic

## Key Components

- `ThirdwebConnectButton`: Interface for connecting wallets via Thirdweb
- `ThirdwebConnectDialog`: Modal for wallet connection options
- `WalletConnection`: Wrapper for wallet connection state
- `TransactionStatus`: Display of transaction status
- `TransactionNotification`: Notifications for transaction events

## Key Hooks

- `useWallet`: Core wallet connection functionality
- `useTransaction`: Transaction creation and tracking

## Integration Points

The Wallet domain interacts with:

- NFT domain for ownership verification and NFT transactions
- Marketplace domain for purchase and sale transactions
- Profile domain for user wallet information
- Feedback domain for transaction notifications

## Technical Notes

This domain primarily uses the Thirdweb SDK for wallet connectivity and blockchain interactions. 