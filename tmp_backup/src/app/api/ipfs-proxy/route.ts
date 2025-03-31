import { NextRequest, NextResponse } from 'next/server';

/**
 * API route to proxy IPFS requests through the server
 * This helps avoid CORS issues and provides a consistent way to access IPFS content
 */
export async function GET(request: NextRequest) {
  // Get the IPFS hash from the query parameter
  const searchParams = request.nextUrl.searchParams;
  const ipfsHash = searchParams.get('hash');
  
  if (!ipfsHash) {
    return NextResponse.json({ error: 'No IPFS hash provided' }, { status: 400 });
  }
  
  try {
    // Try multiple IPFS gateways in order
    const gateways = [
      'https://ipfs.io/ipfs/',
      'https://gateway.ipfs.io/ipfs/',
      'https://cloudflare-ipfs.com/ipfs/',
      'https://gateway.pinata.cloud/ipfs/'
    ];
    
    // Try each gateway until one works
    for (const gateway of gateways) {
      const url = `${gateway}${ipfsHash}`;
      
      try {
        const response = await fetch(url, { 
          method: 'GET',
          headers: {
            'Accept': 'image/*',
          }
        });
        
        if (response.ok) {
          // Get the content type
          const contentType = response.headers.get('content-type') || 'application/octet-stream';
          
          // Get the response as an array buffer
          const buffer = await response.arrayBuffer();
          
          // Return the image with the correct content type
          return new NextResponse(buffer, {
            status: 200,
            headers: {
              'Content-Type': contentType,
              'Cache-Control': 'public, max-age=86400',
            }
          });
        }
      } catch (error) {
        // Continue to the next gateway
      }
    }
    
    // If all gateways fail, return an error
    return NextResponse.json({ error: 'Failed to fetch IPFS content from all gateways' }, { status: 502 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 