# Delphi Component Restructuring Plan

This document outlines a detailed plan for reorganizing the Delphi project's component structure following a Domain-Driven Organization approach, inspired by the ThirdWeb marketplace template and informed by our component inventory analysis.

## Overview

We will adopt a hybrid Domain-Driven approach that:

1. Organizes components primarily by their domain/feature
2. Maintains a shared components directory for cross-domain components
3. Follows a flat structure (max 3 levels deep)
4. Standardizes naming conventions
5. Reduces duplication in the codebase

## Target Directory Structure

```
/src/app/
├── components/              # Shared components used across multiple domains
│   ├── ui/                  # Generic UI primitives (Button, Input, etc.)
│   ├── layout/              # Layout components (Container, Grid, etc.)
│   ├── feedback/            # Feedback components (Toast, Alert, etc.)
│   └── modals/              # Generic modal components
├── features/                # Domain-specific features
│   ├── marketplace/         # Marketplace feature
│   │   ├── components/      # Marketplace-specific components
│   │   ├── hooks/           # Marketplace-specific hooks
│   │   └── services/        # Marketplace-specific services
│   ├── nft/                 # NFT feature
│   │   ├── components/      # NFT-specific components
│   │   └── hooks/           # NFT-specific hooks
│   ├── wallet/              # Wallet feature
│   │   └── components/      # Wallet-specific components
│   └── profile/             # Profile feature
│       └── components/      # Profile-specific components
└── [Existing directories]   # Keep other directories as is
```

## Implementation Plan

### Phase 1: Analyze Current Structure ✅

1. ✅ Create a comprehensive component inventory
2. ✅ Identify duplicate functionality
3. ✅ Document component dependencies and usage patterns
4. ✅ Define migration strategy

### Phase 2: Create New Directory Structure ✅

1. ✅ Set up the shared components directory structure
2. ✅ Set up the features directory structure
3. ✅ Configure path aliases in tsconfig.json

### Phase 3: Migrate Core UI Components ✅

1. ✅ Move UI components to `/components/ui/`
2. ✅ Move layout components to `/components/layout/`
3. ✅ Move feedback components to `/components/feedback/`
4. ✅ Update import paths in migrated components

### Phase 4: Import Path Updates ✅

1. Update Import Paths
   - [x] Identify all import paths that need to be updated
   - [x] Update import paths to use the new directory structure
   - [x] Ensure all imports use the correct path aliases

2. Create Path Aliases
   - [x] Define path aliases in tsconfig.json
   - [x] Update imports to use path aliases
   - [x] Ensure consistency across the codebase

3. Verify Import Updates
   - [x] Check for any broken imports
   - [x] Test the application to ensure everything works
   - [x] Fix any issues that arise

4. Complete Migration of Old Structure
   - [x] Move remaining components from old directory structure to their appropriate feature directories
   - [x] Update all references to these components
   - [x] Remove old directories and files that are no longer needed

### Phase 5: Service Layer Reorganization ✅

1. Marketplace Services
   - [x] Move marketplace-related services to `/app/features/marketplace/services/`
   - [x] Update imports in components that use these services
   - [x] Ensure all functionality works as expected

2. NFT Services
   - [x] Move NFT-related services to `/app/features/nft/services/`
   - [x] Update imports in components that use these services
   - [x] Ensure all functionality works as expected

3. Wallet Services
   - [x] Move wallet-related services to `/app/features/wallet/services/`
   - [x] Update imports in components that use these services
   - [x] Ensure all functionality works as expected

### Phase 6: Page Structure Reorganization ✅

This phase focuses on properly placing pages within the new project structure, following the domain-driven design approach.

1. Marketplace Pages
   - [x] Move marketplace-related pages to `/app/features/marketplace/pages/`
     - [x] Create directory structure
     - [x] Move `/app/page.tsx` (main marketplace) to appropriate location
     - [x] Update imports and routing

2. NFT Pages
   - [x] Move NFT-related pages to `/app/features/nft/pages/`
     - [x] Create directory structure
     - [x] Move `/app/nft/[id]/page.tsx` to appropriate location
     - [x] Update imports and routing

3. Profile Pages
   - [x] Move profile-related pages to `/app/features/profile/pages/`
     - [x] Create directory structure
     - [x] Move `/app/profile/page.tsx` to appropriate location
     - [x] Move `/app/my-listings/page.tsx` to appropriate location
     - [x] Move `/app/my-nfts/page.tsx` to appropriate location
     - [x] Update imports and routing

4. Create Pages
   - [x] Move creation-related pages to `/app/features/create/pages/`
     - [x] Create directory structure
     - [x] Move `/app/create/page.tsx` to appropriate location
     - [x] Move `/app/create/auction/page.tsx` to appropriate location
     - [x] Move `/app/create/direct-listing/page.tsx` to appropriate location
     - [x] Move `/app/create/deploy-contract/page.tsx` to appropriate location
     - [x] Update imports and routing

5. Stats Pages
   - [x] Move stats-related pages to `/app/features/stats/pages/`
     - [x] Create directory structure
     - [x] Move `/app/stats/page.tsx` to appropriate location
     - [x] Update imports and routing

6. Debug Pages
   - [x] Move debug-related pages to `/app/features/debug/pages/`
     - [x] Create directory structure
     - [x] Move `/app/debug/page.tsx` to appropriate location
     - [x] Update imports and routing

7. Update Next.js Routing
   - [x] Ensure all routes work correctly with the new structure
     - [x] Added redirects in next.config.js
     - [x] Created re-export files in feature directories
   - [x] Update any navigation links throughout the application
   - [x] Test all routes to verify functionality

### Phase 7: Component Consolidation [Current Phase]

Since the product isn't live yet, we'll take a more aggressive approach to component consolidation:

1. **Direct Removal of Duplicate Components**
   - [x] Identify all duplicate component implementations
   - [x] Remove original component files entirely (not just replacing with re-exports)
   - [x] Update all imports to point directly to the new feature-based component locations

2. **Standardize Page Structure**
   - [x] Keep only the feature-based page structure
   - [x] Create feature page re-exports for proper routing
     - [x] Home page export (`src/app/features/home/page.tsx`)
     - [x] Create page exports 
       - [x] Auction
       - [x] Direct-listing
       - [x] Deploy-contract
     - [x] Debug page export
     - [x] Stats page export
   - [x] Prepare for removal of legacy page implementations
   - [x] Set up dynamic routes for NFT pages (`src/app/features/nft/[id]`)

3. **Import Path Standardization**
   - [x] Update component imports to use path aliases
   - [x] Standardize import patterns across the codebase
   - [x] Remove relative imports in favor of absolute imports with aliases

4. **Clean Up Empty Directories**
   - [x] Remove empty directories left after component consolidation
     - [x] Removed FeaturedSection directory
     - [x] Removed Carousel directory
     - [x] Removed TrendingTable directory
   - [x] Ensure directory structure is clean and follows our domain-driven design

### Phase 8: Testing and Optimization [Current Phase]

1. Comprehensive testing of all pages and features
   - [x] Create routing test script to verify all routes and redirects
   - [x] Test page routing and fix redirect-related issues
   - [x] Fix routes.js file to properly export redirects for Next.js
   - [x] Fix errorStore implementation for error handling
   - [ ] Complete testing of all main features and components
   - [ ] Verify component rendering and functionality
   - [ ] Test wallet connection and NFT interactions

2. Performance optimization
   - [ ] Check for any performance bottlenecks introduced during restructuring
   - [ ] Optimize component loading and rendering
   - [ ] Ensure code splitting works correctly

3. Code cleanup and documentation updates
   - [x] Consolidate duplicate client.ts files
   - [x] Update client.ts to use ThirdWeb v5 APIs instead of ethers.js
   - [ ] Remove any remaining legacy implementations
   - [ ] Update documentation to reflect the new structure
   - [ ] Add comments to code where necessary

### Phase 9: Design System Formalization [Future]

1. Create a formal design system based on the component structure
2. Document component usage guidelines
3. Create Storybook examples for all components

## Progress Tracking

- ✅ Phase 1: Complete
- ✅ Phase 2: Complete
- ✅ Phase 3: Complete
- ✅ Phase 4: Complete
- ✅ Phase 5: Complete
- ✅ Phase 6: Complete
- ✅ Phase 7: Complete
- 🔄 Phase 8: In Progress
  - ✅ Set up route testing script
  - ✅ Test and fix routing issues
  - ✅ Fix client.ts & routes.js issues
  - ⚠️ Comprehensive testing of all pages - In Progress
  - ❌ Performance optimization - Not Started
  - ⚠️ Code cleanup - In Progress
- ❌ Phase 9: Not Started (Future)

## Timeline Summary

| Phase | Description | Agent Hours | User Hours | Total Hours |
|-------|-------------|------------|-----------|------------|
| 1     | Analysis and Planning | 0 | 1.5-2.5 | 1.5-2.5 |
| 2     | Directory Setup | 1 | 0 | 1 |
| 3     | Component Migration | 6-9 | 1-2 | 7-11 |
| 4     | Import Updates | 4-5 | 1-2 | 5-7 |
| 5     | Page Component Updates and Additional Migrations | 3-5 | 1-2 | 4-7 |
| 6     | Standardization | 2-3 | 1 | 3-4 |
| 7     | Documentation | 4-6 | 1-2 | 5-8 |
| 8     | Testing and Verification | 2-4 | 1-2 | 3-6 |
| **Total** | | **22-33** | **7.5-13.5** | **29.5-46.5** |

## Risks and Mitigation

### Risk: Breaking Changes
- **Mitigation**: 
  - Implement changes incrementally
  - Create backup branches before making changes
  - Thoroughly test after each phase

### Risk: Import Path Errors
- **Mitigation**:
  - Use automated tools for updating imports
  - Add comprehensive tests for component rendering
  - Implement path aliases for more robust imports

### Risk: Component Duplication
- **Mitigation**:
  - Thoroughly document the purpose of each component
  - Create clear guidelines for when to use which component
  - Review component usage patterns regularly

### Risk: Developer Confusion
- **Mitigation**:
  - Provide clear documentation
  - Conduct a walkthrough of the new structure
  - Create templates and examples for new components

## Success Criteria

The restructuring will be considered successful when:

1. All components are organized according to the new structure
2. The application builds and runs without errors
3. All functionality works as expected
4. Documentation is complete and clear
5. No duplicate components exist without clear purpose
6. Import paths are consistent and intuitive
7. The team understands and approves of the new structure

## Next Steps After Restructuring

1. Implement a component development workflow
2. Set up automated tests for components
3. Create a component library documentation site
4. Establish a review process for new components

## Conclusion

This plan provides a detailed roadmap for restructuring the Delphi project's component organization using a Domain-Driven approach inspired by the ThirdWeb marketplace template. By following this plan, we will create a more maintainable, scalable, and developer-friendly codebase.

The restructuring process is divided into clear phases with distinct responsibilities for the user and agent, ensuring that the user maintains control while allowing the agent to handle the heavy lifting. The estimated total time for the restructuring is 29.5-46.5 hours, with the majority of the work being done by the agent. 