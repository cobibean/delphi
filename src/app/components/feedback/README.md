# Feedback Components

This directory contains components that provide feedback to users about the state of the application.

## Purpose

Feedback components communicate important information to users about:

- Loading states and progress
- Errors and warnings
- Success messages
- System notifications
- Progress indicators
- Transaction statuses

## Component List

### Core Components

- `LoadingIndicator`: Simple loading spinner with customizable size and color
- `LoadingState`: Enhanced loading display with messages and animation
- `toastNotification`: Toast message system for temporary notifications
- `Toast`: Toast container and management system

### Hooks

- `useToast`: Hook for triggering toast notifications from any component

## Directory Structure

- `Toast/`: Components for the toast notification system
- `hooks/`: Hooks for feedback components
- `test/`: Test utilities for feedback components

## Integration with Features

Feedback components are used across various features:

- NFT minting status notifications
- Transaction confirmations
- Error handling in API calls
- Loading states during data fetching
- Form submission feedback

## Usage Examples

### Loading States

```tsx
import { LoadingState, LoadingIndicator } from "@/components/feedback";

// Simple spinner
<LoadingIndicator size="md" />

// Enhanced loading with message
<LoadingState 
  message="Loading your NFTs..." 
  size="lg"
  showSpinner={true} 
/>
```

### Toast Notifications

```tsx
import { useToast } from "@/components/feedback";

const MyComponent = () => {
  const { toast } = useToast();
  
  const handleAction = async () => {
    try {
      await someAsyncAction();
      toast({
        title: "Success!",
        description: "Your action was completed successfully",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  return <Button onClick={handleAction}>Perform Action</Button>;
};
```

## Future Enhancements

Planned additions to the feedback system:

- Progress bar for multi-step processes
- Skeleton loading placeholders
- Enhanced error display components
- Animated success indicators
- Blockchain transaction status tracking 