import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
        extend: {
                colors: {
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        },
                        // Custom watchmaker colors
                        gold: {
                                DEFAULT: '#C19A6B',
                                dark: '#8B6914',
                        },
                        chocolate: '#3D2B1F',
                        cream: '#F5F0E6',
                        marble: '#E8E4DE',
                },
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                },
                animation: {
                        'fade-in': 'fadeIn 0.8s ease-out forwards',
                        'slide-up': 'slideUp 0.6s ease-out forwards',
                        'door-open': 'doorOpen 1.2s ease-in-out forwards',
                        'glow': 'glow 2s ease-in-out infinite',
                },
                keyframes: {
                        fadeIn: {
                                '0%': { opacity: '0' },
                                '100%': { opacity: '1' },
                        },
                        slideUp: {
                                '0%': { opacity: '0', transform: 'translateY(20px)' },
                                '100%': { opacity: '1', transform: 'translateY(0)' },
                        },
                        doorOpen: {
                                '0%': { transform: 'perspective(1000px) rotateY(0deg)', opacity: '1' },
                                '100%': { transform: 'perspective(1000px) rotateY(-85deg)', opacity: '0' },
                        },
                        glow: {
                                '0%, 100%': { boxShadow: '0 0 20px rgba(193, 154, 107, 0.3)' },
                                '50%': { boxShadow: '0 0 40px rgba(193, 154, 107, 0.6)' },
                        },
                },
        }
  },
  plugins: [tailwindcssAnimate],
};
export default config;
