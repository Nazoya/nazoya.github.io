/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: 'rgb(var(--color-primary) / <alpha-value>)',
				secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
				accient: 'rgb(var(--color-accient) / <alpha-value>)',
			},
			backgroundColor: {
				accient: 'rgb(var(--color-accient) / <alpha-value>)',
			},
			typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: 'normal',
            },
            'code::after': {
              content: 'normal',
            },
          },
        },
      },
		},
	},
	safelist: [
		'pl-0',
		'pl-1',
		'pl-2',
		'pl-3',
		'pl-4',
		'pl-5',
		'pl-6',
		'pl-7',
		'pl-8',
		'pl-9',
  ],
	plugins: [
		require('@tailwindcss/typography'),
	],
}
