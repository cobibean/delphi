import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
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
        body: ['Inter', 'sans-serif'],
        heading: ['Impact', 'Anton', 'Bebas Neue', 'sans-serif'],
        accent: ['Roboto Slab', 'serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "oracle-embers": "linear-gradient(to right, #ed8936, #b33a3a)",
        "gutter-glow": "linear-gradient(to bottom, #121212, #2d2d2d)",
        "tarnished-fortune": "linear-gradient(to right, #ed8936, #D4AF37)",
        "neon-fever": "linear-gradient(to right, #38b2ac, #6B46C1)",
      },
      borderRadius: {
        'brutal': '0.25rem',
        'jagged': '0.5rem 0.25rem 0.75rem 0.25rem',
      },
      boxShadow: {
        'dark': '0 4px 20px rgba(0, 0, 0, 0.5)',
        'ember': '0 0 15px rgba(237, 137, 54, 0.3)',
        'neon': '0 0 10px rgba(56, 178, 172, 0.3)',
      },
      animation: {
        'glitch': 'glitch 1s infinite',
        'flicker': 'flicker 1.5s infinite',
        'static': 'static 2s ease-in-out infinite',
        'burn-in': 'burn-in 0.5s forwards',
      },
      keyframes: {
        'glitch': {
          '0%': { transform: 'translate(0, 0)' as string },
          '20%': { transform: 'translate(-2px, 2px)' as string },
          '40%': { transform: 'translate(2px, -2px)' as string },
          '60%': { transform: 'translate(-1px, 1px)' as string },
          '80%': { transform: 'translate(1px, -1px)' as string },
          '100%': { transform: 'translate(0, 0)' as string },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'static': {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '20%': { backgroundPosition: '20% 20%' },
          '40%': { backgroundPosition: '60% 40%' },
          '60%': { backgroundPosition: '40% 60%' },
          '80%': { backgroundPosition: '80% 80%' },
        },
        'burn-in': {
          '0%': { opacity: '0', filter: 'brightness(1.5)' },
          '50%': { opacity: '0.5', filter: 'brightness(1.2)' },
          '100%': { opacity: '1', filter: 'brightness(1)' },
        },
      },
      transitionTimingFunction: {
        'glitch': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
    },
  },
  plugins: [
    function({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.text-glitch': {
          position: 'relative',
          '&::before, &::after': {
            content: 'attr(data-text)',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
          },
          '&::before': {
            left: '2px',
            textShadow: '-1px 0 #ed8936',
            animation: 'glitch 0.3s infinite',
            clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
          },
          '&::after': {
            left: '-2px',
            textShadow: '1px 0 #38b2ac',
            animation: 'glitch 0.3s infinite reverse',
            clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
          },
        },
        '.text-ember': {
          textShadow: '0 0 5px rgba(237, 137, 54, 0.7)',
        },
        '.text-neon': {
          textShadow: '0 0 5px rgba(56, 178, 172, 0.7)',
        },
        '.text-blood': {
          textShadow: '0 0 5px rgba(197, 48, 48, 0.7)',
        },
        '.filter-static': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            opacity: '0.05',
            pointerEvents: 'none',
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%\' height=\'100%\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            mixBlendMode: 'overlay',
          },
        },
        '.backdrop-occult': {
          backdropFilter: 'blur(8px) saturate(1.2)',
        },
        '.scorched-border': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '0',
            padding: '1px',
            borderRadius: 'inherit',
            background: 'linear-gradient(to right, #ed8936, #b33a3a)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
export default config;
