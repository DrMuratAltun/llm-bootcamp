# sunumlar/ — Modül PPTX Sunumları

> **Bu klasör `.gitignore`'da** — `.pptx` çıktıları repo'ya commit edilmez, sadece üretim script'leri (`gen_modul*.js`) izlenir. Üretilen sunumlar Dr. Murat Altun tarafından Drive'a yüklenir; sonra `web/src/data/curriculum.ts` içine `pptxDriveId` olarak yazılır.

## Üretim

Her modül için bir `gen_modulXX.js` scripti `pptxgenjs` kullanır. Build için `pptxgenjs` paketi `vb-yz-90/node_modules/` altında zaten var; NODE_PATH ile bağlanır.

```bash
cd sunumlar
NODE_PATH=/Users/drmurataltun/Documents/vb-yz-90/node_modules \
  node gen_modulXX.js
# çıktı: modulXX_*.pptx
```

Hepsini toplu üretmek için:

```bash
for i in 01 02 03 04 05 06; do
  NODE_PATH=/Users/drmurataltun/Documents/vb-yz-90/node_modules \
    node gen_modul${i}.js
done
```

## Mevcut sunumlar (6 modül · ~3.8 MB toplam)

| # | Dosya | Boyut | Slayt | Süre |
|---|-------|-------|-------|------|
| 1 | `modul01_ml_deployment.pptx` | ~522 KB | 21 | 5 saat |
| 2 | `modul02_llm_temelleri_prompt.pptx` | ~553 KB | 21 | 7 saat |
| 3 | `modul03_huggingface_lokal_llm.pptx` | ~701 KB | 23 | 9 saat |
| 4 | `modul04_rag_mimarisi.pptx` | ~908 KB | 30 | 12 saat |
| 5 | `modul05_fine_tuning_lora.pptx` | ~575 KB | 22 | 6 saat |
| 6 | `modul06_genai_devops_guvenlik.pptx` | ~588 KB | 20 | 3 saat |

**Toplam:** 137 slayt · 42 saat eğitim.

## Tema

"Generative Spectrum" — Primary `#6D28D9` (mor) + Secondary `#EC4899` (magenta) + Accent `#10B981` (emerald).

Template: `~/.claude/pptx-template-llm.js` (`createPres`, `addCoverSlide`, `slideHeader`, `addCard`, `statBox`, `addCodeBlock`, `addClosingSlide` API'leri).

## Drive workflow

1. Dr. Murat 6 PPTX'i Google Drive'a yükler (örn `LLM-Bootcamp-2026/sunumlar/`).
2. Klasör paylaşım URL'sini AI ajanına verir.
3. Ajan her dosyanın Drive ID'sini çıkarıp `web/src/data/curriculum.ts`'teki `modules[i].pptxDriveId` alanını doldurur.
4. Site (drmurataltun.github.io/llm-bootcamp/) PPTX'leri iframe ile gösterir.
