# NFT Feature

This directory contains components and hooks related to NFT display, creation, and management.

## Purpose

The NFT domain handles the core functionality related to Non-Fungible Tokens, including:

- NFT detail views and information display
- NFT creation and minting interfaces
- NFT attribute visualization
- NFT ownership and history tracking
- Listing creation and management

## Directory Structure

- `components/`: NFT-specific UI components
- `hooks/`: NFT-specific hooks and logic

## Key Components

- `NFTDetailView`: Comprehensive view of a single NFT
- `NFTCard`: Card representation of an NFT for listings and grids
- `NFTAttributes`: Display of NFT traits and properties
- `NFTCarousel`: Carousel display of multiple NFTs
- `ListingOptionsModal`: Interface for creating NFT listings

## Key Hooks

- `useNFTDetails`: Fetching and managing NFT metadata
- `useListingCreation`: Logic for creating NFT listings

## Integration Points

The NFT domain interacts with:

- Marketplace domain for listing and sales functionality
- Wallet domain for ownership and transaction verification
- Profile domain for user-owned NFTs 