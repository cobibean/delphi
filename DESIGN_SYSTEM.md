# Delphi NFT Marketplace - Design System

## Theme Concept: "Digital Oracle"

Delphi blends ancient Greek aesthetics with modern digital art to create a mystical yet playful marketplace where digital prophecies (NFTs) are discovered and traded. This design system creates a unique visual identity that pays homage to the Oracle of Delphi while maintaining a modern, digital feel.

## Color Palette

### Primary Colors
- **Oracle Orange**: `#ed8936` - Primary accent color
- **Oracle Turquoise**: `#38b2ac` - Secondary accent color
- **Night Black**: `#121212` - Rich dark background with subtle texture
- **Parchment**: `#f8f5f0` - Off-white for text and light backgrounds
- **Prophecy Gold**: `#D4AF37` - Metallic gold for important elements and accents

### Gradients
- **Oracle Fire**: Linear gradient from `#ed8936` to `#e05252`
- **Mystic Night**: Linear gradient from `#121212` to `#2d3748`
- **Golden Prophecy**: Linear gradient from `#ed8936` to `#D4AF37`
- **Ethereal Whisper**: Linear gradient from `#38b2ac` to `#805ad5`

## Typography

### Font Selections
- **Headings**: "Cinzel" - A serif font with classical Greek-inspired letterforms
- **Body**: "Inter" - Clean, modern sans-serif for readability
- **Accents**: "Cormorant Garamond" - Elegant serif for special elements and quotes

### Text Styles
- **Heading 1**: Cinzel, bold, tracking wide, with gradient text
- **Heading 2**: Cinzel, semibold, with subtle glow effect
- **Heading 3**: Cinzel, medium weight
- **Body**: Inter, regular weight
- **Accent Text**: Cormorant Garamond, italic
- **Button Text**: Inter, medium weight, tracking wider

## Shape Language & Components

### Card System
- **NFT Cards**: Asymmetrical shapes with diagonal or curved edges
- **Content Cards**: Layered elements with subtle "torn papyrus" edges
- **Info Panels**: Containers with Greek column-inspired borders

### Buttons & Interactive Elements
- **Primary Button**: Gradient background with subtle glow, Greek-inspired shape
- **Secondary Button**: Border with subtle gradient, minimal background
- **Tertiary Button**: Text-only with hover underline animation
- **Toggle/Switch**: Custom oracle eye design that "opens" when active

### Inputs & Forms
- **Text Input**: Semi-transparent background with glowing border on focus
- **Dropdown**: Styled as unfurling scrolls
- **Checkbox/Radio**: Custom designs resembling ancient seals or coins
- **Progress Bar**: Greek meander (key) pattern filling animation

## Decorative Elements

### Patterns & Motifs
- **Greek Key (Meander)**: Border pattern for containers and dividers
- **Constellation Dots**: Connection patterns for related elements
- **Sacred Geometry**: Subtle background patterns and loading states
- **Oracle Symbols**: Custom iconography blending crypto and ancient Greek themes

### Icons & Visual Elements
- **Custom Icon Set**: NFT marketplace actions styled with Greek-inspired details
- **Dividers**: Ornate separator lines with Greek motifs
- **Badges**: Laurel wreath-inspired achievement indicators
- **Loaders**: Oracle-themed animation (revealing prophecy)

## Animation & Interaction

### Micro-interactions
- **Hover Effects**: 
  - Cards subtly tilt in 3D space
  - Buttons pulse with soft glow
  - Images scale slightly
- **Click/Tap Feedback**: Ripple effects with oracle-themed particles
- **State Changes**: Smooth transitions with custom easing

### Page Transitions
- **Page Entry**: Elements fade/slide in from different directions
- **Page Exit**: Content transforms out with mystical dissolve
- **Navigation**: Smooth scrolling with position indicators

### Special Effects
- **Parallax Scrolling**: Multi-layered backgrounds that move at different speeds
- **Particle Effects**: Subtle sparkles/dust on featured elements
- **Text Reveal**: Important text appears as if being "prophesied"

## Component Design Specifications

### Header
- Gradient background with subtle texture
- Logo with integrated Greek column element
- Navigation with hover underline animations
- Wallet button styled as a Greek shield or coin
- Notification bell styled as an oracle bell

### NFT Cards
- Asymmetrical shape with one curved corner
- Layered appearance with oracle-inspired drop shadows
- Custom price tag element resembling an oracle tablet
- Creator badge styled as a laurel wreath
- Custom states for featured/sold/new items
- Hover animation that reveals additional details

### NFT Detail View
- Hero image with parallax scrolling effect
- Stats displayed in oracle-inspired circular meters
- Buy button styled as a ceremonial seal
- History/activity visualized as a mythological timeline
- Related NFTs displayed in a "constellation" pattern

### Wallet Connection
- Connection button as an "Oracle's Seal"
- Dropdown styled as an ancient scroll/tablet
- Address display with custom truncation animation
- Balance visualization as a filling amphora

### Featured Sections
- Hero section with animated geometric background
- Featured NFTs displayed as artifacts on pedestals
- Collections presented with mystical iconography
- Trending section designed as a star chart or constellation

### Modals & Notifications
- Modals styled as oracle prophecies being revealed
- Success notifications with celebration animations
- Error messages styled as warnings from the oracle
- Loading indicators as mystical energy forming

## Responsive Design
- **Mobile Approach**: Simplified but equally mystical presentation
- **Tablet Adjustments**: Reconfigured layouts preserving key design elements
- **Desktop Enhancement**: Full expression of the oracle theme with all animations

## Accessibility Considerations
- High contrast text options
- Alternative non-animated versions of key components
- Screen reader compatible decorative elements
- Focus states clearly visible but integrated with design language

## Implementation Guidelines

### CSS Variables
```css
:root {
  /* Colors */
  --color-orange: #ed8936;
  --color-turquoise: #38b2ac;
  --color-night: #121212;
  --color-parchment: #f8f5f0;
  --color-gold: #D4AF37;
  
  /* Gradients */
  --gradient-oracle-fire: linear-gradient(to right, #ed8936, #e05252);
  --gradient-mystic-night: linear-gradient(to bottom, #121212, #2d3748);
  --gradient-golden-prophecy: linear-gradient(to right, #ed8936, #D4AF37);
  --gradient-ethereal-whisper: linear-gradient(to right, #38b2ac, #805ad5);
  
  /* Shadows */
  --shadow-oracle: 0 4px 20px rgba(237, 137, 54, 0.2);
  --shadow-mystic: 0 8px 30px rgba(0, 0, 0, 0.3);
  
  /* Animations */
  --transition-oracle: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

### Tailwind Extensions
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        oracle: {
          orange: '#ed8936',
          turquoise: '#38b2ac',
          night: '#121212',
          parchment: '#f8f5f0',
          gold: '#D4AF37',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Cormorant Garamond', 'serif'],
      },
      borderRadius: {
        'oracle': '0.5rem 1.5rem 0.5rem 0.5rem',
      },
      boxShadow: {
        'oracle': '0 4px 20px rgba(237, 137, 54, 0.2)',
        'mystic': '0 8px 30px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s infinite',
        'oracle-reveal': 'oracle-reveal 0.5s forwards',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(237, 137, 54, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(237, 137, 54, 0.6)' },
        },
        'oracle-reveal': {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
```

### Example Components

#### Oracle Button
```jsx
function OracleButton({ children, primary = true, ...props }) {
  return (
    <button
      className={`
        relative overflow-hidden px-6 py-3 rounded-oracle font-medium
        transition-all duration-300 transform hover:scale-105
        ${primary 
          ? 'bg-gradient-to-r from-oracle-orange to-oracle-gold text-white shadow-oracle hover:shadow-lg' 
          : 'border-2 border-oracle-orange text-oracle-orange hover:bg-oracle-orange/10'}
      `}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {primary && (
        <span className="absolute inset-0 bg-gradient-to-r from-oracle-gold to-oracle-orange opacity-0 transition-opacity hover:opacity-100"></span>
      )}
    </button>
  );
}
```

#### Oracle Card
```jsx
function OracleCard({ image, title, price, creator }) {
  return (
    <div className="relative transform transition-all duration-300 hover:scale-105 hover:rotate-1">
      <div className="bg-gradient-to-br from-oracle-night to-gray-800 p-4 rounded-oracle border-l-2 border-t-2 border-oracle-orange/30 shadow-mystic">
        <div className="relative overflow-hidden rounded-tl-lg rounded-tr-md rounded-bl-md rounded-br-2xl mb-3">
          <img 
            src={image} 
            alt={title}
            className="w-full h-64 object-cover transform transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute top-3 right-3 bg-oracle-orange bg-opacity-80 rounded-full w-10 h-10 flex items-center justify-center text-white font-display transform rotate-12">
            <span>★</span>
          </div>
        </div>
        
        <h3 className="font-display text-lg text-transparent bg-clip-text bg-gradient-to-r from-oracle-orange to-oracle-gold mb-2">{title}</h3>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <span className="text-gray-400 text-sm">Price:</span>
            <span className="text-white font-bold">{price} METIS</span>
          </div>
          
          <div className="flex items-center bg-gray-800 px-2 py-1 rounded-full border border-oracle-orange/30">
            <span className="text-xs text-oracle-orange">@{creator}</span>
          </div>
        </div>
        
        <button className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-oracle-orange to-oracle-gold rounded-full text-white font-medium transform transition-all duration-300 hover:shadow-oracle hover:shadow-lg">
          View Prophecy
        </button>
      </div>
      
      <div className="absolute -bottom-2 -right-2 w-24 h-1 bg-gradient-to-r from-transparent to-oracle-orange"></div>
      <div className="absolute -bottom-2 -right-2 w-1 h-16 bg-gradient-to-t from-transparent to-oracle-orange"></div>
    </div>
  );
}
```

## Implementation Priority

1. Typography and color system integration
2. NFT card redesign
3. Button and interactive element styling
4. Header and navigation revamp
5. NFT detail page enhancement
6. Special sections (featured, trending, etc.)
7. Micro-interactions and animations
8. Mobile responsiveness adjustments
9. Dark/light mode implementation
10. Performance optimization

## Credits

Design system created for Delphi NFT Marketplace, inspired by the ancient Oracle of Delphi and modern digital aesthetics. 