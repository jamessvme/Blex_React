/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chat-back': 'rgba(72, 57, 105, 0.43)',
      },
      backgroundImage: {
        'login_header': "url('/img/login_header.png')",
      }
    },
  },
  plugins: [],
}