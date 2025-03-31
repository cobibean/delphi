# Layout Components

This directory contains components that control the layout and structure of the application interface.

## Purpose

Layout components provide the structural framework for the application and handle:

- Page layout and organization
- Navigation and user flows
- Responsive design and adaptation
- Consistent branding and visual identity
- Layout containers and content structure

## Component List

### Core Components

- `Header`: Main application header with navigation and wallet connection
- `Footer`: Application footer with links, social media, and copyright info
- Additional layout utilities for content organization

## Features

### Header

The `Header` component provides:
- Brand logo and identity
- Main navigation menu
- Mobile-responsive menu with animations
- Wallet connection integration
- User account access
- NFT minting access via "Mint NFT" navigation item
- Create button for listing creation

### Footer

The `Footer` component provides:
- Link grouping by category
- Social media links
- Copyright and legal information
- Newsletter signup
- App download links

## Integration with Features

The layout components integrate with various features:

- NFT Marketplace navigation
- NFT Mintzone access
- Wallet connection
- User profile access
- Listing creation modal

## Usage Example

```tsx
import { Header, Footer } from "@/components/layout";

const AppLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
};
```

## Styling

Our layout components use:
- Tailwind CSS for styling
- Framer Motion for animations
- "Cosmic Overload" design system
- Dark mode support with custom themes
- Responsive design patterns for all device sizes

## Future Enhancements

Planned improvements to layout components:

- Enhanced animations and transitions
- More sophisticated responsive behaviors
- Advanced navigation patterns
- Integration with user preferences
- Layout customization options 