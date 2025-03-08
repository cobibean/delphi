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
        oracle: {
          orange: '#FF5F1F',
          'orange-hot': '#FF3000',
          'orange-solar': '#FF7A00',
          black: '#121212',
          'black-void': '#000000', 
          'black-matter': '#1D1D1D',
          turquoise: '#00D1C1',
          'turquoise-bright': '#00FFF0',
          'turquoise-deep': '#009E92',
          white: '#F8F5F0',
          gold: '#FFD700',
          purple: '#6B46C1',
          error: '#E53935',
        },
      },
      backgroundImage: {
        'cosmic-combustion': 'linear-gradient(to right, #FF3000, #FF7A00, #FF5F1F)',
        'quantum-entanglement': 'linear-gradient(to right, #00D1C1, #6B46C1, #00FFF0)',
        'event-horizon': 'radial-gradient(circle at center, #1D1D1D, #000000)',
        'hypernova': 'conic-gradient(from 0deg, #FF5F1F, #00D1C1, #6B46C1, #FFD700, #FF5F1F)',
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'reality-distortion': 'realityDistortion 3s infinite',
        'quantum-fluctuation': 'quantumFluctuation 2s infinite',
        'cosmic-pulsation': 'cosmicPulsation 4s infinite',
        'dimensional-rift': 'dimensionalRift 1s forwards',
        'energy-field': 'energyField 5s infinite',
      },
      keyframes: {
        realityDistortion: {
          '0%': { transform: 'scale(1) rotate(0deg) translateZ(0)', filter: 'hue-rotate(0deg) blur(0)' },
          '25%': { transform: 'scale(1.05) rotate(1deg) translateZ(20px)', filter: 'hue-rotate(15deg) blur(1px)' },
          '50%': { transform: 'scale(0.95) rotate(-1deg) translateZ(10px)', filter: 'hue-rotate(-15deg) blur(0.5px)' },
          '75%': { transform: 'scale(1.02) rotate(1deg) translateZ(5px)', filter: 'hue-rotate(5deg) blur(0.2px)' },
          '100%': { transform: 'scale(1) rotate(0deg) translateZ(0)', filter: 'hue-rotate(0deg) blur(0)' },
        },
        quantumFluctuation: {
          '0%, 100%': { opacity: '1', transform: 'translateX(0) skew(0deg)' },
          '15%': { opacity: '0.8', transform: 'translateX(5px) skew(2deg)', filter: 'brightness(1.2) contrast(1.2)' },
          '30%': { opacity: '0.9', transform: 'translateX(-5px) skew(-2deg)', filter: 'brightness(0.8) contrast(0.9)' },
          '45%': { opacity: '0.8', transform: 'translateX(3px) skew(1deg)', filter: 'brightness(1.1) contrast(1.1)' },
          '60%': { opacity: '1', transform: 'translateX(-3px) skew(-1deg)', filter: 'brightness(0.9) contrast(1)' },
          '75%': { opacity: '0.9', transform: 'translateX(2px) skew(0.5deg)', filter: 'brightness(1.05) contrast(1.05)' },
          '90%': { opacity: '0.95', transform: 'translateX(-2px) skew(-0.5deg)', filter: 'brightness(0.95) contrast(0.95)' },
        },
        cosmicPulsation: {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(255, 95, 31, 0.3), 0 0 15px rgba(255, 95, 31, 0.2), 0 0 30px rgba(255, 95, 31, 0.1)',
            transform: 'scale(1)',
          },
          '50%': { 
            boxShadow: '0 0 10px rgba(255, 95, 31, 0.5), 0 0 25px rgba(255, 95, 31, 0.3), 0 0 50px rgba(255, 95, 31, 0.2)',
            transform: 'scale(1.03)',
          },
        },
        dimensionalRift: {
          '0%': { clipPath: 'circle(0% at center)', transform: 'scale(0.8)', filter: 'brightness(2) blur(10px)' },
          '30%': { clipPath: 'circle(50% at center)', transform: 'scale(1.1)', filter: 'brightness(1.5) blur(5px)' },
          '70%': { clipPath: 'circle(70% at center)', transform: 'scale(0.95)', filter: 'brightness(1.2) blur(2px)' },
          '100%': { clipPath: 'circle(125% at center)', transform: 'scale(1)', filter: 'brightness(1) blur(0)' },
        },
        energyField: {
          '0%': { borderColor: 'rgba(255, 95, 31, 0.7)' },
          '25%': { borderColor: 'rgba(0, 209, 193, 0.7)' },
          '50%': { borderColor: 'rgba(107, 70, 193, 0.7)' },
          '75%': { borderColor: 'rgba(255, 215, 0, 0.7)' },
          '100%': { borderColor: 'rgba(255, 95, 31, 0.7)' },
        },
      },
      fontFamily: {
        impact: ['Impact', 'Anton', 'Bebas Neue', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        'roboto-slab': ['Roboto Slab', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
