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
        psycho: {
          orange: '#ed8936',
          turquoise: '#38b2ac',
          night: '#121212',
          parchment: '#f8f5f0',
          gold: '#D4AF37',
          rektPink: '#ff0080',
          kekGreen: '#00ff00',
        },
      },
      fontFamily: {
        heading: ['"Comic Sans MS"', 'cursive'], 
        comic: ['"Comic Sans MS"', 'cursive'],
        impact: ['Impact', 'sans-serif'],
        papyrus: ['Papyrus', 'Fantasy', 'serif'],
        body: ['Inter', 'sans-serif'],
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
        'meme': '0.75rem 1.25rem 2rem 0.25rem', // chaotic border
      },
      boxShadow: {
        'meme': '0 0 10px rgba(255, 0, 128, 0.5)',
        'neon': '0 0 15px rgba(0, 255, 0, 0.7)',
      },
      rotate: {
        '1': '1deg',
        '2': '2deg',
        '3': '3deg',
        '5': '5deg',
        '10': '10deg',
      },
      animation: {
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'floating': 'floating 3s ease-in-out infinite',
        'pulse-neon': 'pulse-neon 2s infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' as string },
          '50%': { transform: 'rotate(3deg)' as string },
        },
        floating: {
          '0%, 100%': { transform: 'translateY(0)' as string },
          '50%': { transform: 'translateY(-10px)' as string },
        },
        'pulse-neon': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0, 255, 0, 0.2)' as string },
          '50%': { boxShadow: '0 0 20px rgba(0, 255, 0, 0.8)' as string },
        },
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      }
    },
  },
  plugins: [],
};
export default config;
