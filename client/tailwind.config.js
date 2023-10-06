/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['32px', '52px'],
      '8xl': ['96px', '106px']
    },
    extend: {
      screens: {
        'xs': '320px',
        '2xl': '1210px'
      },
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        varela: ['Varela Round', 'sans-serif'],
        lora: ['Lora', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
      colors: {
        'primary': "#444",
        "coral-red": "lightcoral",
        "slate-gray": "#6D6D6D",
        "pale-gray": "#999",
        "gold": "#be9656",
        "beige": "#FAF8F3" //#FFF5CF
      },
      boxShadow: {
        '3xl': 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
      },
      backgroundImage: {
        'hero': "url('https://images.unsplash.com/photo-1524126674340-63807415b0f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')",
        'card': "url('assets/images/thumbnail-background.svg')",
      },
    },
  },
  plugins: [],
}
