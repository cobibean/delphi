# UI Components

This directory contains foundational UI primitive components that are used throughout the application.

## Purpose

The UI components serve as the building blocks for the entire application interface. These components are:

- Domain-agnostic
- Highly reusable
- Customizable through props
- Focused on presentation rather than business logic
- Consistent with our "Cosmic Overload" design system

## Component List

### Core Components

- `Button`: Versatile button component with various styles and sizes
- `Carousel`: Component for displaying rotating content and images

### Upcoming Components

- Input fields and form elements
- Navigation components
- Media display components
- Typography system
- Card variations

## Features

### Button

The `Button` component provides:
- Multiple visual variants (primary, secondary, ghost, etc.)
- Size variations (sm, md, lg)
- Loading states
- Icon support
- Full width option
- Disabled states

### Carousel

The `Carousel` component provides:
- Smooth slide transitions
- Automatic or manual navigation
- Customizable controls
- Responsive behavior
- Support for various content types

## Integration with Features

These UI components are used across all features:

- NFT marketplace listings and displays
- NFT mintzone interface
- User profile components
- Wallet connection interface
- Transaction confirmations

## Usage Example

```tsx
import { Button } from "@/app/components/ui";

const ActionButton = () => {
  const [loading, setLoading] = useState(false);
  
  const handleAction = async () => {
    setLoading(true);
    try {
      await someAsyncAction();
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Button 
      variant="primary" 
      size="md" 
      loading={loading}
      onClick={handleAction}
      className="hover:shadow-glow"
    >
      Mint NFT
    </Button>
  );
};
```

## Design System Integration

Our UI components implement:
- "Cosmic Overload" design language
- Space-themed effects and animations
- Dark mode by default with light mode support
- Consistent spacing and sizing
- Accessibility considerations

## Future Enhancements

Planned improvements to UI components:

- Complete form element suite
- Animation library integration
- Enhanced accessibility features
- Theme customization options
- Interactive documentation 