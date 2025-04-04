# CreateCollectionStepper Refactoring Plan

## Current Analysis

The `CreateCollectionStepper.tsx` component currently:
- Is approximately 800 lines of code
- Contains multiple sub-components within a single file
- Handles 5 different steps of the collection creation process
- Includes form components, UI helpers, and business logic
- Manages a complex state via the CreateCollectionProvider

## Proposed Structure

```
src/app/features/nft/components/
├── collection-creation/
│   ├── index.ts                     # Exports all components
│   ├── CreateCollectionStepper.tsx  # Main orchestrator (simplified)
│   ├── steps/
│   │   ├── TypeSelectionStep.tsx    # Step 1: Token standard selection
│   │   ├── MetadataStep.tsx         # Step 2: Collection details form
│   │   ├── ConfirmStep.tsx          # Step 3: Review information
│   │   ├── DeployStep.tsx           # Step 4: Deployment interface
│   │   └── SuccessStep.tsx          # Step 5: Success confirmation
│   └── ui/
│       ├── StepIndicator.tsx        # Progress bar and step circles
│       ├── FormField.tsx            # Reusable form field component
│       ├── NumberInput.tsx          # Slider for numeric inputs
│       └── TokenTypeCard.tsx        # Selection card for standards
```

## Refactoring Steps

### 1. Setup Directory Structure
- Create the folder structure shown above
- Move existing functions from CreateCollectionStepper.tsx to their new files

### 2. Extract UI Components
- Move `StepIndicator`, `FormField`, `NumberInput`, and `TokenTypeCard` components to their respective files in the `ui` folder
- Ensure each component exports properly
- Create index.ts to re-export components

### 3. Extract Step Components
- Create separate files for each step
- Each step component should:
  - Accept props for data and callbacks
  - Maintain consistent styling
  - Handle only its own validation
  - Focus on presentation, delegating business logic to the main component

### 4. Simplify Main Component
- Refactor `CreateCollectionStepper.tsx` to:
  - Import and use the extracted components
  - Handle step navigation
  - Pass necessary props to step components
  - Maintain the connection to provider context

### 5. Testing Strategy
- Test each component individually
- Verify the full flow works after refactoring
- Check for any styling inconsistencies

## Implementation Timeline

| Task | Estimated Time |
|------|---------------|
| Setup structure | 30 minutes |
| Extract UI components | 2 hours |
| Extract step components | 3 hours |
| Simplify main component | 2 hours |
| Testing and bug fixing | 2 hours |
| **Total** | **~9.5 hours** |

## Benefits

- **Improved maintainability**: Smaller files are easier to understand and modify
- **Better code organization**: Clear separation of concerns
- **Enhanced testability**: Isolate components for unit testing
- **Easier collaboration**: Team members can work on different components simultaneously
- **Reduced cognitive load**: Developers can focus on one component at a time

## Potential Challenges

- **State management complexity**: Need to ensure props are passed correctly between components
- **Consistency**: Maintain visual and behavioral consistency across steps
- **Import overhead**: More files means more imports to manage
- **Refactoring risks**: Potential to introduce bugs during reorganization

## Success Criteria

- All functionality works identically to the original implementation
- File sizes are more manageable (ideally <150 lines per file)
- Components are properly decoupled and reusable
- Testing confirms no regressions

## Next Steps After Refactoring

- Consider extracting validation logic to separate utility functions
- Implement unit tests for each component
- Document component APIs
- Add storybook examples for UI components 