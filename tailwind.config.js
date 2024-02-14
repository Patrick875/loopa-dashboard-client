/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{html,js,jsx}",
		"node_modules/flowbite-react/lib/esm/**/*.js",
	],
	theme: {
		extend: {
			backgroundImage: {
				"login-bg": "url('/login-bg.png')",
			},
			fontFamily: {
				nunito: ["Nunito", "sans-serif"],
			},
		},
	},
	plugins: [require("flowbite/plugin")],
};
