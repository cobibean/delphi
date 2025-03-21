# Modal Components

This directory contains modal dialog components used for overlays, alerts, and interactive dialogs throughout the application.

## Purpose

Modal components provide overlay interfaces for:

- Confirmation dialogs
- Interactive forms and inputs
- Feature-specific interfaces (like NFT listing creation)
- Wallet connection and transaction confirmation
- Settings and configuration interfaces

## Modal System

Our modal system provides:

- Consistent styling and behavior across the application
- Accessibility support with keyboard navigation and focus management
- Animation and transition effects
- Backdrop handling and click-outside behavior
- Mobile-responsive design

## Key Components

- `ListingOptionsModal`: Interface for creating NFT listings
- Base modal components for various use cases

## Integration with Features

The modal components integrate with various features:

- NFT listing creation in the marketplace
- Wallet connection and transaction confirmation
- NFT minting confirmation and status
- User settings and preferences

## Usage Example

```tsx
import { useState } from "react";
import { ListingOptionsModal } from "@/components/modals";

const ListingCreationButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <button 
        onClick={handleModalOpen}
        className="bg-cosmic-combustion hover:bg-cosmic-combustion/90 text-oracle-white px-4 py-2 rounded-lg"
      >
        Create Listing
      </button>

      {showModal && (
        <ListingOptionsModal 
          onClose={handleModalClose} 
        />
      )}
    </>
  );
};
```

## Styling

Our modal components use:
- Tailwind CSS for styling
- Framer Motion for animations
- "Cosmic Overload" design system with space themes
- Dark mode support
- Responsive design for all device sizes

## Accessibility

All modals implement these accessibility features:
- Focus trapping within the modal
- Keyboard navigation (Escape to close)
- ARIA attributes for screen readers
- Focus restoration when closed

## Future Enhancements

Planned improvements to modal components:

- Enhanced animation library
- More specialized modal types for specific use cases
- Improved mobile interaction patterns
- Multi-step modal workflows 