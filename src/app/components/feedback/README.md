# Feedback Components

This directory contains components that provide feedback to users about the state of the application.

## Purpose

Feedback components communicate important information to users about:

- Loading states and progress
- Errors and warnings
- Success messages
- System notifications
- Progress indicators

## Component Types

This directory should contain feedback-focused components such as:

- `LoadingState`: Loading indicators and spinners
- `ErrorDisplay`: Error message display
- `ToastNotification`: Temporary notifications
- `Alert`: Alert messages (error, warning, info, success)
- `ProgressBar`: Progress indicators
- `Skeleton`: Loading placeholders
- `EmptyState`: Displays for empty data

## Best Practices

- Provide clear and informative messages
- Use appropriate colors and icons for different feedback types
- Make feedback accessible (screen readers, animations, etc.)
- Maintain consistent styling with the rest of the UI
- Consider mobile and responsive views
- Allow customization through props

## Usage Example

```tsx
import { LoadingState, ErrorDisplay } from "@/components/feedback";

const DataFetchComponent = () => {
  const { data, isLoading, error } = useSomeData();

  if (isLoading) {
    return <LoadingState message="Loading data..." size="md" />;
  }

  if (error) {
    return <ErrorDisplay message={error.message} />;
  }

  return <div>{/* Render data */}</div>;
};
``` 