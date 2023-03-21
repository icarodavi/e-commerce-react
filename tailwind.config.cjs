/* eslint-disable global-require */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */


module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            inter: ['Inter', ...defaultTheme.fontFamily.sans],
        },
        extend: {
            colors: {
                primary: {
                    light: '##818cf8',
                    default: '#6366f1',
                    dark:  "#3730a3"                                                            ,
                    ...colors.indigo,
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/typography'),
        require('flowbite/plugin'),
        require('preline/plugin'),
        plugin(({ addUtilities }) => {
            addUtilities({
                '.no-scrollbar': {
                    /* IE and Edge */
                    '-ms-overflow-style': 'none',
    
                    /* Firefox */
                    'scrollbar-width': 'none',
    
                    /* Safari and Chrome */
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    }
                },
            })
        }),
    ],
}
    