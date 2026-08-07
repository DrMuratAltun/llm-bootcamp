# 🦙 LLM Tabanlı Uygulama Geliştirme Atölyesi

**Dr. Murat Altun · BTK Akademi · 42 saatlik ileri seviye uygulamalı atölye · 6 gün · 6 modül**

🌐 **Site:** [drmurataltun.github.io/llm-bootcamp](https://drmurataltun.github.io/llm-bootcamp/)
📅 **Tarihler:** 6 Temmuz - 17 Temmuz 2026

## Müfredat

| Bölüm | Modül | Konular | Saat |
|---|---|---|---|
| **A — Temel** (12 saat) | 1-2 | ML deployment (FastAPI + Docker + HF), LLM temelleri, prompt engineering, function calling | 5+7 |
| **B — Ekosistem & RAG** (21 saat) | 3-4 | Hugging Face ekosistemi, Ollama, LM Studio, GGUF, RAG mimarisi (LangChain, LangGraph, ChromaDB, RAGAS) | 9+12 |
| **C — Fine-Tune & DevOps** (9 saat) | 5-6 | PEFT/LoRA/QLoRA fine-tuning (Unsloth, Axolotl), GGUF conversion, Google AI Studio, Antigravity, prompt injection savunması, capstone | 6+3 |

**Toplam:** 6 modül × değişken saat = **42 saat** (günde 7 saat × 6 gün)

## Yapı

```
llm-bootcamp/
├── README.md
├── AGENT_BRIEFING.md             # Modül içerik üretimi için agent talimatı
├── .github/workflows/deploy.yml  # GitHub Pages otomatik deploy
└── web/                          # Astro statik site
    ├── astro.config.mjs          # base: '/llm-bootcamp/'
    ├── tailwind.config.mjs       # Generative Spectrum paleti (mor/magenta/emerald)
    ├── src/
    │   ├── data/curriculum.ts    # 6 modül müfredatı (Module[] interface)
    │   ├── layouts/Layout.astro  # Sayfa iskeleti + JSON-LD (Course, Person, Org, WebSite)
    │   └── pages/
    │       ├── index.astro       # Program özeti + 6 modül kartı
    │       ├── egitmen.astro     # Dr. Murat Altun profili
    │       ├── modul/[id].astro  # Modül detay (PPTX iframe + konular/ödevler/notebook/kaynaklar)
    │       └── sitemap.xml.ts    # 8 URL dinamik sitemap
    └── public/
        ├── favicon.svg
        ├── og-image.jpg          # 1200×630 sosyal paylaşım kartı
        └── robots.txt
```

## Tema

**"Generative Spectrum"** — LLM/GenAI/RAG vibe.
- Primary: `#6D28D9` (mor)
- Secondary: `#EC4899` (magenta)
- Accent: `#10B981` (emerald)
- Arka plan: `#FAF7FF` (lavender cream)

Diğer Dr. Murat Altun bootcamp paletlerinden net biçimde farklı:
- VB-YZ-90: Warm Terracotta
- Deep Learning: Neural Blue
- Computer Vision: Cinema Noir

## Geliştirme

```bash
# Web sitesi
cd web
npm install
npm run dev      # http://localhost:4321/llm-bootcamp/
npm run build    # dist/ üretir
npm run preview  # build edileni önizle
```

## Drive Entegrasyonu (Sunum & Notebook)

Eğitmen Dr. Murat Altun PPTX ve Jupyter notebook dosyalarını **Google Drive'da** tutar (klon riski yok, tek elden kontrol).
Dr. Murat klasör URL'sini paylaştığında her dosyanın Drive ID'si `curriculum.ts`'teki ilgili alanlara doldurulur:

- `modules[i].pptxDriveId` — Drive embed iframe için
- `modules[i].notebooks[j].url` — `https://colab.research.google.com/drive/{DRIVE_ID}`

PPTX ve `.ipynb` dosyaları **repo'ya commit edilmez** (`.gitignore`'da `notebooks/`, `sunumlar/`).

## Deploy

GitHub Pages otomatik deploy:
- `main` branch'e push → `.github/workflows/deploy.yml` tetiklenir
- Astro `npm run build` → `web/dist/` → upload-pages-artifact → deploy-pages
- Canlı URL: `https://drmurataltun.github.io/llm-bootcamp/`

## Lisans

Bu repo Dr. Murat Altun'a ait özel materyaller içerir. Sunum ve notebook'lar **eğitim amaçlıdır**, izinsiz dağıtılamaz. Web sitesi herkese açık ama içerik sahibi Dr. Murat Altun'dur.

## İletişim

🏢 Kurumsal eğitim: **0507 750 19 82**
📧 [drmurataltun.github.io](https://drmurataltun.github.io/)
🐙 [GitHub: DrMuratAltun](https://github.com/DrMuratAltun)
🎓 [yapayzekaokulum.com](https://www.yapayzekaokulum.com/)
