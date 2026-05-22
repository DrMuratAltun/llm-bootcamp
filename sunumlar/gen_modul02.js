/**
 * MODÜL 2 — LLM Temelleri ve Prompt Engineering
 * 21 slayt · Generative Spectrum · Dr. Murat Altun · BTK Akademi 2026
 */
const T = require('/Users/drmurataltun/.claude/pptx-template-llm.js');
const { C } = T;

const TOTAL = 21;
const SECTION = 'MODÜL 2 · TEMEL';
const MOD_LABEL = 'MODÜL 2';

const pres = T.createPres('Modül 2 — LLM Temelleri ve Prompt Engineering', 'Dr. Murat Altun');

// ═══════════════════════ 1) KAPAK ═══════════════════════
T.addCoverSlide(
  pres,
  'LLM Temelleri ve\nPrompt Engineering',
  'Transformer · Tokenization · CoT · Function Calling\nile büyük dil modellerini ehlileştirmek',
  'Dr. Murat Altun  ·  Modül 2  ·  Gün 1-2 (7 saat)',
  [
    { value: '7',  label: 'SAAT' },
    { value: '11', label: 'KONU' },
    { value: '4',  label: 'NOTEBOOK' },
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
    { icon: '1', t: 'Transformer Mimarisi',     d: 'Self-attention, encoder/decoder, residual + layer norm' },
    { icon: '2', t: 'Tokenization',             d: 'BPE, SentencePiece, vocabulary size, multilingual' },
    { icon: '3', t: 'Context & Sampling',       d: 'Context window, temperature, top-p, top-k' },
    { icon: '4', t: 'Prompt Desenleri',         d: 'Zero-shot · Few-shot · CoT · ReAct · Self-Consistency' },
    { icon: '5', t: 'Function Calling',         d: 'Tool schema, OpenAI ve Anthropic stilleri' },
    { icon: '6', t: 'Model & Maliyet',          d: 'Gemini · GPT · Claude · Llama + token bütçesi' },
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

// ═══════════════════════ 3) LLM NEDİR? ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'LLM Nedir? — Bir Sonraki Token Tahmincisi', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.pri });
  s.addText('Çekirdek tanım', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 16, bold: true, color: C.pri });
  s.addText([
    { text: 'LLM = ', options: { fontSize: 11, color: C.dark, bold: true } },
    { text: 'milyarlarca parametreli Transformer + devasa metin korpusunda eğitim.\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'Tek görevi var:  ', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: 'verilen bağlamda en olası bir sonraki token\'i tahmin etmek.\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Pretraining → trilyonlarca token üzerinde dil modeli\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: '✓ SFT → instruction following davranışı\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: '✓ RLHF / DPO → insan tercihiyle hizalama\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.4, margin: 0, fontFace: 'Calibri' });

  // Sağ: token akışı görseli
  T.addCard(pres, s, 5.1, 1.05, 4.5, 3.95, { topColor: C.acc });
  s.addText('Token akışı', { x: 5.3, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.acc });

  const tokens = [
    { t: '"Yapay"', c: C.pri },
    { t: '"zekâ"', c: C.sec },
    { t: '"ile"', c: C.acc },
    { t: '"geleceği"', c: C.purple },
    { t: '"şekillen-"', c: C.cyan },
    { t: '???', c: C.amber },
  ];
  tokens.forEach((tk, i) => {
    const x = 5.3 + (i % 3) * 1.4;
    const y = 1.65 + Math.floor(i / 3) * 0.6;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 1.25, h: 0.45, fill: { color: tk.c } });
    s.addText(tk.t, { x, y, w: 1.25, h: 0.45, margin: 0, fontFace: 'Consolas', fontSize: 10, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
  });

  s.addText('P("diriyor") = 0.42  ·  P("ecek") = 0.31  ·  P("di") = 0.18',
    { x: 5.3, y: 3.0, w: 4.2, h: 0.4, margin: 0, fontFace: 'Consolas', fontSize: 10.5, color: C.pri, bold: true });

  s.addText('Sampling parametreleri (temperature, top-p) bu dağılımdan nasıl seçim yapacağını belirler.',
    { x: 5.3, y: 3.45, w: 4.2, h: 1.4, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.mid, italic: true });

  // Alt çıkarım
  T.addCard(pres, s, 0.5, 5.05, 9.0, 0.4, { bg: C.warmBg, leftColor: C.sec });
  s.addText('💡  LLM "anlamaz" — koşullu olasılık dağılımı üzerinden sample alır. Sihir yok, istatistik var.',
    { x: 0.7, y: 5.05, w: 8.8, h: 0.4, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 4) TRANSFORMER MİMARİSİ ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Transformer Mimarisi — Attention Is All You Need (2017)', SECTION, C.cream, TOTAL);

  // Sol: encoder
  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.pri });
  s.addText('Encoder  (BERT, T5)', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.pri });

  const encStack = [
    { t: 'Input embedding + positional', c: C.pri },
    { t: 'Multi-head self-attention',     c: C.sec },
    { t: 'Add & LayerNorm (residual)',    c: C.acc },
    { t: 'Feed-Forward (MLP)',            c: C.purple },
    { t: 'Add & LayerNorm (residual)',    c: C.cyan },
  ];
  encStack.forEach((b, i) => {
    const y = 1.62 + i * 0.5;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.75, y, w: 3.9, h: 0.42, fill: { color: b.c } });
    s.addText(b.t, { x: 0.75, y, w: 3.9, h: 0.42, margin: 0, fontFace: 'Calibri', fontSize: 10.5, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
  });
  s.addText('Çift yönlü bağlam · NLU görevleri (sınıflandırma, NER)',
    { x: 0.7, y: 4.25, w: 4.0, h: 0.7, margin: 0, fontFace: 'Calibri', fontSize: 10, color: C.mid, italic: true });

  // Sağ: decoder
  T.addCard(pres, s, 5.1, 1.05, 4.4, 3.95, { topColor: C.sec });
  s.addText('Decoder  (GPT, Gemini, Llama)', { x: 5.3, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.sec });

  const decStack = [
    { t: 'Input embedding + positional',  c: C.pri },
    { t: 'Masked self-attention (causal)', c: C.sec },
    { t: 'Add & LayerNorm (residual)',     c: C.acc },
    { t: 'Feed-Forward (MLP)',             c: C.purple },
    { t: 'LM head → next-token logits',    c: C.amber },
  ];
  decStack.forEach((b, i) => {
    const y = 1.62 + i * 0.5;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.35, y, w: 3.9, h: 0.42, fill: { color: b.c } });
    s.addText(b.t, { x: 5.35, y, w: 3.9, h: 0.42, margin: 0, fontFace: 'Calibri', fontSize: 10.5, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
  });
  s.addText('Tek yönlü (causal) · NLG görevleri (chat, kod, üretim)',
    { x: 5.3, y: 4.25, w: 4.0, h: 0.7, margin: 0, fontFace: 'Calibri', fontSize: 10, color: C.mid, italic: true });

  // Alt
  T.addCard(pres, s, 0.5, 5.05, 9.0, 0.4, { bg: C.warmBg, leftColor: C.acc });
  s.addText('💡  Modern LLM\'lerin (GPT-4, Gemini, Claude, Llama) hepsi decoder-only mimari kullanır.',
    { x: 0.7, y: 5.05, w: 8.8, h: 0.4, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 5) SELF-ATTENTION ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Self-Attention — Q · K · V Üçlemesi', SECTION, C.cream, TOTAL);

  // Sol kart: formul ve sezgi
  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.pri });
  s.addText('Sezgi', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.pri });
  s.addText([
    { text: 'Her token diğer tüm token\'lara "bakar".\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'Q (query):  ', options: { fontSize: 11, color: C.pri, bold: true } },
    { text: 'ne aradığın\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'K (key):    ', options: { fontSize: 11, color: C.sec, bold: true } },
    { text: 'her token\'in tanıtım kartı\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'V (value):  ', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: 'taşıdığı bilgi\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'Attention(Q,K,V) = softmax(QKᵀ/√d) V', options: { fontSize: 11, color: C.priLt, bold: true, italic: true } },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.4, margin: 0, fontFace: 'Calibri' });

  // Sağ: küçük örnek
  T.addCard(pres, s, 5.1, 1.05, 4.5, 3.95, { topColor: C.acc });
  s.addText('Multi-head attention', { x: 5.3, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.acc });
  s.addText([
    { text: '• ', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: 'Aynı Q/K/V projeksiyonu farklı "head"lerde paralel hesaplanır.\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '• ', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: 'Her head farklı bir ilişki türü öğrenir: sözdizimi, eş-referans, anlam.\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '• ', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: 'GPT-4 ~96 head × ~96 katman.\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'Optimizasyonlar:  ', options: { fontSize: 11, color: C.pri, bold: true } },
    { text: 'FlashAttention, GQA, KV cache, SWA (sliding-window).', options: { fontSize: 11, color: C.dark } },
  ], { x: 5.3, y: 1.55, w: 4.2, h: 3.4, margin: 0, fontFace: 'Calibri' });

  // Alt
  T.addCard(pres, s, 0.5, 5.05, 9.0, 0.4, { bg: C.warmBg, leftColor: C.sec });
  s.addText('⚠  Hesaplama O(n²) — bağlam uzadıkça maliyet karesel artar. Bu yüzden uzun context = pahalı.',
    { x: 0.7, y: 5.05, w: 8.8, h: 0.4, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 6) TOKENIZATION ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Tokenization — BPE Adım Adım', SECTION, C.cream, TOTAL);

  // Adım adım BPE
  const steps = [
    { n: 1, t: 'Karakter ayrımı',       d: '"yapay" → y / a / p / a / y',         c: C.pri },
    { n: 2, t: 'En sık çifti birleştir', d: '"a" + "y" → "ay" (en yüksek frekans)', c: C.sec },
    { n: 3, t: 'Tekrarla',               d: '"y" + "ap" → "yap" → "yapay"',         c: C.acc },
    { n: 4, t: 'Vocab tamamlanır',       d: '~30K–50K parça. Nadir kelimeler subword\'lere bölünür', c: C.purple },
  ];
  steps.forEach((st, i) => {
    const y = 1.1 + i * 0.7;
    T.addCard(pres, s, 0.5, y, 9.0, 0.62, { leftColor: st.c });
    T.numBadge(pres, s, 0.7, y + 0.13, st.n, st.c);
    s.addText(st.t, { x: 1.3, y: y + 0.05, w: 2.5, h: 0.5, margin: 0, fontFace: 'Calibri', fontSize: 12, bold: true, color: C.dark, valign: 'middle' });
    s.addText(st.d, { x: 3.8, y: y + 0.05, w: 5.5, h: 0.5, margin: 0, fontFace: 'Consolas', fontSize: 10.5, color: C.priLt, valign: 'middle' });
  });

  // Alt: pratik kıyaslama
  T.addCard(pres, s, 0.5, 3.95, 9.0, 1.4, { topColor: C.acc });
  s.addText('Türkçe vs İngilizce token oranı', { x: 0.7, y: 4.05, w: 8.5, h: 0.35, margin: 0, fontFace: 'Georgia', fontSize: 12, bold: true, color: C.acc });
  s.addText('"Merhaba dünya"  →  GPT-4 tokenizer:  ~4-5 token   ·   "Hello world"  →  2 token',
    { x: 0.7, y: 4.42, w: 8.5, h: 0.3, margin: 0, fontFace: 'Consolas', fontSize: 11, color: C.dark });
  s.addText('Türkçe için multilingual tokenizer (Gemini, Claude) ~%30 daha verimli olabilir. SentencePiece (Google) ve BPE (OpenAI) yaygın.',
    { x: 0.7, y: 4.75, w: 8.5, h: 0.55, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.mid, italic: true });
})();

// ═══════════════════════ 7) CONTEXT WINDOW ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Context Window — Modelin Hafıza Penceresi', SECTION, C.cream, TOTAL);

  const models = [
    { m: 'GPT-3.5',          ctx: '16K',   c: C.pri },
    { m: 'GPT-4o',           ctx: '128K',  c: C.sec },
    { m: 'Claude 4.5',       ctx: '200K',  c: C.acc },
    { m: 'Gemini 2.5 Pro',   ctx: '2M',    c: C.purple },
    { m: 'Llama 3.3 70B',    ctx: '128K',  c: C.cyan },
  ];

  // Header
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 9.0, h: 0.45, fill: { color: C.pri } });
  ['Model', 'Context window', 'Tipik kullanım'].forEach((h, i) => {
    s.addText(h, { x: 0.5 + i * 3.0, y: 1.1, w: 3.0, h: 0.45, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
  });

  const rows = [
    ['GPT-3.5',           '16K token',   'Chatbot, kısa belge'],
    ['GPT-4o',            '128K token',  'Uzun kod, çoklu döküman'],
    ['Claude 4.5 Sonnet', '200K token',  'Hukuki / akademik analiz'],
    ['Gemini 2.5 Pro',    '2M token',    'Video transkripti, kitap'],
    ['Llama 3.3 70B',     '128K token',  'Self-hosted, on-prem'],
  ];
  rows.forEach((r, i) => {
    const y = 1.55 + i * 0.5;
    const bg = i % 2 === 0 ? C.warmBg : 'FFFFFF';
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 0.5, fill: { color: bg }, line: { color: C.bdr, width: 0.5 } });
    r.forEach((cell, j) => {
      s.addText(cell, { x: 0.5 + j * 3.0, y, w: 3.0, h: 0.5, margin: 0, fontFace: j === 1 ? 'Consolas' : 'Calibri', fontSize: 10.5, color: j === 0 ? C.dark : C.mid, bold: j === 0, align: j === 0 ? 'left' : 'center', valign: 'middle', paraSpaceBefore: 0 });
    });
  });

  s.addText('⚠  Lost-in-the-middle: uzun bağlamda model ortadaki bilgileri unutabilir → önemli kısmı başa veya sona koy.',
    { x: 0.5, y: 4.85, w: 9, h: 0.5, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.sec });
})();

// ═══════════════════════ 8) SAMPLING PARAMETRELERİ ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Sampling Parametreleri — temperature · top-p · top-k', SECTION, C.cream, TOTAL);

  // 3 kart: T=0, T=0.7, T=1.5
  const samples = [
    {
      t: 'temperature = 0',
      d: '"Türkiye\'nin başkenti Ankara\'dır."\n\n• Deterministik\n• Aynı input → aynı output\n• Kod, SQL, yapısal görev',
      c: C.pri,
    },
    {
      t: 'temperature = 0.7',
      d: '"Türkiye\'nin başkenti olarak Ankara, Anadolu\'nun kalbinde yer alır."\n\n• Dengeli yaratıcılık\n• Chat, yazı, özetleme\n• Varsayılan tercih',
      c: C.sec,
    },
    {
      t: 'temperature = 1.5',
      d: '"Türkiye toprakları üzerinde Ankara, yönetimin merkezi olarak bilinir, fakat kültürel..."\n\n• Yüksek çeşitlilik\n• Hikâye, brainstorm\n• Halüsinasyon riski ↑',
      c: C.acc,
    },
  ];
  samples.forEach((sm, i) => {
    const x = 0.5 + i * 3.1;
    T.addCard(pres, s, x, 1.05, 2.9, 3.4, { topColor: sm.c });
    s.addText(sm.t, { x: x + 0.15, y: 1.18, w: 2.6, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 13, bold: true, color: sm.c });
    s.addText(sm.d, { x: x + 0.15, y: 1.6, w: 2.6, h: 2.7, margin: 0, fontFace: 'Calibri', fontSize: 10, color: C.dark });
  });

  // Alt kart: top-p / top-k
  T.addCard(pres, s, 0.5, 4.55, 9.0, 0.85, { bg: C.warmBg, leftColor: C.purple });
  s.addText('top-p (nucleus) ve top-k', { x: 0.7, y: 4.62, w: 8.6, h: 0.32, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.purple });
  s.addText('top-p=0.9 → toplam olasılığı 0.9\'a ulaşan en küçük token kümesinden seç  ·  top-k=40 → ilk 40 token arasından seç  ·  birlikte kullanılır (temperature + top-p önerilir).',
    { x: 0.7, y: 4.93, w: 8.6, h: 0.45, margin: 0, fontFace: 'Calibri', fontSize: 10, color: C.dark });
})();

// ═══════════════════════ 9) PROMPT DESENLERI TABLOSU ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Prompt Desenleri — Zero-shot → Tree-of-Thoughts', SECTION, C.cream, TOTAL);

  // Header
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 9.0, h: 0.45, fill: { color: C.pri } });
  ['Desen', 'Mantık', 'Ne zaman?'].forEach((h, i) => {
    const ws = [2.4, 3.6, 3.0];
    const xs = [0.5, 2.9, 6.5];
    s.addText(h, { x: xs[i], y: 1.1, w: ws[i], h: 0.45, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
  });

  const rows = [
    ['Zero-shot',         'Sadece görev tanımı + soru',                   'Basit sınıflandırma, çeviri'],
    ['Few-shot',          'N adet (input → output) örneği',                'Format / stil kopyalama'],
    ['Chain-of-Thought',  '"Adım adım düşün" → ara hesaplar',              'Matematik, mantık, akıl yürütme'],
    ['ReAct',             'Thought → Action → Observation döngüsü',        'Tool kullanan agent'],
    ['Self-Consistency',  'N kez örnekle, çoğunluk oyu',                   'Belirsiz cevaplı sorular'],
    ['Tree-of-Thoughts',  'Birden çok adım dalını paralel keşfet',         'Karmaşık planlama, oyun'],
  ];
  const ws = [2.4, 3.6, 3.0];
  const xs = [0.5, 2.9, 6.5];
  rows.forEach((r, i) => {
    const y = 1.55 + i * 0.55;
    const bg = i % 2 === 0 ? C.warmBg : 'FFFFFF';
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 0.55, fill: { color: bg }, line: { color: C.bdr, width: 0.5 } });
    r.forEach((cell, j) => {
      s.addText(cell, { x: xs[j], y, w: ws[j], h: 0.55, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: j === 0 ? C.dark : C.mid, bold: j === 0, align: j === 0 ? 'left' : 'left', valign: 'middle', paraSpaceBefore: 0 });
    });
  });

  s.addText('💡  Görevin karmaşıklığı arttıkça daha "akıllı" desen seç — ama her ekstra desen extra token = maliyet.',
    { x: 0.5, y: 4.95, w: 9, h: 0.4, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.acc });
})();

// ═══════════════════════ 10) FEW-SHOT ÖRNEĞİ ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Few-Shot Prompting — Örnek Vererek Öğret', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.pri });
  s.addText('Neden işe yarar?', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.pri });
  s.addText([
    { text: '✓ Model format kalıbını yakalar\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Edge case\'leri görür ve genelleştirir\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Eğitim gerekmeden "tek seferlik" özelleştirme\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '\n', options: {} },
    { text: 'Pratik kural:  ', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: '3-8 örnek genelde yeterli. Daha fazlası dönüşü azalır.\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '⚠  ', options: { fontSize: 11, color: C.sec, bold: true } },
    { text: 'Tüm örnekler aynı sınıftan olursa model önyargılı olur.', options: { fontSize: 11, color: C.dark, italic: true } },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.4, margin: 0, fontFace: 'Calibri' });

  T.addCodeBlock(pres, s, 5.1, 1.05, 4.5, 3.95, [
    { text: '# Sentiment classifier (few-shot)\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'prompt = ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"""\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: 'Metni POS/NEG olarak etiketle.\n\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: 'Metin: Ürün harika, çok memnunum!\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: 'Etiket: POS\n\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: 'Metin: Kargo geç geldi, paket kırıktı.\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: 'Etiket: NEG\n\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: 'Metin: Fiyat performans iyi.\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: 'Etiket: POS\n\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: 'Metin: {user_input}\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: 'Etiket:\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: '"""', options: { color: C.codeRed, fontSize: 11 } },
  ]);
})();

// ═══════════════════════ 11) CHAIN-OF-THOUGHT ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Chain-of-Thought — "Adım Adım Düşün"', SECTION, C.cream, TOTAL);

  // Sol: kötü prompt
  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.sec });
  s.addText('❌  Naive prompt', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 13, bold: true, color: C.sec });
  s.addText('Roger\'ın 5 tenis topu var. 2 kutu daha aldı, her kutuda 3 top var. Toplam kaç top?',
    { x: 0.7, y: 1.55, w: 4, h: 1.0, margin: 0, fontFace: 'Calibri', fontSize: 11, color: C.dark, italic: true });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 2.6, w: 4, h: 0.5, fill: { color: C.codeBg } });
  s.addText('LLM: 11', { x: 0.8, y: 2.6, w: 3.8, h: 0.5, margin: 0, fontFace: 'Consolas', fontSize: 12, bold: true, color: C.codeRed, valign: 'middle' });
  s.addText('Yanlış cevap. 5 + 2×3 = 11 değil, 5 + 6 = 11... wait, 11 doğru. Daha karmaşık matematikte CoT fark yaratır.',
    { x: 0.7, y: 3.2, w: 4.0, h: 1.7, margin: 0, fontFace: 'Calibri', fontSize: 9.5, color: C.mid, italic: true });

  // Sağ: CoT prompt
  T.addCard(pres, s, 5.1, 1.05, 4.4, 3.95, { topColor: C.acc });
  s.addText('✅  CoT prompt', { x: 5.3, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 13, bold: true, color: C.acc });
  s.addText('... Toplam kaç top? Adım adım düşün.',
    { x: 5.3, y: 1.55, w: 4, h: 0.5, margin: 0, fontFace: 'Calibri', fontSize: 11, color: C.dark, italic: true });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 2.1, w: 4, h: 2.0, fill: { color: C.codeBg } });
  s.addText([
    { text: 'LLM:\n', options: { color: C.codeGreen, fontSize: 10, bold: true, breakLine: true } },
    { text: '1. Roger\'da 5 top var.\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '2. 2 kutu × 3 top = 6 top.\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '3. Toplam: 5 + 6 = 11.\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'Cevap: 11', options: { color: C.codeYellow, fontSize: 11, bold: true } },
  ], { x: 5.4, y: 2.15, w: 3.8, h: 1.9, margin: 0, fontFace: 'Consolas' });
  s.addText('GSM8K\'de CoT, doğruluğu %18 → %57\'ye çıkarır (Wei et al. 2022).',
    { x: 5.3, y: 4.2, w: 4, h: 0.6, margin: 0, fontFace: 'Calibri', fontSize: 10, color: C.acc, bold: true });

  // Alt
  T.addCard(pres, s, 0.5, 5.05, 9.0, 0.4, { bg: C.warmBg, leftColor: C.pri });
  s.addText('💡  Modern reasoning modeller (o1, Gemini 2.5 Thinking) CoT\'yi built-in yapar — prompt\'ta yazmaya gerek kalmaz.',
    { x: 0.7, y: 5.05, w: 8.8, h: 0.4, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 12) REACT DESENI ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'ReAct — Thought · Action · Observation Döngüsü', SECTION, C.cream, TOTAL);

  T.addCodeBlock(pres, s, 0.5, 1.05, 9.0, 3.4, [
    { text: 'Soru: ', options: { color: C.codeGreen, fontSize: 11, bold: true } },
    { text: 'Antalya bugün hava nasıl, şemsiye almalı mıyım?\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'Thought 1: ', options: { color: C.codePurple, fontSize: 11, bold: true } },
    { text: 'Önce hava durumunu öğrenmem gerek.\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'Action 1: ', options: { color: C.codeYellow, fontSize: 11, bold: true } },
    { text: 'get_weather(city="Antalya")\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: 'Observation 1: ', options: { color: C.codeBlue, fontSize: 11, bold: true } },
    { text: '{"temp": 24, "condition": "yağmurlu", "rain_prob": 0.8}\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'Thought 2: ', options: { color: C.codePurple, fontSize: 11, bold: true } },
    { text: 'Yağmur olasılığı %80, evet şemsiye gerekli.\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'Action 2: ', options: { color: C.codeYellow, fontSize: 11, bold: true } },
    { text: 'finish(answer="...")\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: 'Final: ', options: { color: C.codeGreen, fontSize: 11, bold: true } },
    { text: 'Bugün Antalya yağmurlu, %80 yağış olasılığı var. Şemsiye almanı tavsiye ederim.', options: { color: C.codeWhite, fontSize: 11 } },
  ]);

  T.addCard(pres, s, 0.5, 4.55, 9.0, 0.85, { bg: C.warmBg, leftColor: C.acc });
  s.addText('🛠  ReAct = LangChain / LangGraph agent\'lerinin temel deseni. Tool kullanarak harici dünyaya bağlanır.',
    { x: 0.7, y: 4.65, w: 8.6, h: 0.7, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.dark });
})();

// ═══════════════════════ 13) FUNCTION CALLING ŞEMASI ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Function Calling — Tool Schema Tasarımı', SECTION, C.cream, TOTAL);

  T.addCodeBlock(pres, s, 0.5, 1.05, 9.0, 4.0, [
    { text: '# OpenAI / Gemini stilinde tool definition\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'tools = [{\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '  ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"type"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ': ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"function"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '  ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"function"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ': {\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"name"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ': ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"get_weather"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"description"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ': ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"Bir şehrin güncel hava durumunu döndürür"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"parameters"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ': {\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '      ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"type"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ': ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"object"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '      ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"properties"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ': {\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '        ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"city"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ': {', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"type"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ': ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"string"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ', ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"description"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ': ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"İl adı, örn. Antalya"', options: { color: C.codeRed, fontSize: 11 } },
    { text: '},\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '        ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"unit"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ': {', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"type"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ': ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"string"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ', ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"enum"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ': [', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"celsius"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ',', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"fahrenheit"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ']}\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '      },\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '      ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"required"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ': [', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"city"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ']\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    }\n  }\n}]\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '# Model bu şemayı görür → city="Antalya", unit="celsius" çıkarır.', options: { color: C.codeGreen, fontSize: 10 } },
  ]);
})();

// ═══════════════════════ 14) OPENAI vs ANTHROPIC TOOL USE ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Function Calling: OpenAI vs Anthropic Stilleri', SECTION, C.cream, TOTAL);

  // Sol: OpenAI / Gemini
  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.pri });
  s.addText('OpenAI / Gemini', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.pri });
  s.addText([
    { text: '• ', options: { fontSize: 11, color: C.pri, bold: true } },
    { text: 'tools=[...] parametresi\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '• ', options: { fontSize: 11, color: C.pri, bold: true } },
    { text: 'tool_choice="auto" | "required"\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '• ', options: { fontSize: 11, color: C.pri, bold: true } },
    { text: 'JSON Schema parametre formatı\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '• ', options: { fontSize: 11, color: C.pri, bold: true } },
    { text: 'Yanıt: tool_calls[] dizisi (paralel)\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '• ', options: { fontSize: 11, color: C.pri, bold: true } },
    { text: 'role="tool" mesajla cevap\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'Avantaj:  ', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: 'Strict mode (strict=true) ile şema garantili.', options: { fontSize: 11, color: C.dark, italic: true } },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.4, margin: 0, fontFace: 'Calibri' });

  // Sağ: Anthropic
  T.addCard(pres, s, 5.1, 1.05, 4.4, 3.95, { topColor: C.sec });
  s.addText('Anthropic Claude', { x: 5.3, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.sec });
  s.addText([
    { text: '• ', options: { fontSize: 11, color: C.sec, bold: true } },
    { text: 'tools=[...] parametresi\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '• ', options: { fontSize: 11, color: C.sec, bold: true } },
    { text: 'tool_choice={"type":"auto"} veya "tool"\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '• ', options: { fontSize: 11, color: C.sec, bold: true } },
    { text: 'input_schema (JSON Schema)\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '• ', options: { fontSize: 11, color: C.sec, bold: true } },
    { text: 'Yanıt: content[].type=="tool_use"\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '• ', options: { fontSize: 11, color: C.sec, bold: true } },
    { text: 'tool_result blok ile cevap döner\n\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: 'Avantaj:  ', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: 'Native paralel tool çağrısı, daha az halüsinasyon.', options: { fontSize: 11, color: C.dark, italic: true } },
  ], { x: 5.3, y: 1.55, w: 4.0, h: 3.4, margin: 0, fontFace: 'Calibri' });

  // Alt
  T.addCard(pres, s, 0.5, 5.05, 9.0, 0.4, { bg: C.warmBg, leftColor: C.acc });
  s.addText('💡  LangChain / instructor / pydantic-ai gibi kütüphaneler iki API\'yi tek arayüzde birleştirir.',
    { x: 0.7, y: 5.05, w: 8.8, h: 0.4, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 15) GOOGLE AI STUDIO ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Google AI Studio — Prompt Lab', SECTION, C.cream, TOTAL);

  const feats = [
    { n: '1', t: 'Free tier',         d: 'Gemini Flash + Pro · ücretsiz hız sınırı', c: C.pri },
    { n: '2', t: 'Prompt karşılaştırma', d: 'A/B aynı prompt + farklı model / parametre', c: C.sec },
    { n: '3', t: 'System instruction', d: 'Persona + format zorunluluğu',              c: C.acc },
    { n: '4', t: 'Structured output',  d: 'JSON schema enforce — Pydantic uyumlu',     c: C.purple },
    { n: '5', t: 'Tool use',           d: 'Native function calling + Code Execution',  c: C.cyan },
    { n: '6', t: 'Get code',           d: 'Python / JS / cURL snippet bir tıkla',      c: C.amber },
  ];
  feats.forEach((f, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.5 + col * 3.1;
    const y = 1.1 + row * 1.95;
    T.addCard(pres, s, x, y, 2.9, 1.8, { topColor: f.c });
    T.numBadge(pres, s, x + 0.15, y + 0.2, f.n, f.c);
    s.addText(f.t, { x: x + 0.6, y: y + 0.18, w: 2.2, h: 0.35, margin: 0, fontFace: 'Georgia', fontSize: 13, bold: true, color: C.dark });
    s.addText(f.d, { x: x + 0.15, y: y + 0.65, w: 2.65, h: 1.1, margin: 0, fontFace: 'Calibri', fontSize: 10, color: C.mid });
  });

  s.addText('🌐  aistudio.google.com  —  bootcamp boyunca varsayılan playground\'ımız.',
    { x: 0.5, y: 5.07, w: 9, h: 0.35, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.pri, align: 'center' });
})();

// ═══════════════════════ 16) MODEL KARŞILAŞTIRMA TABLOSU ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Model Karşılaştırma — Gemini · GPT · Claude · Llama', SECTION, C.cream, TOTAL);

  // Header
  const xs = [0.5, 2.4, 4.0, 5.6, 7.2, 8.5];
  const ws = [1.9, 1.6, 1.6, 1.6, 1.3, 1.0];
  const headers = ['Model', 'Context', 'Strong suit', 'Tool use', 'Fiyat (1M tok)', 'TR'];

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 9.0, h: 0.45, fill: { color: C.pri } });
  headers.forEach((h, i) => {
    s.addText(h, { x: xs[i], y: 1.1, w: ws[i], h: 0.45, margin: 0, fontFace: 'Calibri', fontSize: 10.5, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
  });

  const rows = [
    ['Gemini 2.5 Pro',    '2M',   'Uzun bağlam',     '✓ native', '$1.25 / $5',   '★★★★'],
    ['Gemini 2.5 Flash',  '1M',   'Hız + ucuz',      '✓ native', '$0.075 / $0.3','★★★★'],
    ['GPT-4o',            '128K', 'Çok dilli, kod',  '✓ native', '$2.5 / $10',   '★★★★'],
    ['GPT-4o mini',       '128K', 'Ucuz alternatif', '✓ native', '$0.15 / $0.6', '★★★'],
    ['Claude 4.5 Sonnet', '200K', 'Reasoning + kod', '✓ paralel','$3 / $15',     '★★★★'],
    ['Llama 3.3 70B',     '128K', 'Open-source, lokal','⚠ template','self-host',  '★★★'],
  ];
  rows.forEach((r, i) => {
    const y = 1.55 + i * 0.5;
    const bg = i % 2 === 0 ? C.warmBg : 'FFFFFF';
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 0.5, fill: { color: bg }, line: { color: C.bdr, width: 0.5 } });
    r.forEach((cell, j) => {
      s.addText(cell, { x: xs[j], y, w: ws[j], h: 0.5, margin: 0, fontFace: 'Calibri', fontSize: 9.5, color: j === 0 ? C.dark : C.mid, bold: j === 0, align: j === 0 ? 'left' : 'center', valign: 'middle', paraSpaceBefore: 0 });
    });
  });

  s.addText('💰  Bootcamp tercih:  Gemini 2.5 Flash (ücretsiz quota) → öğrenme · Claude / GPT → karşılaştırma · Llama → lokal modül.',
    { x: 0.5, y: 4.9, w: 9, h: 0.4, margin: 0, fontFace: 'Calibri', fontSize: 10.5, bold: true, color: C.acc });
})();

// ═══════════════════════ 17) MALİYET HESABI ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Maliyet ve Token Bütçesi — Gerçek Senaryo', SECTION, C.cream, TOTAL);

  // Üç senaryo statBox
  T.addCard(pres, s, 0.5, 1.05, 9.0, 1.4, { topColor: C.pri });
  s.addText('Senaryo: Müşteri destek chatbot\'u · 10.000 günlük konuşma', { x: 0.7, y: 1.18, w: 8.5, h: 0.35, margin: 0, fontFace: 'Georgia', fontSize: 13, bold: true, color: C.pri });
  s.addText('Ortalama: 500 input + 200 output token / konuşma  ·  Aylık: ~210M token',
    { x: 0.7, y: 1.55, w: 8.5, h: 0.3, margin: 0, fontFace: 'Calibri', fontSize: 11, color: C.dark });

  T.statBox(pres, s, 0.5, 2.7, 2.85, 1.2, '$2.6K',  'Gemini Flash / ay', C.acc);
  T.statBox(pres, s, 3.55, 2.7, 2.85, 1.2, '$13.5K', 'GPT-4o / ay',       C.sec);
  T.statBox(pres, s, 6.6, 2.7, 2.85, 1.2, '$36K',   'Claude Sonnet / ay', C.pri);

  // Optimizasyon ipuçları
  T.addCard(pres, s, 0.5, 4.1, 9.0, 1.25, { bg: C.warmBg, leftColor: C.acc });
  s.addText('Token bütçesini azaltmanın 5 yolu', { x: 0.7, y: 4.18, w: 8.5, h: 0.3, margin: 0, fontFace: 'Georgia', fontSize: 12, bold: true, color: C.acc });
  s.addText('① System prompt\'u kısalt  ·  ② Few-shot örneklerini minimize et  ·  ③ Prompt caching kullan  ·  ④ Model routing (kolay → Flash, zor → Pro)  ·  ⑤ Cevap uzunluğunu max_tokens ile sınırla',
    { x: 0.7, y: 4.55, w: 8.5, h: 0.75, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });
})();

// ═══════════════════════ 18) NOTEBOOK ÖZETİ ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Bu Modülün Notebook\'ları', SECTION, C.cream, TOTAL);

  const nbs = [
    { n: 1, t: 'modul02_01_tokenization_context.ipynb', d: 'HuggingFace tokenizer ile token sayımı, context window analizi, multilingual karşılaştırma', c: C.pri },
    { n: 2, t: 'modul02_02_ai_studio_prompt.ipynb',     d: 'Google AI Studio + Gemini ile prompt karşılaştırma, sampling parametreleri', c: C.sec },
    { n: 3, t: 'modul02_03_cot_react.ipynb',            d: 'Chain-of-Thought ve ReAct desenleri ile matematik/akıl yürütme problemleri', c: C.acc },
    { n: 4, t: 'modul02_04_function_calling.ipynb',     d: 'Function calling örneği: hava durumu, hesap makinesi, web arama tool\'ları', c: C.purple },
  ];
  nbs.forEach((nb, i) => {
    const y = 1.15 + i * 0.95;
    T.addCard(pres, s, 0.5, y, 9.0, 0.85, { leftColor: nb.c });
    T.numBadge(pres, s, 0.7, y + 0.22, nb.n, nb.c);
    s.addText(nb.t, { x: 1.35, y: y + 0.13, w: 8.0, h: 0.35, margin: 0, fontFace: 'Consolas', fontSize: 11, bold: true, color: C.dark });
    s.addText(nb.d, { x: 1.35, y: y + 0.46, w: 8.0, h: 0.4, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.mid });
  });
})();

// ═══════════════════════ 19) ÖDEVLER ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Bu Modülün Ödevleri', SECTION, C.cream, TOTAL);

  const assigns = [
    {
      t: '1 · Prompt deseni karşılaştırması',
      d: 'Aynı görev (örn. GSM8K\'den 20 matematik problemi) için zero-shot, few-shot ve CoT prompt versiyonlarını yaz; doğruluğu karşılaştır.',
      c: C.pri,
    },
    {
      t: '2 · Function calling agent',
      d: 'Hesap makinesi + hava durumu tool\'larını tanımla. Gemini veya GPT modelinin doğru tool\'u doğru parametrelerle çağırdığını 5 senaryo ile doğrula.',
      c: C.sec,
    },
    {
      t: '3 · AI Studio sistem prompt A/B',
      d: 'Google AI Studio\'da 3 farklı sistem prompt\'u ile aynı kullanıcı sorusunu test et; yanıt kalitesi + uzunluk + maliyet açısından rapor yaz.',
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

// ═══════════════════════ 20) KAYNAKLAR ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Kaynaklar ve Daha Fazla Okuma', SECTION, C.cream, TOTAL);

  const links = [
    { t: 'Google AI Studio',                  u: 'aistudio.google.com',                       c: C.pri },
    { t: 'Attention Is All You Need (2017)',  u: 'arxiv.org/abs/1706.03762',                  c: C.sec },
    { t: 'Prompt Engineering Guide (DAIR.AI)',u: 'promptingguide.ai',                         c: C.acc },
    { t: 'OpenAI Function Calling',           u: 'platform.openai.com/docs/guides/function-calling', c: C.purple },
    { t: 'Anthropic Tool Use',                u: 'docs.anthropic.com/claude/docs/tool-use',   c: C.cyan },
    { t: 'OpenAI Tokenizer (tiktoken)',       u: 'github.com/openai/tiktoken',                c: C.amber },
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

// ═══════════════════════ 21) KAPANIŞ ═══════════════════════
T.addClosingSlide(
  pres,
  'Modül 2 — Çıkarımlar',
  [
    { text: 'LLM = bir sonraki token tahmincisi. Sihir yok, koşullu olasılık var.',                 color: C.sec },
    { text: 'Tokenization Türkçe için %30 daha maliyetlidir — multilingual tokenizer tercih et.',  color: C.acc },
    { text: 'CoT, Self-Consistency gibi desenler doğruluğu büyütür ama token harcamasını da.',     color: C.pri },
    { text: 'Function calling = LLM\'i dış dünyaya bağlayan en güçlü tek özellik.',                  color: C.purple },
    { text: 'Maliyet kontrolü: model routing + prompt caching + max_tokens.',                       color: C.cyan },
  ],
  'Bir sonraki modül: Hugging Face ekosistemi ve lokal LLM çalıştırma.',
  'Dr. Murat Altun'
);

// ═══════════════════════ KAYDET ═══════════════════════
pres.writeFile({ fileName: 'modul02_llm_temelleri_prompt.pptx' })
  .then(name => console.log('✓ Modül 2 PPTX hazır:', name));
