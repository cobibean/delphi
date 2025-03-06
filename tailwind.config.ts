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
        psycho: {
          orange: '#ed8936',
          turquoise: '#38b2ac',
          black: '#121212',
          parchment: '#f8f5f0',
          gold: '#D4AF37',
          rektPink: '#ff0080',
          kekGreen: '#00ff00',
        },
      },
      fontFamily: {
        body: ['var(--font-space-grotesk)', 'sans-serif'],
        heading: ['var(--font-space-grotesk)'],
        comic: ['var(--font-comic)'],
        display: ['var(--font-space-grotesk)'],
        impact: ['var(--font-impact)'],
        papyrus: ['var(--font-papyrus)'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "fire-discord": "linear-gradient(to right, #ed8936, #e05252)",
        "mystic-meme": "linear-gradient(to bottom, #121212, #2d3748)",
        "golden-gains": "linear-gradient(to right, #ed8936, #D4AF37)",
        "ethereal-degens": "linear-gradient(to right, #38b2ac, #805ad5)",
      },
      borderRadius: {
        'oracle': '0.5rem 1.5rem 0.5rem 0.5rem',
        'meme': '0.75rem 1.25rem 0.5rem 0.25rem',
      },
      boxShadow: {
        'oracle': '0 4px 20px rgba(237, 137, 54, 0.2)',
        'neon': '0 0 10px rgba(255, 0, 128, 0.3)',
        'dual': '0 4px 10px rgba(237, 137, 54, 0.2), 0 0 5px rgba(255, 0, 128, 0.2)',
        'meme': '0 0 5px rgba(255, 0, 128, 0.2)',
      },
      rotate: {
        '1': '1deg',
        '2': '2deg',
        '3': '3deg',
        '5': '5deg',
        '10': '10deg',
      },
      animation: {
        'pulse-subtle': 'pulse 3s ease-in-out infinite',
        'oracle-reveal': 'oracle-reveal 0.5s forwards',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'dynamic-hover': 'dynamic-hover 0.3s ease-out forwards',
      },
      keyframes: {
        'oracle-reveal': {
          '0%': { opacity: 0, transform: 'translateY(10px)' as string },
          '100%': { opacity: 1, transform: 'translateY(0)' as string },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-2deg)' as string },
          '50%': { transform: 'rotate(2deg)' as string },
        },
        'dynamic-hover': {
          '0%': { transform: 'translateY(0)' as string },
          '100%': { transform: 'translateY(-5px)' as string },
        },
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      textShadow: {
        'glow': '0 0 2px rgba(255, 255, 255, 0.7)',
        'neon': '0 0 5px currentColor',
      },
    },
  },
  plugins: [
    function({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.text-glow-pink': {
          textShadow: '0 0 5px rgba(255, 0, 128, 0.7)',
        },
        '.text-glow-oracle': {
          textShadow: '0 0 5px rgba(237, 137, 54, 0.7)',
        },
        '.text-glow-teal': {
          textShadow: '0 0 5px rgba(56, 178, 172, 0.7)',
        },
        '.filter-dynamic': {
          filter: 'var(--filter-value, brightness(1))',
        },
        '.backdrop-greek': {
          backdropFilter: 'blur(8px) saturate(1.2)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
export default config;
