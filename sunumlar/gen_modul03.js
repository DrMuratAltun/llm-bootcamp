/**
 * MODÜL 3 — Hugging Face Ekosistemi ve Lokal LLM
 * 23 slayt · Generative Spectrum · Dr. Murat Altun · BTK Akademi 2026
 */
const T = require('/Users/drmurataltun/.claude/pptx-template-llm.js');
const { C } = T;

const TOTAL = 23;
const SECTION = 'MODÜL 3 · EKOSİSTEM';
const MOD_LABEL = 'MODÜL 3';
// Modül 3 ana renk vurgusu: secondary (magenta)
const HEAD = C.sec;

const pres = T.createPres('Modül 3 — Hugging Face Ekosistemi ve Lokal LLM', 'Dr. Murat Altun');

// ═══════════════════════ 1) KAPAK ═══════════════════════
T.addCoverSlide(
  pres,
  'Hugging Face Ekosistemi\nve Lokal LLM',
  'HF Hub · Transformers · Datasets · Ollama\nLM Studio · GGUF · Streamlit',
  'Dr. Murat Altun  ·  Modül 3  ·  Gün 2-3 (9 saat)',
  [
    { value: '9',  label: 'SAAT' },
    { value: '11', label: 'KONU' },
    { value: '6',  label: 'NOTEBOOK' },
    { value: '3',  label: 'ÖDEV' },
  ]
);
(function () {
  const s = pres.slides[pres.slides.length - 1];
  s.addShape(pres.shapes.RECTANGLE, { x: 6.7, y: 5.17, w: 2.4, h: 0.3, fill: { color: C.sec } });
  s.addText('BTK AKADEMİ · LLM BOOTCAMP', { x: 6.7, y: 5.17, w: 2.4, h: 0.3, margin: 0, fontFace: 'Calibri', fontSize: 8, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle', charSpacing: 2 });
})();

// ═══════════════════════ 2) AGENDA ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Bu Modülde Neler Var?', SECTION, C.cream, TOTAL);

  const items = [
    { icon: '1', t: 'Hugging Face Hub',            d: 'Models · Datasets · Spaces — keşif, model card, lisans' },
    { icon: '2', t: 'Transformers Pipeline',       d: 'NER, çeviri, özetleme, QA — tek satırda inference' },
    { icon: '3', t: 'AutoModel + Tokenizer',       d: 'Manuel inference akışı, batch, attention mask' },
    { icon: '4', t: 'Datasets Kütüphanesi',        d: 'load_dataset, map, filter, streaming büyük veri' },
    { icon: '5', t: 'Quantization',                d: '4-bit/8-bit, GGUF, AWQ, GPTQ — bellek tasarrufu' },
    { icon: '6', t: 'Ollama + LM Studio',          d: 'Lokal LLM, REST API, OpenAI-uyumlu endpoint' },
  ];
  const colors = [C.pri, C.sec, C.acc, C.pri, C.sec, C.acc];

  items.forEach((it, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * 4.75;
    const y = 1.15 + row * 1.32;

    T.addCard(pres, s, x, y, 4.5, 1.15, { leftColor: colors[i] });
    T.numBadge(pres, s, x + 0.18, y + 0.18, it.icon, colors[i]);
    s.addText(it.t, { x: x + 0.7, y: y + 0.13, w: 3.6, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.dark });
    s.addText(it.d, { x: x + 0.7, y: y + 0.5,  w: 3.6, h: 0.6, margin: 0, fontFace: 'Calibri', fontSize: 10, color: C.mid });
  });
})();

// ═══════════════════════ 3) HF HUB ÜÇ AYAK ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Hugging Face Hub: Üç Ana Sütun', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 2.95, 3.85, { topColor: C.pri });
  s.addText('🤗  Models', { x: 0.6, y: 1.15, w: 2.8, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 16, bold: true, color: C.pri });
  s.addText('1M+ pretrained model.\nLisans + model card + metrik.\nsafetensors / GGUF / ONNX format.\ngit-lfs altyapısı, sürüm yönetimi.\n\nFiltre: task, dil, lisans,\nframework, parametre boyutu.\n\nTürkçe öne çıkanlar:\n• savasy/ (BERT sentiment)\n• dbmdz/ (BERTurk)\n• ytu-ce-cosmos/ (Türk GPT)',
    { x: 0.6, y: 1.55, w: 2.8, h: 3.3, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });

  T.addCard(pres, s, 3.55, 1.05, 2.95, 3.85, { topColor: C.sec });
  s.addText('📚  Datasets', { x: 3.65, y: 1.15, w: 2.8, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 16, bold: true, color: C.sec });
  s.addText('200K+ açık veri seti.\nload_dataset() ile tek satır.\nParquet / Arrow native depolama.\n\nBüyük setler için streaming mod\n— bellek sınırlamasız.\n\nmap, filter, select, train_test_split\nile hızlı dönüşüm.\n\nTürkçe örnek setler:\n• savasy/ttc4900\n• Helsinki-NLP/opus_tatoeba_tr\n• ytu-ce-cosmos/turkish-wiki',
    { x: 3.65, y: 1.55, w: 2.8, h: 3.3, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });

  T.addCard(pres, s, 6.6, 1.05, 2.95, 3.85, { topColor: C.acc });
  s.addText('🚀  Spaces', { x: 6.7, y: 1.15, w: 2.8, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 16, bold: true, color: C.acc });
  s.addText('Gradio / Streamlit / Docker demo.\nÜcretsiz CPU + ödemeli GPU.\nZeroGPU ile paylaşımlı T4.\n\nPublic URL + custom domain.\nGitHub-benzeri PR, commit, fork.\n\nTopluluk öne çıkanlar:\n• HuggingChat (chat arayüzü)\n• MTEB leaderboard\n• Open LLM Leaderboard\n• Chatbot Arena (LMSys)',
    { x: 6.7, y: 1.55, w: 2.8, h: 3.3, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });

  T.addCard(pres, s, 0.5, 5.0, 9.0, 0.5, { bg: C.warmBg, leftColor: HEAD });
  s.addText('💡  HF Hub = LLM dünyasının GitHub + Docker Hub + Kaggle birleşimi.',
    { x: 0.7, y: 5.02, w: 8.8, h: 0.46, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 4) MODEL CARD OKUMA ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Model Card: Bir Modeli Production\'a Almadan Önce Kontrol Listen', SECTION, C.cream, TOTAL);

  const checks = [
    { n: 1, t: 'Lisans',            d: 'apache-2.0 / mit → ticari OK · llama2 → 700M kullanıcı limiti · cc-by-nc → ticari YASAK', c: C.pri },
    { n: 2, t: 'Eğitim verisi',     d: 'Hangi dil(ler)? Common Crawl mı, kurumsal mı? Toxic içerik filtresi var mı?', c: C.sec },
    { n: 3, t: 'Boyut + format',    d: 'Parametre sayısı (1.3B / 7B / 13B / 70B), tensor type (FP16/BF16), safetensors var mı?', c: C.acc },
    { n: 4, t: 'Benchmark sonuçları', d: 'MMLU / HellaSwag / TR-MMLU / Open LLM Leaderboard skorları — başka modelle karşılaştır', c: C.purple },
    { n: 5, t: 'Bias + limitations', d: 'Halüsinasyon, kültürel/dil bias raporu, güvenli kullanım uyarıları', c: C.cyan },
    { n: 6, t: 'Citation + paper',   d: 'arXiv link, BibTeX — akademik kullanımda zorunlu', c: C.amber },
  ];
  checks.forEach((ch, i) => {
    const y = 1.05 + i * 0.66;
    T.addCard(pres, s, 0.5, y, 9.0, 0.6, { leftColor: ch.c });
    T.numBadge(pres, s, 0.7, y + 0.12, ch.n, ch.c);
    s.addText(ch.t, { x: 1.3, y: y + 0.06, w: 2.3, h: 0.5, margin: 0, fontFace: 'Calibri', fontSize: 12, bold: true, color: C.dark, valign: 'middle' });
    s.addText(ch.d, { x: 3.7, y: y + 0.06, w: 5.7, h: 0.5, margin: 0, fontFace: 'Calibri', fontSize: 10, color: C.mid, valign: 'middle' });
  });
})();

// ═══════════════════════ 5) TRANSFORMERS PIPELINE TABLOSU ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Transformers pipeline() — Tek Satırda Inference', SECTION, C.cream, TOTAL);

  const headers = ['Task', 'pipeline() string', 'Örnek model', 'Çıktı tipi'];
  const rows = [
    ['Metin sınıflandırma',  '"text-classification"',  'savasy/bert-base-turkish-sentiment', 'label + score'],
    ['NER',                   '"ner"',                  'savasy/bert-base-turkish-ner-cased', 'entity list'],
    ['Çeviri',                '"translation_tr_to_en"', 'Helsinki-NLP/opus-mt-tr-en',         'translation_text'],
    ['Özetleme',              '"summarization"',        'mukayese/turkish-summarization-bart', 'summary_text'],
    ['Soru-Cevap',            '"question-answering"',   'savasy/bert-base-turkish-squad',     'answer + score'],
    ['Konuşma → metin',       '"automatic-speech-recognition"', 'openai/whisper-small',       'text'],
    ['Görüntü sınıflandırma', '"image-classification"', 'google/vit-base-patch16-224',        'label + score'],
    ['Metin üretimi',         '"text-generation"',      'ytu-ce-cosmos/turkish-gpt2-large',   'generated_text'],
  ];

  // Header bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.05, w: 9.0, h: 0.42, fill: { color: C.pri } });
  const colW = [2.3, 2.6, 2.7, 1.4];
  let cx = 0.5;
  headers.forEach((h, i) => {
    s.addText(h, { x: cx, y: 1.05, w: colW[i], h: 0.42, margin: 0, fontFace: 'Calibri', fontSize: 10.5, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
    cx += colW[i];
  });
  // Rows
  rows.forEach((r, i) => {
    const y = 1.47 + i * 0.45;
    const bg = i % 2 === 0 ? C.warmBg : 'FFFFFF';
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 0.45, fill: { color: bg }, line: { color: C.bdr, width: 0.5 } });
    let xx = 0.5;
    r.forEach((cell, j) => {
      const fontFace = j === 1 || j === 2 ? 'Consolas' : 'Calibri';
      s.addText(cell, { x: xx + 0.08, y, w: colW[j] - 0.15, h: 0.45, margin: 0, fontFace, fontSize: j === 1 || j === 2 ? 9 : 10, color: j === 0 ? C.dark : C.mid, bold: j === 0, valign: 'middle' });
      xx += colW[j];
    });
  });

  s.addText('💡  pipeline() = model + tokenizer + post-processing → tek API. Prototip için ideal; production\'da AutoModel ile daha fazla kontrol.',
    { x: 0.5, y: 5.1, w: 9, h: 0.4, margin: 0, fontFace: 'Calibri', fontSize: 10, bold: true, color: HEAD });
})();

// ═══════════════════════ 6) AUTOMODEL VS PIPELINE ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'AutoModel + AutoTokenizer · Manuel Inference Akışı', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.pri });
  s.addText('pipeline() ne zaman?', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.pri });
  s.addText([
    { text: '✓ Hızlı prototip\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Tek girdi, tek çıktı\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Post-processing standart\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✗ Batch optimize değil\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '\n', options: {} },
    { text: 'AutoModel ne zaman?', options: { fontSize: 13, color: C.acc, bold: true } },
    { text: '\n✓ Batch inference + padding\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Custom post-processing\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Attention output, hidden states\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Embedding çıkarımı (mean-pool)\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Quantization + device_map\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.4, margin: 0, fontFace: 'Calibri' });

  T.addCodeBlock(pres, s, 5.1, 1.05, 4.5, 3.95, [
    { text: 'from ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'transformers ', options: { color: C.codeBlue, fontSize: 10 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 10 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    AutoTokenizer, AutoModelForSequenceClassification)\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'torch\n\n', options: { color: C.codeBlue, fontSize: 10, breakLine: true } },
    { text: 'MID = ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"savasy/bert-base-turkish-sentiment-cased"\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: 'tok = AutoTokenizer.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'from_pretrained', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(MID)\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'mdl = AutoModelForSequenceClassification.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'from_pretrained', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(MID)\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'texts = [', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"Harika ürün."', options: { color: C.codeRed, fontSize: 10 } },
    { text: ', ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"Berbat."', options: { color: C.codeRed, fontSize: 10 } },
    { text: ']\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'enc = ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'tok', options: { color: C.codeYellow, fontSize: 10 } },
    { text: '(texts, padding=', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'True', options: { color: C.codePurple, fontSize: 10 } },
    { text: ', return_tensors=', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"pt"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ')\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'with ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'torch.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'no_grad', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '():\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    out = ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'mdl', options: { color: C.codeYellow, fontSize: 10 } },
    { text: '(**enc).logits\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'probs = ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'torch.softmax', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(out, dim=-', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '1', options: { color: C.codeYellow, fontSize: 10 } },
    { text: ')\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'labels = probs.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'argmax', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(-', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '1', options: { color: C.codeYellow, fontSize: 10 } },
    { text: ').tolist()', options: { color: C.codeWhite, fontSize: 10 } },
  ]);
})();

// ═══════════════════════ 7) DATASETS KÜTÜPHANESİ PIPELINE ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Datasets Kütüphanesi: load → map → filter → ready', SECTION, C.cream, TOTAL);

  const stages = [
    { n: 1, t: 'load_dataset',    d: 'HF Hub\'dan\nveya Parquet/CSV', c: C.pri },
    { n: 2, t: 'map(tokenize)',   d: 'Batched + parallel\ntokenization',  c: C.sec },
    { n: 3, t: 'filter(quality)', d: 'Boş, kısa, toxic\nkayıtları at',    c: C.acc },
    { n: 4, t: 'shuffle + split', d: 'train/val/test\nayrımı',            c: C.purple },
    { n: 5, t: 'DataLoader',      d: 'PyTorch ile\nbatch eğitim',         c: C.cyan },
  ];
  stages.forEach((st, i) => {
    const x = 0.45 + i * 1.85;
    const y = 1.4;
    s.addShape(pres.shapes.OVAL, { x, y, w: 1.6, h: 1.6, fill: { color: st.c } });
    s.addText(String(st.n), { x, y, w: 1.6, h: 1.6, margin: 0, fontFace: 'Georgia', fontSize: 36, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
    s.addText(st.t, { x: x - 0.1, y: y + 1.65, w: 1.8, h: 0.32, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.dark, align: 'center' });
    s.addText(st.d, { x: x - 0.15, y: y + 1.95, w: 1.9, h: 0.6, margin: 0, fontFace: 'Calibri', fontSize: 9, color: C.mid, align: 'center' });

    if (i < stages.length - 1) {
      s.addShape(pres.shapes.RIGHT_TRIANGLE, { x: x + 1.62, y: y + 0.7, w: 0.2, h: 0.2, fill: { color: C.subtle }, rotate: 90 });
    }
  });

  T.addCard(pres, s, 0.5, 4.3, 9.0, 1.0, { bg: C.warmBg, topColor: C.acc });
  s.addText('💡  Streaming modu', { x: 0.7, y: 4.4, w: 9, h: 0.35, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.acc });
  s.addText('load_dataset("c4", "tr", streaming=True) → veri RAM\'e sığmasa bile bir-bir akıtır. TB\'lık Common Crawl\'i 1 GB RAM\'le bile işleyebilirsin.',
    { x: 0.7, y: 4.7, w: 8.8, h: 0.5, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });
})();

// ═══════════════════════ 8) DATASETS KOD ÖRNEĞİ ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Datasets Kütüphanesi · Türkçe Veri Setiyle Pratik', SECTION, C.cream, TOTAL);

  T.addCodeBlock(pres, s, 0.5, 1.05, 9.0, 3.9, [
    { text: 'from ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'datasets ', options: { color: C.codeBlue, fontSize: 11 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'load_dataset\n\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: '# 1) TR haber sınıflandırma — 4900 makale, 7 kategori\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'ds = ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'load_dataset', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '(', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"savasy/ttc4900"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ')\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'print(ds[', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"train"', options: { color: C.codeRed, fontSize: 11 } },
    { text: '][', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '0', options: { color: C.codeYellow, fontSize: 11 } },
    { text: '])  # {"category": ..., "text": ...}\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '# 2) map ile tokenize — batched=True ~10x hızlı\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'tokenized = ds.', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'map', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    lambda b: tok(b[', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"text"', options: { color: C.codeRed, fontSize: 11 } },
    { text: '], truncation=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'True', options: { color: C.codePurple, fontSize: 11 } },
    { text: ', max_length=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '256', options: { color: C.codeYellow, fontSize: 11 } },
    { text: '),\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    batched=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'True', options: { color: C.codePurple, fontSize: 11 } },
    { text: ', remove_columns=[', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"text"', options: { color: C.codeRed, fontSize: 11 } },
    { text: '])\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '# 3) filter ile kısa örnekleri at\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'clean = tokenized.', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'filter', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '(', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'lambda', options: { color: C.codePurple, fontSize: 11 } },
    { text: ' x: ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'len', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '(x[', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"input_ids"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ']) > ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '32', options: { color: C.codeYellow, fontSize: 11 } },
    { text: ')\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '# 4) streaming — RAM sınırı yok\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'big = ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'load_dataset', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '(', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"allenai/c4"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ', ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"tr"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ', streaming=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'True', options: { color: C.codePurple, fontSize: 11 } },
    { text: ')', options: { color: C.codeWhite, fontSize: 11 } },
  ]);
})();

// ═══════════════════════ 9) QUANTIZATION KAVRAMI ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Quantization · Neden ve Nasıl?', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.pri });
  s.addText('🔑  Temel fikir', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.pri });
  s.addText([
    { text: 'Bir LLM\'in ağırlıkları varsayılan olarak ', options: { fontSize: 11, color: C.dark } },
    { text: 'FP32 (32-bit float)', options: { fontSize: 11, color: C.pri, bold: true } },
    { text: '. Her parametre 4 byte.\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'Quantization', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: ' = bu sayıları daha az bit ile tutmak. INT4 = parametre başına 0.5 byte → 8× küçülme.\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '7B model:\n', options: { fontSize: 11, color: C.sec, bold: true } },
    { text: '• FP32 → 28 GB VRAM\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '• FP16 → 14 GB VRAM\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '• INT8 → 7 GB VRAM\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '• INT4 → 3.5 GB VRAM ✓ tüketici GPU\'sunda çalışır', options: { fontSize: 11, color: C.acc, bold: true } },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.4, margin: 0, fontFace: 'Calibri' });

  T.addCard(pres, s, 5.1, 1.05, 4.5, 3.95, { topColor: C.sec });
  s.addText('⚖️  Trade-off: Boyut ↔ Kalite', { x: 5.3, y: 1.15, w: 4.2, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.sec });
  s.addText([
    { text: 'Az bit → küçük model + az bellek + hızlı inference\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'Az bit → düşük kalite (perplexity ↑, accuracy ↓)\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'Popüler yöntemler:\n', options: { fontSize: 11, color: C.sec, bold: true } },
    { text: '• ', options: { fontSize: 11, color: C.dark } },
    { text: 'bitsandbytes ', options: { fontSize: 11, color: C.pri, bold: true } },
    { text: '— GPU runtime, training\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '• ', options: { fontSize: 11, color: C.dark } },
    { text: 'GGUF ', options: { fontSize: 11, color: C.pri, bold: true } },
    { text: '— CPU/Apple Silicon, llama.cpp\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '• ', options: { fontSize: 11, color: C.dark } },
    { text: 'AWQ ', options: { fontSize: 11, color: C.pri, bold: true } },
    { text: '— activation-aware, kalite > GGUF\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '• ', options: { fontSize: 11, color: C.dark } },
    { text: 'GPTQ ', options: { fontSize: 11, color: C.pri, bold: true } },
    { text: '— sonradan kalibrasyon, hızlı\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'Pratikte: ', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: 'GGUF Q4_K_M → en iyi denge', options: { fontSize: 11, color: C.dark, italic: true } },
  ], { x: 5.3, y: 1.55, w: 4.2, h: 3.4, margin: 0, fontFace: 'Calibri' });

  T.addCard(pres, s, 0.5, 5.1, 9.0, 0.45, { bg: C.warmBg, leftColor: C.acc });
  s.addText('💡  Genel kural: Llama 7B → CPU\'da GGUF Q4_K_M  ·  GPU 8 GB → bitsandbytes 4-bit  ·  Fine-tune → QLoRA + bnb',
    { x: 0.7, y: 5.12, w: 8.8, h: 0.42, margin: 0, fontFace: 'Calibri', fontSize: 10.5, bold: true, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 10) QUANTIZATION TABLOSU ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Quantization Seviyeleri · 7B Model Bazında Karşılaştırma', SECTION, C.cream, TOTAL);

  const headers = ['Format', 'Bit', 'Boyut', 'Kalite (PPL)', 'Hız', 'Kullanım'];
  const rows = [
    ['FP32',        '32',    '28 GB',  '★★★★★',   'Yavaş',  'Eğitim, baseline'],
    ['FP16 / BF16', '16',    '14 GB',  '★★★★★',   'Orta',   'GPU inference standardı'],
    ['INT8 (bnb)',  '8',     '7 GB',   '★★★★☆',   'Hızlı',  '8 GB GPU, fine-tune'],
    ['INT4 (bnb)',  '4',     '3.5 GB', '★★★★☆',   'Hızlı',  '6 GB GPU, QLoRA'],
    ['GGUF Q8_0',   '8',     '7 GB',   '★★★★★',   'Orta',   'CPU/Mac, kalite öncelik'],
    ['GGUF Q5_K_M', '5',     '4.5 GB', '★★★★☆',   'Hızlı',  'CPU dengeli'],
    ['GGUF Q4_K_M', '4',     '4 GB',   '★★★★☆',   'Hızlı',  'Tüketici donanım önerilen'],
    ['GGUF Q2_K',   '2',     '2.5 GB', '★★☆☆☆',   'Çok hızlı', 'Düşük donanım, kalite ↓'],
  ];

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.05, w: 9.0, h: 0.42, fill: { color: C.pri } });
  const colW = [1.55, 0.7, 1.0, 1.35, 1.0, 3.4];
  let cx = 0.5;
  headers.forEach((h, i) => {
    s.addText(h, { x: cx, y: 1.05, w: colW[i], h: 0.42, margin: 0, fontFace: 'Calibri', fontSize: 10.5, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
    cx += colW[i];
  });
  rows.forEach((r, i) => {
    const y = 1.47 + i * 0.45;
    const bg = i % 2 === 0 ? C.warmBg : 'FFFFFF';
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 0.45, fill: { color: bg }, line: { color: C.bdr, width: 0.5 } });
    let xx = 0.5;
    r.forEach((cell, j) => {
      const fontFace = j === 0 ? 'Consolas' : 'Calibri';
      s.addText(cell, { x: xx, y, w: colW[j], h: 0.45, margin: 0, fontFace, fontSize: 10, color: j === 0 ? C.dark : C.mid, bold: j === 0, align: 'center', valign: 'middle' });
      xx += colW[j];
    });
  });

  s.addText('💡  Q4_K_M = Q4 + K-quants + Medium block size — pratikte en çok tercih edilen format.',
    { x: 0.5, y: 5.15, w: 9, h: 0.35, margin: 0, fontFace: 'Calibri', fontSize: 10, bold: true, color: HEAD });
})();

// ═══════════════════════ 11) LOKAL DONANIM TABLOSU ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Lokal Donanım Rehberi · Hangi Model Hangi Cihazda?', SECTION, C.cream, TOTAL);

  const headers = ['Model boyutu', 'Min RAM', 'GPU VRAM (FP16)', 'GGUF Q4_K_M', 'Örnek model'];
  const rows = [
    ['1-3B',  '4 GB',  '6 GB',  '2 GB',   'Phi-3-mini, Gemma-2B, Qwen-2.5-1.5B'],
    ['7B',    '8 GB',  '14 GB', '4 GB',   'Llama-3.1-8B, Mistral-7B, Qwen-2.5-7B'],
    ['8B',    '8 GB',  '16 GB', '5 GB',   'Llama-3.1-8B-Instruct, Gemma-2-9B'],
    ['13B',   '16 GB', '26 GB', '8 GB',   'Llama-2-13B, CodeLlama-13B'],
    ['30B',   '32 GB', '60 GB', '20 GB',  'Qwen-2.5-32B, Mixtral-8x7B'],
    ['70B',   '64 GB', '140 GB', '42 GB', 'Llama-3.1-70B, Qwen-2.5-72B'],
  ];

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.05, w: 9.0, h: 0.42, fill: { color: C.sec } });
  const colW = [1.4, 0.95, 1.55, 1.4, 3.7];
  let cx = 0.5;
  headers.forEach((h, i) => {
    s.addText(h, { x: cx, y: 1.05, w: colW[i], h: 0.42, margin: 0, fontFace: 'Calibri', fontSize: 10.5, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
    cx += colW[i];
  });
  rows.forEach((r, i) => {
    const y = 1.47 + i * 0.5;
    const bg = i % 2 === 0 ? C.warmBg : 'FFFFFF';
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 0.5, fill: { color: bg }, line: { color: C.bdr, width: 0.5 } });
    let xx = 0.5;
    r.forEach((cell, j) => {
      s.addText(cell, { x: xx + 0.08, y, w: colW[j] - 0.15, h: 0.5, margin: 0, fontFace: j === 4 ? 'Consolas' : 'Calibri', fontSize: j === 4 ? 9 : 10.5, color: j === 0 ? C.dark : C.mid, bold: j === 0, align: j === 4 ? 'left' : 'center', valign: 'middle' });
      xx += colW[j];
    });
  });

  T.addCard(pres, s, 0.5, 4.55, 9.0, 0.75, { bg: C.warmBg, leftColor: C.acc });
  s.addText('💡  Apple Silicon (M1/M2/M3/M4) Unified Memory ile RAM = VRAM. M3 Max 64 GB → 70B GGUF Q4 çalışır. Mac\'te llama.cpp + Metal = en iyi seçim.',
    { x: 0.7, y: 4.6, w: 8.8, h: 0.65, margin: 0, fontFace: 'Calibri', fontSize: 10.5, bold: true, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 12) BITSANDBYTES KOD ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'bitsandbytes ile 4-bit / 8-bit Quantization (GPU)', SECTION, C.cream, TOTAL);

  T.addCodeBlock(pres, s, 0.5, 1.05, 9.0, 3.95, [
    { text: '# pip install transformers accelerate bitsandbytes\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'from ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'transformers ', options: { color: C.codeBlue, fontSize: 11 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'AutoModelForCausalLM, BitsAndBytesConfig\n\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: '# 4-bit NF4 + double quantization (QLoRA standardı)\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'bnb = ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'BitsAndBytesConfig', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    load_in_4bit=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'True', options: { color: C.codePurple, fontSize: 11 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    bnb_4bit_quant_type=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"nf4"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ',           # Normal Float 4-bit\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: '    bnb_4bit_compute_dtype=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'torch.', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'bfloat16', options: { color: C.codeBlue, fontSize: 11 } },
    { text: ',  # compute FP16\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: '    bnb_4bit_use_double_quant=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'True', options: { color: C.codePurple, fontSize: 11 } },
    { text: ',       # 0.4 bit ek tasarruf\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: ')\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'model = AutoModelForCausalLM.', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'from_pretrained', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    "meta-llama/Llama-3.1-8B-Instruct",\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: '    quantization_config=bnb,\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    device_map=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"auto"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ',  # GPU yoksa CPU fallback\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: ')\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '# 8B Llama: FP16 → 16 GB · INT4 NF4 → 5 GB · 12 GB tüketici GPU\'da çalışır', options: { color: C.codeGreen, fontSize: 10 } },
  ]);
})();

// ═══════════════════════ 13) OLLAMA ÖZELLİKLERİ ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Ollama · Lokal LLM\'i 30 Saniyede Çalıştır', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.pri });
  s.addText('🦙  Ollama nedir?', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.pri });
  s.addText([
    { text: 'llama.cpp üzerine inşa edilmiş, ', options: { fontSize: 11, color: C.dark } },
    { text: 'lokal LLM runtime', options: { fontSize: 11, color: C.pri, bold: true } },
    { text: '. CLI + REST API + model registry.\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'Özellikler:\n', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: '✓ Tek komutla model çek\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Otomatik quantization seçimi\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ macOS Metal + CUDA + ROCm desteği\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ REST API (port 11434)\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ OpenAI-uyumlu /v1/chat/completions\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Modelfile ile custom persona\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Streaming yanıt + embedding API\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'Hazır model kütüphanesi:\n', options: { fontSize: 11, color: C.sec, bold: true } },
    { text: 'llama3.1, mistral, gemma2, qwen2.5,\nphi3, codellama, nomic-embed-text...', options: { fontSize: 10, color: C.mid, italic: true } },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.4, margin: 0, fontFace: 'Calibri' });

  T.addCodeBlock(pres, s, 5.1, 1.05, 4.5, 3.95, [
    { text: '# Kurulum (macOS / Linux)\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'curl -fsSL https://ollama.com/install.sh | sh\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '# Servis başlat (background)\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'ollama serve &\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '# Model çek (otomatik Q4 GGUF)\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'ollama pull llama3.1:8b\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'ollama pull qwen2.5:7b\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'ollama list\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '# Hızlı chat (CLI)\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'ollama run llama3.1:8b "Merhaba"\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '# REST API (curl)\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'curl http://localhost:11434/api/generate \\\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '  -d \'{"model":"llama3.1:8b",\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: '       "prompt":"Türkiye\'nin başkenti?",\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: '       "stream":false}\'', options: { color: C.codeRed, fontSize: 10 } },
  ]);
})();

// ═══════════════════════ 14) MODELFILE ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Custom Modelfile · Persona + Sampling + System Prompt', SECTION, C.cream, TOTAL);

  T.addCodeBlock(pres, s, 0.5, 1.05, 9.0, 3.6, [
    { text: '# Modelfile — Türkçe asistan persona\'sı\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'FROM ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'llama3.1:8b\n\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: '# Sampling parametreleri\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'PARAMETER ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'temperature ', options: { color: C.codeBlue, fontSize: 11 } },
    { text: '0.7\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: 'PARAMETER ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'top_p ', options: { color: C.codeBlue, fontSize: 11 } },
    { text: '0.9\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: 'PARAMETER ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'top_k ', options: { color: C.codeBlue, fontSize: 11 } },
    { text: '40\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: 'PARAMETER ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'repeat_penalty ', options: { color: C.codeBlue, fontSize: 11 } },
    { text: '1.1\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: 'PARAMETER ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'num_ctx ', options: { color: C.codeBlue, fontSize: 11 } },
    { text: '8192\n\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: '# Sistem prompt — kişilik tanımı\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'SYSTEM ', options: { color: C.codePurple, fontSize: 11 } },
    { text: '"""\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: 'Sen Yengeç YZ\'sin — sıcakkanlı, samimi ve teknik bilgili bir Türk\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: 'yapay zeka asistanısın. Her zaman Türkçe yanıt verirsin. Kısa ve net\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: 'cevaplar tercih edersin. Bilmediğini söylemekten çekinmezsin.\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: '"""\n\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: '# Build & run\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: '$ ollama create yengec -f Modelfile\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '$ ollama run yengec "Kendini tanıt"', options: { color: C.codeWhite, fontSize: 11 } },
  ]);

  T.statBox(pres, s, 0.5, 4.85, 2.85, 0.7, '5 sn', 'persona deploy', C.acc);
  T.statBox(pres, s, 3.55, 4.85, 2.85, 0.7, '1 dosya', 'sürüm kontrolü', C.sec);
  T.statBox(pres, s, 6.6, 4.85, 2.85, 0.7, '∞', 'lokal kişilik', C.pri);
})();

// ═══════════════════════ 15) LM STUDIO ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'LM Studio · GUI + OpenAI-uyumlu Lokal Endpoint', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.sec });
  s.addText('🎛️  LM Studio neyi çözer?', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.sec });
  s.addText([
    { text: 'Ollama\'nın CLI-first yaklaşımına karşı ', options: { fontSize: 11, color: C.dark } },
    { text: 'tam GUI', options: { fontSize: 11, color: C.sec, bold: true } },
    { text: ' deneyimi sunar.\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'GUI özellikleri:\n', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: '✓ HF Hub içi arama + filtreler\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Tek tıkla GGUF indir\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Donanım uyumluluk önerisi\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Chat playground (parametre slider)\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Sistem prompt yönetimi (preset)\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'Server mode:\n', options: { fontSize: 11, color: C.pri, bold: true } },
    { text: 'OpenAI-uyumlu HTTP server.\nMevcut openai SDK kodu değişmeden çalışır — sadece ', options: { fontSize: 11, color: C.dark } },
    { text: 'base_url', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: ' değiştir.', options: { fontSize: 11, color: C.dark } },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.4, margin: 0, fontFace: 'Calibri' });

  T.addCodeBlock(pres, s, 5.1, 1.05, 4.5, 3.95, [
    { text: '# pip install openai\n\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'from ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'openai ', options: { color: C.codeBlue, fontSize: 11 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'OpenAI\n\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: '# LM Studio: Settings → Local Server → Start\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'client = ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'OpenAI', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    base_url=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"http://localhost:1234/v1"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    api_key=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"lm-studio"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ',  # gerekli ama kullanılmaz\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: ')\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'resp = client.chat.completions.', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'create', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    model=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"local-model"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    messages=[\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '        {"role": "system",\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: '         "content": "Türkçe yanıt ver."},\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: '        {"role": "user",\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: '         "content": "Quantum nedir?"},\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: '    ],\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    temperature=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '0.7', options: { color: C.codeYellow, fontSize: 11 } },
    { text: ',\n)\nprint(resp.choices[', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '0', options: { color: C.codeYellow, fontSize: 11 } },
    { text: '].message.content)', options: { color: C.codeWhite, fontSize: 11 } },
  ]);
})();

// ═══════════════════════ 16) LLAMA.CPP + GGUF DETAY ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'llama.cpp + GGUF · Lokal LLM\'in Çalışma Motoru', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.acc });
  s.addText('⚙️  llama.cpp', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.acc });
  s.addText([
    { text: 'C++ ile yazılmış, ', options: { fontSize: 11, color: C.dark } },
    { text: 'dependency-free LLM inference', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: ' motoru.\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'Neden bu kadar önemli?\n', options: { fontSize: 11, color: C.pri, bold: true } },
    { text: '• Python/PyTorch bağımlılığı yok\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '• CPU SIMD (AVX2, NEON) optimize\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '• Apple Metal + CUDA + Vulkan + ROCm\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '• Tek binary — Raspberry Pi\'de bile çalışır\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '• Memory-mapped model load (mmap)\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '• KV cache, batching, speculative decode\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'Ollama, LM Studio, llama-cpp-python ', options: { fontSize: 11, color: C.sec, bold: true } },
    { text: '— hepsi altta llama.cpp kullanır.', options: { fontSize: 11, color: C.dark, italic: true } },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.4, margin: 0, fontFace: 'Calibri' });

  T.addCard(pres, s, 5.1, 1.05, 4.5, 3.95, { topColor: C.pri });
  s.addText('📦  GGUF formatı', { x: 5.3, y: 1.15, w: 4.2, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.pri });
  s.addText([
    { text: 'GPT-Generated Unified Format', options: { fontSize: 11, color: C.pri, bold: true } },
    { text: ' — llama.cpp ekosisteminin standart binary serileştirme formatı.\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'Önceki: GGML → şimdi GGUF (2023+)\n\n', options: { fontSize: 11, color: C.mid, breakLine: true } },
    { text: 'GGUF özellikleri:\n', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: '✓ Tek dosyada model + tokenizer + metadata\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Quantization seviyeleri gömülü\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Versiyonlama, backward compatibility\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Chat template yerleşik (jinja2)\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ mmap-friendly — hızlı load\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'İndirme: ', options: { fontSize: 11, color: C.sec, bold: true } },
    { text: 'HF Hub\'da arama: ', options: { fontSize: 11, color: C.dark } },
    { text: '"GGUF"', options: { fontSize: 10.5, color: C.acc, bold: true, italic: true } },
    { text: '\nTGI / Ollama / LM Studio direkt yükler.', options: { fontSize: 11, color: C.dark } },
  ], { x: 5.3, y: 1.55, w: 4.2, h: 3.4, margin: 0, fontFace: 'Calibri' });

  T.addCard(pres, s, 0.5, 5.1, 9.0, 0.45, { bg: C.warmBg, leftColor: C.acc });
  s.addText('💡  Hugging Face\'te "GGUF" filtresi: TheBloke, bartowski, lmstudio-community — en güvenilir converter\'lar.',
    { x: 0.7, y: 5.12, w: 8.8, h: 0.42, margin: 0, fontFace: 'Calibri', fontSize: 10.5, bold: true, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 17) STREAMLIT + OLLAMA MİMARİ ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Streamlit + Ollama · Lokal Chat Mimarisi', SECTION, C.cream, TOTAL);

  // 3 katmanlı diyagram
  const boxes = [
    { x: 0.7, y: 1.3, w: 2.4, h: 1.2, t: '🌐 Streamlit', d: 'st.chat_input\nst.chat_message\nst.session_state', c: C.pri },
    { x: 3.8, y: 1.3, w: 2.4, h: 1.2, t: '🐍 Python', d: 'requests.post\nstream=True\nJSON decode', c: C.sec },
    { x: 6.9, y: 1.3, w: 2.4, h: 1.2, t: '🦙 Ollama', d: 'localhost:11434\nllama3.1:8b\nGGUF inference', c: C.acc },
  ];
  boxes.forEach(b => {
    s.addShape(pres.shapes.RECTANGLE, { x: b.x, y: b.y, w: b.w, h: b.h, fill: { color: b.c }, line: { color: b.c, width: 0 } });
    s.addText(b.t, { x: b.x, y: b.y + 0.1, w: b.w, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 16, bold: true, color: 'FFFFFF', align: 'center' });
    s.addText(b.d, { x: b.x + 0.1, y: b.y + 0.5, w: b.w - 0.2, h: b.h - 0.55, margin: 0, fontFace: 'Consolas', fontSize: 10, color: 'FFFFFF', align: 'center' });
  });
  // Oklar
  s.addShape(pres.shapes.RIGHT_TRIANGLE, { x: 3.18, y: 1.78, w: 0.55, h: 0.25, fill: { color: C.subtle }, rotate: 90 });
  s.addShape(pres.shapes.RIGHT_TRIANGLE, { x: 6.28, y: 1.78, w: 0.55, h: 0.25, fill: { color: C.subtle }, rotate: 90 });

  // Alt akış
  T.addCard(pres, s, 0.5, 2.85, 9.0, 2.5, { bg: C.warmBg, topColor: C.acc });
  s.addText('📡  Akış adımları', { x: 0.7, y: 2.95, w: 9, h: 0.35, margin: 0, fontFace: 'Calibri', fontSize: 12, bold: true, color: C.acc });

  const steps = [
    '1) Kullanıcı  st.chat_input  ile mesaj yazar → session_state["messages"] listesine eklenir.',
    '2) Tüm mesaj geçmişi  requests.post("http://localhost:11434/api/chat")  ile Ollama\'ya gönderilir.',
    '3) Ollama yanıtı  stream=True  ile satır-satır JSON döner → her token  st.write_stream  ile UI\'da belirir.',
    '4) Tam yanıt session_state\'e eklenir → bir sonraki turda geçmiş otomatik gönderilir.',
    '5) st.sidebar\'da model seçimi (llama3.1, qwen2.5, mistral), temperature slider, "Geçmişi temizle" butonu.',
  ];
  steps.forEach((st, i) => {
    s.addText(st, { x: 0.7, y: 3.32 + i * 0.38, w: 8.7, h: 0.35, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });
  });
})();

// ═══════════════════════ 18) STREAMLIT KOD ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Streamlit + Ollama · Minimal Çalışan Kod', SECTION, C.cream, TOTAL);

  T.addCodeBlock(pres, s, 0.5, 1.05, 9.0, 3.95, [
    { text: '# pip install streamlit requests\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: '# streamlit run app.py\n\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'streamlit ', options: { color: C.codeBlue, fontSize: 11 } },
    { text: 'as ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'st\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'requests, json\n\n', options: { color: C.codeBlue, fontSize: 11, breakLine: true } },
    { text: 'OLLAMA = ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"http://localhost:11434/api/chat"\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: 'st.title(', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"🦙 Lokal Llama Chat"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ')\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'if ', options: { color: C.codePurple, fontSize: 11 } },
    { text: '"messages" not in ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'st.session_state:\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: '    st.session_state.messages = []\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'for ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'msg ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'in ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'st.session_state.messages:\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    st.chat_message(msg[', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"role"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ']).write(msg[', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"content"', options: { color: C.codeRed, fontSize: 11 } },
    { text: '])\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'if ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'prompt := st.chat_input(', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"Mesajınız..."', options: { color: C.codeRed, fontSize: 11 } },
    { text: '):\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    st.session_state.messages.append({"role": "user", "content": prompt})\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    st.chat_message(', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"user"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ').write(prompt)\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    def ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'stream', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '():\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '        r = requests.post(OLLAMA, json={\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '            "model": "llama3.1:8b",\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: '            "messages": st.session_state.messages,\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: '            "stream": True}, stream=True)\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: '        for line in r.iter_lines():\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '            if line: yield json.loads(line)["message"]["content"]\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    full = st.chat_message("assistant").write_stream(stream)\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    st.session_state.messages.append({"role": "assistant", "content": full})', options: { color: C.codeWhite, fontSize: 11 } },
  ]);
})();

// ═══════════════════════ 19) OLLAMA VS LM STUDIO VS LLAMA.CPP ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Ollama vs LM Studio vs llama-cpp-python · Hangisi?', SECTION, C.cream, TOTAL);

  const headers = ['Kriter', 'Ollama', 'LM Studio', 'llama-cpp-python'];
  const rows = [
    ['Arayüz',         'CLI + REST',  'GUI + Server',  'Python lib'],
    ['Lisans',         'MIT',         'Closed source', 'MIT'],
    ['Model çekme',    'Registry',    'HF Hub içi',    'Manuel indir'],
    ['OpenAI API',     '✓ /v1',       '✓ /v1',         '✓ wrapper'],
    ['Custom persona', 'Modelfile',   'Preset',        'Code'],
    ['Embedding',      '✓',           '✓',             '✓'],
    ['En iyi kullanım', 'Server + CLI dev', 'Demo + non-tech', 'Custom Python entegrasyon'],
  ];

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.05, w: 9.0, h: 0.42, fill: { color: C.pri } });
  const colW = [1.7, 2.4, 2.4, 2.5];
  let cx = 0.5;
  headers.forEach((h, i) => {
    s.addText(h, { x: cx, y: 1.05, w: colW[i], h: 0.42, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
    cx += colW[i];
  });
  rows.forEach((r, i) => {
    const y = 1.47 + i * 0.48;
    const bg = i % 2 === 0 ? C.warmBg : 'FFFFFF';
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 0.48, fill: { color: bg }, line: { color: C.bdr, width: 0.5 } });
    let xx = 0.5;
    r.forEach((cell, j) => {
      s.addText(cell, { x: xx, y, w: colW[j], h: 0.48, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: j === 0 ? C.dark : C.mid, bold: j === 0, align: 'center', valign: 'middle' });
      xx += colW[j];
    });
  });

  s.addText('💡  Üçü de altta llama.cpp + GGUF kullanır. Aralarındaki fark UX katmanıdır — biri seçimsiz değil, hepsini birlikte kullanabilirsin.',
    { x: 0.5, y: 4.95, w: 9, h: 0.5, margin: 0, fontFace: 'Calibri', fontSize: 10.5, bold: true, color: HEAD });
})();

// ═══════════════════════ 20) ÖDEVLER ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Bu Modülün Ödevleri', SECTION, C.cream, TOTAL);

  const assigns = [
    {
      t: '1 · Quantization Karşılaştırması',
      d: 'Aynı 7B modelin (örn. Qwen-2.5-7B veya Llama-3.1-8B) float16, 8-bit (bitsandbytes) ve 4-bit GGUF Q4_K_M versiyonlarını çalıştır. Bellek tüketimi, ilk-token gecikmesi ve token/sn hızını tablolaştır. Sonuçları markdown rapor ile teslim et.',
      c: C.pri,
    },
    {
      t: '2 · Custom Ollama Modelfile',
      d: 'Ollama ile özel bir Modelfile yaz: Türkçe asistan persona\'sı (örn. "Mehmet Hoca"), sistem prompt + temperature 0.6 + repeat_penalty 1.15. Chat\'te 5 farklı soru sor ve kişiliği doğrula. Modelfile + ekran görüntülerini PR\'a ekle.',
      c: C.sec,
    },
    {
      t: '3 · Streamlit Lokal Chat Arayüzü',
      d: 'Streamlit ile lokal Ollama\'ya bağlanan bir chat arayüzü kur. Özellikler: model seçimi (sidebar), temperature slider, mesaj geçmişi (session_state), "Geçmişi temizle" butonu, streaming yanıt. requirements.txt + README ekle.',
      c: C.acc,
    },
  ];
  assigns.forEach((a, i) => {
    const y = 1.15 + i * 1.35;
    T.addCard(pres, s, 0.5, y, 9.0, 1.2, { leftColor: a.c });
    s.addText(a.t, { x: 0.7, y: y + 0.1, w: 8.6, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: a.c });
    s.addText(a.d, { x: 0.7, y: y + 0.5, w: 8.6, h: 0.65, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });
  });
})();

// ═══════════════════════ 21) KAYNAKLAR ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Kaynaklar ve Daha Fazla Okuma', SECTION, C.cream, TOTAL);

  const links = [
    { t: 'HuggingFace Transformers',      u: 'huggingface.co/docs/transformers',   c: C.pri },
    { t: 'HuggingFace Datasets',          u: 'huggingface.co/docs/datasets',       c: C.sec },
    { t: 'Ollama Dokümantasyonu',         u: 'ollama.com / github.com/ollama',     c: C.acc },
    { t: 'LM Studio',                     u: 'lmstudio.ai',                        c: C.purple },
    { t: 'llama.cpp + GGUF spec',         u: 'github.com/ggerganov/llama.cpp',     c: C.cyan },
    { t: 'bitsandbytes quantization',     u: 'github.com/TimDettmers/bitsandbytes', c: C.amber },
  ];

  links.forEach((l, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * 4.75;
    const y = 1.1 + row * 1.25;
    T.addCard(pres, s, x, y, 4.5, 1.1, { leftColor: l.c });
    s.addText('🔗  ' + l.t, { x: x + 0.2, y: y + 0.15, w: 4.1, h: 0.4, margin: 0, fontFace: 'Calibri', fontSize: 12, bold: true, color: C.dark });
    s.addText(l.u, { x: x + 0.2, y: y + 0.55, w: 4.1, h: 0.4, margin: 0, fontFace: 'Consolas', fontSize: 10, color: l.c });
  });
})();

// ═══════════════════════ 22) NOTEBOOK ÖZETİ ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Bu Modülün Notebook\'ları', SECTION, C.cream, TOTAL);

  const nbs = [
    { n: 1, t: 'modul03_01_hf_hub_kesfi.ipynb',         d: 'HF Hub üzerinde model keşfi, model card analizi, lisans kontrolü', c: C.pri },
    { n: 2, t: 'modul03_02_transformers_pipeline.ipynb', d: 'Pipeline ile NER, çeviri, özetleme; AutoModel ile manuel inference', c: C.sec },
    { n: 3, t: 'modul03_03_datasets_kutuphanesi.ipynb',  d: 'Türkçe veri seti yükle, map/filter ile dönüştür, streaming büyük veri', c: C.acc },
    { n: 4, t: 'modul03_04_ollama_kurulum.ipynb',        d: 'Ollama kurulumu, model çekme, REST API, custom Modelfile yazımı', c: C.purple },
    { n: 5, t: 'modul03_05_lm_studio_endpoint.ipynb',    d: 'LM Studio GUI yönetimi, OpenAI SDK ile lokal endpoint kullanımı', c: C.cyan },
    { n: 6, t: 'modul03_06_streamlit_chat.ipynb',        d: 'Streamlit + Ollama ile lokal chat arayüzü ve session_state geçmişi', c: C.amber },
  ];
  nbs.forEach((nb, i) => {
    const y = 1.1 + i * 0.66;
    T.addCard(pres, s, 0.5, y, 9.0, 0.6, { leftColor: nb.c });
    T.numBadge(pres, s, 0.7, y + 0.12, nb.n, nb.c);
    s.addText(nb.t, { x: 1.3, y: y + 0.05, w: 4.5, h: 0.5, margin: 0, fontFace: 'Consolas', fontSize: 10.5, bold: true, color: C.dark, valign: 'middle' });
    s.addText(nb.d, { x: 5.85, y: y + 0.05, w: 3.6, h: 0.5, margin: 0, fontFace: 'Calibri', fontSize: 9.5, color: C.mid, valign: 'middle' });
  });
})();

// ═══════════════════════ 23) KAPANIŞ ═══════════════════════
T.addClosingSlide(
  pres,
  'Modül 3 — Çıkarımlar',
  [
    { text: 'HuggingFace Hub LLM dünyasının merkezi: Models + Datasets + Spaces tek hesapta.',     color: C.sec },
    { text: 'pipeline() prototip için; AutoModel + Tokenizer üretim için. İkisi de cebinde olsun.', color: C.acc },
    { text: 'Quantization (GGUF Q4_K_M) sayesinde 8B model 6 GB RAM\'li dizüstünde çalışır.',       color: C.pri },
    { text: 'Ollama + Modelfile = 30 saniyede lokal Türkçe asistan; veriler hiç bulutta gezmez.',   color: C.purple },
    { text: 'LM Studio OpenAI SDK ile uyumlu — mevcut kodu base_url değişikliğiyle taşıyabilirsin.', color: C.cyan },
  ],
  'Bir sonraki modül: RAG mimarisi — lokal LLM\'in bilgisini kendi dökümanlarınla zenginleştir.',
  'Dr. Murat Altun'
);

// ═══════════════════════ KAYDET ═══════════════════════
pres.writeFile({ fileName: 'modul03_huggingface_lokal_llm.pptx' })
  .then(name => console.log('✓ Modül 3 PPTX hazır:', name));
