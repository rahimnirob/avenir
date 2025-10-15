/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Font families
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Fira Code', 'monospace'],
        inter: ['Inter', 'sans-serif'],
        orbitron: ['Orbitron', 'monospace'],
      },
      
      // Colors for Miren/Avenir theme
      colors: {
        // Base colors
        background: '#000000',
        foreground: '#ffffff',
        
        // Dark theme colors
        dark: {
          DEFAULT: '#0b0b0b',
          100: '#1a1a1a',
          200: '#2d2d2d',
          300: '#3d3d3d',
          400: '#4d4d4d',
          500: '#6d6d6d',
        },
        
        // Cyan accent colors
        cyan: {
          400: '#00e5ff',
          500: '#00ffff',
          600: '#00d4d4',
        },
        
        // Gray scale for text
        gray: {
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          light: '#cccccc',
        },
        
        // Previous color scheme (kept for compatibility)
        primary: {
          DEFAULT: '#10b981',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#1f2937',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#06b6d4',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#374151',
          foreground: '#9ca3af',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        card: {
          DEFAULT: '#111827',
          foreground: '#ffffff',
        },
        popover: {
          DEFAULT: '#111827',
          foreground: '#ffffff',
        },
        border: '#374151',
        input: '#374151',
        ring: '#10b981',
        chart: {
          1: '#10b981',
          2: '#06b6d4',
          3: '#8b5cf6',
          4: '#f59e0b',
          5: '#ef4444',
        },
      },
      
      // Border radius
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.25rem',
      },
      
      // Spacing
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
      },
      
      // Font sizes
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      
      // Keyframes for animations
      keyframes: {
        // Floating particles animation
        'float': {
          '0%, 100%': { 
            transform: 'translateY(0px)', 
            opacity: '0' 
          },
          '50%': { 
            transform: 'translateY(-50px)',
            opacity: '0.5'
          }
        },
        
        // Slide in from right
        'slideIn': {
          'from': { 
            opacity: '0',
            transform: 'translateX(50px)'
          },
          'to': { 
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        
        // Fade in with scale
        'fadeInScale': {
          'from': {
            opacity: '0',
            transform: 'scale(0.8)'
          },
          'to': {
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        
        // Fade in from left
        'fadeInLeft': {
          'from': {
            opacity: '0',
            transform: 'translateX(-50px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        
        // Fade in up
        'fadeInUp': {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        
        // Matrix rain effect
        'matrix-rain': {
          '0%': { transform: 'translateY(-100vh)', opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' }
        },
        
        // Particle float
        'particle-float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' }
        },
        
        // Glow pulse
        'glow-pulse': {
          '0%, 100%': { 
            textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.1)'
          },
          '50%': { 
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
            boxShadow: '0 0 40px rgba(16, 185, 129, 0.2)'
          }
        },
        
        // Terminal blink
        'terminal-blink': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' }
        },
        
        // Shimmer effect
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        
        // Border glow
        'border-glow': {
          '0%, 100%': { 
            borderColor: 'rgba(0, 255, 255, 0.2)',
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)'
          },
          '50%': { 
            borderColor: 'rgba(0, 255, 255, 0.4)',
            boxShadow: '0 0 40px rgba(0, 255, 255, 0.2)'
          }
        },
        
        // Spin
        'spin': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' }
        }
      },
      
      // Animations
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'slideIn': 'slideIn 0.8s ease-out forwards',
        'fadeInScale': 'fadeInScale 1s ease-out forwards',
        'fadeInLeft': 'fadeInLeft 0.8s ease-out forwards',
        'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
        'matrix-rain': 'matrix-rain linear infinite',
        'particle-float': 'particle-float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'terminal-blink': 'terminal-blink 1s infinite',
        'shimmer': 'shimmer 2s infinite',
        'border-glow': 'border-glow 3s ease-in-out infinite',
        'spin': 'spin 1s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      // Backdrop filters
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      
      // Z-index
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [],
}