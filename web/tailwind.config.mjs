/** @type {import('tailwindcss').Config} */
// LLM TABANLI UYGULAMA GELİŞTİRME ATÖLYESİ — "Generative Spectrum" teması
// Mor + Magenta + Emerald → LLM/GenAI/RAG/Fine-tuning dünyasının teknik ama sıcak hissi
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary:   '#6D28D9',   // Mor — başlıklar, CTA (LLM core)
        secondary: '#EC4899',   // Magenta — enerji, aksiyon (Generative spark)
        accent:    '#10B981',   // Emerald — vurgu, ipucu (Vector / embedding success)
        cream:     '#FAF7FF',   // Lavanta-cream (arka plan)
        warmBg:    '#F5F0FE',   // Violet-50 (kart arka plan)
        cardBg:    '#FFFFFF',
        dark:      '#1F1B2E',   // Çok koyu indigo (koyu metin / kapak)
        mid:       '#4B445C',   // Mid violet-gray (ikincil metin)
        subtle:    '#9B92AC',   // Soft violet-gray (hint)
        border:    '#E5DEF6',   // Açık mor-pembe (kenarlık)
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
