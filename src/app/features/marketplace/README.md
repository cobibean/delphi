# Marketplace Feature

This directory contains components and hooks related to the NFT marketplace functionality.

## Purpose

The Marketplace domain handles all aspects of the NFT marketplace, including:

- Marketplace homepage and featured sections
- Listing browsing and filtering
- Trending NFTs and collections
- NFT listing and sales processes
- Marketplace analytics and statistics

## Directory Structure

- `components/`: Marketplace-specific UI components
- `hooks/`: Marketplace-specific hooks and logic

## Key Components

- `NFTMarketplaceDashboard`: Main marketplace view
- `FeaturedSection`: Highlighted NFTs or collections
- `TrendingTable`: Display of trending items
- `Carousel`: Showcase of featured NFTs

## Key Hooks

- `useMarketplace`: Core marketplace functionality
- `useTrending`: Data and logic for trending items

## Integration Points

The Marketplace domain interacts with:

- NFT domain for detailed NFT information
- Wallet domain for transaction handling
- Profile domain for user-specific marketplace views 