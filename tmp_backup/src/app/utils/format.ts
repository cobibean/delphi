/**
 * This file consolidates formatting utilities from multiple sources
 */

/**
 * Format IPFS URL with proper gateway
 * @param url The original URL which may be an IPFS URL
 * @returns Formatted URL with proper gateway
 */
export function formatIPFSUrl(url: string): string {
  if (!url) return '';
  
  // Handle ipfs:// protocol
  if (url.startsWith('ipfs://')) {
    // Use Cloudflare's IPFS gateway
    return url.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/');
  }
  
  // Handle URLs with /ipfs/ path
  if (url.includes('/ipfs/')) {
    const parts = url.split('/ipfs/');
    return `https://cloudflare-ipfs.com/ipfs/${parts[1]}`;
  }
  
  // If already a valid HTTP URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Fallback
  return url;
}

/**
 * Shorten an Ethereum address for display
 * @param address The full Ethereum address
 * @param chars Number of characters to show at start and end
 * @returns Shortened address
 */
export function shortenAddress(address: string, chars = 4): string {
  if (!address) return '';
  if (address.length < 10) return address;
  
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Alternative address formatter (formats to 6 + 4 characters)
 * @param address The Ethereum address to format
 * @returns The formatted address
 */
export function formatAddress(address: string): string {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

/**
 * Format a timestamp to a readable date
 * @param timestamp UNIX timestamp in seconds
 * @returns Formatted date string
 */
export function formatDate(timestamp: number): string {
  if (!timestamp) return '';
  
  const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Format a date object to a string with just year, month, day
 * @param date Date object to format
 * @returns Formatted date string
 */
export function formatSimpleDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format a number with commas and decimal places
 * @param value The number to format
 * @param decimals Number of decimal places to show
 * @returns Formatted number string
 */
export function formatNumber(value: number | string, decimals = 4): string {
  if (!value) return '0';
  
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  // Handle very small numbers
  if (Math.abs(num) < 0.0001) {
    return num.toExponential(2);
  }
  
  // Format with commas and specified decimal places
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

/**
 * Format currency value with symbol
 * @param price Number to format
 * @param currency Currency symbol
 * @returns Formatted price string
 */
export function formatCurrency(price: number, currency = "METIS"): string {
  return `${price.toFixed(2)} ${currency}`;
}

/**
 * Abbreviate large numbers with K, M, B suffixes
 * @param num Number to abbreviate
 * @returns Abbreviated number string
 */
export function abbreviateNumber(num: number): string {
  if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "k";
  return num.toString();
}

/**
 * Pad a token ID with leading zeros
 * @param tokenId Token ID to normalize
 * @returns Padded token ID
 */
export function normalizeTokenId(tokenId: string | number): string {
  return tokenId.toString().padStart(5, "0");
}

/**
 * Format error messages for display
 * @param error Error object
 * @returns Formatted error string
 */
export function formatError(error: any): string {
  if (error?.message) return error.message;
  return "An unexpected error occurred.";
} 