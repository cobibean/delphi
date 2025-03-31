/**
 * @deprecated This file is deprecated. Please use @/app/utils/format.ts instead.
 * All functions from this file have been consolidated there.
 */

const shortenAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const formatCurrency = (price: number, currency = "METIS"): string => {
  return `${price.toFixed(2)} ${currency}`;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const abbreviateNumber = (num: number): string => {
  if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "k";
  return num.toString();
};

const normalizeTokenId = (tokenId: string | number): string => {
  return tokenId.toString().padStart(5, "0");
};

const formatError = (error: any): string => {
  if (error?.message) return error.message;
  return "An unexpected error occurred.";
};

export {
  abbreviateNumber, formatCurrency,
  formatDate, formatError, normalizeTokenId, shortenAddress
};
