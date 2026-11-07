/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        hand: ["Caveat", "cursive"],
      },
      colors: { rose: { deep: "#d6204f", soft: "#f8c9d8", cream: "#fbf6ee", wine: "#7a1f3d" } },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
        flicker: { "0%,100%": { transform: "scale(1) rotate(-2deg)" }, "50%": { transform: "scale(1.12,0.95) rotate(2deg)" } },
        wiggle: { "0%,100%": { transform: "rotate(-6deg)" }, "50%": { transform: "rotate(6deg)" } },
        smoke: { "0%": { opacity: 0.8, transform: "translateY(0) scale(1)" }, "100%": { opacity: 0, transform: "translateY(-70px) scale(2.4)" } },
      },
      animation: {
        float: "float 3.2s ease-in-out infinite",
        flicker: "flicker 0.4s ease-in-out infinite",
        wiggle: "wiggle 1.2s ease-in-out infinite",
        smoke: "smoke 1.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
