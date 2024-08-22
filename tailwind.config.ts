/** @type {import('tailwindcss').Config} */

function colorVariant(color: string) {
  return {
    DEFAULT: `hsl(var(--${color}))`,
    foreground: `hsl(var(--${color}-foreground))`,
    50: `hsl(var(--${color}-50))`,
    100: `hsl(var(--${color}-100))`,
    200: `hsl(var(--${color}-200))`,
    300: `hsl(var(--${color}-300))`,
    400: `hsl(var(--${color}-400))`,
    500: `hsl(var(--${color}-500))`,
    600: `hsl(var(--${color}-600))`,
    700: `hsl(var(--${color}-700))`,
    800: `hsl(var(--${color}-800))`,
    900: `hsl(var(--${color}-900))`,
    950: `hsl(var(--${color}-950))`,
  };
}

function colorVariants(colors: string[]) {
  return colors.reduce((acc, color) => {
    acc[color] = colorVariant(color);
    return acc;
  }, {} as Record<string, Record<string, string>>);
}

module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/docs/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        robotomono: "var(--font-roboto-mono)",
      },
      screens: {
        '4xs': '150px',
        '3xs': '250px',
        '2xs': '350px',
        'xs': '475px',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        ...colorVariants(['background', 'primary', 'secondary', 'destructive', 'muted', 'accent', 'popover', 'card']),
        textcolor: {
          DEFAULT: "hsl(var(--textcolor-primary))",
          primary: "hsl(var(--textcolor-primary))",
          secondary: "hsl(var(--textcolor-secondary))",
          tertiary: "hsl(var(--textcolor-tertiary))",
        },
        
        "variable-collection-grey": "var(--variable-collection-grey)",
        "variable-collection-indigo": "var(--variable-collection-indigo)",
        "variable-collection-primary-BG": "var(--variable-collection-primary-BG)",
        "variable-collection-primary-BG-duplicate": "var(--variable-collection-primary-BG-duplicate)",
        "variable-collection-secondary-BG": "var(--variable-collection-secondary-BG)",
        
      },
      borderRadius: {
        '2xl': "calc(var(--radius) + 4px)",
        xl: "calc(var(--radius) + 2px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        'middle-box-2/2': 'calc(100vw - 288px - 288px)',
        'middle-box-1/2': 'calc(100vw - 288px)',
        'middle-box-0/2': 'calc(100vw)',
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
  
}