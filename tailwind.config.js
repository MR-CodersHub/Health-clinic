/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        medical: {
          DEFAULT: '#10B981', // Medical green (Emerald-500)
          dark: '#047857',    // Emerald-700
          light: '#D1FAE5',   // Soft mint (Emerald-100)
          deep: '#064E3B',    // Dark green footer (Emerald-900)
        },
        neutral: {
          light: '#F9FAFB',
          DEFAULT: '#E5E7EB',
          dark: '#374151',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(16, 185, 129, 0.1), 0 2px 4px -1px rgba(16, 185, 129, 0.06)',
      }
    },
  },
  plugins: [],
}
