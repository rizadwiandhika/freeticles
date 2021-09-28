module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            strong: {
              fontWeight: '600'
            },
            h1: {
              // marginBottom: '0.5em'
              margin: '0'
            },
            h2: {
              margin: '0'
            },
            h3: {
              margin: '0'
            },
            p: {
              margin: '0'
            },
            img: {
              margin: 'auto',
              width: '100%',
              objectFit: 'contains'
            },
            a: {
              // color: '',
              '&:hover': {
                color: '#2c5282'
              }
            }
            // br: {
            //   display: 'none'
            // }

            // ...
          }
        }
      }
    }
  },
  variants: {
    extend: {
      display: ['group-hover'],
      cursor: ['hover']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide')
  ]
}
