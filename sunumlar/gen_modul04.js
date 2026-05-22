/**
 * MODÜL 4 — RAG Mimarisi ve Production Patterns
 * 30 slayt · Generative Spectrum · Dr. Murat Altun · BTK Akademi 2026
 * En kapsamlı modül: 12 saat, 8 notebook, Gün 3-5
 */
const T = require('/Users/drmurataltun/.claude/pptx-template-llm.js');
const { C } = T;

const TOTAL = 30;
const SECTION = 'MODÜL 4 · RAG';
const MOD_LABEL = 'MODÜL 4';

const pres = T.createPres('Modül 4 — RAG Mimarisi ve Production Patterns', 'Dr. Murat Altun');

// ═══════════════════════ 1) KAPAK ═══════════════════════
T.addCoverSlide(
  pres,
  'RAG Mimarisi ve\nProduction Patterns',
  'Embeddings · ChromaDB · LangChain · LangGraph · RAGAS\nile uçtan uca RAG sistemi',
  'Dr. Murat Altun  ·  Modül 4  ·  Gün 3-5 (12 saat)',
  [
    { value: '12', label: 'SAAT' },
    { value: '15', label: 'KONU' },
    { value: '8',  label: 'NOTEBOOK' },
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
    { icon: '1', t: 'RAG Temelleri ve Mimarisi',  d: 'Naive → Advanced → Modular evrim' },
    { icon: '2', t: 'Embedding Modelleri',        d: 'Sentence-Transformers, E5, BGE, MTEB' },
    { icon: '3', t: 'Vector Store Karşılaştırma', d: 'ChromaDB, Qdrant, Pinecone, Weaviate' },
    { icon: '4', t: 'Chunking Stratejileri',      d: 'Fixed, recursive, semantic' },
    { icon: '5', t: 'Hybrid Retrieval + Rerank',  d: 'BM25 + Dense + MMR + Cross-encoder' },
    { icon: '6', t: 'LangChain LCEL & LangGraph', d: 'Zincir + state-machine agent' },
    { icon: '7', t: 'RAGAS Değerlendirme',        d: 'Faithfulness, relevance, precision' },
    { icon: '8', t: 'Production Patterns',        d: 'Async streaming, caching, maliyet' },
  ];
  const colors = [C.pri, C.sec, C.acc, C.purple, C.pri, C.sec, C.acc, C.purple];

  items.forEach((it, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * 4.75;
    const y = 1.0 + row * 1.05;

    T.addCard(pres, s, x, y, 4.5, 0.92, { leftColor: colors[i] });
    T.numBadge(pres, s, x + 0.18, y + 0.28, it.icon, colors[i]);
    s.addText(it.t, { x: x + 0.7, y: y + 0.08, w: 3.6, h: 0.36, margin: 0, fontFace: 'Georgia', fontSize: 13, bold: true, color: C.dark });
    s.addText(it.d, { x: x + 0.7, y: y + 0.42, w: 3.6, h: 0.5, margin: 0, fontFace: 'Calibri', fontSize: 9.5, color: C.mid });
  });
})();

// ═══════════════════════ 3) RAG NEDİR? ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'RAG (Retrieval-Augmented Generation) Nedir?', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 9.0, 1.6, { topColor: C.pri });
  s.addText('Tanım', { x: 0.7, y: 1.15, w: 9, h: 0.35, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.pri });
  s.addText('RAG, bir LLM\'in cevap üretmeden önce dış bir bilgi kaynağından (vector store, doküman tabanı) ilgili bağlamı çekip prompt\'a enjekte ettiği mimaridir. Modelin parametrik bilgisi (eğitim sırasında öğrendikleri) ile parametrik olmayan bilgi (gerçek zamanlı doküman) birleştirilir.',
    { x: 0.7, y: 1.5, w: 8.6, h: 1.05, margin: 0, fontFace: 'Calibri', fontSize: 11.5, color: C.dark });

  // 4-adımlı boru hattı
  const steps = [
    { n: 'Q', t: 'Sorgu',     d: 'Kullanıcı sorusu',       c: C.pri },
    { n: 'E', t: 'Embed',     d: 'Soruyu vektörle',         c: C.sec },
    { n: 'R', t: 'Retrieve',  d: 'Top-K chunk getir',       c: C.acc },
    { n: 'A', t: 'Augment',   d: 'Prompt\'a ekle',          c: C.purple },
    { n: 'G', t: 'Generate',  d: 'LLM yanıt üretir',        c: C.cyan },
  ];
  steps.forEach((st, i) => {
    const x = 0.5 + i * 1.85;
    const y = 3.0;
    s.addShape(pres.shapes.OVAL, { x, y, w: 1.0, h: 1.0, fill: { color: st.c } });
    s.addText(st.n, { x, y, w: 1.0, h: 1.0, margin: 0, fontFace: 'Georgia', fontSize: 28, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
    s.addText(st.t, { x: x - 0.1, y: y + 1.05, w: 1.2, h: 0.3, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.dark, align: 'center' });
    s.addText(st.d, { x: x - 0.2, y: y + 1.32, w: 1.4, h: 0.4, margin: 0, fontFace: 'Calibri', fontSize: 9, color: C.mid, align: 'center' });
    if (i < steps.length - 1) {
      s.addShape(pres.shapes.RIGHT_TRIANGLE, { x: x + 1.05, y: y + 0.4, w: 0.18, h: 0.18, fill: { color: C.subtle }, rotate: 90 });
    }
  });

  T.addCard(pres, s, 0.5, 4.85, 9.0, 0.5, { bg: C.accPale, leftColor: C.acc });
  s.addText('💡  Halüsinasyona karşı en güçlü pratik araç + bilgi güncelleme maliyeti = sıfır fine-tune.',
    { x: 0.7, y: 4.87, w: 8.8, h: 0.46, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 4) RAG vs FINE-TUNING ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'RAG vs Fine-tuning · Hangisi Ne Zaman?', SECTION, C.cream, TOTAL);

  const headers = ['Kriter', 'RAG', 'Fine-tuning'];
  const rows = [
    ['Veri güncelliği',       'Anında (vector store güncelle)', 'Yeniden eğitim gerekir'],
    ['Maliyet (kurulum)',     'Düşük ($50-200/ay)',             'Yüksek (GPU saat)'],
    ['Halüsinasyon kontrolü', 'Yüksek (kaynak gösterilir)',     'Zayıf'],
    ['Domain bilgisi',        'Doküman ile besle',              'Davranış öğretmek için ideal'],
    ['Hız',                   'Retrieval gecikmesi (~100 ms)',   'Direkt inference'],
    ['Veri gizliliği',        'Lokal vector store',              'Model ağırlıklarına gömülür'],
    ['Sözdizimi/stil',        'Sınırlı',                          'Mükemmel (chat template)'],
  ];

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 9.0, h: 0.45, fill: { color: C.pri } });
  headers.forEach((h, i) => {
    s.addText(h, { x: 0.5 + i * 3.0, y: 1.1, w: 3.0, h: 0.45, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
  });
  rows.forEach((r, i) => {
    const y = 1.55 + i * 0.42;
    const bg = i % 2 === 0 ? C.warmBg : 'FFFFFF';
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 0.42, fill: { color: bg }, line: { color: C.bdr, width: 0.5 } });
    r.forEach((cell, j) => {
      s.addText(cell, { x: 0.5 + j * 3.0 + 0.1, y, w: 2.9, h: 0.42, margin: 0, fontFace: 'Calibri', fontSize: 10, color: j === 0 ? C.dark : C.mid, bold: j === 0, align: j === 0 ? 'left' : 'center', valign: 'middle' });
    });
  });

  s.addText('💡  Genelde RAG önce, fine-tune sonra. İkisi rakip değil — birlikte güçlüdür (RAFT yaklaşımı).',
    { x: 0.5, y: 4.85, w: 9, h: 0.4, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.acc });
})();

// ═══════════════════════ 5) RAG MIMARI EVRİMİ ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'RAG Mimari Evrimi — Naive → Advanced → Modular', SECTION, C.cream, TOTAL);

  const cols = [
    {
      t: 'Naive RAG',
      d: 'En basit form: index → retrieve → generate.\n\n✓ Hızlı kurulum\n✓ Eğitim sahnesi için ideal\n✗ Sorgu bozulmasına duyarlı\n✗ Tek retrieval — re-rank yok\n✗ Hatayı düzeltme döngüsü yok',
      c: C.pri,
    },
    {
      t: 'Advanced RAG',
      d: 'Pre/Post-retrieval iyileştirme.\n\n✓ Query rewriting (HyDE)\n✓ Hybrid (BM25 + Dense)\n✓ Re-ranking (Cohere, BGE)\n✓ Metadata filter + parent-child\n✓ Sentence-window retrieval',
      c: C.sec,
    },
    {
      t: 'Modular RAG',
      d: 'Bileşenler yeniden kullanılabilir modül.\n\n✓ Routing (basit/karmaşık)\n✓ Multi-agent + Reflection\n✓ Self-RAG / CRAG\n✓ LangGraph state machine\n✓ Tool kullanımı + agent loop',
      c: C.acc,
    },
  ];
  cols.forEach((co, i) => {
    const x = 0.5 + i * 3.1;
    T.addCard(pres, s, x, 1.15, 2.9, 3.7, { topColor: co.c });
    s.addText(co.t, { x: x + 0.15, y: 1.3, w: 2.6, h: 0.45, margin: 0, fontFace: 'Georgia', fontSize: 18, bold: true, color: co.c });
    s.addText(co.d, { x: x + 0.15, y: 1.85, w: 2.6, h: 2.85, margin: 0, fontFace: 'Calibri', fontSize: 10, color: C.dark });
  });

  T.addCard(pres, s, 0.5, 4.95, 9.0, 0.5, { bg: C.warmBg, leftColor: C.sec });
  s.addText('Karar: POC → Naive  ·  Üretim → Advanced  ·  Multi-domain agent → Modular',
    { x: 0.7, y: 4.97, w: 8.8, h: 0.46, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 6) NAIVE RAG MIMARI DIYAGRAMI ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Naive RAG: Mimari Akış', SECTION, C.cream, TOTAL);

  // Sol: Indexing pipeline (offline)
  T.addCard(pres, s, 0.5, 1.1, 4.4, 3.85, { topColor: C.sec });
  s.addText('OFFLINE — Indexing', { x: 0.7, y: 1.2, w: 4, h: 0.35, margin: 0, fontFace: 'Calibri', fontSize: 10, bold: true, color: C.sec, charSpacing: 2 });

  const idxSteps = [
    { n: 1, t: 'Doküman yükle',    d: 'PDF, DOCX, HTML, MD' },
    { n: 2, t: 'Chunk\'la',        d: 'RecursiveCharacterSplitter' },
    { n: 3, t: 'Embed et',         d: 'sentence-transformers/E5' },
    { n: 4, t: 'Vector store\'a yaz', d: 'ChromaDB / Qdrant' },
  ];
  idxSteps.forEach((st, i) => {
    const y = 1.65 + i * 0.78;
    T.numBadge(pres, s, 0.75, y, st.n, C.sec);
    s.addText(st.t, { x: 1.3, y: y - 0.05, w: 3.4, h: 0.35, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.dark });
    s.addText(st.d, { x: 1.3, y: y + 0.28, w: 3.4, h: 0.3, margin: 0, fontFace: 'Calibri', fontSize: 9.5, color: C.mid });
  });

  // Sağ: Query pipeline (online)
  T.addCard(pres, s, 5.1, 1.1, 4.4, 3.85, { topColor: C.acc });
  s.addText('ONLINE — Querying', { x: 5.3, y: 1.2, w: 4, h: 0.35, margin: 0, fontFace: 'Calibri', fontSize: 10, bold: true, color: C.acc, charSpacing: 2 });

  const qSteps = [
    { n: 1, t: 'Sorgu al',         d: 'Kullanıcı sorusu' },
    { n: 2, t: 'Embed + ara',      d: 'top_k=4 similarity search' },
    { n: 3, t: 'Prompt\'a ekle',   d: 'context = "\\n\\n".join(chunks)' },
    { n: 4, t: 'LLM yanıt üret',   d: 'gpt-4o, gemini, llama-3' },
  ];
  qSteps.forEach((st, i) => {
    const y = 1.65 + i * 0.78;
    T.numBadge(pres, s, 5.35, y, st.n, C.acc);
    s.addText(st.t, { x: 5.9, y: y - 0.05, w: 3.4, h: 0.35, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.dark });
    s.addText(st.d, { x: 5.9, y: y + 0.28, w: 3.4, h: 0.3, margin: 0, fontFace: 'Calibri', fontSize: 9.5, color: C.mid });
  });

  T.addCard(pres, s, 0.5, 5.0, 9.0, 0.45, { bg: C.accPale, leftColor: C.acc });
  s.addText('⚡ Anahtar: aynı embedding modeli hem indexing hem querying için kullanılmalı.',
    { x: 0.7, y: 5.02, w: 8.6, h: 0.4, margin: 0, fontFace: 'Calibri', fontSize: 10.5, bold: true, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 7) EMBEDDING NEDİR? ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Embedding Modelleri — Anlamı Sayıya Dönüştür', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.pri });
  s.addText('Embedding nedir?', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.pri });
  s.addText([
    { text: 'Metni sabit boyutlu vektöre dönüştüren fonksiyon (genelde 384/768/1024 boyut).\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Anlamca yakın metinler → uzayda yakın\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Cosine similarity ile karşılaştırılır\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Çok dilli modeller dil-bağımsız\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '\n', options: {} },
    { text: 'Seçim kriterleri:', options: { fontSize: 11, color: C.acc, bold: true, breakLine: true } },
    { text: 'Dil · Boyut · MTEB skoru · Maliyet · Lisans', options: { fontSize: 10.5, color: C.dark, italic: true } },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.4, margin: 0, fontFace: 'Calibri' });

  T.addCodeBlock(pres, s, 5.1, 1.05, 4.5, 3.95, [
    { text: 'from ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'sentence_transformers ', options: { color: C.codeBlue, fontSize: 10 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'SentenceTransformer\n\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'model = ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'SentenceTransformer', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    "intfloat/multilingual-e5-base"\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: ')\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '# Tek satır → 768 boyutlu vektör\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'vec = model.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'encode', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    "Türkiye\'nin başkenti Ankara\'dır."\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: ')\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'print', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(vec.shape)  ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '# (768,)\n\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: '# Cosine similarity\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'from ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'sentence_transformers ', options: { color: C.codeBlue, fontSize: 10 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'util\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'sim = util.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'cos_sim', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(v1, v2)', options: { color: C.codeWhite, fontSize: 10 } },
  ]);
})();

// ═══════════════════════ 8) MTEB LİDERLİK TABLOSU ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'MTEB Liderlik Tablosu — Popüler Embedding Modelleri', SECTION, C.cream, TOTAL);

  const headers = ['Model', 'Boyut', 'Dil', 'MTEB', 'Lisans'];
  const rows = [
    ['BAAI/bge-m3',                          '1024', 'çok dilli', '67.5', 'MIT'],
    ['intfloat/multilingual-e5-large',       '1024', 'çok dilli', '65.3', 'MIT'],
    ['intfloat/multilingual-e5-base',        '768',  'çok dilli', '62.4', 'MIT'],
    ['BAAI/bge-large-en-v1.5',               '1024', 'en',        '64.2', 'MIT'],
    ['BAAI/bge-base-en-v1.5',                '768',  'en',        '63.5', 'MIT'],
    ['sentence-transformers/all-MiniLM-L6',  '384',  'en',        '56.3', 'Apache 2.0'],
    ['nomic-embed-text-v1.5',                '768',  'en',        '62.4', 'Apache 2.0'],
    ['OpenAI text-embedding-3-large',        '3072', 'çok dilli', '64.6', 'API ($)'],
    ['Cohere embed-multilingual-v3',         '1024', 'çok dilli', '64.0', 'API ($)'],
    ['Google text-embedding-004',            '768',  'çok dilli', '66.0', 'API'],
  ];

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 9.0, h: 0.4, fill: { color: C.pri } });
  const colWidths = [3.5, 1.0, 1.5, 1.0, 2.0];
  let cx = 0.5;
  headers.forEach((h, i) => {
    s.addText(h, { x: cx, y: 1.1, w: colWidths[i], h: 0.4, margin: 0, fontFace: 'Calibri', fontSize: 10.5, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
    cx += colWidths[i];
  });
  rows.forEach((r, i) => {
    const y = 1.5 + i * 0.32;
    const bg = i % 2 === 0 ? C.warmBg : 'FFFFFF';
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 0.32, fill: { color: bg }, line: { color: C.bdr, width: 0.5 } });
    let xx = 0.5;
    r.forEach((cell, j) => {
      s.addText(cell, { x: xx + 0.05, y, w: colWidths[j] - 0.1, h: 0.32, margin: 0, fontFace: j === 0 ? 'Consolas' : 'Calibri', fontSize: 9.5, color: j === 0 ? C.dark : C.mid, bold: j === 0, align: j === 0 ? 'left' : 'center', valign: 'middle' });
      xx += colWidths[j];
    });
  });

  s.addText('💡 Türkçe için öneriler: bge-m3 (en güçlü) · multilingual-e5-base (denge) · all-MiniLM (hızlı)',
    { x: 0.5, y: 4.85, w: 9, h: 0.4, margin: 0, fontFace: 'Calibri', fontSize: 10.5, bold: true, color: C.acc });
  s.addText('Kaynak: huggingface.co/spaces/mteb/leaderboard', { x: 0.5, y: 5.18, w: 9, h: 0.3, margin: 0, fontFace: 'Calibri', fontSize: 9, color: C.subtle, italic: true });
})();

// ═══════════════════════ 9) VECTOR STORE KARŞILAŞTIRMA ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Vector Store Karşılaştırma', SECTION, C.cream, TOTAL);

  const headers = ['Store', 'Tip', 'Hız', 'Ölçek', 'Self-host', 'Kullanım'];
  const rows = [
    ['ChromaDB',  'Embedded',     'Yüksek',   '~1M',     '✓ Lokal',           'Eğitim, POC, küçük prod'],
    ['Qdrant',   'Standalone',    'Yüksek',   '~100M',   '✓ Docker',          'Üretim, hybrid search'],
    ['Pinecone', 'Managed SaaS',  'Çok yüksek','~1B+',   '✗ Cloud only',      'Enterprise, serverless'],
    ['Weaviate', 'Standalone',    'Yüksek',   '~100M',   '✓ Docker / Cloud',  'GraphQL, multi-modal'],
    ['Milvus',   'Distributed',   'Çok yüksek','~10B',   '✓ K8s',             'Büyük ölçek, GPU'],
    ['pgvector', 'PostgreSQL ext.','Orta',    '~10M',    '✓ Mevcut DB',       'Postgres altyapısı varsa'],
    ['FAISS',    'Library (in-mem)','En hızlı','~10M',   '✓ Pythonik',        'Araştırma, batch'],
  ];

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 9.0, h: 0.4, fill: { color: C.pri } });
  const colWidths = [1.3, 1.6, 0.95, 0.85, 1.6, 2.7];
  let cx = 0.5;
  headers.forEach((h, i) => {
    s.addText(h, { x: cx, y: 1.1, w: colWidths[i], h: 0.4, margin: 0, fontFace: 'Calibri', fontSize: 10.5, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
    cx += colWidths[i];
  });
  rows.forEach((r, i) => {
    const y = 1.5 + i * 0.42;
    const bg = i % 2 === 0 ? C.warmBg : 'FFFFFF';
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 0.42, fill: { color: bg }, line: { color: C.bdr, width: 0.5 } });
    let xx = 0.5;
    r.forEach((cell, j) => {
      s.addText(cell, { x: xx + 0.05, y, w: colWidths[j] - 0.1, h: 0.42, margin: 0, fontFace: 'Calibri', fontSize: 9.5, color: j === 0 ? C.dark : C.mid, bold: j === 0, align: j === 0 ? 'left' : 'center', valign: 'middle' });
      xx += colWidths[j];
    });
  });

  s.addText('💡  Eğitim için ChromaDB; üretim için Qdrant (self-host) veya Pinecone (managed).',
    { x: 0.5, y: 4.95, w: 9, h: 0.4, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.acc });
})();

// ═══════════════════════ 10) CHUNKING STRATEJİLERİ ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Chunking Stratejileri — 3 Yaklaşım', SECTION, C.cream, TOTAL);

  const cols = [
    {
      t: 'Fixed-size',
      d: 'Karakter veya token sayısına göre kes.\n\n✓ Basit, hızlı, deterministik\n✓ Token bütçesi öngörülebilir\n✗ Cümlelerin ortasından bölebilir\n✗ Anlam bütünlüğü zayıf\n\nKullanım: log, kod, tablo',
      c: C.pri,
    },
    {
      t: 'Recursive Character',
      d: 'Önce \\n\\n, sonra \\n, sonra " " ile böl.\n\n✓ Doğal sınırları kullanır\n✓ LangChain default tercihi\n✓ Markdown/PDF için güçlü\n✗ Yine de overlap gerekir\n\nKullanım: %80 vakada doğru seçim',
      c: C.sec,
    },
    {
      t: 'Semantic',
      d: 'Embedding benzerliğine göre böl.\n\n✓ Anlam bütünlüğünü korur\n✓ Topic shift\'te keser\n✗ Yavaş (her cümle için embed)\n✗ Yüksek API maliyeti\n\nKullanım: araştırma, uzun makale',
      c: C.acc,
    },
  ];
  cols.forEach((co, i) => {
    const x = 0.5 + i * 3.1;
    T.addCard(pres, s, x, 1.15, 2.9, 3.7, { topColor: co.c });
    s.addText(co.t, { x: x + 0.15, y: 1.3, w: 2.6, h: 0.45, margin: 0, fontFace: 'Georgia', fontSize: 17, bold: true, color: co.c });
    s.addText(co.d, { x: x + 0.15, y: 1.85, w: 2.6, h: 2.85, margin: 0, fontFace: 'Calibri', fontSize: 10, color: C.dark });
  });

  T.addCard(pres, s, 0.5, 4.95, 9.0, 0.5, { bg: C.warmBg, leftColor: C.sec });
  s.addText('Pratik: ilk denemen → Recursive · uzun teknik metin → Semantic · structured veri → Fixed',
    { x: 0.7, y: 4.97, w: 8.8, h: 0.46, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 11) CHUNKING PARAMETRELERİ ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Chunking Parametreleri — chunk_size, overlap, separators', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.9, { topColor: C.pri });
  s.addText('Parametreler', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.pri });
  s.addText([
    { text: 'chunk_size  ', options: { fontSize: 11, color: C.priLt, bold: true } },
    { text: '500-1500 karakter (token başına ~4 karakter)\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: 'chunk_overlap  ', options: { fontSize: 11, color: C.priLt, bold: true } },
    { text: '10-20% (örn. 200 char) bağlam kaymasın diye\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: 'separators  ', options: { fontSize: 11, color: C.priLt, bold: true } },
    { text: '["\\n\\n", "\\n", ". ", " "] — sırayla dene\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: 'length_function  ', options: { fontSize: 11, color: C.priLt, bold: true } },
    { text: 'len (chr) veya tiktoken.encode (token)\n\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: 'Pratik öneri: ', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: 'TR Wikipedia → 800/160 · PDF rapor → 1000/200', options: { fontSize: 10.5, color: C.dark, italic: true } },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.3, margin: 0, fontFace: 'Calibri' });

  T.addCodeBlock(pres, s, 5.1, 1.05, 4.5, 3.9, [
    { text: 'from ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'langchain_text_splitters ', options: { color: C.codeBlue, fontSize: 10 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 10 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    RecursiveCharacterTextSplitter,\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: ')\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'splitter = ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'RecursiveCharacterTextSplitter', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    chunk_size=', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '800', options: { color: C.codeYellow, fontSize: 10 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    chunk_overlap=', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '160', options: { color: C.codeYellow, fontSize: 10 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    separators=[', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"\\n\\n", "\\n", ". ", " "', options: { color: C.codeRed, fontSize: 10 } },
    { text: '],\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    length_function=len,\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: ')\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'chunks = splitter.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'split_text', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(metin)\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'print', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'f"', options: { color: C.codeRed, fontSize: 10 } },
    { text: '{len(chunks)} chunk"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ')', options: { color: C.codeWhite, fontSize: 10 } },
  ]);
})();

// ═══════════════════════ 12) DENSE vs SPARSE vs HYBRID ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Dense · Sparse · Hybrid Retrieval', SECTION, C.cream, TOTAL);

  const cols = [
    {
      t: 'Dense (semantic)',
      d: 'Embedding modelleri ile.\n\n✓ Anlamca yakın metni bulur\n✓ Paraphrase\'e dayanıklı\n✓ Çok dilli sorgular\n✗ Exact match zayıf\n✗ Nadir terim, kod, sayı\n\nAraç: sentence-transformers, OpenAI ada',
      c: C.pri,
    },
    {
      t: 'Sparse (lexical)',
      d: 'BM25, TF-IDF (kelime sayımı).\n\n✓ Exact keyword match\n✓ Kod, isim, kısaltma için ideal\n✓ Açıklanabilir skor\n✗ Synonym tanımaz\n✗ Çok dilli soruda zayıf\n\nAraç: rank-bm25, Elasticsearch',
      c: C.sec,
    },
    {
      t: 'Hybrid',
      d: 'İki yöntemi RRF / linear ile birleştir.\n\n✓ Her iki dünyanın en iyisi\n✓ Recall %10-20 artar\n✓ Üretim için tavsiye edilir\n✗ İki indeks yönetimi\n✗ Re-rank gerekir\n\nAraç: Qdrant hybrid, Vespa, custom',
      c: C.acc,
    },
  ];
  cols.forEach((co, i) => {
    const x = 0.5 + i * 3.1;
    T.addCard(pres, s, x, 1.15, 2.9, 3.7, { topColor: co.c });
    s.addText(co.t, { x: x + 0.15, y: 1.3, w: 2.6, h: 0.45, margin: 0, fontFace: 'Georgia', fontSize: 16, bold: true, color: co.c });
    s.addText(co.d, { x: x + 0.15, y: 1.85, w: 2.6, h: 2.85, margin: 0, fontFace: 'Calibri', fontSize: 9.5, color: C.dark });
  });

  T.addCard(pres, s, 0.5, 4.95, 9.0, 0.5, { bg: C.accPale, leftColor: C.acc });
  s.addText('💡  Hybrid (BM25 + Dense) + Reranker → üretim için altın standart.',
    { x: 0.7, y: 4.97, w: 8.8, h: 0.46, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 13) BM25 ALGORİTMASI ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'BM25 — Best Matching 25 (Sparse Retrieval)', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.sec });
  s.addText('BM25 nedir?', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.sec });
  s.addText([
    { text: 'TF-IDF\'in geliştirilmiş hali — Okapi BM25.\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'Üç bileşen:\n', options: { fontSize: 11, color: C.acc, bold: true, breakLine: true } },
    { text: '• TF (term frequency) — sature edilmiş\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: '• IDF (inverse doc freq) — nadir kelime ödüllü\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: '• Doküman uzunluğu normalizasyonu\n\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: 'k1 ', options: { fontSize: 10.5, color: C.priLt, bold: true } },
    { text: '(1.2-2.0) — TF sature noktası\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: 'b  ', options: { fontSize: 10.5, color: C.priLt, bold: true } },
    { text: '(0.75) — uzunluk cezası', options: { fontSize: 10.5, color: C.dark } },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.4, margin: 0, fontFace: 'Calibri' });

  T.addCodeBlock(pres, s, 5.1, 1.05, 4.5, 3.95, [
    { text: 'from ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'rank_bm25 ', options: { color: C.codeBlue, fontSize: 10 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'BM25Okapi\n\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: '# Tokenize edilmiş corpus\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'tokenized = [doc.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'lower', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '().', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'split', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '()\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '             for doc in ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'chunks]\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'bm25 = ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'BM25Okapi', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(tokenized)\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '# Sorgu skorla\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'q = ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"BTK akademi eğitimleri"', options: { color: C.codeRed, fontSize: 10 } },
    { text: '.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'split', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '()\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'scores = bm25.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'get_scores', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(q)\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '# Top-5 chunk\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'top5 = bm25.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'get_top_n', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(q, chunks, n=', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '5', options: { color: C.codeYellow, fontSize: 10 } },
    { text: ')', options: { color: C.codeWhite, fontSize: 10 } },
  ]);
})();

// ═══════════════════════ 14) MMR (MAXIMAL MARGINAL RELEVANCE) ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'MMR — Maximal Marginal Relevance (Çeşitlilik)', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.purple });
  s.addText('Sorun', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.purple });
  s.addText([
    { text: 'Top-K similarity araması ', options: { fontSize: 11, color: C.dark } },
    { text: 'çok benzer chunk\'lar ', options: { fontSize: 11, color: C.sec, bold: true } },
    { text: 'döndürebilir → context\'te tekrar.\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'MMR çözümü:\n', options: { fontSize: 11, color: C.acc, bold: true, breakLine: true } },
    { text: 'Her seçim adımında ', options: { fontSize: 10.5, color: C.dark } },
    { text: 'relevance ', options: { fontSize: 10.5, color: C.priLt, bold: true } },
    { text: 've ', options: { fontSize: 10.5, color: C.dark } },
    { text: 'diversity ', options: { fontSize: 10.5, color: C.priLt, bold: true } },
    { text: 'dengesini optimize et.\n\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: 'λ = 1 → sadece relevance\n', options: { fontSize: 10.5, color: C.mid, breakLine: true } },
    { text: 'λ = 0 → sadece diversity\n', options: { fontSize: 10.5, color: C.mid, breakLine: true } },
    { text: 'λ = 0.5 → dengeli (varsayılan)', options: { fontSize: 10.5, color: C.mid }, },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.4, margin: 0, fontFace: 'Calibri' });

  T.addCodeBlock(pres, s, 5.1, 1.05, 4.5, 3.95, [
    { text: '# Chroma retriever + MMR\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'retriever = vectordb.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'as_retriever', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    search_type=', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"mmr"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    search_kwargs={\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '        ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"k"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ': ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '5', options: { color: C.codeYellow, fontSize: 10 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '        ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"fetch_k"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ': ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '20', options: { color: C.codeYellow, fontSize: 10 } },
    { text: ',  ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '# aday havuzu\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: '        ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"lambda_mult"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ': ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '0.5', options: { color: C.codeYellow, fontSize: 10 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    },\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: ')\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'docs = retriever.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'invoke', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"RAG nedir?"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ')', options: { color: C.codeWhite, fontSize: 10 } },
  ]);
})();

// ═══════════════════════ 15) CROSS-ENCODER RERANKER ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Cross-Encoder Reranker — Hassas Sıralama', SECTION, C.cream, TOTAL);

  // Üst mimari
  T.addCard(pres, s, 0.5, 1.05, 9.0, 1.85, { topColor: C.pri });
  s.addText('İki aşamalı retrieval mimarisi', { x: 0.7, y: 1.15, w: 9, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 13, bold: true, color: C.pri });
  const stages = [
    { t: 'Bi-Encoder',      d: 'Hızlı, top-50 aday\n(sentence-transformer)', c: C.pri },
    { t: 'Cross-Encoder',   d: 'Yavaş, top-5 sıralama\n(ms5-marco veya BGE)', c: C.sec },
    { t: 'LLM Context',     d: 'Sıralanmış top-5\nprompt\'a girer',         c: C.acc },
  ];
  stages.forEach((st, i) => {
    const x = 0.7 + i * 2.95;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.65, w: 2.7, h: 1.05, fill: { color: st.c } });
    s.addText(st.t, { x, y: 1.7, w: 2.7, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 13, bold: true, color: 'FFFFFF', align: 'center' });
    s.addText(st.d, { x, y: 2.1, w: 2.7, h: 0.55, margin: 0, fontFace: 'Calibri', fontSize: 9.5, color: 'FFFFFF', align: 'center' });
    if (i < 2) {
      s.addShape(pres.shapes.RIGHT_TRIANGLE, { x: x + 2.72, y: 2.05, w: 0.2, h: 0.2, fill: { color: C.subtle }, rotate: 90 });
    }
  });

  // Alt: Kod
  T.addCodeBlock(pres, s, 0.5, 3.05, 9.0, 1.95, [
    { text: 'from ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'sentence_transformers ', options: { color: C.codeBlue, fontSize: 10 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'CrossEncoder\n\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'reranker = ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'CrossEncoder', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"BAAI/bge-reranker-v2-m3"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ')\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'pairs = [(query, c.page_content) ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'for ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'c ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'in ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'candidates]\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'scores = reranker.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'predict', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(pairs)\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'top5 = ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'sorted', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'zip', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(scores, candidates), reverse=', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'True', options: { color: C.codeBlue, fontSize: 10 } },
    { text: ')[:', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '5', options: { color: C.codeYellow, fontSize: 10 } },
    { text: ']', options: { color: C.codeWhite, fontSize: 10 } },
  ]);

  T.addCard(pres, s, 0.5, 5.05, 9.0, 0.4, { bg: C.accPale, leftColor: C.acc });
  s.addText('🔥 Cohere Rerank API: tek satırla benchmark\'larda %15-30 precision artışı.',
    { x: 0.7, y: 5.07, w: 8.8, h: 0.36, margin: 0, fontFace: 'Calibri', fontSize: 10, bold: true, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 16) LANGCHAIN LCEL ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'LangChain LCEL — Expression Language', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.pri });
  s.addText('LCEL nedir?', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.pri });
  s.addText([
    { text: 'Unix pipe (|) tarzı bileşen zinciri.\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'Avantajlar:\n', options: { fontSize: 11, color: C.acc, bold: true, breakLine: true } },
    { text: '✓ Streaming native (token-by-token)\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: '✓ Async / batch / parallel desteği\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: '✓ LangSmith ile otomatik tracing\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: '✓ Fallback chain ile retry\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: '✓ Tip güvenli (Runnable interface)\n\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: 'Temel runnable\'lar:\n', options: { fontSize: 11, color: C.priLt, bold: true, breakLine: true } },
    { text: 'RunnablePassthrough · RunnableLambda · RunnableParallel', options: { fontSize: 9.5, color: C.mid, italic: true } },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.4, margin: 0, fontFace: 'Calibri' });

  T.addCodeBlock(pres, s, 5.1, 1.05, 4.5, 3.95, [
    { text: 'from ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'langchain_core.prompts ', options: { color: C.codeBlue, fontSize: 10 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'ChatPromptTemplate\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'from ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'langchain_core.output_parsers ', options: { color: C.codeBlue, fontSize: 10 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'StrOutputParser\n\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'prompt = ChatPromptTemplate.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'from_template', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    "Bağlam: {context}\\n\\nSoru: {q}"\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: ')\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '# Zincir tek satırda\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'chain = (\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    {', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"context"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ': retriever,\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '     ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"q"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ': RunnablePassthrough()}\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    | prompt\n', options: { color: C.codePurple, fontSize: 10, breakLine: true } },
    { text: '    | llm\n', options: { color: C.codePurple, fontSize: 10, breakLine: true } },
    { text: '    | StrOutputParser()\n', options: { color: C.codePurple, fontSize: 10, breakLine: true } },
    { text: ')\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'chain.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'invoke', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"BTK eğitimi nedir?"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ')', options: { color: C.codeWhite, fontSize: 10 } },
  ]);
})();

// ═══════════════════════ 17) LANGGRAPH STATE MACHINE ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'LangGraph — State Machine ile Agent RAG', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.sec });
  s.addText('Neden LangGraph?', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.sec });
  s.addText([
    { text: 'LCEL doğrusal pipe için ideal — ', options: { fontSize: 11, color: C.dark } },
    { text: 'döngü ve dallanma ', options: { fontSize: 11, color: C.sec, bold: true } },
    { text: 'için yetersiz.\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'LangGraph eklediği özellikler:\n', options: { fontSize: 11, color: C.acc, bold: true, breakLine: true } },
    { text: '✓ Düğümler (node) + kenarlar (edge)\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: '✓ Conditional routing\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: '✓ Persistent state (checkpointing)\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: '✓ Human-in-the-loop\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: '✓ Multi-agent koordinasyon\n\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: 'Pattern: ', options: { fontSize: 11, color: C.priLt, bold: true } },
    { text: 'retrieve → grade → rewrite → retrieve → generate', options: { fontSize: 10, color: C.mid, italic: true } },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.4, margin: 0, fontFace: 'Calibri' });

  T.addCodeBlock(pres, s, 5.1, 1.05, 4.5, 3.95, [
    { text: 'from ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'langgraph.graph ', options: { color: C.codeBlue, fontSize: 10 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'StateGraph, END\n\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'class ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'RAGState', options: { color: C.codeYellow, fontSize: 10 } },
    { text: '(TypedDict):\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    question: str\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    docs: list\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    answer: str\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'g = ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'StateGraph', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(RAGState)\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'g.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'add_node', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"retrieve"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ', retrieve_fn)\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'g.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'add_node', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"grade"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ', grade_docs_fn)\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'g.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'add_node', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"generate"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ', generate_fn)\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'g.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'set_entry_point', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"retrieve"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ')\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'g.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'add_conditional_edges', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"grade"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ',\n   route_fn, {', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"ok"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ': ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"generate"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ', ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"redo"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ': ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"retrieve"', options: { color: C.codeRed, fontSize: 10 } },
    { text: '})\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'app = g.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'compile', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '()', options: { color: C.codeWhite, fontSize: 10 } },
  ]);
})();

// ═══════════════════════ 18) RAGAS METRİKLERİ ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'RAGAS — RAG Değerlendirme Metrikleri', SECTION, C.cream, TOTAL);

  const cols = [
    {
      t: 'Faithfulness',
      f: 'Yanıt ↔ Bağlam',
      d: 'Yanıttaki iddiaların kaç tanesi bağlamla destekleniyor?\n\nFormül:\n|destekli iddialar| / |toplam iddialar|\n\n0 → uydurma\n1 → tam dayanaklı',
      c: C.pri,
    },
    {
      t: 'Answer Relevance',
      f: 'Yanıt ↔ Soru',
      d: 'Yanıt soruyu ne kadar karşılıyor?\n\nFormül:\nLLM\'den n alternatif soru ürettir → cosine sim(orig, alt)\n\n0 → konu dışı\n1 → birebir cevap',
      c: C.sec,
    },
    {
      t: 'Context Precision',
      f: 'Bağlam ↔ Soru',
      d: 'Retrieved chunk\'ların ne kadarı gerçekten kullanışlı?\n\nFormül:\nMean(rank-weighted precision@k)\n\n0 → alakasız retrieval\n1 → mükemmel sıralama',
      c: C.acc,
    },
  ];
  cols.forEach((co, i) => {
    const x = 0.5 + i * 3.1;
    T.addCard(pres, s, x, 1.15, 2.9, 3.7, { topColor: co.c });
    s.addText(co.t, { x: x + 0.15, y: 1.25, w: 2.6, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 16, bold: true, color: co.c });
    s.addText(co.f, { x: x + 0.15, y: 1.6, w: 2.6, h: 0.3, margin: 0, fontFace: 'Calibri', fontSize: 10, color: C.mid, italic: true });
    s.addText(co.d, { x: x + 0.15, y: 1.95, w: 2.6, h: 2.75, margin: 0, fontFace: 'Calibri', fontSize: 9.5, color: C.dark });
  });

  T.addCard(pres, s, 0.5, 4.95, 9.0, 0.5, { bg: C.accPale, leftColor: C.acc });
  s.addText('Bonus: context_recall · answer_correctness · answer_similarity — ragas/ragas paketi.',
    { x: 0.7, y: 4.97, w: 8.8, h: 0.46, margin: 0, fontFace: 'Calibri', fontSize: 11, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 19) RAGAS KOD ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'RAGAS Kullanımı — Kod ve Sonuç', SECTION, C.cream, TOTAL);

  T.addCodeBlock(pres, s, 0.5, 1.05, 9.0, 3.6, [
    { text: 'from ', options: { color: C.codePurple, fontSize: 10.5 } },
    { text: 'ragas ', options: { color: C.codeBlue, fontSize: 10.5 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 10.5 } },
    { text: 'evaluate\n', options: { color: C.codeYellow, fontSize: 10.5, breakLine: true } },
    { text: 'from ', options: { color: C.codePurple, fontSize: 10.5 } },
    { text: 'ragas.metrics ', options: { color: C.codeBlue, fontSize: 10.5 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 10.5 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 10.5, breakLine: true } },
    { text: '    faithfulness, answer_relevancy, context_precision, context_recall\n', options: { color: C.codeYellow, fontSize: 10.5, breakLine: true } },
    { text: ')\n', options: { color: C.codeWhite, fontSize: 10.5, breakLine: true } },
    { text: 'from ', options: { color: C.codePurple, fontSize: 10.5 } },
    { text: 'datasets ', options: { color: C.codeBlue, fontSize: 10.5 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 10.5 } },
    { text: 'Dataset\n\n', options: { color: C.codeYellow, fontSize: 10.5, breakLine: true } },
    { text: '# Test seti: soru + retrieved_context + answer + ground_truth\n', options: { color: C.codeGreen, fontSize: 10.5, breakLine: true } },
    { text: 'ds = Dataset.', options: { color: C.codeWhite, fontSize: 10.5 } },
    { text: 'from_dict', options: { color: C.codeGreen, fontSize: 10.5 } },
    { text: '({\n', options: { color: C.codeWhite, fontSize: 10.5, breakLine: true } },
    { text: '    ', options: { color: C.codeWhite, fontSize: 10.5 } },
    { text: '"question"', options: { color: C.codeRed, fontSize: 10.5 } },
    { text: ': sorular,\n', options: { color: C.codeWhite, fontSize: 10.5, breakLine: true } },
    { text: '    ', options: { color: C.codeWhite, fontSize: 10.5 } },
    { text: '"contexts"', options: { color: C.codeRed, fontSize: 10.5 } },
    { text: ': retrieved,  ', options: { color: C.codeWhite, fontSize: 10.5 } },
    { text: '# List[List[str]]\n', options: { color: C.codeGreen, fontSize: 10.5, breakLine: true } },
    { text: '    ', options: { color: C.codeWhite, fontSize: 10.5 } },
    { text: '"answer"', options: { color: C.codeRed, fontSize: 10.5 } },
    { text: ': yanitlar,\n', options: { color: C.codeWhite, fontSize: 10.5, breakLine: true } },
    { text: '    ', options: { color: C.codeWhite, fontSize: 10.5 } },
    { text: '"ground_truth"', options: { color: C.codeRed, fontSize: 10.5 } },
    { text: ': dogru_yanitlar,\n', options: { color: C.codeWhite, fontSize: 10.5, breakLine: true } },
    { text: '})\n\n', options: { color: C.codeWhite, fontSize: 10.5, breakLine: true } },
    { text: 'sonuc = ', options: { color: C.codeWhite, fontSize: 10.5 } },
    { text: 'evaluate', options: { color: C.codeGreen, fontSize: 10.5 } },
    { text: '(ds, metrics=[\n', options: { color: C.codeWhite, fontSize: 10.5, breakLine: true } },
    { text: '    faithfulness, answer_relevancy,\n', options: { color: C.codeYellow, fontSize: 10.5, breakLine: true } },
    { text: '    context_precision, context_recall\n', options: { color: C.codeYellow, fontSize: 10.5, breakLine: true } },
    { text: '])\n', options: { color: C.codeWhite, fontSize: 10.5, breakLine: true } },
    { text: 'print', options: { color: C.codeGreen, fontSize: 10.5 } },
    { text: '(sonuc)  ', options: { color: C.codeWhite, fontSize: 10.5 } },
    { text: '# DataFrame benzeri çıktı', options: { color: C.codeGreen, fontSize: 10.5 } },
  ]);

  // Stat box (örnek sonuç)
  T.statBox(pres, s, 0.5, 4.75, 2.15, 0.7, '0.87', 'faithfulness', C.pri);
  T.statBox(pres, s, 2.85, 4.75, 2.15, 0.7, '0.92', 'answer_relevancy', C.sec);
  T.statBox(pres, s, 5.2, 4.75, 2.15, 0.7, '0.81', 'context_precision', C.acc);
  T.statBox(pres, s, 7.55, 4.75, 1.95, 0.7, '0.79', 'context_recall', C.purple);
})();

// ═══════════════════════ 20) PRODUCTION PATTERNS — STREAMING ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Production Pattern · Async Streaming', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.pri });
  s.addText('Neden streaming?', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.pri });
  s.addText([
    { text: '✓ TTFT (Time-To-First-Token) ↓\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Kullanıcı algılanan gecikme yarıya iner\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ ChatGPT/Claude UX standardı\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Uzun yanıtlarda timeout riski yok\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'FastAPI: ', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: 'StreamingResponse + Server-Sent Events\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'LangChain: ', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: 'chain.astream() ya da .astream_events()', options: { fontSize: 11, color: C.dark } },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.4, margin: 0, fontFace: 'Calibri' });

  T.addCodeBlock(pres, s, 5.1, 1.05, 4.5, 3.95, [
    { text: 'from ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'fastapi ', options: { color: C.codeBlue, fontSize: 10 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'FastAPI\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'from ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'fastapi.responses ', options: { color: C.codeBlue, fontSize: 10 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'StreamingResponse\n\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: '@app.', options: { color: C.codeRed, fontSize: 10 } },
    { text: 'post', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '("/ask")\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'async def ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'ask', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(q: str):\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    async def ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'token_stream', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '():\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '        async for ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'chunk ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'in ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'rag_chain.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'astream', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(q):\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '            yield ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'f"data: {chunk}\\n\\n"\n\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: '    return ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'StreamingResponse', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '        token_stream(),\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '        media_type=', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"text/event-stream"\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: '    )', options: { color: C.codeWhite, fontSize: 10 } },
  ]);
})();

// ═══════════════════════ 21) STRUCTURED OUTPUT ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Structured Output · Pydantic + Instructor', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.sec });
  s.addText('Neden structured output?', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.sec });
  s.addText([
    { text: '✓ LLM çıktısı JSON ile tip güvenli\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Pydantic validasyonu otomatik\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Function calling ile retry\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Downstream sistem entegrasyonu kolay\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Markdown parse problemi yok\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'Araçlar:\n', options: { fontSize: 11, color: C.acc, bold: true, breakLine: true } },
    { text: '• Instructor — OpenAI/Anthropic için patch\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: '• LangChain with_structured_output()\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: '• Outlines — constrained grammar', options: { fontSize: 10.5, color: C.dark } },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.4, margin: 0, fontFace: 'Calibri' });

  T.addCodeBlock(pres, s, 5.1, 1.05, 4.5, 3.95, [
    { text: 'from ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'pydantic ', options: { color: C.codeBlue, fontSize: 10 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'BaseModel, Field\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'instructor\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'from ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'openai ', options: { color: C.codeBlue, fontSize: 10 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'OpenAI\n\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'class ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'CevapKart', options: { color: C.codeYellow, fontSize: 10 } },
    { text: '(BaseModel):\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    cevap: str\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    kaynaklar: list[str]\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    guven: float = ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'Field', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(ge=', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '0', options: { color: C.codeYellow, fontSize: 10 } },
    { text: ', le=', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '1', options: { color: C.codeYellow, fontSize: 10 } },
    { text: ')\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'client = instructor.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'from_openai', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'OpenAI', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '())\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'kart = client.chat.completions.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'create', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    model=', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"gpt-4o-mini"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    response_model=CevapKart,\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    messages=[{', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"role"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ': ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"user"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ',\n        ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"content"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ': prompt}],\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: ')', options: { color: C.codeWhite, fontSize: 10 } },
  ]);
})();

// ═══════════════════════ 22) RESPONSE CACHING ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Response Caching — 3 Katman', SECTION, C.cream, TOTAL);

  const layers = [
    {
      t: 'Exact Match Cache',
      d: 'Aynı sorgu → aynı yanıt.\nRedis + key=hash(soru).\nLatency: ~5 ms · Hit rate: %20-40',
      c: C.pri,
    },
    {
      t: 'Semantic Cache',
      d: 'Cosine similarity ile benzer sorgu eşle.\nGPTCache, Redis Vector, Upstash.\nLatency: ~50 ms · Hit rate: %40-60',
      c: C.sec,
    },
    {
      t: 'Embedding Cache',
      d: 'Soru → embed (tek seferlik).\nDoküman embedding\'leri sabit kalır.\nLatency: ~20 ms · embed maliyeti %90 ↓',
      c: C.acc,
    },
    {
      t: 'Prompt Caching (Provider)',
      d: 'Anthropic / OpenAI ile sistem prompt\'u cache.\nInput maliyeti %75-90 ↓ (1+ saat TTL).\nUzun bağlamlı RAG için zorunlu.',
      c: C.purple,
    },
  ];
  layers.forEach((l, i) => {
    const y = 1.1 + i * 1.0;
    T.addCard(pres, s, 0.5, y, 9.0, 0.9, { leftColor: l.c });
    T.numBadge(pres, s, 0.7, y + 0.27, String(i + 1), l.c);
    s.addText(l.t, { x: 1.35, y: y + 0.13, w: 8.0, h: 0.35, margin: 0, fontFace: 'Georgia', fontSize: 13, bold: true, color: l.c });
    s.addText(l.d, { x: 1.35, y: y + 0.46, w: 8.0, h: 0.44, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });
  });
})();

// ═══════════════════════ 23) MALİYET OPTİMİZASYONU ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Maliyet Optimizasyonu — RAG Üretiminde', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 2.85, 3.95, { topColor: C.pri });
  s.addText('💰  Prompt Caching', { x: 0.6, y: 1.15, w: 2.7, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 13, bold: true, color: C.pri });
  s.addText('• Anthropic 1 saat TTL\n• Sabit kısımları başa koy\n• System prompt + few-shot\n• Input maliyeti %75-90 ↓\n\nÖrn: 100K token prompt → 5K\'lık aktif',
    { x: 0.6, y: 1.55, w: 2.7, h: 3.35, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });

  T.addCard(pres, s, 3.55, 1.05, 2.85, 3.95, { topColor: C.sec });
  s.addText('🔀  Model Routing', { x: 3.65, y: 1.15, w: 2.7, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 13, bold: true, color: C.sec });
  s.addText('• Basit Q → Haiku/4o-mini\n• Karmaşık → Sonnet/4o\n• Code → Codestral / DeepSeek\n• Türkçe → Gemini Flash\n• Router LLM ile dispatch\n\nMaliyet: 4-10× ↓',
    { x: 3.65, y: 1.55, w: 2.7, h: 3.35, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });

  T.addCard(pres, s, 6.6, 1.05, 2.85, 3.95, { topColor: C.acc });
  s.addText('📊  Token Budget', { x: 6.7, y: 1.15, w: 2.7, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 13, bold: true, color: C.acc });
  s.addText('• Soru başına max token limiti\n• Context\'i top-K\'e indir\n• Truncate uzun chunks\n• Summary chain ile sıkıştır\n• tiktoken ile ölç\n\nKural: 1 kullanıcı = 4K out',
    { x: 6.7, y: 1.55, w: 2.7, h: 3.35, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });

  T.addCard(pres, s, 0.5, 5.05, 9.0, 0.4, { bg: C.warmBg, leftColor: C.sec });
  s.addText('💡  Tipik tasarruf: kombine uygulanırsa aylık API maliyeti %60-80 ↓',
    { x: 0.7, y: 5.07, w: 8.6, h: 0.36, margin: 0, fontFace: 'Calibri', fontSize: 10, bold: true, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 24) PDF YÜKLEME VE METADATA ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Doküman Yükleme: PDF · DOCX · HTML + Metadata', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.pri });
  s.addText('Loader\'lar', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.pri });
  s.addText([
    { text: 'PDF:  ', options: { fontSize: 11, color: C.priLt, bold: true } },
    { text: 'PyPDFLoader, PyMuPDF, Unstructured\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: 'DOCX:  ', options: { fontSize: 11, color: C.priLt, bold: true } },
    { text: 'Docx2txtLoader, UnstructuredWord\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: 'HTML:  ', options: { fontSize: 11, color: C.priLt, bold: true } },
    { text: 'BSHTMLLoader, WebBaseLoader\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: 'MD:  ', options: { fontSize: 11, color: C.priLt, bold: true } },
    { text: 'UnstructuredMarkdownLoader\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: 'CSV:  ', options: { fontSize: 11, color: C.priLt, bold: true } },
    { text: 'CSVLoader (her satır = doc)\n\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: 'Metadata zorunlu alanlar:\n', options: { fontSize: 11, color: C.acc, bold: true, breakLine: true } },
    { text: 'source · page · chunk_id · last_modified · author', options: { fontSize: 10, color: C.mid, italic: true } },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.4, margin: 0, fontFace: 'Calibri' });

  T.addCodeBlock(pres, s, 5.1, 1.05, 4.5, 3.95, [
    { text: 'from ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'langchain_community.document_loaders ', options: { color: C.codeBlue, fontSize: 9 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 10 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    PyPDFLoader, DirectoryLoader\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: ')\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'loader = ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'DirectoryLoader', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"./docs"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ', glob=', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"**/*.pdf"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    loader_cls=PyPDFLoader,\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: ')\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'docs = loader.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'load', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '()\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '# Metadata\'yı zenginleştir\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'for ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'd ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'in ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'docs:\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    d.metadata[', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"yuklenme"', options: { color: C.codeRed, fontSize: 10 } },
    { text: '] = ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'datetime.now().isoformat()\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    d.metadata[', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"kategori"', options: { color: C.codeRed, fontSize: 10 } },
    { text: '] = classify(d.metadata[', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"source"', options: { color: C.codeRed, fontSize: 10 } },
    { text: '])', options: { color: C.codeWhite, fontSize: 10 } },
  ]);
})();

// ═══════════════════════ 25) UÇTAN UCA RAG PIPELINE ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Uçtan Uca Üretim RAG Pipeline', SECTION, C.cream, TOTAL);

  const steps = [
    { n: 1, t: 'Load',     c: C.pri,    code: 'docs = PyPDFLoader(path).load()' },
    { n: 2, t: 'Chunk',    c: C.sec,    code: 'chunks = splitter.split_documents(docs)' },
    { n: 3, t: 'Embed',    c: C.acc,    code: 'emb = HuggingFaceEmbeddings(model_name="bge-m3")' },
    { n: 4, t: 'Store',    c: C.purple, code: 'db = Chroma.from_documents(chunks, emb)' },
    { n: 5, t: 'Retrieve', c: C.cyan,   code: 'retriever = db.as_retriever(search_type="mmr")' },
    { n: 6, t: 'Rerank',   c: C.amber,  code: 'reranked = cohere_rerank(query, docs, top_n=5)' },
    { n: 7, t: 'Generate', c: C.pri,    code: 'chain = retriever | prompt | llm | parser' },
    { n: 8, t: 'Evaluate', c: C.sec,    code: 'evaluate(ds, metrics=[faithfulness, ...])' },
  ];
  steps.forEach((st, i) => {
    const y = 1.05 + i * 0.51;
    s.addShape(pres.shapes.OVAL, { x: 0.55, y: y + 0.07, w: 0.38, h: 0.38, fill: { color: st.c } });
    s.addText(String(st.n), { x: 0.55, y: y + 0.07, w: 0.38, h: 0.38, margin: 0, fontFace: 'Georgia', fontSize: 13, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
    s.addText(st.t, { x: 1.05, y: y + 0.05, w: 1.7, h: 0.4, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.dark, valign: 'middle' });
    s.addShape(pres.shapes.RECTANGLE, { x: 2.85, y: y + 0.05, w: 6.65, h: 0.4, fill: { color: C.codeBg } });
    s.addText(st.code, { x: 2.95, y: y + 0.05, w: 6.45, h: 0.4, margin: 0, fontFace: 'Consolas', fontSize: 9.5, color: C.codeGreen, valign: 'middle' });
  });
})();

// ═══════════════════════ 26) NOTEBOOK ÖZETİ ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Bu Modülün Notebook\'ları (8)', SECTION, C.cream, TOTAL);

  const nbs = [
    { n: 1, t: 'modul04_01_embeddings_karsilastirma.ipynb',  d: 'Sentence-Transformers + MTEB skor karşılaştırma',         c: C.pri },
    { n: 2, t: 'modul04_02_chromadb_kurulum.ipynb',           d: 'ChromaDB add, query, delete, metadata filter',           c: C.sec },
    { n: 3, t: 'modul04_03_pdf_chunking_pipeline.ipynb',      d: 'PDF → chunk → embed → vector store dolumu',              c: C.acc },
    { n: 4, t: 'modul04_04_langchain_lcel.ipynb',             d: 'retriever | prompt | llm | parser LCEL zinciri',         c: C.purple },
    { n: 5, t: 'modul04_05_hybrid_retrieval_rerank.ipynb',    d: 'BM25 + Dense + MMR + Cross-encoder reranker',            c: C.cyan },
    { n: 6, t: 'modul04_06_langgraph_agent.ipynb',            d: 'LangGraph query routing + reflection agent',             c: C.amber },
    { n: 7, t: 'modul04_07_ragas_degerlendirme.ipynb',        d: 'faithfulness, answer_relevance, context_precision',     c: C.pri },
    { n: 8, t: 'modul04_08_production_patterns.ipynb',        d: 'Async streaming + structured output + caching',          c: C.sec },
  ];
  nbs.forEach((nb, i) => {
    const y = 0.95 + i * 0.55;
    T.addCard(pres, s, 0.5, y, 9.0, 0.48, { leftColor: nb.c });
    T.numBadge(pres, s, 0.7, y + 0.07, nb.n, nb.c);
    s.addText(nb.t, { x: 1.3, y: y + 0.02, w: 8.0, h: 0.24, margin: 0, fontFace: 'Consolas', fontSize: 10, bold: true, color: C.dark });
    s.addText(nb.d, { x: 1.3, y: y + 0.24, w: 8.0, h: 0.25, margin: 0, fontFace: 'Calibri', fontSize: 9.5, color: C.mid });
  });
})();

// ═══════════════════════ 27) ÖDEVLER ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Bu Modülün Ödevleri', SECTION, C.cream, TOTAL);

  const assigns = [
    {
      t: '1 · Kurumsal PDF\'den RAG zinciri',
      d: 'Kurumsal bir PDF setinden chunking → embedding → ChromaDB → LCEL ile RAG zinciri kur. 5 farklı soruda doğruluğu test et ve hatalı vakaları raporla.',
      c: C.pri,
    },
    {
      t: '2 · Dense vs Sparse vs Hybrid karşılaştırma',
      d: 'Aynı veri setinde dense, sparse (BM25) ve hybrid retrieval\'ı uygula. RAGAS ile context precision metriğini hesaplayıp hangisinin neden daha iyi olduğunu raporla.',
      c: C.sec,
    },
    {
      t: '3 · LangGraph agent RAG',
      d: 'LangGraph ile query routing (basit ya da karmaşık soru sınıflandırması) ve reflection adımı (yanıt kontrolü + retry) içeren bir agent tabanlı RAG sistemi kur.',
      c: C.acc,
    },
  ];
  assigns.forEach((a, i) => {
    const y = 1.15 + i * 1.35;
    T.addCard(pres, s, 0.5, y, 9.0, 1.2, { leftColor: a.c });
    s.addText(a.t, { x: 0.7, y: y + 0.1, w: 8.6, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: a.c });
    s.addText(a.d, { x: 0.7, y: y + 0.5, w: 8.6, h: 0.65, margin: 0, fontFace: 'Calibri', fontSize: 11, color: C.dark });
  });
})();

// ═══════════════════════ 28) KAYNAKLAR ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Kaynaklar ve Daha Fazla Okuma', SECTION, C.cream, TOTAL);

  const links = [
    { t: 'LangChain Dokümantasyonu',   u: 'python.langchain.com',                          c: C.pri },
    { t: 'LangGraph',                   u: 'langchain-ai.github.io/langgraph',              c: C.sec },
    { t: 'ChromaDB Docs',               u: 'docs.trychroma.com',                            c: C.acc },
    { t: 'Sentence-Transformers',       u: 'www.sbert.net',                                 c: C.purple },
    { t: 'MTEB Leaderboard',            u: 'huggingface.co/spaces/mteb/leaderboard',        c: C.cyan },
    { t: 'RAGAS',                       u: 'docs.ragas.io',                                 c: C.amber },
    { t: 'Cohere Rerank',               u: 'docs.cohere.com/docs/rerank-overview',          c: C.pri },
    { t: 'Anthropic Prompt Caching',    u: 'docs.anthropic.com/en/docs/prompt-caching',     c: C.sec },
  ];

  links.forEach((l, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * 4.75;
    const y = 1.05 + row * 1.0;
    T.addCard(pres, s, x, y, 4.5, 0.9, { leftColor: l.c });
    s.addText('🔗  ' + l.t, { x: x + 0.2, y: y + 0.1, w: 4.1, h: 0.35, margin: 0, fontFace: 'Calibri', fontSize: 11.5, bold: true, color: C.dark });
    s.addText(l.u, { x: x + 0.2, y: y + 0.46, w: 4.1, h: 0.35, margin: 0, fontFace: 'Consolas', fontSize: 9.5, color: l.c });
  });
})();

// ═══════════════════════ 29) CHEAT SHEET ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Modül 4 Cheat Sheet — RAG Hızlı Komutlar', SECTION, C.cream, TOTAL);

  T.addCodeBlock(pres, s, 0.5, 1.05, 9.0, 3.9, [
    { text: '# Kurulum\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'pip install langchain langchain-community langgraph chromadb \\\n', options: { color: C.codeWhite, fontSize: 10.5, breakLine: true } },
    { text: '            sentence-transformers rank-bm25 ragas pypdf\n\n', options: { color: C.codeWhite, fontSize: 10.5, breakLine: true } },
    { text: '# Embedding modeli (TR-uyumlu)\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'from langchain_huggingface import HuggingFaceEmbeddings\n', options: { color: C.codeWhite, fontSize: 10.5, breakLine: true } },
    { text: 'emb = HuggingFaceEmbeddings(model_name="BAAI/bge-m3")\n\n', options: { color: C.codeWhite, fontSize: 10.5, breakLine: true } },
    { text: '# Chunking\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'from langchain_text_splitters import RecursiveCharacterTextSplitter\n', options: { color: C.codeWhite, fontSize: 10.5, breakLine: true } },
    { text: 'splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=160)\n\n', options: { color: C.codeWhite, fontSize: 10.5, breakLine: true } },
    { text: '# Vector store\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'from langchain_chroma import Chroma\n', options: { color: C.codeWhite, fontSize: 10.5, breakLine: true } },
    { text: 'db = Chroma.from_documents(chunks, emb, persist_directory="./chromadb")\n\n', options: { color: C.codeWhite, fontSize: 10.5, breakLine: true } },
    { text: '# LCEL zinciri\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'chain = (\n', options: { color: C.codeWhite, fontSize: 10.5, breakLine: true } },
    { text: '    {"context": db.as_retriever(search_type="mmr", search_kwargs={"k":5}),\n', options: { color: C.codeWhite, fontSize: 10.5, breakLine: true } },
    { text: '     "question": RunnablePassthrough()}\n', options: { color: C.codeWhite, fontSize: 10.5, breakLine: true } },
    { text: '    | prompt | llm | StrOutputParser()\n', options: { color: C.codePurple, fontSize: 10.5, breakLine: true } },
    { text: ')\n\n', options: { color: C.codeWhite, fontSize: 10.5, breakLine: true } },
    { text: '# Async streaming\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'async for token in chain.astream("BTK Akademi eğitimleri?"): print(token, end="")', options: { color: C.codeWhite, fontSize: 10.5 } },
  ]);
})();

// ═══════════════════════ 30) KAPANIŞ ═══════════════════════
T.addClosingSlide(
  pres,
  'Modül 4 — Çıkarımlar',
  [
    { text: 'RAG, halüsinasyona karşı en güçlü pratik araç — fine-tune ile rakip değil tamamlayıcıdır.', color: C.sec },
    { text: 'Embedding modeli seçimi (MTEB) ve chunking stratejisi RAG kalitesinin %70\'idir.', color: C.acc },
    { text: 'Hybrid retrieval + cross-encoder reranker = üretim altın standardı.', color: C.pri },
    { text: 'LangChain LCEL doğrusal zincir, LangGraph state-machine ve döngü — beraber öğren.', color: C.purple },
    { text: 'RAGAS olmadan üretime alma; faithfulness ve context precision\'ı her güncellemede ölç.', color: C.cyan },
    { text: 'Streaming, prompt caching ve model routing — maliyet ve UX birlikte kazanılır.', color: C.amber },
  ],
  'Bir sonraki modül: PEFT, LoRA ve QLoRA ile fine-tuning.',
  'Dr. Murat Altun'
);

// ═══════════════════════ KAYDET ═══════════════════════
pres.writeFile({ fileName: 'modul04_rag_mimarisi.pptx' })
  .then(name => console.log('✓ Modül 4 PPTX hazır:', name));
