/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: {
        light: '#FDE9E2',
        main: '#F26430',
        dark: '#892B09'
      },
      secondary: {
        light: '#F4F4F9',
        main: '#6761A8',
        dark: '#393662'
      },
      warning: {
        light: '#FEF7DE',
        main: '#F7CB15',
        dark: '#BA9607'
      },
      error: {
        light: '#FCDCE2',
        main: '#E2123C',
        dark: '#810A22'
      },
      success: {
        light: '#E6FFF5',
        main: '#00D07D',
        dark: '#009E60'
      },
      typography: {
        light: '#0E1428',
        main: '#05070F',
        dark: '#010103'
      },
      background: {
        main: '#fff9f7',
        dark: '#ffefeb'
      }
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    }
  },
  plugins: [],
}
