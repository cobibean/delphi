# Profile Feature

This directory contains components and hooks related to user profiles and account management.

## Purpose

The Profile domain handles user-specific functionality, including:

- User profile display and editing
- User settings and preferences
- User activity history
- User's NFT collection display
- Account management

## Directory Structure

- `components/`: Profile-specific UI components
- `hooks/`: Profile-specific hooks and logic

## Key Components

- `ProfileView`: Main profile page and information display
- `UserSettings`: Settings and preferences interface
- `ActivityHistory`: Display of user's transaction and interaction history
- `UserNFTCollection`: Grid view of user-owned NFTs

## Key Hooks

- `useProfile`: Core profile data and functionality
- `useUserSettings`: Management of user settings and preferences

## Integration Points

The Profile domain interacts with:

- NFT domain for displaying user-owned NFTs
- Wallet domain for account connectivity
- Marketplace domain for user's marketplace activity

## Technical Notes

User profiles are associated with wallet addresses and may contain both on-chain and off-chain data. 