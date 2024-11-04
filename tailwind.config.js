/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        '100vh': '100vh',
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      fontSize: {
        base: "16px", // or whatever size you need
        'custom': '18px',
      },
      fontWeight: {
        normal: "400",
        bold: "700",
      },
      margin: {
        "custom-left": "10px",
        'custom-bottom': '12px',
      },
      screens: {
        xl: "1400px", // Bạn có thể sử dụng tên này để áp dụng cho các màn hình rộng hơn 1400px
        'mdd': '1700px',
        'xl': '1800px',
      },
    },
  },
  plugins: [],
};
