/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nasa: {
          void: '#050a14',
          navy: '#0b1329',
          surface: '#101b38',
          card: 'rgba(16, 27, 56, 0.75)',
          border: 'rgba(56, 189, 248, 0.14)',
          borderHover: 'rgba(56, 189, 248, 0.35)',
          blue: '#2563eb',
          blueLight: '#38bdf8',
          cyan: '#06b6d4',
          cyanGlow: '#22d3ee',
          flame: '#f97316',
          flameLight: '#fb923c',
          risk: '#ef4444',
          ok: '#10b981',
          text: '#f1f5f9',
          muted: '#94a3b8',
          subtle: '#64748b'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      boxShadow: {
        'nasa-panel': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(56, 189, 248, 0.12)',
        'nasa-glow': '0 0 25px -5px rgba(56, 189, 248, 0.25)',
        'nasa-card': '0 4px 12px rgba(0, 0, 0, 0.3)'
      }
    },
  },
  plugins: [],
}
