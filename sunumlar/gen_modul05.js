/**
 * MODÜL 5 — Fine-Tuning: PEFT, LoRA ve QLoRA
 * 22 slayt · Generative Spectrum · Dr. Murat Altun · BTK Akademi 2026
 */
const T = require('/Users/drmurataltun/.claude/pptx-template-llm.js');
const { C } = T;

const TOTAL = 22;
const SECTION = 'MODÜL 5 · FINE-TUNING';
const MOD_LABEL = 'MODÜL 5';

const pres = T.createPres('Modül 5 — Fine-Tuning: PEFT, LoRA ve QLoRA', 'Dr. Murat Altun');

// ═══════════════════════ 1) KAPAK ═══════════════════════
T.addCoverSlide(
  pres,
  'Fine-Tuning:\nPEFT, LoRA ve QLoRA',
  'Unsloth · Axolotl · GGUF Conversion · HF Publish\nile uçtan uca model özelleştirme',
  'Dr. Murat Altun  ·  Modül 5  ·  Gün 5-6 (6 saat)',
  [
    { value: '6',  label: 'SAAT' },
    { value: '12', label: 'KONU' },
    { value: '5',  label: 'NOTEBOOK' },
    { value: '3',  label: 'ÖDEV' },
  ]
);
(function () {
  const s = pres.slides[pres.slides.length - 1];
  s.addShape(pres.shapes.RECTANGLE, { x: 6.7, y: 5.17, w: 2.4, h: 0.3, fill: { color: C.acc } });
  s.addText('BTK AKADEMİ · LLM BOOTCAMP', { x: 6.7, y: 5.17, w: 2.4, h: 0.3, margin: 0, fontFace: 'Calibri', fontSize: 8, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle', charSpacing: 2 });
})();

// ═══════════════════════ 2) AGENDA ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Bu Modülde Neler Var?', SECTION, C.cream, TOTAL);

  const items = [
    { icon: '1', t: 'Fine-tuning vs RAG',         d: 'Karar çerçevesi: hangi problem hangi yöntem' },
    { icon: '2', t: 'SFT Yaşam Döngüsü',          d: 'Veri → format → train → eval → merge → deploy' },
    { icon: '3', t: 'PEFT & LoRA Teorisi',        d: 'Düşük rank ayrıştırma, hiperparametreler' },
    { icon: '4', t: 'QLoRA + Unsloth',            d: '4-bit + LoRA, Colab T4 ile 2× hız' },
    { icon: '5', t: 'Axolotl YAML Config',        d: 'Tek YAML ile reproducible fine-tuning' },
    { icon: '6', t: 'Merge · GGUF · Publish',     d: 'Adapter merge, Ollama ve HF Hub yayını' },
  ];
  const colors = [C.acc, C.sec, C.pri, C.acc, C.sec, C.pri];

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

// ═══════════════════════ 3) FINE-TUNING vs RAG KARAR MATRİSİ ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Fine-Tuning mi, RAG mi? Karar Çerçevesi', SECTION, C.cream, TOTAL);

  const headers = ['Sorun', 'RAG', 'Fine-Tuning'];
  const rows = [
    ['Güncel doküman bilgisi',     '✓ ideal',                 '✗ pahalı/yavaş'],
    ['Yeni davranış / stil / ton', '⚠ sınırlı',               '✓ ideal'],
    ['Dil / format / şema öğret',  '⚠ prompt ile sınırlı',    '✓ kalıcı kazanım'],
    ['Domain terminolojisi',       '✓ + glossary',            '✓ daha akıcı'],
    ['Maliyet (başlangıç)',        'Düşük',                   'Orta-yüksek (GPU)'],
    ['Hızlı güncelleme',           '✓ vector store update',   '✗ yeniden train'],
  ];

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.05, w: 9.0, h: 0.42, fill: { color: C.pri } });
  headers.forEach((h, i) => {
    s.addText(h, { x: 0.5 + i * 3.0, y: 1.05, w: 3.0, h: 0.42, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
  });
  rows.forEach((r, i) => {
    const y = 1.47 + i * 0.46;
    const bg = i % 2 === 0 ? C.warmBg : 'FFFFFF';
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 0.46, fill: { color: bg }, line: { color: C.bdr, width: 0.5 } });
    r.forEach((cell, j) => {
      s.addText(cell, { x: 0.5 + j * 3.0, y, w: 3.0, h: 0.46, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: j === 0 ? C.dark : C.mid, bold: j === 0, align: j === 0 ? 'left' : 'center', valign: 'middle' });
    });
  });

  T.addCard(pres, s, 0.5, 4.5, 9.0, 0.7, { bg: C.accPale, leftColor: C.acc });
  s.addText('💡  Çoğu zaman cevap: RAG + küçük instruction fine-tune. Birbirinin alternatifi değil tamamlayıcısıdır.',
    { x: 0.7, y: 4.55, w: 8.8, h: 0.6, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 4) SFT YAŞAM DÖNGÜSÜ ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Supervised Fine-Tuning (SFT) Yaşam Döngüsü', SECTION, C.cream, TOTAL);

  const stages = [
    { n: 1, t: 'Veri',       d: 'Toplama + temizleme',   c: C.pri },
    { n: 2, t: 'Format',     d: 'Chat template + JSONL', c: C.sec },
    { n: 3, t: 'Train',      d: 'PEFT / LoRA / QLoRA',   c: C.acc },
    { n: 4, t: 'Eval',       d: 'Loss + perplexity',     c: C.purple },
    { n: 5, t: 'Merge',      d: 'Adapter → base',        c: C.cyan },
    { n: 6, t: 'Deploy',     d: 'GGUF + Ollama + Hub',   c: C.amber },
  ];

  stages.forEach((st, i) => {
    const x = 0.45 + i * 1.55;
    const y = 1.4;
    s.addShape(pres.shapes.OVAL, { x, y, w: 1.3, h: 1.3, fill: { color: st.c } });
    s.addText(String(st.n), { x, y, w: 1.3, h: 1.3, margin: 0, fontFace: 'Georgia', fontSize: 36, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
    s.addText(st.t, { x: x - 0.05, y: y + 1.35, w: 1.4, h: 0.32, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.dark, align: 'center' });
    s.addText(st.d, { x: x - 0.1, y: y + 1.65, w: 1.5, h: 0.4, margin: 0, fontFace: 'Calibri', fontSize: 9, color: C.mid, align: 'center' });

    if (i < stages.length - 1) {
      s.addShape(pres.shapes.RIGHT_TRIANGLE, { x: x + 1.32, y: y + 0.55, w: 0.2, h: 0.2, fill: { color: C.subtle }, rotate: 90 });
    }
  });

  T.addCard(pres, s, 0.5, 4.05, 9.0, 1.05, { bg: C.accPale, topColor: C.acc });
  s.addText('💡  Modern SFT: veri kalitesi parametre sayısından önemlidir', { x: 0.7, y: 4.15, w: 9, h: 0.35, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.acc });
  s.addText('1.000 mükemmel örnek > 100.000 gürültülü örnek. LIMA paper (Meta 2023): 1K curated örnek ile rakipsiz performans.',
    { x: 0.7, y: 4.45, w: 8.8, h: 0.6, margin: 0, fontFace: 'Calibri', fontSize: 11, color: C.dark });
})();

// ═══════════════════════ 5) INSTRUCTION FORMAT ÖRNEKLERİ ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Instruction Format: Alpaca · ShareGPT · ChatML', SECTION, C.cream, TOTAL);

  const cols = [
    {
      t: 'Alpaca',
      desc: 'Tek-turn, instruction + input + output',
      code: '{\n "instruction": "Türkçeye çevir",\n "input": "Hello world",\n "output": "Merhaba dünya"\n}',
      c: C.pri,
    },
    {
      t: 'ShareGPT',
      desc: 'Çok-turn, conversations dizisi',
      code: '{\n "conversations": [\n  {"from":"human","value":"..."},\n  {"from":"gpt","value":"..."}\n ]\n}',
      c: C.acc,
    },
    {
      t: 'ChatML',
      desc: 'OpenAI / Llama-3 standart format',
      code: '<|system|>Yardımcısın\n<|user|>Türkiye nüfusu?\n<|assistant|>85 milyon\n<|end|>',
      c: C.sec,
    },
  ];

  cols.forEach((co, i) => {
    const x = 0.5 + i * 3.1;
    T.addCard(pres, s, x, 1.05, 2.9, 4.0, { topColor: co.c });
    s.addText(co.t, { x: x + 0.15, y: 1.18, w: 2.6, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 18, bold: true, color: co.c });
    s.addText(co.desc, { x: x + 0.15, y: 1.6, w: 2.6, h: 0.5, margin: 0, fontFace: 'Calibri', fontSize: 10, color: C.mid, italic: true });
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.15, y: 2.15, w: 2.6, h: 2.8, fill: { color: C.codeBg } });
    s.addText(co.code, { x: x + 0.22, y: 2.2, w: 2.5, h: 2.7, margin: 0, fontFace: 'Consolas', fontSize: 9, color: C.codeWhite });
  });
})();

// ═══════════════════════ 6) CHAT TEMPLATE KOD ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Chat Template · tokenizer.apply_chat_template', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 3.7, 3.95, { topColor: C.acc });
  s.addText('Neden chat template?', { x: 0.65, y: 1.15, w: 3.5, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.acc });
  s.addText([
    { text: '✓ Modelin pretraining\'iyle uyumlu özel token\'lar\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Llama-3, Mistral, Qwen — herkesin formatı farklı\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Yanlış format → modelin susması veya saçmalaması\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ HF tokenizer otomatik halleder\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '\n', options: {} },
    { text: 'Kural: ', options: { fontSize: 11, color: C.sec, bold: true } },
    { text: 'her zaman base modelin kendi template\'ini kullan', options: { fontSize: 11, color: C.dark, italic: true } },
  ], { x: 0.65, y: 1.55, w: 3.5, h: 3.4, margin: 0, fontFace: 'Calibri' });

  T.addCodeBlock(pres, s, 4.4, 1.05, 5.2, 3.95, [
    { text: 'from ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'transformers ', options: { color: C.codeBlue, fontSize: 10 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'AutoTokenizer\n\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'tok = AutoTokenizer.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'from_pretrained', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    "meta-llama/Llama-3.2-3B-Instruct"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ')\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'msgs = [\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    {"role": ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"system"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ', "content": ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"Türkçe asistansın"', options: { color: C.codeRed, fontSize: 10 } },
    { text: '},\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    {"role": ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"user"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ',   "content": ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"Selam, nasılsın?"', options: { color: C.codeRed, fontSize: 10 } },
    { text: '},\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: ']\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'text = tok.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'apply_chat_template', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    msgs,\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    tokenize=', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'False', options: { color: C.codePurple, fontSize: 10 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    add_generation_prompt=', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'True', options: { color: C.codePurple, fontSize: 10 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: ')\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '# → <|begin_of_text|><|start_header_id|>system<|end_header_id|>...', options: { color: C.codeGreen, fontSize: 9 } },
  ]);
})();

// ═══════════════════════ 7) PEFT TEORİSİ — FULL vs PEFT ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'PEFT Neden? Full Fine-Tuning vs PEFT', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.sec });
  s.addText('Full Fine-Tuning', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 16, bold: true, color: C.sec });
  s.addText([
    { text: '✗ 7B model için ~80 GB VRAM\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✗ Her görev için ayrı tam model\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✗ Saatler / günler süren training\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✗ Catastrophic forgetting riski\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✗ A100 80GB GPU şart\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '\n', options: {} },
    { text: 'Maliyet: ', options: { fontSize: 11, color: C.sec, bold: true } },
    { text: 'haftada $500-2000+ cloud', options: { fontSize: 11, color: C.dark, italic: true } },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.4, margin: 0, fontFace: 'Calibri' });

  T.addCard(pres, s, 5.1, 1.05, 4.4, 3.95, { topColor: C.acc });
  s.addText('PEFT (LoRA / QLoRA)', { x: 5.3, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 16, bold: true, color: C.acc });
  s.addText([
    { text: '✓ 7B model için ~6 GB VRAM\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Sadece %0.1-1 parametre eğit\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Dakikalar / saatler içinde\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Adapter dosyası ~50-200 MB\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Colab T4 ücretsiz GPU yeterli\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '\n', options: {} },
    { text: 'Maliyet: ', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: 'ücretsiz Colab / $5-20 saatlik', options: { fontSize: 11, color: C.dark, italic: true } },
  ], { x: 5.3, y: 1.55, w: 4, h: 3.4, margin: 0, fontFace: 'Calibri' });
})();

// ═══════════════════════ 8) LoRA MİMARİ DİYAGRAMI ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'LoRA Mimarisi: W = W₀ + B·A (Low-Rank Decomposition)', SECTION, C.cream, TOTAL);

  // Sol açıklama
  T.addCard(pres, s, 0.5, 1.05, 4.0, 3.95, { topColor: C.pri });
  s.addText('Temel fikir', { x: 0.65, y: 1.15, w: 3.8, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.pri });
  s.addText([
    { text: 'Orijinal ağırlık ', options: { fontSize: 11, color: C.dark } },
    { text: 'W₀ ', options: { fontSize: 11, color: C.pri, bold: true } },
    { text: 'donmuş kalır.\n\n', options: { fontSize: 11, color: C.dark } },
    { text: 'İki düşük-rank matris ', options: { fontSize: 11, color: C.dark } },
    { text: 'B ', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: 've ', options: { fontSize: 11, color: C.dark } },
    { text: 'A ', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: 'eğitilir.\n\n', options: { fontSize: 11, color: C.dark } },
    { text: 'B: d×r,  A: r×k    (r ≪ d, k)\n', options: { fontSize: 11, color: C.sec, italic: true } },
    { text: 'r genelde 8-64 arasında\n\n', options: { fontSize: 10, color: C.mid, italic: true } },
    { text: 'Inference: h = W₀x + (α/r)·B·A·x', options: { fontSize: 11, color: C.dark, bold: true } },
  ], { x: 0.65, y: 1.55, w: 3.8, h: 3.4, margin: 0, fontFace: 'Calibri' });

  // Sağ diyagram
  const dx = 5.0;
  // W0 büyük matris
  s.addShape(pres.shapes.RECTANGLE, { x: dx, y: 1.4, w: 1.8, h: 1.8, fill: { color: C.subtle }, line: { color: C.mid, width: 1 } });
  s.addText('W₀\n(donmuş)\nd × k', { x: dx, y: 1.4, w: 1.8, h: 1.8, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });

  s.addText('+', { x: dx + 1.85, y: 1.95, w: 0.4, h: 0.6, fontFace: 'Georgia', fontSize: 32, bold: true, color: C.pri, align: 'center', valign: 'middle' });

  // B matrisi (yüksek-dar)
  s.addShape(pres.shapes.RECTANGLE, { x: dx + 2.3, y: 1.4, w: 0.5, h: 1.8, fill: { color: C.acc }, line: { color: C.dark, width: 1 } });
  s.addText('B\nd×r', { x: dx + 2.3, y: 1.4, w: 0.5, h: 1.8, margin: 0, fontFace: 'Calibri', fontSize: 10, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });

  // A matrisi (kısa-geniş)
  s.addShape(pres.shapes.RECTANGLE, { x: dx + 2.85, y: 1.4, w: 1.8, h: 0.5, fill: { color: C.sec }, line: { color: C.dark, width: 1 } });
  s.addText('A  (r × k)', { x: dx + 2.85, y: 1.4, w: 1.8, h: 0.5, margin: 0, fontFace: 'Calibri', fontSize: 10, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });

  // Stat box altta
  T.statBox(pres, s, dx, 3.55, 2.3, 1.4, '~0.5%', 'eğitilen parametre oranı', C.acc);
  T.statBox(pres, s, dx + 2.4, 3.55, 2.3, 1.4, '90×', 'daha az bellek', C.sec);
})();

// ═══════════════════════ 9) LoRA HİPERPARAMETRELERİ ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'LoRA Hiperparametreleri — Pratik Rehber', SECTION, C.cream, TOTAL);

  const headers = ['Parametre', 'Tipik değer', 'Etkisi'];
  const rows = [
    ['r (rank)',         '8, 16, 32, 64',                 'Yüksek = daha çok kapasite, daha çok VRAM'],
    ['lora_alpha',       '16, 32 (2×r)',                  'Ölçek katsayısı; α/r oranı önemli'],
    ['target_modules',   'q_proj, v_proj, k_proj, o_proj','Attention\'ı hedefle; tam: all-linear'],
    ['lora_dropout',     '0.0 – 0.1',                     'Küçük veri setinde overfit\'i azaltır'],
    ['bias',             '"none" (varsayılan)',           '"all" / "lora_only" da olabilir'],
    ['task_type',        'CAUSAL_LM',                     'SFT için CAUSAL_LM, SEQ2SEQ_LM seçenek'],
  ];

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.05, w: 9.0, h: 0.42, fill: { color: C.pri } });
  headers.forEach((h, i) => {
    const w = i === 0 ? 2.3 : (i === 1 ? 2.4 : 4.3);
    const x = i === 0 ? 0.5 : (i === 1 ? 2.8 : 5.2);
    s.addText(h, { x, y: 1.05, w, h: 0.42, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
  });
  rows.forEach((r, i) => {
    const y = 1.47 + i * 0.46;
    const bg = i % 2 === 0 ? C.warmBg : 'FFFFFF';
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 0.46, fill: { color: bg }, line: { color: C.bdr, width: 0.5 } });
    r.forEach((cell, j) => {
      const w = j === 0 ? 2.3 : (j === 1 ? 2.4 : 4.3);
      const x = j === 0 ? 0.5 : (j === 1 ? 2.8 : 5.2);
      s.addText(cell, { x, y, w, h: 0.46, margin: 0, fontFace: j < 2 ? 'Consolas' : 'Calibri', fontSize: 10.5, color: j === 0 ? C.dark : C.mid, bold: j === 0, align: j === 0 ? 'left' : (j === 1 ? 'center' : 'left'), valign: 'middle' });
    });
  });

  T.addCard(pres, s, 0.5, 4.5, 9.0, 0.65, { bg: C.accPale, leftColor: C.acc });
  s.addText('🎯  Başlangıç tarifi: r=16, alpha=32, target=all-linear, dropout=0.05 — sonra deney',
    { x: 0.7, y: 4.55, w: 8.8, h: 0.55, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 10) QLoRA = 4-BIT + LoRA ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'QLoRA: 4-bit Quantization + LoRA = Devrim', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.pri });
  s.addText('Üç bileşen', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.pri });
  s.addText([
    { text: '1. ', options: { fontSize: 11, color: C.sec, bold: true } },
    { text: 'NF4 (NormalFloat-4) ', options: { fontSize: 11, color: C.dark, bold: true } },
    { text: '— base modeli 4-bit\'e indir\n\n', options: { fontSize: 11, color: C.dark } },
    { text: '2. ', options: { fontSize: 11, color: C.sec, bold: true } },
    { text: 'Double Quantization ', options: { fontSize: 11, color: C.dark, bold: true } },
    { text: '— quantization sabitlerini de quantize et\n\n', options: { fontSize: 11, color: C.dark } },
    { text: '3. ', options: { fontSize: 11, color: C.sec, bold: true } },
    { text: 'Paged Optimizer ', options: { fontSize: 11, color: C.dark, bold: true } },
    { text: '— NVIDIA unified memory ile OOM yok\n\n', options: { fontSize: 11, color: C.dark } },
    { text: 'LoRA adapter\'lar BF16 olarak eğitilir.', options: { fontSize: 11, color: C.acc, italic: true } },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.4, margin: 0, fontFace: 'Calibri' });

  // Sağ: bellek karşılaştırma
  T.addCard(pres, s, 5.1, 1.05, 4.4, 3.95, { topColor: C.acc });
  s.addText('7B model bellek tablosu', { x: 5.3, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.acc });

  const bars = [
    { lbl: 'FP32 full FT',   v: 280, val: '~280 GB', c: C.sec },
    { lbl: 'FP16 full FT',   v: 140, val: '~140 GB', c: C.purple },
    { lbl: 'INT8 + LoRA',    v: 24,  val: '~24 GB',  c: C.amber },
    { lbl: 'QLoRA (4-bit)',  v: 6,   val: '~6 GB',   c: C.acc },
  ];
  const maxV = 280;
  bars.forEach((b, i) => {
    const y = 1.6 + i * 0.75;
    s.addText(b.lbl, { x: 5.3, y, w: 1.8, h: 0.35, margin: 0, fontFace: 'Calibri', fontSize: 10, color: C.dark, bold: true, valign: 'middle' });
    const barW = (b.v / maxV) * 1.9 + 0.05;
    s.addShape(pres.shapes.RECTANGLE, { x: 7.1, y: y + 0.06, w: barW, h: 0.25, fill: { color: b.c } });
    s.addText(b.val, { x: 7.15 + barW, y, w: 1.2, h: 0.35, margin: 0, fontFace: 'Calibri', fontSize: 9, color: C.mid, valign: 'middle', bold: true });
  });

  s.addText('Colab T4 GPU: 16 GB VRAM → QLoRA ile 7B model fine-tune mümkün!',
    { x: 5.3, y: 4.55, w: 4.1, h: 0.4, margin: 0, fontFace: 'Calibri', fontSize: 10, color: C.acc, bold: true, italic: true });
})();

// ═══════════════════════ 11) UNSLOTH ÖZELLİKLER ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Unsloth: Colab T4\'te 2× Hız, 50% Daha Az Bellek', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 2.85, 3.9, { topColor: C.pri });
  s.addText('⚡  Hız', { x: 0.6, y: 1.15, w: 2.7, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.pri });
  s.addText('• Custom Triton kernels\n• Flash Attention 2\n• Optimized backward pass\n• HF transformers ile drop-in\n• Llama, Mistral, Gemma, Qwen, Phi destekli',
    { x: 0.6, y: 1.55, w: 2.7, h: 3.2, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });

  T.addCard(pres, s, 3.55, 1.05, 2.85, 3.9, { topColor: C.sec });
  s.addText('💾  Bellek', { x: 3.65, y: 1.15, w: 2.7, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.sec });
  s.addText('• Gradient checkpointing\n• 4-bit base model (NF4)\n• Adam 8-bit optimizer\n• 7B model → 6-8 GB VRAM\n• Long-context destekli (32K+)',
    { x: 3.65, y: 1.55, w: 2.7, h: 3.2, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });

  T.addCard(pres, s, 6.6, 1.05, 2.85, 3.9, { topColor: C.acc });
  s.addText('🎁  Bonus', { x: 6.7, y: 1.15, w: 2.7, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.acc });
  s.addText('• Hazır Colab notebook\'lar\n• Auto chat-template seçimi\n• save_pretrained_gguf()\n• HF Hub direkt push\n• Ollama Modelfile çıktısı',
    { x: 6.7, y: 1.55, w: 2.7, h: 3.2, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });

  T.addCard(pres, s, 0.5, 5.05, 9.0, 0.45, { bg: C.accPale, leftColor: C.acc });
  s.addText('💡  Colab → Runtime → Change runtime type → T4 GPU seç → Unsloth ile başla',
    { x: 0.7, y: 5.07, w: 8.8, h: 0.42, margin: 0, fontFace: 'Calibri', fontSize: 10.5, bold: true, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 12) UNSLOTH KOD ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Unsloth: FastLanguageModel + get_peft_model', SECTION, C.cream, TOTAL);

  T.addCodeBlock(pres, s, 0.5, 1.05, 9.0, 3.95, [
    { text: 'from ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'unsloth ', options: { color: C.codeBlue, fontSize: 11 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'FastLanguageModel\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'torch\n\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: '# 1) Base modeli 4-bit yükle (Colab T4 uyumlu)\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'model, tok = FastLanguageModel.', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'from_pretrained', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    model_name = ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"unsloth/mistral-7b-bnb-4bit"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    max_seq_length = ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '2048', options: { color: C.codeYellow, fontSize: 11 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    dtype = ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'None', options: { color: C.codePurple, fontSize: 11 } },
    { text: ',                  # T4 → fp16 otomatik\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: '    load_in_4bit = ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'True', options: { color: C.codePurple, fontSize: 11 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: ')\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '# 2) LoRA adapter ekle\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'model = FastLanguageModel.', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'get_peft_model', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    model, r=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '16', options: { color: C.codeYellow, fontSize: 11 } },
    { text: ', lora_alpha=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '32', options: { color: C.codeYellow, fontSize: 11 } },
    { text: ', lora_dropout=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '0.05', options: { color: C.codeYellow, fontSize: 11 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    target_modules=[', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"q_proj"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ',', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"k_proj"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ',', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"v_proj"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ',', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"o_proj"', options: { color: C.codeRed, fontSize: 11 } },
    { text: '],\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    use_gradient_checkpointing=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"unsloth"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ', bias=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"none"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: ')', options: { color: C.codeWhite, fontSize: 11 } },
  ]);
})();

// ═══════════════════════ 13) TRL SFTTrainer ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'TRL SFTTrainer ile Eğitim Döngüsü', SECTION, C.cream, TOTAL);

  T.addCodeBlock(pres, s, 0.5, 1.05, 9.0, 3.95, [
    { text: 'from ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'trl ', options: { color: C.codeBlue, fontSize: 11 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'SFTTrainer, SFTConfig\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: 'from ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'datasets ', options: { color: C.codeBlue, fontSize: 11 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'load_dataset\n\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: 'ds = ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'load_dataset', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '(', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"merve/turkish_instructions"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ', split=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"train[:2000]"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ')\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'cfg = ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'SFTConfig', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    output_dir=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"./tr-mistral-lora"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ', num_train_epochs=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '3', options: { color: C.codeYellow, fontSize: 11 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    per_device_train_batch_size=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '2', options: { color: C.codeYellow, fontSize: 11 } },
    { text: ', gradient_accumulation_steps=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '8', options: { color: C.codeYellow, fontSize: 11 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    learning_rate=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '2e-4', options: { color: C.codeYellow, fontSize: 11 } },
    { text: ', warmup_steps=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '20', options: { color: C.codeYellow, fontSize: 11 } },
    { text: ', optim=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"adamw_8bit"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    logging_steps=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '5', options: { color: C.codeYellow, fontSize: 11 } },
    { text: ', report_to=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"wandb"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ', save_strategy=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"epoch"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: ')\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'trainer = ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'SFTTrainer', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '(model=model, train_dataset=ds, tokenizer=tok, args=cfg)\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'trainer.', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'train', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '()', options: { color: C.codeWhite, fontSize: 11 } },
  ]);
})();

// ═══════════════════════ 14) TRAINING METRİKLERİ ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Training Metrikleri · Loss · Perplexity · Overfit', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 2.85, 3.95, { topColor: C.pri });
  s.addText('📉  Loss', { x: 0.6, y: 1.15, w: 2.7, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.pri });
  s.addText('• Cross-entropy loss\n• Düşmeye devam etmeli\n• Plato → LR düşür\n• 0\'a yakın = ezberleme\n• Sağlıklı: 1.0-2.5 arası',
    { x: 0.6, y: 1.55, w: 2.7, h: 3.3, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });

  T.addCard(pres, s, 3.55, 1.05, 2.85, 3.95, { topColor: C.sec });
  s.addText('🎯  Perplexity', { x: 3.65, y: 1.15, w: 2.7, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.sec });
  s.addText('• exp(loss) — daha sezgisel\n• Düşük = model emin\n• Validation set üzerinde ölç\n• Domain-specific eval\n• Tipik: 5-30 arası',
    { x: 3.65, y: 1.55, w: 2.7, h: 3.3, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });

  T.addCard(pres, s, 6.6, 1.05, 2.85, 3.95, { topColor: C.acc });
  s.addText('⚠  Overfit', { x: 6.7, y: 1.15, w: 2.7, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.acc });
  s.addText('• train_loss ↓ , eval_loss ↑\n• Erken durma (early stop)\n• LoRA dropout artır\n• Daha az epoch\n• Daha çeşitli veri ekle',
    { x: 6.7, y: 1.55, w: 2.7, h: 3.3, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });

  T.addCard(pres, s, 0.5, 5.05, 9.0, 0.45, { bg: C.accPale, leftColor: C.acc });
  s.addText('🛠  Araçlar:  TensorBoard (lokal)  ·  Weights & Biases (cloud, ücretsiz)  ·  MLflow  ·  Aim',
    { x: 0.7, y: 5.07, w: 8.8, h: 0.42, margin: 0, fontFace: 'Calibri', fontSize: 10.5, bold: true, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 15) W&B DASHBOARD ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Weights & Biases — Training Dashboard', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.pri });
  s.addText('W&B neyi gösterir?', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.pri });
  s.addText([
    { text: '✓ Loss eğrisi (train/eval)\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Learning rate schedule\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Gradient norm — patlama tespiti\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ GPU memory / utilization\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Sample tahminler (generation)\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Hyperparameter sweeps\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Run karşılaştırma — A/B\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '\n', options: {} },
    { text: 'wandb login → ücretsiz kişisel hesap', options: { fontSize: 11, color: C.acc, bold: true, italic: true } },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.4, margin: 0, fontFace: 'Calibri' });

  // Sahte loss eğrisi diyagramı
  T.addCard(pres, s, 5.1, 1.05, 4.4, 3.95, { topColor: C.acc });
  s.addText('Sağlıklı vs Overfit Eğri', { x: 5.3, y: 1.15, w: 4.0, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.acc });

  // Grafik ekseni
  const gx = 5.4, gy = 1.7, gw = 3.9, gh = 2.7;
  s.addShape(pres.shapes.LINE, { x: gx, y: gy + gh, w: gw, h: 0, line: { color: C.dark, width: 1 } });
  s.addShape(pres.shapes.LINE, { x: gx, y: gy, w: 0, h: gh, line: { color: C.dark, width: 1 } });

  // Train loss (azalan) - emerald
  for (let i = 0; i < 8; i++) {
    const x1 = gx + (i / 8) * gw;
    const x2 = gx + ((i + 1) / 8) * gw;
    const y1 = gy + Math.exp(-i * 0.3) * gh * 0.8 + 0.2;
    const y2 = gy + Math.exp(-(i + 1) * 0.3) * gh * 0.8 + 0.2;
    s.addShape(pres.shapes.LINE, { x: x1, y: y1, w: x2 - x1, h: y2 - y1, line: { color: C.acc, width: 2.5 } });
  }
  // Eval loss (önce iner, sonra çıkar - overfit) - magenta
  const evalPts = [2.4, 1.7, 1.2, 0.9, 0.85, 1.0, 1.4, 1.9, 2.4];
  for (let i = 0; i < 8; i++) {
    const x1 = gx + (i / 8) * gw;
    const x2 = gx + ((i + 1) / 8) * gw;
    const y1 = gy + evalPts[i] / 3 * gh + 0.05;
    const y2 = gy + evalPts[i + 1] / 3 * gh + 0.05;
    s.addShape(pres.shapes.LINE, { x: x1, y: y1, w: x2 - x1, h: y2 - y1, line: { color: C.sec, width: 2.5, dashType: 'dash' } });
  }
  // Legend
  s.addShape(pres.shapes.RECTANGLE, { x: gx + 2.3, y: gy + 0.05, w: 0.25, h: 0.08, fill: { color: C.acc } });
  s.addText('train', { x: gx + 2.6, y: gy - 0.02, w: 0.6, h: 0.2, fontFace: 'Calibri', fontSize: 8, color: C.dark });
  s.addShape(pres.shapes.RECTANGLE, { x: gx + 3.2, y: gy + 0.05, w: 0.25, h: 0.08, fill: { color: C.sec } });
  s.addText('eval', { x: gx + 3.5, y: gy - 0.02, w: 0.5, h: 0.2, fontFace: 'Calibri', fontSize: 8, color: C.dark });

  s.addText('eval ↑ → erken durma!', { x: gx, y: gy + gh + 0.05, w: gw, h: 0.3, fontFace: 'Calibri', fontSize: 9, color: C.sec, italic: true, align: 'center' });
})();

// ═══════════════════════ 16) AXOLOTL YAML CONFIG ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Axolotl: YAML Config-driven Fine-tuning', SECTION, C.cream, TOTAL);

  T.addCodeBlock(pres, s, 0.5, 1.05, 9.0, 3.95, [
    { text: '# qlora-mistral-tr.yml\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'base_model: ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'mistralai/Mistral-7B-v0.1\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: 'model_type: ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'MistralForCausalLM\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: 'tokenizer_type: ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'LlamaTokenizer\n\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: 'load_in_4bit: ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'true\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'adapter: ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'qlora\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: 'lora_r: ', options: { color: C.codePurple, fontSize: 10 } },
    { text: '16\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'lora_alpha: ', options: { color: C.codePurple, fontSize: 10 } },
    { text: '32\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'lora_dropout: ', options: { color: C.codePurple, fontSize: 10 } },
    { text: '0.05\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'lora_target_modules: ', options: { color: C.codePurple, fontSize: 10 } },
    { text: '[q_proj, k_proj, v_proj, o_proj]\n\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: 'datasets:\n', options: { color: C.codePurple, fontSize: 10, breakLine: true } },
    { text: '  - path: ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'merve/turkish_instructions\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: '    type: ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'alpaca\n\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: 'num_epochs: ', options: { color: C.codePurple, fontSize: 10 } },
    { text: '3\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'micro_batch_size: ', options: { color: C.codePurple, fontSize: 10 } },
    { text: '2\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'gradient_accumulation_steps: ', options: { color: C.codePurple, fontSize: 10 } },
    { text: '8\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'learning_rate: ', options: { color: C.codePurple, fontSize: 10 } },
    { text: '0.0002\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'output_dir: ', options: { color: C.codePurple, fontSize: 10 } },
    { text: './out-tr-mistral-qlora\n\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: '# Çalıştırma\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: '$ accelerate launch -m axolotl.cli.train qlora-mistral-tr.yml', options: { color: C.codeWhite, fontSize: 10 } },
  ]);
})();

// ═══════════════════════ 17) ADAPTER MERGE ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Adapter Merge: peft.merge_and_unload()', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 3.7, 3.95, { topColor: C.acc });
  s.addText('Neden merge?', { x: 0.65, y: 1.15, w: 3.5, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.acc });
  s.addText([
    { text: '✓ Inference\'ta tek model (hızlı)\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Standart HF model formatı\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ GGUF, ONNX dönüşümleri kolay\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Ollama / vLLM ile uyumlu\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '\n', options: {} },
    { text: '⚠  Merge sonrası: ', options: { fontSize: 11, color: C.sec, bold: true } },
    { text: 'adapter\'ı ayrıca sakla — silebilirsen geri dönüş yok', options: { fontSize: 11, color: C.dark, italic: true } },
  ], { x: 0.65, y: 1.55, w: 3.5, h: 3.4, margin: 0, fontFace: 'Calibri' });

  T.addCodeBlock(pres, s, 4.4, 1.05, 5.2, 3.95, [
    { text: 'from ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'peft ', options: { color: C.codeBlue, fontSize: 10 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'PeftModel\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'from ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'transformers ', options: { color: C.codeBlue, fontSize: 10 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'AutoModelForCausalLM\n\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: '# Base + adapter yükle\n', options: { color: C.codeGreen, fontSize: 9, breakLine: true } },
    { text: 'base = AutoModelForCausalLM.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'from_pretrained', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    "mistralai/Mistral-7B-v0.1",\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: '    torch_dtype=torch.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'bfloat16', options: { color: C.codeBlue, fontSize: 10 } },
    { text: ',\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: ')\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'merged = PeftModel.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'from_pretrained', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    base, "./tr-mistral-lora",\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: ').', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'merge_and_unload', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '()\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '# Tek HF model olarak kaydet\n', options: { color: C.codeGreen, fontSize: 9, breakLine: true } },
    { text: 'merged.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'save_pretrained', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"./tr-mistral-merged"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ')\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'tok.', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'save_pretrained', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"./tr-mistral-merged"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ')', options: { color: C.codeWhite, fontSize: 10 } },
  ]);
})();

// ═══════════════════════ 18) GGUF + OLLAMA ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'GGUF Conversion + Ollama ile Lokal Çalıştırma', SECTION, C.cream, TOTAL);

  T.addCodeBlock(pres, s, 0.5, 1.05, 9.0, 3.0, [
    { text: '# 1) llama.cpp\'yi klonla ve convert script\'i kullan\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'git clone https://github.com/ggerganov/llama.cpp\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'cd llama.cpp && pip install -r requirements.txt\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '# 2) HF → GGUF dönüşümü (Q4_K_M önerilir: küçük + kaliteli)\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'python convert_hf_to_gguf.py ../tr-mistral-merged \\\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '   --outfile ../tr-mistral.Q4_K_M.gguf --outtype q4_k_m\n\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: '# 3) Ollama Modelfile\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'FROM ./tr-mistral.Q4_K_M.gguf\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'TEMPLATE "{{ .System }}\\n\\n{{ .Prompt }}"\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: 'PARAMETER temperature 0.7\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '# 4) Ollama\'ya yükle ve çalıştır\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'ollama create tr-mistral -f Modelfile\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'ollama run tr-mistral "Türkiye nüfusu nedir?"', options: { color: C.codeWhite, fontSize: 11 } },
  ]);

  // Quantization tablosu
  T.addCard(pres, s, 0.5, 4.15, 9.0, 1.05, { topColor: C.acc });
  s.addText('GGUF Quantization Seviyeleri (7B model için)', { x: 0.7, y: 4.22, w: 9, h: 0.32, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.acc });
  s.addText('Q2_K ≈ 2.7 GB (düşük)  ·  Q4_K_M ≈ 4.1 GB (önerilen)  ·  Q5_K_M ≈ 4.8 GB  ·  Q8_0 ≈ 7.2 GB  ·  F16 ≈ 13.5 GB',
    { x: 0.7, y: 4.55, w: 8.8, h: 0.6, margin: 0, fontFace: 'Consolas', fontSize: 10.5, color: C.dark });
})();

// ═══════════════════════ 19) HF HUB PUBLISH + MODEL CARD ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Hugging Face Hub\'a Publish + Model Card', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.0, 3.95, { topColor: C.pri });
  s.addText('README.md (model card)', { x: 0.65, y: 1.15, w: 3.8, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 13, bold: true, color: C.pri });
  s.addText([
    { text: '✓ Lisans (apache-2.0, mit, llama3)\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: '✓ Base model + dataset linkleri\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: '✓ Eğitim hiperparametreleri\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: '✓ Beklenen kullanım + sınırlamalar\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: '✓ Etik dikkat / bias notu\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: '✓ Örnek inference kodu\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: '✓ Citation (BibTeX)\n', options: { fontSize: 10.5, color: C.dark, breakLine: true } },
    { text: '\n', options: {} },
    { text: 'YAML frontmatter\'da: ', options: { fontSize: 10, color: C.acc, bold: true } },
    { text: 'tags, language, base_model, datasets', options: { fontSize: 10, color: C.dark, italic: true } },
  ], { x: 0.65, y: 1.55, w: 3.8, h: 3.4, margin: 0, fontFace: 'Calibri' });

  T.addCodeBlock(pres, s, 4.6, 1.05, 5.0, 3.95, [
    { text: '---\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'license: ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'apache-2.0\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: 'language:\n', options: { color: C.codePurple, fontSize: 10, breakLine: true } },
    { text: '  - tr\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: 'base_model: ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'mistralai/Mistral-7B-v0.1\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: 'tags: [lora, qlora, turkish, instruct]\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: 'datasets: [merve/turkish_instructions]\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: '---\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '# TR-Mistral-7B-QLoRA\n\n', options: { color: C.codeGreen, fontSize: 11, bold: true, breakLine: true } },
    { text: 'Türkçe instruction veri setiyle QLoRA ile\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'fine-tune edilmiş Mistral-7B adapter\'ı.\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '## Kullanım\n', options: { color: C.codeGreen, fontSize: 10, bold: true, breakLine: true } },
    { text: '```python\n', options: { color: C.codeYellow, fontSize: 9, breakLine: true } },
    { text: 'from peft import PeftModel\n', options: { color: C.codeWhite, fontSize: 9, breakLine: true } },
    { text: 'model = PeftModel.from_pretrained(...)\n', options: { color: C.codeWhite, fontSize: 9, breakLine: true } },
    { text: '```\n\n', options: { color: C.codeYellow, fontSize: 9, breakLine: true } },
    { text: '## Lisans  ·  Apache-2.0\n', options: { color: C.codeGreen, fontSize: 10, bold: true, breakLine: true } },
    { text: '## Yazar · Dr. Murat Altun', options: { color: C.codeGreen, fontSize: 10, bold: true } },
  ]);
})();

// ═══════════════════════ 20) ÖDEVLER ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Bu Modülün Ödevleri', SECTION, C.cream, TOTAL);

  const assigns = [
    {
      t: '1 · Türkçe Instruction QLoRA',
      d: 'Küçük Türkçe instruction veri seti hazırla, Unsloth ile bir 7B modeli (Mistral / Llama-3.2) QLoRA ile fine-tune et. Loss eğrisini W&B\'de raporla.',
      c: C.pri,
    },
    {
      t: '2 · Axolotl ile YAML Reproducibility',
      d: 'Aynı eğitimi Axolotl YAML config ile tekrarla. İki yöntemin (Unsloth vs Axolotl) geliştirici deneyimi, hız ve esneklik açısından karşılaştırmasını yaz.',
      c: C.sec,
    },
    {
      t: '3 · Merge → GGUF → Ollama → HF Hub',
      d: 'Adapter\'ı merge et, GGUF Q4_K_M\'e çevir, Ollama\'da çalıştır. Aynı 5 Türkçe soruda baseline ile karşılaştır. Modeli HF Hub\'a model card ile publish et.',
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

// ═══════════════════════ 21) KAYNAKLAR + NOTEBOOK ÖZETİ ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Bu Modülün Notebook\'ları + Kaynaklar', SECTION, C.cream, TOTAL);

  const nbs = [
    { n: 1, t: 'modul05_01_dataset_hazirlama.ipynb',   d: 'Türkçe instruction veri seti + chat template + Datasets formatı',  c: C.pri },
    { n: 2, t: 'modul05_02_unsloth_qlora.ipynb',       d: 'Google Colab T4 üzerinde Unsloth ile 7B QLoRA fine-tuning',        c: C.sec },
    { n: 3, t: 'modul05_03_axolotl_yaml.ipynb',        d: 'Axolotl ile YAML config-driven fine-tuning workflow',              c: C.acc },
    { n: 4, t: 'modul05_04_adapter_merge_gguf.ipynb',  d: 'LoRA adapter merge + GGUF dönüşüm + Ollama çalıştırma',            c: C.purple },
    { n: 5, t: 'modul05_05_hf_publish.ipynb',          d: 'HF Hub\'a publish, model card README + YAML metadata',             c: C.cyan },
  ];
  nbs.forEach((nb, i) => {
    const y = 1.1 + i * 0.62;
    T.addCard(pres, s, 0.5, y, 5.6, 0.55, { leftColor: nb.c });
    T.numBadge(pres, s, 0.62, y + 0.1, nb.n, nb.c);
    s.addText(nb.t, { x: 1.05, y: y + 0.02, w: 5.0, h: 0.3, margin: 0, fontFace: 'Consolas', fontSize: 9.5, bold: true, color: C.dark });
    s.addText(nb.d, { x: 1.05, y: y + 0.28, w: 5.0, h: 0.28, margin: 0, fontFace: 'Calibri', fontSize: 8.5, color: C.mid });
  });

  // Kaynaklar sağda
  T.addCard(pres, s, 6.3, 1.1, 3.2, 3.62, { topColor: C.acc });
  s.addText('🔗  Kaynaklar', { x: 6.45, y: 1.18, w: 3.0, h: 0.32, margin: 0, fontFace: 'Georgia', fontSize: 13, bold: true, color: C.acc });
  s.addText([
    { text: 'Unsloth ', options: { fontSize: 10, color: C.dark, bold: true } },
    { text: '→ github.com/unslothai/unsloth\n', options: { fontSize: 9, color: C.mid, breakLine: true } },
    { text: 'Axolotl ', options: { fontSize: 10, color: C.dark, bold: true } },
    { text: '→ github.com/axolotl-ai-cloud\n', options: { fontSize: 9, color: C.mid, breakLine: true } },
    { text: 'PEFT docs ', options: { fontSize: 10, color: C.dark, bold: true } },
    { text: '→ huggingface.co/docs/peft\n', options: { fontSize: 9, color: C.mid, breakLine: true } },
    { text: 'TRL ', options: { fontSize: 10, color: C.dark, bold: true } },
    { text: '→ huggingface.co/docs/trl\n', options: { fontSize: 9, color: C.mid, breakLine: true } },
    { text: 'LoRA paper ', options: { fontSize: 10, color: C.dark, bold: true } },
    { text: '→ arXiv 2106.09685\n', options: { fontSize: 9, color: C.mid, breakLine: true } },
    { text: 'QLoRA paper ', options: { fontSize: 10, color: C.dark, bold: true } },
    { text: '→ arXiv 2305.14314\n', options: { fontSize: 9, color: C.mid, breakLine: true } },
    { text: 'llama.cpp ', options: { fontSize: 10, color: C.dark, bold: true } },
    { text: '→ github.com/ggerganov\n', options: { fontSize: 9, color: C.mid, breakLine: true } },
    { text: 'W&B ', options: { fontSize: 10, color: C.dark, bold: true } },
    { text: '→ wandb.ai', options: { fontSize: 9, color: C.mid } },
  ], { x: 6.45, y: 1.55, w: 3.0, h: 3.15, margin: 0, fontFace: 'Calibri' });
})();

// ═══════════════════════ 22) KAPANIŞ ═══════════════════════
T.addClosingSlide(
  pres,
  'Modül 5 — Çıkarımlar',
  [
    { text: 'PEFT, full fine-tuning\'in maliyetini %1\'ine düşürür — küçük adapter\'lar büyük etki yaratır.', color: C.sec },
    { text: 'QLoRA + Unsloth ile Colab T4 ücretsiz GPU\'da 7B model fine-tune edilebilir.',                     color: C.acc },
    { text: '1.000 kaliteli örnek > 100.000 gürültülü örnek. Veri kalitesi her şeyden önemlidir.',              color: C.pri },
    { text: 'Train sonrası akış: merge → GGUF → Ollama lokal · HF Hub model card ile paylaş.',                  color: C.purple },
    { text: 'Loss eğrisi olmadan eğitim, telemetri olmadan production yoktur — W&B veya TensorBoard şart.',    color: C.cyan },
  ],
  'Bir sonraki modül: GenAI DevOps, güvenlik ve capstone projesi.',
  'Dr. Murat Altun'
);

// ═══════════════════════ KAYDET ═══════════════════════
pres.writeFile({ fileName: 'modul05_fine_tuning_lora.pptx' })
  .then(name => console.log('✓ Modül 5 PPTX hazır:', name));
