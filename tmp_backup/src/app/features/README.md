# Features Directory

This directory organizes application code by domain-specific features. Each feature represents a business domain in the application and contains its own components, hooks, and other related code.

## Directory Structure

- `marketplace/`: Components and hooks related to the marketplace functionality
- `nft/`: Components and hooks related to NFT display, creation, and management
- `wallet/`: Components and hooks related to wallet connection and transaction management
- `profile/`: Components and hooks related to user profiles and settings

Each feature directory follows a consistent structure:

```
feature-name/
├── components/        # Feature-specific components
├── hooks/             # Feature-specific hooks
└── index.ts           # Barrel exports
```

## When to Add Code Here

Add code to the appropriate feature directory when:

1. It's specific to a particular domain
2. It's not reused across multiple domains
3. It contains domain-specific business logic

If a component or hook is used across multiple domains, consider moving it to the shared `components` or `hooks` directories.

## Best Practices

- Keep features isolated from each other with clear boundaries
- Use the shared components from the `components` directory when possible
- Avoid circular dependencies between features
- Use barrel exports (index.ts) for simplified imports
- Document domain-specific requirements and considerations 