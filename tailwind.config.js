module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'gray-theme': {
          DEFAULT: '#EFF3F4',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFFFF',
          500: '#EFF3F4',
          600: '#D1DCDF',
          700: '#B3C6CA',
          800: '#94AFB6',
          900: '#7698A1'
        },
        'blue-theme': {
          DEFAULT: '#029BF0',
          50: '#D9F1FF',
          100: '#C0E8FE',
          200: '#8DD6FE',
          300: '#5AC3FE',
          400: '#28B1FD',
          500: '#029BF0',
          600: '#027ABD',
          700: '#015A8B',
          800: '#013958',
          900: '#001826'
        }
      },
      typography: {
        DEFAULT: {
          css: {
            width: '100%',
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
              objectFit: 'scale-down'
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
