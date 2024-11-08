/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				urbanist: ["var(--font-urbanist)"],
				istok: ["var(--font-istok)"],
			},
			colors: {
				ibm: {
					yellow: "#ffb000",
					orange: "#fe6100",
					pink: "#dc267f",
					purple: "#785ef0",
					blue: "#648fff",
				},
			},
			keyframes: {
				marquee: {
					"0%": { transform: "translateX(0%)" },
					"100%": { transform: "translateX(-100%)" },
				},
				"marquee-continuation": {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(0%)" },
				},
			},
			animation: {
				marquee: "marquee 30s linear infinite",
				"marquee-continuation": "marquee-continuation 30s linear infinite",
			},
		},
	},
	plugins: [],
};
