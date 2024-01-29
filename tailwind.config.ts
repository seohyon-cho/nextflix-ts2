import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		// 기존의 preset을 커스텀 preset으로 덮어쓰기
		// screens: {
		// 	md: { max: '768px' } // 기본 설정인 min-width 제거하고, max-width로 미디어쿼리 재설정
		// },
		extend: {
			screens: {
				mmd: { max: '768px' }
			},
			// extend 안쪽에 내가 쓰고 싶은 커스텀 속성을 입력 시,
			// 기존의 tailwind preset을 유지하면서 나만의 preset을 추가
			// 꼭 extend 지우지 않고 그 안에 넣어야 함.
			spacing: {
				// 1이라는 단위를 1rem단위로 변경
				r1: '1rem',
				r2: '2rem'
			}
		}
	},
	plugins: []
};
export default config;
