/**
 * MODÜL 1 — ML Deployment ve Servisleştirme
 * 21 slayt · Generative Spectrum · Dr. Murat Altun · BTK Akademi 2026
 */
const T = require('/Users/drmurataltun/.claude/pptx-template-llm.js');
const { C } = T;

const TOTAL = 21;
const SECTION = 'MODÜL 1 · TEMEL';
const MOD_LABEL = 'MODÜL 1';

const pres = T.createPres('Modül 1 — ML Deployment ve Servisleştirme', 'Dr. Murat Altun');

// ═══════════════════════ 1) KAPAK ═══════════════════════
T.addCoverSlide(
  pres,
  'ML Deployment ve\nServisleştirme',
  'FastAPI · Docker · Hugging Face Inference\nile uçtan uca model yayını',
  'Dr. Murat Altun  ·  Modül 1  ·  Gün 1 (5 saat)',
  [
    { value: '5',  label: 'SAAT' },
    { value: '10', label: 'KONU' },
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
    { icon: '1', t: 'Deployment Yaşam Döngüsü', d: 'MLOps temelleri, model registry, sürüm yönetimi' },
    { icon: '2', t: 'Model Serileştirme',       d: 'joblib, safetensors — hangi durumda hangisi?' },
    { icon: '3', t: 'FastAPI + Pydantic',       d: '/predict endpoint + tip güvenli I/O şemaları' },
    { icon: '4', t: 'Async vs Sync',            d: 'uvicorn / gunicorn workers — yük altında performans' },
    { icon: '5', t: 'Docker Multi-stage Build', d: 'Builder + runtime ayrımı, image boyutu' },
    { icon: '6', t: 'Hugging Face Servisleri',  d: 'Inference Endpoints + Spaces + container deploy' },
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

// ═══════════════════════ 3) ML DEPLOYMENT YAŞAM DÖNGÜSÜ ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'ML Deployment Yaşam Döngüsü', SECTION, C.cream, TOTAL);

  const stages = [
    { n: 1, t: 'Eğitim',    d: 'Veri → model.fit()',  c: C.pri },
    { n: 2, t: 'Serileştir',d: 'joblib, safetensors', c: C.sec },
    { n: 3, t: 'Servisleştir', d: 'FastAPI + Pydantic', c: C.acc },
    { n: 4, t: 'Paketle',   d: 'Docker image',         c: C.purple },
    { n: 5, t: 'Yayınla',   d: 'Hub, Cloud Run, K8s',  c: C.cyan },
    { n: 6, t: 'İzle',      d: 'Latency, drift, hata', c: C.amber },
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

  // Alt çıkarım
  T.addCard(pres, s, 0.5, 4.0, 9.0, 1.05, { bg: C.warmBg, topColor: C.acc });
  s.addText('💡  Ders mesajı', { x: 0.7, y: 4.12, w: 9, h: 0.35, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.acc });
  s.addText('Modeli eğitmek toplam işin yalnızca %20\'sidir. Production\'a almak, izlemek ve sürdürmek %80\'idir. MLOps = bu döngünün otomasyonu.',
    { x: 0.7, y: 4.42, w: 8.8, h: 0.55, margin: 0, fontFace: 'Calibri', fontSize: 11, color: C.dark });
})();

// ═══════════════════════ 4) MODEL SERİLEŞTİRME ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Model Serileştirme: joblib vs safetensors', SECTION, C.cream, TOTAL);

  // Üç sütun
  const cols = [
    { t: 'joblib',      d: 'scikit-learn standardı.\nNumPy arraylerini hızlı serileştirir.\n\n✓ ML modelleri\n✓ Hızlı\n✗ Pickle tabanlı, güvenlik riski',  c: C.pri },
    { t: 'safetensors', d: 'HuggingFace tarafından geliştirildi.\nGüvenli, hızlı, çapraz framework.\n\n✓ LLM ağırlıkları\n✓ Zero-copy load\n✓ Production tercihi',         c: C.acc },
    { t: 'ONNX',        d: 'Cross-framework standart.\nPyTorch/Keras → ortak format.\n\n✓ Edge deployment\n✓ Hızlı inference (ONNX Runtime)\n✗ Op desteği sınırlı',     c: C.sec },
  ];
  cols.forEach((co, i) => {
    const x = 0.5 + i * 3.1;
    T.addCard(pres, s, x, 1.15, 2.9, 3.6, { topColor: co.c });
    s.addText(co.t, { x: x + 0.15, y: 1.3, w: 2.6, h: 0.45, margin: 0, fontFace: 'Georgia', fontSize: 18, bold: true, color: co.c });
    s.addText(co.d, { x: x + 0.15, y: 1.85, w: 2.6, h: 2.7, margin: 0, fontFace: 'Calibri', fontSize: 10, color: C.dark });
  });

  // Karar kutusu
  T.addCard(pres, s, 0.5, 4.9, 9.0, 0.5, { bg: C.warmBg, leftColor: C.sec });
  s.addText('Karar:  Klasik ML → joblib  ·  LLM / Transformer ağırlığı → safetensors  ·  Edge / cross-framework → ONNX',
    { x: 0.7, y: 4.92, w: 8.8, h: 0.46, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 5) FASTAPI'YE GİRİŞ ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'FastAPI: Modern Python ML Servis Framework\'ü', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.pri });
  s.addText('Neden FastAPI?', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 16, bold: true, color: C.pri });
  s.addText([
    { text: '✓ Tip ipuçlu, otomatik validasyon (Pydantic)\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Async/await native desteği\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Otomatik OpenAPI / Swagger dokümantasyonu\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Starlette + Pydantic üzerine (hızlı: NodeJS/Go seviyesi)\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Test, OAuth, dependency injection hazır\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '\n', options: {} },
    { text: 'Production: ', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: 'uvicorn + gunicorn workers', options: { fontSize: 11, color: C.dark, italic: true } },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.4, margin: 0, fontFace: 'Calibri' });

  // Sağ: Kod örneği
  T.addCodeBlock(pres, s, 5.1, 1.05, 4.5, 3.95, [
    { text: 'from ',    options: { color: C.codePurple, fontSize: 10 } },
    { text: 'fastapi ', options: { color: C.codeBlue,   fontSize: 10 } },
    { text: 'import ',  options: { color: C.codePurple, fontSize: 10 } },
    { text: 'FastAPI\n',options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'from ',    options: { color: C.codePurple, fontSize: 10 } },
    { text: 'pydantic ',options: { color: C.codeBlue,   fontSize: 10 } },
    { text: 'import ',  options: { color: C.codePurple, fontSize: 10 } },
    { text: 'BaseModel\n\n',options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'app = FastAPI()\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'class ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'TextIn', options: { color: C.codeYellow, fontSize: 10 } },
    { text: '(BaseModel):\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    text: str\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '@app.', options: { color: C.codeRed, fontSize: 10 } },
    { text: 'post', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '("/predict")\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'async def ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'predict', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(payload: TextIn):\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    return ', options: { color: C.codePurple, fontSize: 10 } },
    { text: '{', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"label"', options: { color: C.codeRed, fontSize: 10 } },
    { text: ': model(payload.text)}\n', options: { color: C.codeWhite, fontSize: 10 } },
  ]);

  // Alt
  s.addText('uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4', { x: 0.5, y: 5.1, w: 9, h: 0.3, margin: 0, fontFace: 'Consolas', fontSize: 11, color: C.priLt, italic: true });
})();

// ═══════════════════════ 6) PYDANTIC ŞEMALARI ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Pydantic: Tip Güvenli I/O Şemaları', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.sec });
  s.addText('Request / Response şeması neden önemli?', { x: 0.7, y: 1.15, w: 4, h: 0.5, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.sec });
  s.addText([
    { text: '✓ Otomatik validasyon (400 hata)\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Otomatik OpenAPI / Swagger\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ JSON ↔ Python tip dönüşümü\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ IDE / editör otomatik tamamlama\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '✓ Versiyon kontrolü (v1/v2 model)\n', options: { fontSize: 11, color: C.dark, breakLine: true } },
    { text: '\n', options: {} },
    { text: 'En önemlisi: ', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: 'sözleşme — istemciye verdiğin garanti.', options: { fontSize: 11, color: C.dark, italic: true } },
  ], { x: 0.7, y: 1.65, w: 4, h: 3.3, margin: 0, fontFace: 'Calibri' });

  T.addCodeBlock(pres, s, 5.1, 1.05, 4.5, 3.95, [
    { text: 'class ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'PredictRequest', options: { color: C.codeYellow, fontSize: 10 } },
    { text: '(BaseModel):\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    text: str = ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'Field', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(..., min_length=', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '1', options: { color: C.codeYellow, fontSize: 10 } },
    { text: ', max_length=', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '512', options: { color: C.codeYellow, fontSize: 10 } },
    { text: ')\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    lang: ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'Literal', options: { color: C.codeBlue, fontSize: 10 } },
    { text: '["tr","en"] = ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"tr"\n\n', options: { color: C.codeRed, fontSize: 10, breakLine: true } },
    { text: 'class ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'PredictResponse', options: { color: C.codeYellow, fontSize: 10 } },
    { text: '(BaseModel):\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    label: str\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    score: float = ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: 'Field', options: { color: C.codeGreen, fontSize: 10 } },
    { text: '(..., ge=', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '0', options: { color: C.codeYellow, fontSize: 10 } },
    { text: ', le=', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '1', options: { color: C.codeYellow, fontSize: 10 } },
    { text: ')\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    latency_ms: float\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '    model_version: str = ', options: { color: C.codeWhite, fontSize: 10 } },
    { text: '"1.0.0"\n', options: { color: C.codeRed, fontSize: 10 } },
  ]);
})();

// ═══════════════════════ 7) ASYNC VS SYNC + UVICORN/GUNICORN ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Async vs Sync · uvicorn / gunicorn Workers', SECTION, C.cream, TOTAL);

  // İki kart yan yana
  T.addCard(pres, s, 0.5, 1.05, 4.4, 1.95, { leftColor: C.pri });
  s.addText('Sync endpoint', { x: 0.7, y: 1.15, w: 4, h: 0.35, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.pri });
  s.addText('def predict(payload): return model(payload.text)', { x: 0.7, y: 1.5, w: 4.0, h: 0.35, margin: 0, fontFace: 'Consolas', fontSize: 10, color: C.dark });
  s.addText('• CPU-bound model çıkarımı için ideal\n• Worker thread havuzunda çalışır\n• gunicorn ile workers=4-8',
    { x: 0.7, y: 1.88, w: 4.0, h: 1.0, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });

  T.addCard(pres, s, 5.1, 1.05, 4.4, 1.95, { leftColor: C.acc });
  s.addText('Async endpoint', { x: 5.3, y: 1.15, w: 4, h: 0.35, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.acc });
  s.addText('async def predict(payload): return await llm.acall(...)', { x: 5.3, y: 1.5, w: 4.0, h: 0.35, margin: 0, fontFace: 'Consolas', fontSize: 9, color: C.dark });
  s.addText('• I/O-bound (HF API, DB, vector store)\n• Tek thread + event loop\n• Streaming yanıtlarda zorunlu',
    { x: 5.3, y: 1.88, w: 4.0, h: 1.0, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });

  // Workers tablosu
  T.addCard(pres, s, 0.5, 3.2, 9.0, 1.95, { topColor: C.sec });
  s.addText('Production: gunicorn + uvicorn worker class', { x: 0.7, y: 3.32, w: 9, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 13, bold: true, color: C.sec });

  s.addText('gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000',
    { x: 0.7, y: 3.75, w: 8.6, h: 0.35, margin: 0, fontFace: 'Consolas', fontSize: 10.5, color: C.priLt });

  s.addText('Workers sayısı: (2 × CPU) + 1  •  Tek model instance / worker  •  Bellek limiti = workers × model_size',
    { x: 0.7, y: 4.12, w: 8.6, h: 0.35, margin: 0, fontFace: 'Calibri', fontSize: 10, color: C.mid });

  s.addText('⚠  LLM lokal modellerde workers=1, GPU\'yu paylaşamaz — yatay ölçek için Kubernetes / serverless tercih et.',
    { x: 0.7, y: 4.55, w: 8.6, h: 0.5, margin: 0, fontFace: 'Calibri', fontSize: 10.5, bold: true, color: C.sec });
})();

// ═══════════════════════ 8) DOCKER MULTI-STAGE BUILD ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Docker Multi-stage Build · Builder + Runtime Ayrımı', SECTION, C.cream, TOTAL);

  T.addCodeBlock(pres, s, 0.5, 1.05, 9.0, 3.6, [
    { text: '# ---- Stage 1: builder ----\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'FROM ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'python:3.11-slim ', options: { color: C.codeBlue, fontSize: 10 } },
    { text: 'AS ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'builder\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'WORKDIR ', options: { color: C.codePurple, fontSize: 10 } },
    { text: '/build\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'COPY ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'requirements.txt .\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'RUN ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'pip install --user --no-cache-dir -r requirements.txt\n\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: '# ---- Stage 2: runtime (slim) ----\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'FROM ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'python:3.11-slim\n', options: { color: C.codeBlue, fontSize: 10, breakLine: true } },
    { text: 'WORKDIR ', options: { color: C.codePurple, fontSize: 10 } },
    { text: '/app\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'COPY ', options: { color: C.codePurple, fontSize: 10 } },
    { text: '--from=builder /root/.local /root/.local\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'COPY ', options: { color: C.codePurple, fontSize: 10 } },
    { text: '. .\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'ENV ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'PATH=/root/.local/bin:$PATH\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'EXPOSE ', options: { color: C.codePurple, fontSize: 10 } },
    { text: '8000\n', options: { color: C.codeYellow, fontSize: 10, breakLine: true } },
    { text: 'HEALTHCHECK ', options: { color: C.codePurple, fontSize: 10 } },
    { text: 'CMD curl -f http://localhost:8000/health || exit 1\n', options: { color: C.codeWhite, fontSize: 10, breakLine: true } },
    { text: 'CMD ', options: { color: C.codePurple, fontSize: 10 } },
    { text: '["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]', options: { color: C.codeRed, fontSize: 10 } },
  ]);

  // İstatistikler
  T.statBox(pres, s, 0.5, 4.85, 2.85, 0.7, '~500 MB', 'multi-stage', C.acc);
  T.statBox(pres, s, 3.55, 4.85, 2.85, 0.7, '~1.8 GB', 'single-stage', C.sec);
  T.statBox(pres, s, 6.6, 4.85, 2.85, 0.7, '3.6×', 'küçülme', C.pri);
})();

// ═══════════════════════ 9) IMAGE BOYUTU OPTİMİZASYONU ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Image Boyutu Optimizasyonu — 5 Pratik', SECTION, C.cream, TOTAL);

  const tips = [
    { n: 1, t: 'slim / alpine base image',          d: 'python:3.11-slim → ~150 MB (full image ~1 GB)', c: C.pri },
    { n: 2, t: 'Multi-stage build',                 d: 'Build araçlarını runtime\'a taşıma; pip cache hariç', c: C.sec },
    { n: 3, t: '.dockerignore kullan',              d: '__pycache__, .git, tests, notebooks dışarıda kalsın', c: C.acc },
    { n: 4, t: '--no-cache-dir + clean apt',        d: 'apt-get clean && rm -rf /var/lib/apt/lists/*', c: C.purple },
    { n: 5, t: 'Model dosyasını Hub\'dan indir',    d: 'Image\'a gömme, run-time download (lazy load)', c: C.cyan },
  ];
  tips.forEach((tp, i) => {
    const y = 1.1 + i * 0.78;
    T.addCard(pres, s, 0.5, y, 9.0, 0.7, { leftColor: tp.c });
    T.numBadge(pres, s, 0.7, y + 0.17, tp.n, tp.c);
    s.addText(tp.t, { x: 1.3, y: y + 0.08, w: 3.5, h: 0.35, margin: 0, fontFace: 'Calibri', fontSize: 12, bold: true, color: C.dark });
    s.addText(tp.d, { x: 1.3, y: y + 0.4,  w: 8.0, h: 0.32, margin: 0, fontFace: 'Calibri', fontSize: 10, color: C.mid });
  });
})();

// ═══════════════════════ 10) CONTAINER MONITORING ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Container Monitoring · Logging · Latency · Health-check', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 2.85, 3.95, { topColor: C.pri });
  s.addText('📝  Logging', { x: 0.6, y: 1.15, w: 2.7, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.pri });
  s.addText('• Yapısal JSON log (loguru / structlog)\n• Request ID, latency, model_version\n• stdout → docker logs\n• ELK / Loki / Datadog topla',
    { x: 0.6, y: 1.55, w: 2.7, h: 3.3, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });

  T.addCard(pres, s, 3.55, 1.05, 2.85, 3.95, { topColor: C.sec });
  s.addText('⏱  Latency', { x: 3.65, y: 1.15, w: 2.7, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.sec });
  s.addText('• p50 / p95 / p99 ölç\n• prometheus_client middleware\n• /metrics endpoint\n• SLO: p95 < 500 ms\n• Histogram bucket\'ları ayarla',
    { x: 3.65, y: 1.55, w: 2.7, h: 3.3, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });

  T.addCard(pres, s, 6.6, 1.05, 2.85, 3.95, { topColor: C.acc });
  s.addText('❤️  Health-check', { x: 6.7, y: 1.15, w: 2.7, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.acc });
  s.addText('• /health → {"ok": true}\n• /ready → model load tamam mı\n• Docker HEALTHCHECK direktifi\n• K8s liveness / readiness probe\n• Down olunca trafik kesilsin',
    { x: 6.7, y: 1.55, w: 2.7, h: 3.3, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });
})();

// ═══════════════════════ 11) FASTAPI MIDDLEWARE: LATENCY ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Custom Middleware ile Latency Ölçümü', SECTION, C.cream, TOTAL);

  T.addCodeBlock(pres, s, 0.5, 1.05, 9.0, 3.9, [
    { text: 'from ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'time ', options: { color: C.codeBlue, fontSize: 11 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'perf_counter\n\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: '@app.', options: { color: C.codeRed, fontSize: 11 } },
    { text: 'middleware', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '("http")\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'async def ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'add_latency', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '(request, call_next):\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    t0 = perf_counter()\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    response = ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'await ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'call_next(request)\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    elapsed_ms = ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '(perf_counter() - t0) * 1000\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    response.headers["x-process-time-ms"] = ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'f"{elapsed_ms:.2f}"\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: '    logger.', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'info', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '({"path": request.url.path, "ms": elapsed_ms,\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '                 "status": response.status_code})\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    return response\n\n', options: { color: C.codePurple, fontSize: 11, breakLine: true } },
    { text: '@app.', options: { color: C.codeRed, fontSize: 11 } },
    { text: 'get', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '("/health")\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'def ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'health', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '(): return {"ok": True, "model": MODEL_VERSION}', options: { color: C.codeWhite, fontSize: 11 } },
  ]);
})();

// ═══════════════════════ 12) HUGGING FACE EKOSISTEMI ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Hugging Face Hub: Models · Datasets · Spaces', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 2.85, 3.6, { topColor: C.pri });
  s.addText('🤗  Models', { x: 0.6, y: 1.15, w: 2.7, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.pri });
  s.addText('• 1M+ pretrained model\n• Lisans, model card, metrik\n• safetensors / GGUF format\n• git-lfs altyapı\n• Türkçe: savasy/, dbmdz/',
    { x: 0.6, y: 1.55, w: 2.7, h: 2.9, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });

  T.addCard(pres, s, 3.55, 1.05, 2.85, 3.6, { topColor: C.sec });
  s.addText('📚  Datasets', { x: 3.65, y: 1.15, w: 2.7, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.sec });
  s.addText('• 200K+ açık veri seti\n• load_dataset() ile akış\n• Streaming büyük datasetler\n• Filter / map / select\n• Parquet, Arrow native',
    { x: 3.65, y: 1.55, w: 2.7, h: 2.9, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });

  T.addCard(pres, s, 6.6, 1.05, 2.85, 3.6, { topColor: C.acc });
  s.addText('🚀  Spaces', { x: 6.7, y: 1.15, w: 2.7, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 14, bold: true, color: C.acc });
  s.addText('• Gradio / Streamlit demo\n• Docker container Spaces\n• Ücretsiz CPU / paid GPU\n• Public URL + custom domain\n• ZeroGPU paylaşımı',
    { x: 6.7, y: 1.55, w: 2.7, h: 2.9, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.dark });

  T.addCard(pres, s, 0.5, 4.85, 9.0, 0.5, { bg: C.warmBg, leftColor: C.acc });
  s.addText('💡  Tek hesap, üç ürün — HuggingFace Hub LLM dünyasının GitHub\'ıdır.',
    { x: 0.7, y: 4.87, w: 8.8, h: 0.46, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.dark, valign: 'middle' });
})();

// ═══════════════════════ 13) HUGGINGFACE INFERENCE SERVİSİ KOD ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'HF Modeli + FastAPI: Uçtan Uca Servis', SECTION, C.cream, TOTAL);

  T.addCodeBlock(pres, s, 0.5, 1.05, 9.0, 3.9, [
    { text: 'from ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'transformers ', options: { color: C.codeBlue, fontSize: 11 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'pipeline\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: 'from ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'fastapi ', options: { color: C.codeBlue, fontSize: 11 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'FastAPI\n\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: '# Model startup\'ta bir kez yüklenir — workers her biri kopya tutar\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'classifier = ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'pipeline', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '(\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    "text-classification",\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: '    model="savasy/bert-base-turkish-sentiment-cased",\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: '    device=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '-1', options: { color: C.codeYellow, fontSize: 11 } },
    { text: ',  # CPU; 0 → GPU\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: ')\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'app = FastAPI(title=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '"TR Sentiment API"', options: { color: C.codeRed, fontSize: 11 } },
    { text: ')\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '@app.', options: { color: C.codeRed, fontSize: 11 } },
    { text: 'post', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '("/predict", response_model=PredictResponse)\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'def ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'predict', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '(payload: PredictRequest):\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    out = classifier(payload.text)[', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '0', options: { color: C.codeYellow, fontSize: 11 } },
    { text: ']\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    return PredictResponse(label=out["label"], score=out["score"], latency_ms=', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '0', options: { color: C.codeYellow, fontSize: 11 } },
    { text: ')', options: { color: C.codeWhite, fontSize: 11 } },
  ]);
})();

// ═══════════════════════ 14) HF INFERENCE ENDPOINTS vs SELF-HOSTED ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'HuggingFace Inference Endpoints vs Self-hosted', SECTION, C.cream, TOTAL);

  const headers = ['Kriter', 'HF Endpoint', 'Self-hosted (Docker + Cloud)'];
  const rows = [
    ['Kurulum süresi', '5 dakika', '1-2 gün (Dockerfile, K8s)'],
    ['Aylık ucu', '$50 – $700+',  'CPU $20 / GPU $200-2000'],
    ['Auto-scale',  '✓ otomatik',  'K8s HPA yapılandırması'],
    ['Custom kod',  '⚠ sınırlı (handler.py)', '✓ her şey serbest'],
    ['Veri lokalitesi', 'AWS / Azure bölgesi', 'Kendi bulutun / on-prem'],
    ['Vendor lock', 'HF\'e bağımlı', 'Yok'],
  ];

  // Header bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 9.0, h: 0.45, fill: { color: C.pri } });
  headers.forEach((h, i) => {
    s.addText(h, { x: 0.5 + i * 3.0, y: 1.1, w: 3.0, h: 0.45, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
  });
  // Rows
  rows.forEach((r, i) => {
    const y = 1.55 + i * 0.5;
    const bg = i % 2 === 0 ? C.warmBg : 'FFFFFF';
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 0.5, fill: { color: bg }, line: { color: C.bdr, width: 0.5 } });
    r.forEach((cell, j) => {
      s.addText(cell, { x: 0.5 + j * 3.0, y, w: 3.0, h: 0.5, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: j === 0 ? C.dark : C.mid, bold: j === 0, align: j === 0 ? 'left' : 'center', valign: 'middle', paraSpaceBefore: 0 });
    });
  });

  s.addText('💡  POC / tek modelli demo → Endpoint  ·  Çoklu model + custom pipeline → Self-hosted.',
    { x: 0.5, y: 4.85, w: 9, h: 0.4, margin: 0, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.acc });
})();

// ═══════════════════════ 15) HF SPACES — GRADIO + DOCKER DEPLOY ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'HuggingFace Spaces · Gradio / Docker ile Demo Yayını', SECTION, C.cream, TOTAL);

  T.addCard(pres, s, 0.5, 1.05, 4.4, 3.95, { topColor: C.pri });
  s.addText('Spaces tiplerinin karşılaştırması', { x: 0.7, y: 1.15, w: 4, h: 0.4, margin: 0, fontFace: 'Georgia', fontSize: 13, bold: true, color: C.pri });
  s.addText([
    { text: 'Gradio  →  ', options: { fontSize: 11, color: C.dark, bold: true } },
    { text: 'app.py ile saniyeler içinde UI\n', options: { fontSize: 11, color: C.mid, breakLine: true } },
    { text: 'Streamlit  →  ', options: { fontSize: 11, color: C.dark, bold: true } },
    { text: 'data-app + dashboard tarzı\n', options: { fontSize: 11, color: C.mid, breakLine: true } },
    { text: 'Static  →  ', options: { fontSize: 11, color: C.dark, bold: true } },
    { text: 'index.html (yalnız frontend)\n', options: { fontSize: 11, color: C.mid, breakLine: true } },
    { text: 'Docker  →  ', options: { fontSize: 11, color: C.dark, bold: true } },
    { text: 'Custom stack (FastAPI + Vue)\n\n', options: { fontSize: 11, color: C.mid, breakLine: true } },
    { text: 'Donanım:  ', options: { fontSize: 11, color: C.acc, bold: true } },
    { text: 'CPU basic free  ·  CPU upgrade $0.03/s  ·  T4 small $0.40/h', options: { fontSize: 10.5, color: C.dark } },
  ], { x: 0.7, y: 1.55, w: 4, h: 3.3, margin: 0, fontFace: 'Calibri' });

  T.addCodeBlock(pres, s, 5.1, 1.05, 4.5, 3.95, [
    { text: '# app.py — Gradio + HF model\n', options: { color: C.codeGreen, fontSize: 10, breakLine: true } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'gradio ', options: { color: C.codeBlue, fontSize: 11 } },
    { text: 'as ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'gr\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: 'from ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'transformers ', options: { color: C.codeBlue, fontSize: 11 } },
    { text: 'import ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'pipeline\n\n', options: { color: C.codeYellow, fontSize: 11, breakLine: true } },
    { text: 'clf = ', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'pipeline', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '("text-classification",\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '   model="savasy/bert-base-turkish-sentiment-cased")\n\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: 'def ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'analyze', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '(text: str):\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    out = clf(text)[', options: { color: C.codeWhite, fontSize: 11 } },
    { text: '0', options: { color: C.codeYellow, fontSize: 11 } },
    { text: ']\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    return ', options: { color: C.codePurple, fontSize: 11 } },
    { text: 'f"{out[\'label\']} ({out[\'score\']:.2f})"\n\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: 'demo = gr.', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'Interface', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '(analyze,\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    gr.Textbox(label="Türkçe metin"),\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '    "text", title="TR Sentiment").', options: { color: C.codeWhite, fontSize: 11 } },
    { text: 'launch', options: { color: C.codeGreen, fontSize: 11 } },
    { text: '()', options: { color: C.codeWhite, fontSize: 11 } },
  ]);
})();

// ═══════════════════════ 16) DEPLOYMENT AKIŞI ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Uçtan Uca Deployment Akışı', SECTION, C.cream, TOTAL);

  const steps = [
    { n: 1, t: 'Lokalde model eğit / indir', c: C.pri,    code: 'joblib.dump(model, "model.pkl")' },
    { n: 2, t: 'FastAPI app yaz',            c: C.sec,    code: 'uvicorn main:app --reload' },
    { n: 3, t: 'requirements.txt sabitle',   c: C.acc,    code: 'pip freeze > requirements.txt' },
    { n: 4, t: 'Dockerfile yaz, build et',   c: C.purple, code: 'docker build -t tr-sent:1.0 .' },
    { n: 5, t: 'Test (curl + /health)',      c: C.cyan,   code: 'curl localhost:8000/health' },
    { n: 6, t: 'Push & deploy',              c: C.amber,  code: 'docker push  +  cloud run / k8s / spaces' },
  ];
  steps.forEach((st, i) => {
    const y = 1.05 + i * 0.65;
    s.addShape(pres.shapes.OVAL, { x: 0.55, y: y + 0.07, w: 0.45, h: 0.45, fill: { color: st.c } });
    s.addText(String(st.n), { x: 0.55, y: y + 0.07, w: 0.45, h: 0.45, margin: 0, fontFace: 'Georgia', fontSize: 16, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
    s.addText(st.t, { x: 1.15, y: y + 0.05, w: 3.5, h: 0.5, margin: 0, fontFace: 'Calibri', fontSize: 12, bold: true, color: C.dark, valign: 'middle' });
    s.addShape(pres.shapes.RECTANGLE, { x: 4.7, y: y + 0.05, w: 4.8, h: 0.5, fill: { color: C.codeBg } });
    s.addText(st.code, { x: 4.8, y: y + 0.05, w: 4.6, h: 0.5, margin: 0, fontFace: 'Consolas', fontSize: 10, color: C.codeGreen, valign: 'middle' });
  });
})();

// ═══════════════════════ 17) ÖDEVLER ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Bu Modülün Ödevleri', SECTION, C.cream, TOTAL);

  const assigns = [
    {
      t: '1 · FastAPI + Docker servisi',
      d: 'HuggingFace text-classification modelini FastAPI + Docker ile yayınla. /health ve /predict endpoint\'lerini curl ile test et. README + Postman collection ekle.',
      c: C.pri,
    },
    {
      t: '2 · Quantization karşılaştırması',
      d: 'Aynı modelin float32, float16 ve int8 (bitsandbytes) versiyonlarının latency (p50/p95) ve memory karşılaştırmasını raporla.',
      c: C.sec,
    },
    {
      t: '3 · Public deploy (Docker Hub veya HF Spaces)',
      d: 'Docker image\'ını Docker Hub veya GitHub Container Registry\'ye push et, ya da Gradio demosunu Hugging Face Spaces\'te yayınla. Public URL paylaş.',
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

// ═══════════════════════ 18) KAYNAKLAR ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Kaynaklar ve Daha Fazla Okuma', SECTION, C.cream, TOTAL);

  const links = [
    { t: 'FastAPI Dokümantasyonu',           u: 'fastapi.tiangolo.com',                       c: C.pri },
    { t: 'Pydantic v2 Docs',                 u: 'docs.pydantic.dev',                          c: C.sec },
    { t: 'Docker Multi-stage Build',         u: 'docs.docker.com/build/building/multi-stage', c: C.acc },
    { t: 'HuggingFace Inference Endpoints',  u: 'huggingface.co/inference-endpoints',         c: C.purple },
    { t: 'HuggingFace Spaces',               u: 'huggingface.co/spaces',                      c: C.cyan },
    { t: 'Gradio Quickstart',                u: 'gradio.app/guides/quickstart',               c: C.amber },
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

// ═══════════════════════ 19) CHEAT SHEET ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Modül 1 Cheat Sheet — Hızlı Komutlar', SECTION, C.cream, TOTAL);

  T.addCodeBlock(pres, s, 0.5, 1.05, 9.0, 3.9, [
    { text: '# Geliştirme\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'uvicorn main:app --reload --port 8000\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '# Production (gunicorn + uvicorn workers)\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '# Docker build & run\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'docker build -t llm-svc:1.0 .\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'docker run -d -p 8000:8000 --name llm llm-svc:1.0\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'docker logs -f llm\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'docker stats llm           # CPU/RAM canlı izleme\n\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '# Test\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'curl -s localhost:8000/health\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'curl -X POST localhost:8000/predict -H "Content-Type: application/json" \\\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: '     -d \'{"text": "Bu ürün harika!"}\'\n\n', options: { color: C.codeRed, fontSize: 11, breakLine: true } },
    { text: '# HF Spaces deploy (gradio + app.py)\n', options: { color: C.codeGreen, fontSize: 11, breakLine: true } },
    { text: 'huggingface-cli login\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'huggingface-cli repo create --type space --space_sdk gradio my-demo\n', options: { color: C.codeWhite, fontSize: 11, breakLine: true } },
    { text: 'git push hf main', options: { color: C.codeWhite, fontSize: 11 } },
  ]);
})();

// ═══════════════════════ 20) NOTEBOOK ÖZETİ ═══════════════════════
(function () {
  const s = pres.addSlide();
  T.slideHeader(pres, s, 'Bu Modülün Notebook\'ları', SECTION, C.cream, TOTAL);

  const nbs = [
    { n: 1, t: 'modul01_01_model_serilestirme.ipynb', d: 'scikit-learn modelinin joblib + safetensors ile saklanması ve yüklenmesi', c: C.pri },
    { n: 2, t: 'modul01_02_fastapi_inference.ipynb',  d: 'FastAPI + Pydantic ile production-ready inference endpoint', c: C.sec },
    { n: 3, t: 'modul01_03_docker_paketleme.ipynb',   d: 'Multi-stage Dockerfile, docker build/run, image inspect ve health-check', c: C.acc },
    { n: 4, t: 'modul01_04_hf_inference_servisi.ipynb', d: 'HuggingFace metin sınıflandırma modelinin uçtan uca servisleştirilmesi', c: C.purple },
  ];
  nbs.forEach((nb, i) => {
    const y = 1.15 + i * 0.95;
    T.addCard(pres, s, 0.5, y, 9.0, 0.85, { leftColor: nb.c });
    T.numBadge(pres, s, 0.7, y + 0.22, nb.n, nb.c);
    s.addText(nb.t, { x: 1.35, y: y + 0.13, w: 8.0, h: 0.35, margin: 0, fontFace: 'Consolas', fontSize: 11, bold: true, color: C.dark });
    s.addText(nb.d, { x: 1.35, y: y + 0.46, w: 8.0, h: 0.4, margin: 0, fontFace: 'Calibri', fontSize: 10.5, color: C.mid });
  });
})();

// ═══════════════════════ 21) KAPANIŞ ═══════════════════════
T.addClosingSlide(
  pres,
  'Modül 1 — Çıkarımlar',
  [
    { text: 'ML modelini servisleştirmek %80 iştir; FastAPI + Docker bunu standartlaştırır.', color: C.sec },
    { text: 'Pydantic şemaları yalnızca validasyon değil, istemciye verilen sözleşmedir.',     color: C.acc },
    { text: 'Multi-stage Docker build ile image boyutunu 3-5× küçültebilirsin.',                color: C.pri },
    { text: 'HuggingFace Spaces — POC demoları için en hızlı yayın kanalı.',                   color: C.purple },
    { text: 'Latency p95 ve /health endpoint olmadan production yoktur.',                       color: C.cyan },
  ],
  'Bir sonraki modül: LLM temelleri ve prompt mühendisliği.',
  'Dr. Murat Altun'
);

// ═══════════════════════ KAYDET ═══════════════════════
pres.writeFile({ fileName: 'modul01_ml_deployment.pptx' })
  .then(name => console.log('✓ Modül 1 PPTX hazır:', name));
