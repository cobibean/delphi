import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Delphi Colors
        oracle: {
          orange: '#FF5F1F',
          black: '#121212',
          turquoise: '#00D1C1',
          white: '#F8F5F0',
          gold: '#FFD700',
          purple: '#6B46C1',
          error: '#E53935',
        },
        // Keeping the sinister theme for backward compatibility
        sinister: {
          orange: '#ed8936',
          teal: '#38b2ac',
          black: '#121212',
          scroll: '#f8f5f0',
          gold: '#D4AF37',
          red: '#c53030',
          violet: '#6B46C1',
        },
      },
      fontFamily: {
        heading: ['Impact', 'Anton', 'Bebas Neue', 'sans-serif'],
        body: ['Inter', 'Poppins', 'sans-serif'],
        accent: ['Roboto Slab', 'serif'],
      },
      backgroundImage: {
        // New Delphi Gradients
        'oracle-flames': 'linear-gradient(to right, #FF5F1F, #E04D0F)',
        'cosmic-connection': 'linear-gradient(to right, #00D1C1, #6B46C1)',
        'ancient-wisdom': 'linear-gradient(to bottom, #121212, #2D2D2D)',
        'golden-prophecy': 'linear-gradient(to right, #FF5F1F, #FFD700)',
        // Keeping original gradients for backward compatibility
        'oracle-embers': 'linear-gradient(to right, #ed8936, #b33a3a)',
        'gutter-glow': 'linear-gradient(to bottom, #121212, #2d2d2d)',
        'tarnished-fortune': 'linear-gradient(to right, #ed8936, #D4AF37)',
        'neon-fever': 'linear-gradient(to right, #38b2ac, #6B46C1)',
      },
      boxShadow: {
        'dark': '0 4px 20px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 12px 24px rgba(0, 0, 0, 0.15)',
        'card-normal': '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'glitch': 'glitch 1s infinite',
        'flicker': 'flicker 1.5s infinite',
        'oracle-pulse': 'oraclePulse 2s infinite',
        'digital-glitch': 'digitalGlitch 0.3s ease',
        'cosmic-flow': 'cosmicFlow 3s ease infinite',
        'card-hover': 'cardHover 0.3s forwards',
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(2px, -2px)' },
          '60%': { transform: 'translate(-1px, 1px)' },
          '80%': { transform: 'translate(1px, -1px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        oraclePulse: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(255, 95, 31, 0)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 95, 31, 0.4)' },
        },
        digitalGlitch: {
          '0%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(2px, -2px)' },
          '60%': { transform: 'translate(-1px, 1px)' },
          '80%': { transform: 'translate(1px, -1px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        cosmicFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        cardHover: {
          '0%': { transform: 'translateY(0)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' },
          '100%': { transform: 'translateY(-5px)', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.text-gradient-oracle': {
          background: 'linear-gradient(to right, #FF5F1F, #E04D0F)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          'color': 'transparent',
          'display': 'inline-block',
        },
        '.text-gradient-cosmic': {
          background: 'linear-gradient(to right, #00D1C1, #6B46C1)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          'color': 'transparent',
          'display': 'inline-block',
        },
        '.text-gradient-golden': {
          background: 'linear-gradient(to right, #FF5F1F, #FFD700)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          'color': 'transparent',
          'display': 'inline-block',
        },
        '.text-gradient-neon': {
          background: 'linear-gradient(to right, #38b2ac, #6B46C1)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          'color': 'transparent',
          'display': 'inline-block',
        },
        '.oracle-texture': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            opacity: '0.03',
            pointerEvents: 'none',
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%\' height=\'100%\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            mixBlendMode: 'overlay',
            zIndex: '-1',
          },
        },
        '.glitch-key-pattern': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '12px',
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'12\' viewBox=\'0 0 100 12\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0H4V4H0V0ZM8 0H12V4H8V0ZM16 0H20V4H16V0ZM24 0H28V4H24V0ZM32 0H36V4H32V0ZM40 0H44V4H40V0ZM48 0H52V4H48V0ZM56 0H60V4H56V0ZM64 4H68V8H64V4ZM72 4H76V8H72V4ZM80 4H84V8H80V4ZM88 4H92V8H88V4ZM96 4H100V8H96V4ZM0 8H4V12H0V8ZM8 8H12V12H8V8ZM16 8H20V12H16V8ZM24 8H28V12H24V8ZM32 8H36V12H32V8ZM40 8H44V12H40V8ZM48 8H52V12H48V8ZM56 8H60V12H56V8Z\' fill=\'%23FF5F1F\' fill-opacity=\'0.2\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat-x',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '12px',
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'12\' viewBox=\'0 0 100 12\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0H4V4H0V0ZM8 0H12V4H8V0ZM16 0H20V4H16V0ZM24 0H28V4H24V0ZM32 0H36V4H32V0ZM40 0H44V4H40V0ZM48 0H52V4H48V0ZM56 0H60V4H56V0ZM64 4H68V8H64V4ZM72 4H76V8H72V4ZM80 4H84V8H80V4ZM88 4H92V8H88V4ZM96 4H100V8H96V4ZM0 8H4V12H0V8ZM8 8H12V12H8V8ZM16 8H20V12H16V8ZM24 8H28V12H24V8ZM32 8H36V12H32V8ZM40 8H44V12H40V8ZM48 8H52V12H48V8ZM56 8H60V12H56V8Z\' fill=\'%23FF5F1F\' fill-opacity=\'0.2\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat-x',
            transform: 'rotate(180deg)',
          },
        },
        '.constellation': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255, 95, 31, 0.03) 1px, transparent 1px), radial-gradient(circle at 50% 70%, rgba(0, 209, 193, 0.03) 1px, transparent 1px), radial-gradient(circle at 80% 40%, rgba(107, 70, 193, 0.03) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
            pointerEvents: 'none',
            zIndex: '-1',
          },
        },
        '.hover-lift': {
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
          },
        },
        '.hover-glitch': {
          transition: 'all 0.3s ease',
          '&:hover': {
            animation: 'digitalGlitch 0.3s ease forwards',
          },
        },
        '.btn-flicker': {
          '&:hover': {
            animation: 'flicker 1.5s infinite',
          },
        },
        '.btn-pulse': {
          '&:hover': {
            animation: 'oraclePulse 2s infinite',
          },
        },
        '.bg-oracle-flames': {
          background: 'linear-gradient(to right, #FF5F1F, #E04D0F)',
        },
        '.bg-cosmic-connection': {
          background: 'linear-gradient(to right, #00D1C1, #6B46C1)',
        },
        '.bg-ancient-wisdom': {
          background: 'linear-gradient(to bottom, #121212, #2D2D2D)',
        },
        '.bg-golden-prophecy': {
          background: 'linear-gradient(to right, #FF5F1F, #FFD700)',
        },
        // Maintaining backward compatibility
        '.bg-oracle-embers': {
          background: 'linear-gradient(to right, #ed8936, #b33a3a)',
        },
        '.bg-gutter-glow': {
          background: 'linear-gradient(to bottom, #121212, #2d2d2d)',
        },
        '.bg-tarnished-fortune': {
          background: 'linear-gradient(to right, #ed8936, #D4AF37)',
        },
        '.bg-neon-fever': {
          background: 'linear-gradient(to right, #38b2ac, #6B46C1)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

export default config;


