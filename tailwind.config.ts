/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        "timber-green": {
          50: "#effefa",
          100: "#c8fff1",
          200: "#90ffe3",
          300: "#51f7d4",
          400: "#1de4c0",
          500: "#05c7a8",
          600: "#00a189",
          700: "#05806f",
          800: "#0a655a",
          900: "#0e534b",
          950: "#002724",
        },
        "barley-corn": {
          50: "#f6f4f0",
          100: "#e7e5da",
          200: "#d2cbb6",
          300: "#b8ad8c",
          400: "#a3926c",
          500: "#988561",
          600: "#7e6a50",
          700: "#665342",
          800: "#58473b",
          900: "#4d3f36",
          950: "#2b221d",
        },
      },
    },
  },
  plugins: [],
};
