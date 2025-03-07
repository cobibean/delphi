# delphi. design system
## Western Oracle: Where Ancient Prophecy Meets Frontier Justice

![delphi. Oracle Badge Logo](/public/images/delphi_oracle_badge_logo.png)

---

## Core Philosophy

The **delphi.** marketplace blends three distinct worlds into a cohesive visual language:

1. **Ancient Greek Oracles** - Mystical, prophetic, and timeless
2. **Wild West Frontier** - Rugged, weathered, and untamed
3. **Modern Gaming (GTA)** - Bold, irreverent, and dynamic

This fusion creates a unique digital experience where users feel like they're consulting a mystical oracle in a dusty frontier town, with the slick interface of a modern game.

---

## Brand Identity

### Logo & Typography

- **Primary Logo**: The Oracle Badge - an all-seeing eye within a sheriff's badge
- **Wordmark**: "delphi." - Always lowercase with the period included
- **Tagline**: "prophecies from the digital frontier"

### Typography Hierarchy

| Element | Font | Styling |
|---------|------|---------|
| Headings | Anton, Impact | Bold, uppercase, weathered texture, slight slant |
| Subheadings | Inter | Medium weight, dusty gold accents |
| Body Text | Inter, Poppins | Regular weight, high contrast |
| Accents | Roboto Slab | For ominous disclaimers and warnings |
| Special Elements | Roboto Slab | For oracle quotes and prophecies |

---

## Color Palette

### Primary Colors

- **Oracle Purple** `#3A1078` - Deep, mystical purple of prophecy
- **Desert Sand** `#D5B048` - Weathered frontier gold
- **Parchment** `#F8F0E0` - Ancient scrolls and wanted posters
- **Midnight Blue** `#0F0F1B` - The night sky over the desert

### Secondary Colors

- **Terracotta** `#A84C32` - Desert clay and frontier buildings
- **Weathered Bronze** `#7D6B46` - Ancient artifacts and sheriff badges
- **Tumbleweed** `#D4A76A` - Desert landscapes
- **GTA Neon** `#00FFDD` - Modern digital accents

### Accent Colors

- **Blood Red** `#8B0000` - For warnings and critical actions
- **Oracle Glow** `#9D72FF` - Mystical highlights and interactions
- **Frontier Black** `#1A1A1A` - Deep shadows and text
- **Desert Heat** `#FF6B35` - Attention-grabbing elements

---

## UI Components

### Cards & Containers

- **NFT Cards**: Weathered parchment with gold-leaf frames
  - Hover: Subtle dust particles animation + oracle glow
  - Active: Western-style "wanted poster" transformation
  - Border: Greek meander pattern that animates on interaction

- **Content Sections**: Temple-like structures with column elements
  - Headers: Sheriff badge dividers with Greek patterns
  - Backgrounds: Subtle desert landscape textures
  - Shadows: Long, dramatic like desert sunset

### Buttons & Interactive Elements

#### Primary Button
```css
.oracle-btn-primary {
  background: linear-gradient(135deg, #D5B048, #7D6B46);
  border: 2px solid #7D6B46;
  color: #F8F0E0;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.75rem 1.5rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
}

.oracle-btn-primary:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 7px 14px rgba(0,0,0,0.4), 0 0 15px rgba(157, 114, 255, 0.4);
}

.oracle-btn-primary:active {
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
```

#### Secondary Button
```css
.oracle-btn-secondary {
  background: transparent;
  border: 1px solid #D5B048;
  color: #D5B048;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
}

.oracle-btn-secondary:hover {
  background: rgba(213, 176, 72, 0.1);
  border-color: #9D72FF;
  color: #9D72FF;
  transform: translateY(-2px);
}

.oracle-btn-secondary:active {
  transform: translateY(1px);
}
```

### Form Elements

- **Input Fields**: Weathered parchment with bronze borders
  - Focus: Oracle glow animation
  - Placeholder text styled as faded frontier wanted poster text
  - Icons: Western-themed with Greek detailing

- **Dropdowns**: Scroll-like appearance that unrolls on click
  - Options styled as prophecies on aged parchment
  - Selection indicator: Sheriff badge

- **Toggles**: Gold coin that flips (heads/tails animation)

---

## Animations & Interactions

### Micro-Interactions

1. **Desert Mirage Effect**
   - Subtle heat wave distortion on hover states
   - CSS implementation:
   ```css
   .mirage-effect:hover {
     animation: heat-wave 2s infinite;
     filter: contrast(1.05) brightness(1.05);
   }
   
   @keyframes heat-wave {
     0% { transform: translateY(0) skewX(0); }
     25% { transform: translateY(-2px) skewX(0.5deg); }
     50% { transform: translateY(0) skewX(-0.5deg); }
     75% { transform: translateY(2px) skewX(0.25deg); }
     100% { transform: translateY(0) skewX(0); }
   }
   ```

2. **Oracle Vision Reveal**
   - Content fades in with mystical glow when entering viewport
   - JavaScript trigger on scroll with CSS animation:
   ```css
   .oracle-reveal {
     opacity: 0;
     transform: translateY(20px);
     transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
   }
   
   .oracle-reveal.active {
     opacity: 1;
     transform: translateY(0);
     box-shadow: 0 0 30px rgba(157, 114, 255, 0.3);
   }
   ```

3. **Tumbleweed Loading**
   - Custom loader with tumbleweed rolling across screen
   - SVG animation with CSS:
   ```css
   .tumbleweed-loader {
     width: 100%;
     height: 100px;
     position: relative;
     overflow: hidden;
   }
   
   .tumbleweed {
     position: absolute;
     width: 50px;
     height: 50px;
     animation: roll 3s linear infinite;
   }
   
   @keyframes roll {
     0% { left: -50px; transform: rotate(0deg); }
     100% { left: 100%; transform: rotate(1080deg); }
   }
   ```

4. **Gunslinger Draw**
   - Quick-draw animation for critical actions (buy, sell)
   - Button transforms with a fast "draw" motion:
   ```css
   .gunslinger-btn {
     transition: transform 0.1s ease-out;
   }
   
   .gunslinger-btn:active {
     animation: quick-draw 0.5s cubic-bezier(.17,.67,.83,.67);
   }
   
   @keyframes quick-draw {
     0% { transform: translateX(30px) rotate(10deg); opacity: 0; }
     30% { transform: translateX(0) rotate(0deg); opacity: 1; }
     100% { transform: translateX(0) rotate(0deg); opacity: 1; }
   }
   ```

5. **Oracle Pulse**
   - Subtle pulsing glow for important elements
   ```css
   .oracle-pulse {
     animation: pulse 3s infinite;
   }
   
   @keyframes pulse {
     0% { box-shadow: 0 0 0 0 rgba(157, 114, 255, 0.4); }
     70% { box-shadow: 0 0 0 15px rgba(157, 114, 255, 0); }
     100% { box-shadow: 0 0 0 0 rgba(157, 114, 255, 0); }
   }
   ```

### Page Transitions

1. **Scroll Unrolling**
   - Pages transition like ancient scrolls unrolling
   ```css
   .page-transition-enter {
     transform: perspective(1000px) rotateX(90deg);
     transform-origin: top center;
     opacity: 0;
   }
   
   .page-transition-enter-active {
     transform: perspective(1000px) rotateX(0deg);
     opacity: 1;
     transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
   }
   
   .page-transition-exit {
     transform: perspective(1000px) rotateX(0deg);
     opacity: 1;
   }
   
   .page-transition-exit-active {
     transform: perspective(1000px) rotateX(-90deg);
     transform-origin: bottom center;
     opacity: 0;
     transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
   }
   ```

2. **Dust Storm Transition**
   - Particles animation that resembles desert dust
   ```javascript
   function createDustStorm() {
     // Create canvas element
     const canvas = document.createElement('canvas');
     canvas.classList.add('dust-transition');
     document.body.appendChild(canvas);
     
     // Animation logic with particles
     // ...
     
     // Remove after transition
     setTimeout(() => {
       canvas.classList.add('fade-out');
       setTimeout(() => canvas.remove(), 500);
     }, 1500);
   }
   ```

3. **Oracle Vision Flash**
   - Quick flash of mystical imagery between page transitions
   ```css
   .vision-flash {
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background: url('/images/oracle-vision-bg.jpg') center center;
     z-index: 9999;
     opacity: 0;
     pointer-events: none;
   }
   
   .vision-flash.active {
     animation: flash 0.8s ease-out forwards;
   }
   
   @keyframes flash {
     0% { opacity: 0; filter: brightness(2) hue-rotate(0deg); }
     10% { opacity: 0.8; filter: brightness(2) hue-rotate(90deg); }
     100% { opacity: 0; filter: brightness(1) hue-rotate(0deg); }
   }
   ```

### Signature Animations

1. **The Prophecy Reveal**
   - Text appears letter by letter as if being written by an invisible oracle
   ```css
   .prophecy-text {
     display: inline-block;
     overflow: hidden;
     white-space: nowrap;
     margin: 0;
     animation: typing 3.5s steps(40, end);
   }
   
   @keyframes typing {
     from { width: 0 }
     to { width: 100% }
   }
   ```

2. **Sheriff Badge Spin**
   - Logo animation for loading states
   ```css
   .badge-spin {
     animation: spin 2s infinite linear, pulse 3s infinite ease-in-out;
   }
   
   @keyframes spin {
     0% { transform: rotate(0deg); }
     100% { transform: rotate(360deg); }
   }
   ```

3. **Wanted Poster Shake**
   - Error state animation
   ```css
   .wanted-shake {
     animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
   }
   
   @keyframes shake {
     10%, 90% { transform: translate3d(-1px, 0, 0); }
     20%, 80% { transform: translate3d(2px, 0, 0); }
     30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
     40%, 60% { transform: translate3d(4px, 0, 0); }
   }
   ```

4. **Gold Rush Particles**
   - Celebration animation for successful transactions
   ```javascript
   function goldRush() {
     // Create particle system with gold flakes
     // Burst animation from center
     // Gravity effect pulling particles down
   }
   ```

5. **Desert Sunset Gradient Shift**
   - Background color transitions throughout the day
   ```css
   .sunset-gradient {
     background: linear-gradient(135deg, #FF6B35, #3A1078);
     animation: sunset 1hour linear infinite;
   }
   
   @keyframes sunset {
     0% { background-position: 0% 50%; }
     50% { background-position: 100% 50%; }
     100% { background-position: 0% 50%; }
   }
   ```

---

## Layout & Spacing

### Grid System

- **Base Unit**: 8px (0.5rem)
- **Container Width**: Max 1200px with responsive breakpoints
- **Column Structure**: 12-column grid with Western-inspired asymmetry

### Spacing Scale

| Size | Value | Usage |
|------|-------|-------|
| xs | 0.5rem (8px) | Tight spacing, icon padding |
| sm | 1rem (16px) | Standard element spacing |
| md | 1.5rem (24px) | Section padding |
| lg | 2rem (32px) | Large component margins |
| xl | 3rem (48px) | Section separators |
| xxl | 5rem (80px) | Hero spacing |

### Layout Principles

- **Asymmetrical Balance**: Like a frontier town's unplanned growth
- **Depth Layers**: Create dimension with shadows and overlapping elements
- **Focal Points**: Use the Oracle Eye motif to guide attention
- **Responsive Behavior**: Elements transform like mirages at breakpoints

---

## Iconography & Imagery

### Icon System

- **Base Style**: Line icons with weathered texture
- **Accent Style**: Filled icons with gold/bronze gradient
- **Size Scale**: 16px, 24px, 32px, 48px

### Custom Icons

- **Oracle Eye**: For insights and information
- **Sheriff Badge**: For authentication and security
- **Scroll**: For listings and collections
- **Desert Landscape**: For marketplace overview
- **Temple Columns**: For profile and settings
- **Revolver**: For actions and transactions

### Image Treatment

- **NFT Display**: Weathered frame with parchment texture
- **Background Images**: Subtle desert textures with parallax
- **Profile Images**: Circular cut with sheriff badge frame
- **Hero Images**: Dramatic Western landscapes with Greek ruins

---

## Motion & Interaction Guidelines

### Timing

- **Quick Actions**: 200-300ms (gunslinger speed)
- **Standard Transitions**: 300-500ms (desert wind)
- **Elaborate Animations**: 500-800ms (oracle vision)

### Easing

- **Default**: cubic-bezier(0.25, 0.8, 0.25, 1) (smooth desert wind)
- **Dramatic**: cubic-bezier(0.17, 0.67, 0.83, 0.67) (quick draw)
- **Mystical**: cubic-bezier(0.37, 0, 0.63, 1) (oracle movement)

### Hover States

- **Cards**: Slight elevation + dust particles + oracle glow
- **Buttons**: Elevation change + subtle color shift
- **Icons**: Rotation or bounce + color intensification
- **Text Links**: Desert mirage effect + underline animation

### Focus States

- **Form Elements**: Oracle glow outline (accessibility-friendly)
- **Interactive Areas**: Sheriff badge indicator
- **Navigation**: Weathered gold highlight

---

## Responsive Behavior

### Breakpoints

| Name | Size | Behavior |
|------|------|----------|
| Mobile | <576px | Stacked, simplified |
| Tablet | 576px-992px | 2-column grid |
| Desktop | 992px-1200px | Full experience |
| Widescreen | >1200px | Enhanced with extra space |

### Adaptive Elements

- **Header**: Transforms from full navigation to saloon-door menu
- **NFT Grid**: Adjusts from 4 columns to single column
- **Typography**: Scales down while maintaining hierarchy
- **Animations**: Simplified on mobile for performance

---

## Accessibility Guidelines

### Color Contrast

- All text meets WCAG AA standards (4.5:1 for normal text)
- Interactive elements have distinct focus states
- Critical information never conveyed by color alone

### Keyboard Navigation

- All interactive elements accessible via keyboard
- Focus order follows logical reading sequence
- Skip links for main content

### Screen Readers

- Semantic HTML structure
- ARIA labels for custom components
- Alternative text for all images and icons

---

## Implementation Notes

### CSS Variables

```css
:root {
  /* Colors */
  --color-oracle-purple: #3A1078;
  --color-desert-sand: #D5B048;
  --color-parchment: #F8F0E0;
  --color-midnight-blue: #0F0F1B;
  --color-terracotta: #A84C32;
  --color-weathered-bronze: #7D6B46;
  --color-tumbleweed: #D4A76A;
  --color-gta-neon: #00FFDD;
  --color-blood-red: #8B0000;
  --color-oracle-glow: #9D72FF;
  --color-frontier-black: #1A1A1A;
  --color-desert-heat: #FF6B35;
  
  /* Typography */
  --font-heading: 'Anton', 'Impact', sans-serif;
  --font-body: 'Inter', 'Poppins', sans-serif;
  --font-accent: 'Roboto Slab', serif;
  
  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-xxl: 5rem;
  
  /* Animations */
  --transition-quick: 200ms cubic-bezier(0.25, 0.8, 0.25, 1);
  --transition-standard: 300ms cubic-bezier(0.25, 0.8, 0.25, 1);
  --transition-elaborate: 600ms cubic-bezier(0.37, 0, 0.63, 1);
  
  /* Shadows */
  --shadow-subtle: 0 2px 4px rgba(0,0,0,0.1);
  --shadow-medium: 0 4px 8px rgba(0,0,0,0.2);
  --shadow-pronounced: 0 10px 20px rgba(0,0,0,0.3);
  --shadow-oracle: 0 0 15px rgba(157, 114, 255, 0.5);
}
```

### Component Examples

#### Oracle Card
```jsx
<div className="oracle-card">
  <div className="oracle-card-image">
    <img src="/path/to/nft.jpg" alt="NFT Title" />
    <div className="oracle-card-badge">
      <span className="oracle-card-price">0.5 ETH</span>
    </div>
  </div>
  <div className="oracle-card-content">
    <h3 className="oracle-card-title">Mystic Desert #042</h3>
    <p className="oracle-card-creator">@frontier_prophet</p>
    <div className="oracle-card-actions">
      <button className="oracle-btn-primary">Claim Prophecy</button>
    </div>
  </div>
</div>
```

#### Oracle Navigation
```jsx
<nav className="oracle-nav">
  <div className="oracle-nav-brand">
    <img src="/images/delphi_oracle_badge_logo.png" alt="delphi." className="oracle-logo" />
    <span className="oracle-wordmark">delphi.</span>
  </div>
  <ul className="oracle-nav-links">
    <li><a href="/marketplace" className="oracle-nav-link">marketplace</a></li>
    <li><a href="/prophecies" className="oracle-nav-link">prophecies</a></li>
    <li><a href="/saloon" className="oracle-nav-link">saloon</a></li>
    <li><a href="/temple" className="oracle-nav-link">temple</a></li>
  </ul>
  <div className="oracle-nav-actions">
    <button className="oracle-btn-secondary">connect wallet</button>
  </div>
</nav>
```

---

## Future Considerations

- **Seasonal Themes**: Special events with enhanced Western or Greek elements
- **Sound Design**: Subtle audio cues for interactions (desert wind, oracle chimes)
- **3D Elements**: Potential for WebGL enhanced experiences
- **AR Features**: Using the Oracle Eye for augmented reality NFT viewing

---

*"In the digital frontier, every prophecy has its price."* - delphi. 