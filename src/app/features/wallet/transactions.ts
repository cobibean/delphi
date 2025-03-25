/**
 * Wallet Transaction Types and Utilities
 */

/**
 * Metadata for transactions to provide context in UI and for tracking
 */
export interface TransactionMetadata {
  // Type of transaction for categorization
  type: string;
  
  // Human-readable description of what the transaction does
  description?: string;
  
  // For marketplace transactions
  itemId?: string;
  collectionId?: string;
  
  // Additional contextual data
  additionalData?: Record<string, any>;
}

// Export any other transaction-related types or functions here 