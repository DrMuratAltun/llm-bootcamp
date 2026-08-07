# Agent Briefing — LLM Tabanlı Uygulama Geliştirme Atölyesi

Bu dosya, bu repo üzerinde çalışan AI ajanları (Claude, Gemini, vb.) için bağlam, kurallar ve yapılacaklar rehberidir.

## 🎯 Bağlam

- **Eğitim:** LLM Tabanlı Uygulama Geliştirme Atölyesi (BTK Akademi · 6-17 Temmuz 2026 · 42 saat · 6 modül · ileri seviye)
- **Eğitmen:** Dr. Murat Altun
- **Repo:** `DrMuratAltun/llm-bootcamp`
- **Site:** `https://drmurataltun.github.io/llm-bootcamp/`
- **Stack:** Astro 4 + Tailwind CSS v3 + TypeScript (statik site, GitHub Pages)
- **Tema:** "Generative Spectrum" — mor (`#6D28D9`) + magenta (`#EC4899`) + emerald (`#10B981`)

## 📚 Müfredat Yapısı

`web/src/data/curriculum.ts` tek doğruluk kaynağıdır. `Module[]` array'i 6 modül içerir:

| # | Title | Section | Saat | Gün |
|---|-------|---------|------|-----|
| 1 | ML Deployment ve Servisleştirme | TEMEL | 5 | Gün 1 |
| 2 | LLM Temelleri ve Prompt Engineering | TEMEL | 7 | Gün 1-2 |
| 3 | Hugging Face Ekosistemi ve Lokal LLM | EKOSISTEM | 9 | Gün 2-3 |
| 4 | RAG Mimarisi ve Production Patterns | RAG | 12 | Gün 3-5 |
| 5 | Fine-Tuning: PEFT, LoRA ve QLoRA | FINE-TUNING | 6 | Gün 5-6 |
| 6 | GenAI DevOps, Güvenlik ve Capstone | DEVOPS | 3 | Gün 6 |

**Toplam: 42 saat ✓**

## 🧩 Module Interface (curriculum.ts)

```typescript
interface Module {
  id: number;                  // 1-6
  slug: string;                // '01'-'06'
  title: string;
  subtitle: string;            // alt başlık (teknoloji listesi)
  section: string;             // 'TEMEL' | 'EKOSISTEM' | 'RAG' | 'FINE-TUNING' | 'DEVOPS'
  sectionColor: string;        // tailwind class
  days: string;                // "Gün 1" veya "Gün 5-6"
  dateRange: string;           // "6 Temmuz 2026" veya "10-14 Temmuz 2026"
  hours: number;               // modül saati (toplam 42)
  topics: string[];            // ~8-12 madde, kazanım listesi
  notebooks: { name, desc, url? }[];  // 4-8 notebook
  datasets: string[];          // veri seti referansları
  libraries: string[];         // ana kütüphaneler (mono badge'lere düşer)
  assignments: string[];       // 2-3 ödev
  resources: { label, url }[]; // 4-6 dış kaynak linki
  pptxFile: string;            // 'modul0X_xxx.pptx'
  pptxDriveId?: string;        // Drive embed ID — başta undefined
}
```

## 🚧 PPTX & Notebook İş Akışı (Önemli)

CLAUDE.md "Eğitim Platformu Mimari Kuralı" gereği:

1. **PPTX ve `.ipynb` dosyaları repo'ya commit EDİLMEZ** (`.gitignore`'da).
2. Dr. Murat sunumları ve notebook'ları **kendi Drive'ında** tutar.
3. Dr. Murat Drive klasör URL'sini paylaştığında, **agent'in görevi**:
   - `curl -sL` ile public klasör HTML'ini çek
   - Regex ile her dosyanın Drive ID'sini bul
   - Dosya adlarıyla `curriculum.ts`'teki `pptxDriveId` ve `notebooks[].url` alanlarını eşleştirip doldur
   - URL formatı notebook için: `https://colab.research.google.com/drive/{DRIVE_ID}`
4. **AskUserQuestion ile "her dosyanın ID'si ne?" sorma** — bu agent görevi.

## 🎨 Tasarım Kuralları

- Renk paleti `web/tailwind.config.mjs`'de — değiştirmeden önce sor.
- Türkçe karakterler kullanılmalı: ö, ü, ş, ı, ğ, ç, İ, Ö, Ü, Ş, Ğ, Ç (ASCII-only Türkçe YASAK).
- Slug ve dosya isimleri ASCII (`modul/01`, `modul01_ml_deployment.pptx`).
- Mobil responsive (375×667 ve 768×1024 test edilmeli).

## 🔍 SEO Kuralları

- `<html lang="tr">` — Layout.astro'da sabit
- JSON-LD: Course + EducationalOrganization + Person + WebSite (her sayfa) + Course + BreadcrumbList (her modül)
- `sitemap.xml.ts` 8 URL üretir: home + egitmen + modul/01-06
- `robots.txt` Google/Bing/Yandex izinli, sitemap belirtilmiş
- OG image: `web/public/og-image.jpg` (1200×630, <600KB JPEG)
- Favicon: `web/public/favicon.svg` (mor/magenta gradient)

## 🚀 Deploy

GitHub Pages otomatik:
- Push to `main` → `.github/workflows/deploy.yml` tetiklenir
- `cd web && npm ci && npm run build` → `web/dist/` → deploy-pages
- Canlı: `https://drmurataltun.github.io/llm-bootcamp/`

## 📋 Yapılacaklar (Mevcut Durum)

- [x] Astro + Tailwind iskeleti (VB-90 klonundan adapte edildi)
- [x] 6 modüllük curriculum.ts (PDF müfredatından)
- [x] Mor/magenta tema
- [x] Layout.astro (JSON-LD, meta, og-image)
- [x] index.astro (hero + 6 modül grid)
- [x] modul/[id].astro (detay sayfası)
- [x] sitemap.xml.ts (8 URL)
- [x] egitmen.astro (LLM vurgulu)
- [x] robots.txt + favicon.svg
- [x] README.md + .gitignore
- [x] GitHub Pages workflow (mevcut, base path otomatik)
- [ ] **OG image üretimi** (Chrome MCP pipeline: `/tmp/og-banner.html` → screenshot → JPEG)
- [ ] **Drive ID'leri** (Dr. Murat yükledikçe doldurulacak)
- [ ] **PPTX üretimi** (`pptxgenjs` + `~/.claude/pptx-template.js` mor varyantı)
- [ ] **Notebook üretimi** (her modül için 4-8 `.ipynb` — Dr. Murat Drive'ında oluşturur)
- [ ] **GSC kayıt + sitemap submit**

## 🧠 İçerik Üretim Rehberi

Bir modülü güncellemek/genişletmek için:

1. **Source of truth:** `2025-2026 BTK Akademi Yaz Kampları LLM Müfredatı` PDF.
2. **Topics:** PDF'teki kazanım bullet'larını 1-1 düş; 8-12 madde olmalı, Türkçe ve teknik.
3. **Notebooks:** PDF'teki "Yapılacak Etkinlikler" listesini parçala; her `.ipynb` net bir uygulamayı temsil etsin.
4. **Datasets:** Türkçe veri setleri öncelikli (HF Hub'da Türkçe için: `savasy/`, `Anthropic/hh-rlhf-tr`, `merve/turkish_instructions`, vb.).
5. **Libraries:** Modülün ana paketleri, badge'lere düşer; teknik isimler İngilizce kalır.
6. **Assignments:** 2-3 somut, ölçülebilir ödev (kod yazılır + sonuç raporlanır).
7. **Resources:** Resmi dokümantasyonlar + 1-2 araştırma makalesi (arxiv).

## 🤝 İletişim

- **Dr. Murat:** 0507 750 19 82 · emurataltun@gmail.com
- **AI İşbirliği:** `~/.claude/CLAUDE.md` "AI İşbirliği Protokolü" geçerli (Claude = Maker, Gemini = Reviewer, Dr. Murat = karar).
