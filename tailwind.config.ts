import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			screens: {
				mmd: { max: '768px' }
			},
			spacing: {
				r1: '1rem',
				r2: '2rem'
			},
			backgroundImage: {
				gradient1: 'linear-gradient(to bottom, rgba(20,20,20,0), rgba(20,20,20,1))'
			},
			keyframes: {
				rotation: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'ani-rotation': 'rotation 1s linear infinite'
			}
		}
	},
	plugins: [require('tailwind-scrollbar'), require('tailwind-scrollbar-hide')],
	'headwind.runOnSave': true
};
export default config;
