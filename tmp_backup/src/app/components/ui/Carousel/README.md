# Carousel Component

A flexible, customizable carousel/slider component for displaying content in a rotating slideshow.

## Features

- Responsive design
- Touch/swipe support for mobile devices
- Auto-play with configurable speed
- Navigation arrows and indicator dots
- Customizable styles and components
- Accessibility features

## Basic Usage

```tsx
import { Carousel } from "@/components/ui";

export default function MyComponent() {
  return (
    <Carousel>
      {[
        <div key="slide1" className="p-4 bg-gray-100">Slide 1 Content</div>,
        <div key="slide2" className="p-4 bg-blue-100">Slide 2 Content</div>,
        <div key="slide3" className="p-4 bg-green-100">Slide 3 Content</div>
      ]}
    </Carousel>
  );
}
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode[] | (Required) | Array of React nodes to display as slides |
| `title` | string | undefined | Optional title for the carousel |
| `onSlideChange` | (index: number) => void | undefined | Callback function when slide changes |
| `className` | string | "" | Additional CSS classes for the carousel container |
| `settings` | CarouselSettings | See below | Configuration options |
| `styles` | CarouselStyles | {} | Custom styles for various elements |
| `components` | CarouselComponents | {} | Custom component overrides |

### Settings Object

```tsx
{
  autoplay: false,          // Enable auto-rotation
  autoplaySpeed: 5000,      // Autoplay interval in ms
  loop: true,               // Whether to loop after last slide
  itemsToShow: 1,           // Number of items visible at once
  transitionDuration: 500,  // Transition animation duration in ms
  pauseOnHover: true,       // Pause autoplay when hovering
  showArrows: true,         // Show navigation arrows
  showIndicators: true,     // Show indicator dots
  enableSwipe: true         // Enable touch swipe on mobile
}
```

### Styles Object

```tsx
{
  container: React.CSSProperties, // Styles for the container
  slide: React.CSSProperties,     // Styles for the slides
  arrows: React.CSSProperties,    // Styles for the arrow buttons
  indicators: React.CSSProperties // Styles for the indicator dots
}
```

### Components Object

```tsx
{
  PrevArrow: React.ComponentType<{ onClick: () => void }>,
  NextArrow: React.ComponentType<{ onClick: () => void }>,
  Indicator: React.ComponentType<{ 
    active: boolean;
    onClick: () => void;
    index: number
  }>
}
```

## Content Examples

### Specific NFTs by Contract Address and Token ID

To display specific NFTs using contract address and token ID:

```tsx
import { Carousel } from "@/components/ui";
import { NFTCard } from "@/features/nft/components";
import { useEffect, useState } from "react";
import { getNFTMetadata } from "@/features/nft/services/nft-service";

export default function SpecificNFTsCarousel() {
  const [nfts, setNfts] = useState([]);
  
  useEffect(() => {
    async function fetchSpecificNFTs() {
      // Define the specific NFTs you want to display
      const nftIdentifiers = [
        { contractAddress: "0x1234...", tokenId: "1" },
        { contractAddress: "0x1234...", tokenId: "5" },
        { contractAddress: "0x5678...", tokenId: "42" },
      ];
      
      // Fetch metadata for each NFT
      const nftData = await Promise.all(
        nftIdentifiers.map(async ({ contractAddress, tokenId }) => {
          const metadata = await getNFTMetadata(contractAddress, tokenId);
          return {
            id: `${contractAddress}-${tokenId}`,
            contractAddress,
            tokenId,
            metadata
          };
        })
      );
      
      setNfts(nftData);
    }
    
    fetchSpecificNFTs();
  }, []);
  
  return (
    <Carousel title="Selected NFTs">
      {nfts.map((nft) => (
        <div key={nft.id} className="px-4">
          <NFTCard nft={nft} />
        </div>
      ))}
    </Carousel>
  );
}
```

### NFT Collection by Contract Address

To display NFTs from a specific collection using contract address:

```tsx
import { Carousel } from "@/components/ui";
import { NFTCard } from "@/features/nft/components";
import { useEffect, useState } from "react";
import { getNFTsByCollection } from "@/features/nft/services/nft-service";

export default function CollectionCarousel({ collectionAddress }) {
  const [collectionNFTs, setCollectionNFTs] = useState([]);
  
  useEffect(() => {
    async function fetchCollectionNFTs() {
      // Fetch NFTs from the collection
      const nfts = await getNFTsByCollection(collectionAddress);
      setCollectionNFTs(nfts);
    }
    
    fetchCollectionNFTs();
  }, [collectionAddress]);
  
  return (
    <Carousel
      title="Collection Showcase"
      settings={{
        autoplay: true,
        autoplaySpeed: 3000,
        loop: true
      }}
    >
      {collectionNFTs.map((nft) => (
        <div key={nft.id} className="px-4">
          <NFTCard nft={nft} />
        </div>
      ))}
    </Carousel>
  );
}
```

### Modal Content in Carousel

To display modals or interactive content in carousel slides:

```tsx
import { Carousel } from "@/components/ui";
import { useState } from "react";

export default function ModalCarousel() {
  const [activeModalIndex, setActiveModalIndex] = useState(null);
  
  const handleOpenModal = (index) => {
    setActiveModalIndex(index);
  };
  
  const handleCloseModal = () => {
    setActiveModalIndex(null);
  };
  
  const modalContents = [
    { title: "Subscribe", content: "Sign up for our newsletter" },
    { title: "Feedback", content: "Tell us what you think" },
    { title: "Contact", content: "Get in touch with our team" }
  ];
  
  return (
    <>
      <Carousel
        onSlideChange={(index) => console.log(`Slide changed to ${index}`)}
      >
        {modalContents.map((modal, index) => (
          <div key={index} className="p-6 text-center">
            <h3 className="text-2xl font-bold mb-4">{modal.title}</h3>
            <p className="mb-4">{modal.content}</p>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleOpenModal(index)}
            >
              Open {modal.title} Modal
            </button>
          </div>
        ))}
      </Carousel>
      
      {/* Modal overlay */}
      {activeModalIndex !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
              {modalContents[activeModalIndex].title}
            </h2>
            <div className="mb-6">
              {/* Modal specific content here */}
              <p>This is the full modal content for {modalContents[activeModalIndex].title}</p>
            </div>
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
```

### Image Gallery from Various Sources

To create an image carousel with various image sources:

```tsx
import { Carousel } from "@/components/ui";
import { useEffect, useState } from "react";

export default function ImageGalleryCarousel() {
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    // Define your image sources
    const galleryImages = [
      // Local images
      { src: "/images/image1.jpg", alt: "Description 1", type: "local" },
      { src: "/images/image2.jpg", alt: "Description 2", type: "local" },
      
      // Remote images
      { src: "https://example.com/image3.jpg", alt: "Description 3", type: "remote" },
      
      // IPFS images
      { src: "ipfs://Qm...", alt: "IPFS Image", type: "ipfs" },
      
      // Dynamically loaded images
      { src: `https://api.example.com/images/${imageId}`, alt: "Dynamic Image", type: "api" }
    ];
    
    // Process IPFS URLs
    const processedImages = galleryImages.map(image => {
      if (image.type === "ipfs") {
        // Replace IPFS protocol with a gateway URL
        return {
          ...image,
          src: image.src.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/")
        };
      }
      return image;
    });
    
    setImages(processedImages);
  }, []);
  
  return (
    <Carousel
      settings={{
        autoplay: true,
        autoplaySpeed: 4000,
        showIndicators: true
      }}
      styles={{
        container: { maxWidth: '900px', margin: '0 auto' }
      }}
    >
      {images.map((image, index) => (
        <div key={index} className="aspect-[16/9] relative">
          <img 
            src={image.src} 
            alt={image.alt} 
            className="w-full h-full object-cover rounded-lg" 
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
            <p>{image.alt}</p>
            <span className="text-sm opacity-75">Source: {image.type}</span>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
```

## Examples

### Auto-playing Carousel

```tsx
<Carousel
  settings={{
    autoplay: true,
    autoplaySpeed: 3000
  }}
>
  {slides}
</Carousel>
```

### Custom Styling

```tsx
<Carousel
  className="my-custom-carousel"
  styles={{
    container: { maxWidth: '800px' },
    slide: { backgroundColor: '#f5f5f5' },
    arrows: { opacity: 0.8 },
    indicators: { marginTop: '1rem' }
  }}
>
  {slides}
</Carousel>
```

### Custom Navigation Components

```tsx
<Carousel
  components={{
    PrevArrow: ({ onClick }) => (
      <button onClick={onClick} className="custom-prev-btn">
        Previous
      </button>
    ),
    NextArrow: ({ onClick }) => (
      <button onClick={onClick} className="custom-next-btn">
        Next
      </button>
    ),
    Indicator: ({ active, onClick }) => (
      <button 
        onClick={onClick} 
        className={active ? 'active-dot' : 'dot'}
      />
    )
  }}
>
  {slides}
</Carousel>
```

### NFT Card Carousel Example

```tsx
import { Carousel } from "@/components/ui";
import { NFTCard } from "@/features/nft/components";

export default function NFTCollection({ nfts }) {
  return (
    <Carousel
      title="Featured NFTs"
      settings={{
        autoplay: true,
        autoplaySpeed: 5000,
        loop: true
      }}
    >
      {nfts.map(nft => (
        <div key={nft.id} className="px-4">
          <NFTCard nft={nft} />
        </div>
      ))}
    </Carousel>
  );
}
```

## Accessibility

The carousel includes the following accessibility features:

- Keyboard navigation support
- Proper ARIA labels on controls
- Focus management
- Screen reader friendly structure 