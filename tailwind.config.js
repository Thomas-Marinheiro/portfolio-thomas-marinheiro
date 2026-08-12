/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#18181B",      // Grafite Fosco
          card: "#27272A",    // Cinza Escuro
          border: "#3F3F46",  // Cinza Borda
          hover: "#323238",   // Hover Card
          text: "#F8FAFC",    // Branco Gelo
          muted: "#94A3B8",   // Cinza Suave Texto
          mint: "#00F5A0",    // Verde Menta Elétrico
          mintGlow: "rgba(0, 245, 160, 0.15)",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        'mint-glow': '0 0 25px rgba(0, 245, 160, 0.2)',
        'mint-glow-lg': '0 0 45px rgba(0, 245, 160, 0.35)',
        'card-glow': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        pulseMint: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(0.96)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-mint': 'pulseMint 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
