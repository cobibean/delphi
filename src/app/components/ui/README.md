# UI Components

This directory contains foundational UI primitive components that are used throughout the application.

## Purpose

The UI components serve as the building blocks for the entire application interface. These components are:

- Domain-agnostic
- Highly reusable
- Customizable through props
- Focused on presentation rather than business logic

## Component Types

This directory should contain primitive UI elements such as:

- `Button`: Various button styles and variants
- `Input`: Text input fields
- `Select`: Dropdown selectors
- `Checkbox`: Toggle and checkbox components
- `Modal`: Base modal component
- `Tabs`: Tab navigation component
- `Card`: Base card container
- `Typography`: Text components (headings, paragraphs, etc.)
- `Icons`: SVG icon components

## Best Practices

- Keep components as pure as possible
- Use TypeScript interfaces for props
- Document usage with JSDoc comments
- Implement consistent theming and styling
- Create variants through props rather than new components
- Provide sensible defaults for all props

## Usage Example

```tsx
import { Button } from "@/components/ui";

const MyComponent = () => {
  return (
    <Button 
      variant="primary" 
      size="md" 
      onClick={() => console.log('Clicked')}
    >
      Click Me
    </Button>
  );
};
``` 