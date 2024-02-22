/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,jsx}"],
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
};
