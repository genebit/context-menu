/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}', './*.html'],
    prefix: 'tw-',
    theme: {
        extend: {
            keyframes: {
                scaleUp: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                scaleDown: {
                    '0%': { opacity: '1', transform: 'scale(1)' },
                    '100%': { opacity: '0', transform: 'scale(0.95)' },
                },
            },
            animation: {
                'scale-up': 'scaleUp 0.2s ease-out forwards',
                'scale-down': 'scaleDown 0.2s ease-out forwards',
            },
        },
    },
};
