# notebooks/ — Modül Jupyter Notebook'ları

> **Bu klasör `.gitignore`'da** — `.ipynb` dosyaları repo'ya commit edilmez. Dr. Murat Altun bunları Google Drive'a yükler; sonra `web/src/data/curriculum.ts` içine `notebooks[].url` olarak Colab linkleri yazılır.

## Yapı

Her modülün kendi klasörü; her notebook ortak gradient banner header'ı (mor → magenta → emerald) ve cross-link footer ile başlar.

```
notebooks/
├── modul01/  ML Deployment        — 4 notebook ·  56 KB
├── modul02/  LLM Temelleri        — 4 notebook ·  56 KB
├── modul03/  HF + Lokal LLM       — 6 notebook · 100 KB
├── modul04/  RAG Mimarisi         — 8 notebook · 132 KB
├── modul05/  Fine-tuning          — 5 notebook ·  84 KB
└── modul06/  DevOps + Capstone    — 5 notebook · 100 KB
                                   ─────────────────────
                                     32 notebook · 528 KB
```

## Notebook listesi

### Modül 1 — ML Deployment
- `modul01_01_model_serilestirme.ipynb` — joblib + safetensors
- `modul01_02_fastapi_inference.ipynb` — FastAPI + Pydantic + p95 latency
- `modul01_03_docker_paketleme.ipynb` — Multi-stage Dockerfile + HEALTHCHECK
- `modul01_04_hf_inference_servisi.ipynb` — HF text-classification servisi (capstone)

### Modül 2 — LLM Temelleri ve Prompt Engineering
- `modul02_01_tokenization_context.ipynb` — Tokenization, context window, tiktoken
- `modul02_02_ai_studio_prompt.ipynb` — Google AI Studio prompt karşılaştırma
- `modul02_03_cot_react.ipynb` — Chain-of-Thought + ReAct (matematik/akıl yürütme)
- `modul02_04_function_calling.ipynb` — Function calling (hava durumu, hesap, web)

### Modül 3 — Hugging Face Ekosistemi + Lokal LLM
- `modul03_01_hf_hub_kesfi.ipynb` — HF Hub keşif, model card, lisans
- `modul03_02_transformers_pipeline.ipynb` — Pipeline + AutoModel manuel inference
- `modul03_03_datasets_kutuphanesi.ipynb` — Türkçe veri seti yükle, map/filter, streaming
- `modul03_04_ollama_kurulum.ipynb` — Ollama + Modelfile + REST API
- `modul03_05_lm_studio_endpoint.ipynb` — LM Studio + OpenAI SDK lokal endpoint
- `modul03_06_streamlit_chat.ipynb` — Streamlit + Ollama lokal chat (capstone)

### Modül 4 — RAG Mimarisi ve Production Patterns
- `modul04_01_embeddings_karsilastirma.ipynb` — MiniLM, mE5, MTEB karşılaştırma
- `modul04_02_chromadb_kurulum.ipynb` — ChromaDB CRUD + metadata filter
- `modul04_03_pdf_chunking_pipeline.ipynb` — PDF → chunking → embedding → store
- `modul04_04_langchain_lcel.ipynb` — LangChain LCEL + streaming + fallbacks
- `modul04_05_hybrid_retrieval_rerank.ipynb` — BM25 + dense + RRF + MMR + bge-reranker
- `modul04_06_langgraph_agent.ipynb` — LangGraph multi-node + reflection loop
- `modul04_07_ragas_degerlendirme.ipynb` — RAGAS (faithfulness, relevancy, precision)
- `modul04_08_production_patterns.ipynb` — Streaming, structured output, semantic cache

### Modül 5 — Fine-Tuning (PEFT / LoRA / QLoRA)
- `modul05_01_dataset_hazirlama.ipynb` — Türkçe instruction + Alpaca/ChatML
- `modul05_02_unsloth_qlora.ipynb` — Colab T4 + Unsloth + SFTTrainer
- `modul05_03_axolotl_yaml.ipynb` — Axolotl YAML config workflow
- `modul05_04_adapter_merge_gguf.ipynb` — Merge + GGUF + Ollama
- `modul05_05_hf_publish.ipynb` — HF Hub publish + model card

### Modül 6 — GenAI DevOps, Güvenlik ve Capstone
- `modul06_01_ai_studio_management.ipynb` — AI Studio prompt management + A/B
- `modul06_02_antigravity_workflow.ipynb` — Antigravity agent workflow
- `modul06_03_prompt_injection_defense.ipynb` — Saldırı + 5 katman savunma
- `modul06_04_guardrails_pii.ipynb` — Presidio + TR PII (TCK Mod-11, telefon, IBAN)
- `modul06_05_capstone_template.ipynb` — **CAPSTONE** — Modül 1-6 birleştiren proje (RAG + Gemini + Pydantic + injection guard + PII + FastAPI + Docker)

## Ortak konvansiyonlar

- **Header banner**: `linear-gradient(135deg, #4C1D95 0%, #EC4899 60%, #10B981 100%)` + `MODÜL X · NOTEBOOK Y/N` rozeti + cross-link footer (LLM, CV, DL, VB-YZ-90, YZ Okulum)
- **Türkçe karakterler** (ö, ü, ş, ı, ğ, ç) — ASCII-only YASAK
- **API key'ler** `os.environ.get(...)` veya `userdata.get(...)` ile yüklenir — hard-code YOK
- **Her notebook**: bağlam → kurulum → adım adım kod → mini alıştırma → 🎯 Çıkarımlar
- **JSON validation:** `python3 -c "import json; json.load(open('FILE.ipynb'))"` — hepsi geçerli (32/32 ✓)

## Drive workflow

1. Dr. Murat 32 notebook'u Drive'a yükler (örn `LLM-Bootcamp-2026/notebooks/modul0X/`).
2. Klasör paylaşım URL'sini AI ajanına verir.
3. Ajan her dosyanın Drive ID'sini çıkarıp `web/src/data/curriculum.ts`'teki `modules[i].notebooks[j].url`'i `https://colab.research.google.com/drive/{DRIVE_ID}` formatında doldurur.
4. Site (drmurataltun.github.io/llm-bootcamp/) her notebook için "Colab'da Aç" butonu gösterir.
