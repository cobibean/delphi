# Modal Components

This directory contains modal dialog components used for overlays, alerts, and interactive dialogs throughout the application.

## Purpose

Modal components provide overlay interfaces for:

- Confirmation dialogs
- Alert messages
- Form inputs that require focused attention
- Detail views without navigation
- Settings and configuration interfaces

## Component Types

This directory should contain modal-focused components such as:

- `ConfirmationModal`: For confirming user actions
- `AlertModal`: For displaying important alerts
- `FormModal`: Reusable modal with form functionality
- `DetailModal`: For displaying detailed information
- `DialogProvider`: Context provider for managing modals

## Best Practices

- Keep modal content focused and minimal
- Provide clear actions (confirm, cancel, etc.)
- Use consistent animations for opening/closing
- Make modals accessible (keyboard navigation, focus trapping)
- Allow closing via escape key, backdrop click, and explicit buttons
- Handle scrolling appropriately for large content

## Usage Example

```tsx
import { ConfirmationModal } from "@/components/modals";

const DeleteItemComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    // Delete logic
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="danger">
        Delete Item
      </Button>

      <ConfirmationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />
    </>
  );
};
``` 