/**
 * @deprecated This file is deprecated. Please use @/app/utils/format.ts instead.
 * All functions from this file have been consolidated there.
 */

/**
 * Format an Ethereum address for display by showing only the first 6 and last 4 characters
 * @param address The Ethereum address to format
 * @returns The formatted address
 */
export function formatAddress(address: string): string {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
} 