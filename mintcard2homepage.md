# Homepage Integration Plan: Two-Column Hero Section

This document outlines the step-by-step plan for implementing a new two-column hero section at the top of the Delphi homepage, featuring the Featured NFT Carousel on the left (~65-70%) and the HomepageMintCard on the right (~30-35%).

## Important Note About Page Structure
During implementation, we discovered that the app is using a domain-driven design approach with feature directories. The main page being displayed in the test environment is:
- `/src/app/features/marketplace/pages/page.tsx` (accessed via `/features/marketplace`)

We've updated both:
1. The main homepage (`/src/app/page.tsx`) 
2. The marketplace page (`/src/app/features/marketplace/pages/page.tsx`)

## Implementation Steps

### Step 1: Import HomepageMintCard Component ✅
- Add import statement for HomepageMintCard at the top of the pages ✅
- Define a constant for the contract address to use for the mint card ✅

### Step 2: Prepare Styling Classes ✅
- Define reusable CSS classes or tailwind utilities for the new layout ✅
- Create background styling for the mint card section ✅
- Ensure consistent spacing and alignment between elements ✅

### Step 3: Implement Two-Column Container ✅
- Wrap both the featured carousel and mint card in a flex container ✅
- Set appropriate width distribution (65-70% for carousel, 30-35% for mint card) ✅
- Add responsive adjustments for mobile view (stack vertically) ✅

### Step 4: Restructure Featured Carousel Section ✅
- Adjust the carousel container to fit within the new layout ✅
- Update padding/margins as needed ✅
- Optimize carousel controls for the new size ✅

### Step 5: Implement HomepageMintCard Section ✅
- Add section heading: "Mint Your Delphi Day One Now" ✅
- Style the heading to match the design system ✅
- Add the HomepageMintCard component with appropriate props ✅
- Add cosmic-themed background to enhance visual appeal ✅

### Step 6: Ensure Responsive Behavior ✅
- Add media queries for different screen sizes ✅
- Ensure proper stacking on mobile devices (column layout) ✅
- Test different viewport sizes and adjust as needed ✅

### Step 7: Test Functionality ✅
- Test carousel navigation in the new layout ✅
- Test mint functionality through the HomepageMintCard ✅
- Ensure all links and buttons work correctly ✅

### Step 8: Polish Visual Details ✅
- Ensure consistent spacing throughout the layout ✅
- Add any animations or transitions for a polished feel ✅
- Ensure cosmic theme is consistently applied ✅

### Step 9: Fix Contract Address ✅
- Identified and fixed incorrect contract address issue ✅
- Updated both homepage and marketplace page to use the working contract address ✅
- Confirmed mint functionality now works correctly ✅

### Step 10: Future Improvements (Planned)
- Create a centralized contract helper file to manage all NFT contract addresses
- Implement a reusable approach to update contract addresses across the application
- Add environment-specific contract configurations for different networks

## Code Structure

The new hero section follows this structure:

```jsx
{/* Two-Column Hero Section with Featured Carousel and Mint Card */}
<section className="relative overflow-hidden pt-4 pb-12">
  <div className="container mx-auto px-4">
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Column: Featured Carousel (65-70%) */}
      <div className="w-full lg:w-2/3">
        {featuredListings.length > 0 && (
          <>
            <h2 className="font-heading text-3xl md:text-4xl text-oracle-orange mb-8 text-center uppercase tracking-wide">
              Featured Creations
            </h2>
            
            <div className="relative max-w-full mx-auto">
              {/* Carousel slider */}
              <div className="overflow-hidden rounded-xl">
                {/* Carousel items */}
              </div>
              
              {/* Carousel controls */}
              {/* Carousel indicators */}
            </div>
          </>
        )}
      </div>
      
      {/* Right Column: HomepageMintCard (30-35%) */}
      <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
        <h2 className="font-heading text-2xl md:text-3xl text-oracle-orange mb-4 text-center uppercase tracking-wide">
          Mint Your Delphi Day One Now
        </h2>
        <div className="bg-cosmic-connection animate-cosmic-flow bg-[length:200%_200%] rounded-xl p-4 overflow-hidden shadow-dark border border-oracle-orange/20">
          <HomepageMintCard 
            contractAddress={MINT_CONTRACT_ADDRESS}
            className="hover-lift"
          />
        </div>
      </div>
    </div>
  </div>
</section>
```

## Notes
- The HomepageMintCard requires a contractAddress prop
- **Contract Address Update**: We identified that the original contract address "0x656b65339B2CCd5908B51b993D38d46e3283dB7c" was not working properly. We've updated to the working contract "0x8938fc030Df8780A479f393982890980A192c63f" which has the proper claim conditions set up
- We implemented the changes in both the main homepage and the marketplace feature page
- Due to the project structure reorganization (domain-driven design), make sure to test on the correct page URL (likely `/features/marketplace`) 
- **Future Plan**: We will create a centralized contract helper file (`src/app/features/nft/contracts/index.ts`) to manage all NFT contract addresses in one place, making it easier to maintain and update across the application 