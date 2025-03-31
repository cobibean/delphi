// Format IPFS URL helper
export function formatIPFSUrl(url: string): string {
  if (!url) return '';
  
  // Handle IPFS URLs
  if (url.startsWith('ipfs://')) {
    return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  
  // Handle URLs that might be stored with gateway already
  if (url.includes('/ipfs/')) {
    const ipfsHash = url.split('/ipfs/')[1];
    return `https://ipfs.io/ipfs/${ipfsHash}`;
  }
  
  // Handle direct CID format
  if (/^[a-zA-Z0-9]{46}/.test(url)) {
    return `https://ipfs.io/ipfs/${url}`;
  }
  
  return url;
} 