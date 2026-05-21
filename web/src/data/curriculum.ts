// LLM Tabanlı Uygulama Geliştirme Atölyesi — 6 modül × 42 saat × 6 gün
// BTK Akademi · 6 Temmuz - 17 Temmuz 2026 · Dr. Murat Altun
//
// Modüller PDF müfredatından (LLM_TABANLI_UYGULAMA_GELISTIRME_ATOLYESI) sırasıyla:
//   1. ML Deployment ve Servisleştirme (Gün 1, 5 saat)
//   2. LLM Temelleri ve Prompt Engineering (Gün 1-2, 7 saat)
//   3. Hugging Face Ekosistemi ve Lokal LLM (Gün 2-3, 9 saat)
//   4. RAG Mimarisi ve Production Patterns (Gün 3-5, 12 saat)
//   5. Fine-Tuning (PEFT/LoRA/QLoRA) (Gün 5-6, 6 saat)
//   6. GenAI DevOps ve Güvenlik (Gün 6, 3 saat)

export interface Module {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  section: string;
  sectionColor: string;
  days: string;
  dateRange: string;
  hours: number;
  topics: string[];
  notebooks: { name: string; desc: string; url?: string }[];
  datasets: string[];
  libraries: string[];
  assignments: string[];
  resources: { label: string; url: string }[];
  pptxFile: string;
  pptxDriveId?: string;
}

export function getPdfFileName(pptxFile: string): string {
  return pptxFile.replace('.pptx', '.pdf');
}

export const modules: Module[] = [
  {
    id: 1,
    slug: '01',
    title: 'ML Deployment ve Servisleştirme',
    subtitle: 'FastAPI · Docker · Hugging Face Inference',
    section: 'TEMEL',
    sectionColor: 'bg-primary',
    days: 'Gün 1',
    dateRange: '6 Temmuz 2026',
    hours: 5,
    topics: [
      'ML deployment yaşam döngüsü ve MLOps temelleri',
      'Model serileştirme: joblib, safetensors — hangi durumda hangisi?',
      'FastAPI ile /predict endpoint tasarımı + Pydantic ile request/response şemaları',
      'Async vs sync endpoint kararı, uvicorn/gunicorn workers',
      'Docker multi-stage build: builder + runtime ayrımı, image boyutu optimizasyonu',
      'Container monitoring: logging, latency p50/p95/p99, /health endpoint',
      'Hugging Face Hub modeliyle FastAPI + Docker tabanlı inference servisi',
      'Hugging Face Inference Endpoints — ücretli vs self-hosted karşılaştırma',
      'Hugging Face Spaces ile Gradio/Streamlit demo deploy',
      'Geliştirme ortamı: Python 3.11, conda/uv, Docker Desktop, VS Code',
    ],
    notebooks: [
      { name: 'modul01_01_model_serilestirme.ipynb', desc: 'scikit-learn modelinin joblib + safetensors ile saklanması ve yüklenmesi' },
      { name: 'modul01_02_fastapi_inference.ipynb', desc: 'FastAPI + Pydantic ile production-ready inference endpoint' },
      { name: 'modul01_03_docker_paketleme.ipynb', desc: 'Multi-stage Dockerfile, docker build/run, image inspect ve health-check' },
      { name: 'modul01_04_hf_inference_servisi.ipynb', desc: 'Hugging Face metin sınıflandırma modelinin uçtan uca servisleştirilmesi' },
    ],
    datasets: ['IMDB review sentiment (HuggingFace datasets)', 'sklearn Iris (sentetik tabular)'],
    libraries: ['fastapi', 'pydantic', 'uvicorn', 'scikit-learn', 'transformers', 'joblib', 'docker', 'gunicorn'],
    assignments: [
      'Kendi seçtiğin bir HuggingFace text-classification modelini FastAPI + Docker ile yayınla; /health ve /predict endpoint\'lerini curl ile test et.',
      'Aynı modelin float32 ve int8 versiyonlarının latency ve memory karşılaştırmasını raporla (p50/p95/p99 ölçümleriyle).',
      'Docker image\'ını Docker Hub veya GitHub Container Registry\'ye push et; kısa bir README ile birlikte.',
    ],
    resources: [
      { label: 'FastAPI dokümantasyonu', url: 'https://fastapi.tiangolo.com/' },
      { label: 'Docker multi-stage build', url: 'https://docs.docker.com/build/building/multi-stage/' },
      { label: 'Hugging Face Inference Endpoints', url: 'https://huggingface.co/inference-endpoints' },
      { label: 'Pydantic v2 docs', url: 'https://docs.pydantic.dev/' },
      { label: 'Hugging Face Spaces', url: 'https://huggingface.co/spaces' },
    ],
    pptxFile: 'modul01_ml_deployment.pptx',
    pptxDriveId: undefined,
  },
  {
    id: 2,
    slug: '02',
    title: 'LLM Temelleri ve Prompt Engineering',
    subtitle: 'Transformer · Tokenization · CoT · Function Calling',
    section: 'TEMEL',
    sectionColor: 'bg-primary',
    days: 'Gün 1-2',
    dateRange: '6-8 Temmuz 2026',
    hours: 7,
    topics: [
      'Transformer mimarisi: self-attention, encoder/decoder, residual + layer norm',
      'Büyük dil modellerinin (LLM) çekirdek kavramları ve pretraining',
      'Tokenization: BPE, SentencePiece, vocabulary size, multilingual modeller',
      'Context window: token sayımı, uzun bağlam stratejileri',
      'Sampling parametreleri: temperature, top-p, top-k, repetition penalty',
      'Prompt engineering desenleri: zero-shot, few-shot, role-play',
      'Chain-of-Thought (CoT), ReAct, Self-Consistency, Tree-of-Thoughts',
      'Function calling / tool use: schema tasarımı, OpenAI ve Anthropic stilleri',
      'Google AI Studio: prompt karşılaştırma, dataset yönetimi, A/B testleri',
      'Gemini, GPT-4o, Claude, Llama ailesi karşılaştırma',
      'Maliyet ve token bütçesi optimizasyonu',
    ],
    notebooks: [
      { name: 'modul02_01_tokenization_context.ipynb', desc: 'HuggingFace tokenizer ile token sayımı, context window analizi, multilingual karşılaştırma' },
      { name: 'modul02_02_ai_studio_prompt.ipynb', desc: 'Google AI Studio ile Gemini üzerinde prompt karşılaştırma deneyleri' },
      { name: 'modul02_03_cot_react.ipynb', desc: 'Chain-of-Thought ve ReAct desenleri ile matematik/akıl yürütme problemleri' },
      { name: 'modul02_04_function_calling.ipynb', desc: 'Function calling örneği: hava durumu, hesap makinesi, web arama tool\'ları' },
    ],
    datasets: ['GSM8K (matematik problemleri)', 'HellaSwag (commonsense)', 'TruthfulQA (gerçeklik)'],
    libraries: ['transformers', 'tokenizers', 'google-generativeai', 'openai', 'anthropic', 'instructor'],
    assignments: [
      'Aynı görev için zero-shot, few-shot ve Chain-of-Thought prompt versiyonlarını yaz ve doğruluğu karşılaştır.',
      'Bir hesap makinesi ve hava durumu tool\'u tasarla; LLM\'in doğru tool\'u doğru parametrelerle çağırmasını sağla.',
      'Google AI Studio\'da 3 farklı sistem prompt\'u ile aynı kullanıcı sorusunu test edip rapor yaz.',
    ],
    resources: [
      { label: 'Google AI Studio', url: 'https://aistudio.google.com/' },
      { label: 'Attention Is All You Need (Vaswani 2017)', url: 'https://arxiv.org/abs/1706.03762' },
      { label: 'Prompt Engineering Guide (DAIR.AI)', url: 'https://www.promptingguide.ai/' },
      { label: 'OpenAI Function Calling', url: 'https://platform.openai.com/docs/guides/function-calling' },
      { label: 'Anthropic Tool Use', url: 'https://docs.anthropic.com/claude/docs/tool-use' },
    ],
    pptxFile: 'modul02_llm_temelleri_prompt.pptx',
    pptxDriveId: undefined,
  },
  {
    id: 3,
    slug: '03',
    title: 'Hugging Face Ekosistemi ve Lokal LLM',
    subtitle: 'HF Hub · Transformers · Ollama · LM Studio · GGUF',
    section: 'EKOSISTEM',
    sectionColor: 'bg-secondary',
    days: 'Gün 2-3',
    dateRange: '8-10 Temmuz 2026',
    hours: 9,
    topics: [
      'Hugging Face Hub: Models, Datasets, Spaces — keşif ve model card okuma',
      'Transformers pipeline() ile metin sınıflandırma, NER, çeviri, özetleme',
      'AutoModel / AutoTokenizer ile manuel inference akışı',
      'Datasets kütüphanesi: load_dataset, map, filter, streaming',
      'Quantization kavramı: bitsandbytes (4-bit/8-bit), GGUF, AWQ, GPTQ',
      'Lokal donanım analizi: RAM/VRAM gereksinimleri, model seçimi (3B / 7B / 8B / 13B)',
      'Ollama: kurulum, model çekme (llama, mistral, gemma, qwen), REST API',
      'Custom Ollama Modelfile: system prompt + sampling parametreleri',
      'LM Studio: GUI ile model yönetimi, OpenAI-uyumlu lokal endpoint',
      'llama.cpp ve GGUF formatı: quantization seviyeleri (Q4_K_M, Q5, Q8) karşılaştırması',
      'Streamlit + Ollama ile lokal chat arayüzü geliştirme',
    ],
    notebooks: [
      { name: 'modul03_01_hf_hub_kesfi.ipynb', desc: 'Hugging Face Hub üzerinde model keşfi, model card analizi, lisans kontrolü' },
      { name: 'modul03_02_transformers_pipeline.ipynb', desc: 'Pipeline ile NER, çeviri, özetleme; AutoModel ile manuel inference akışı' },
      { name: 'modul03_03_datasets_kutuphanesi.ipynb', desc: 'Türkçe bir veri setini yükle, map/filter ile dönüştür, streaming ile büyük veri' },
      { name: 'modul03_04_ollama_kurulum.ipynb', desc: 'Ollama kurulumu, model çekme, REST API ile sorgu, custom Modelfile yazımı' },
      { name: 'modul03_05_lm_studio_endpoint.ipynb', desc: 'LM Studio GUI yönetimi, OpenAI SDK ile lokal endpoint kullanımı' },
      { name: 'modul03_06_streamlit_chat.ipynb', desc: 'Streamlit + Ollama ile basit lokal chat arayüzü' },
    ],
    datasets: ['Turkish News dataset (savasy/ttc4900)', 'Wikipedia TR (mini)', 'Common Crawl TR (örnek)'],
    libraries: ['transformers', 'tokenizers', 'datasets', 'accelerate', 'bitsandbytes', 'ollama', 'streamlit', 'llama-cpp-python'],
    assignments: [
      'Aynı 7B modelin float16, 8-bit ve 4-bit (GGUF Q4_K_M) versiyonlarını çalıştır; bellek ve hız karşılaştır.',
      'Ollama ile özel bir Modelfile yazıp Türkçe asistan persona\'sı tanımla; chat\'te kişiliği doğrula.',
      'Streamlit ile lokal Ollama\'ya bağlanan basit bir chat arayüzü kur ve sohbet geçmişini sakla.',
    ],
    resources: [
      { label: 'Hugging Face Transformers', url: 'https://huggingface.co/docs/transformers' },
      { label: 'Hugging Face Datasets', url: 'https://huggingface.co/docs/datasets' },
      { label: 'Ollama', url: 'https://ollama.com/' },
      { label: 'LM Studio', url: 'https://lmstudio.ai/' },
      { label: 'llama.cpp', url: 'https://github.com/ggerganov/llama.cpp' },
      { label: 'GGUF format spec', url: 'https://github.com/ggerganov/ggml/blob/master/docs/gguf.md' },
    ],
    pptxFile: 'modul03_huggingface_lokal_llm.pptx',
    pptxDriveId: undefined,
  },
  {
    id: 4,
    slug: '04',
    title: 'RAG Mimarisi ve Production Patterns',
    subtitle: 'Embeddings · ChromaDB · LangChain · LangGraph · RAGAS',
    section: 'RAG',
    sectionColor: 'bg-secondary',
    days: 'Gün 3-5',
    dateRange: '10-14 Temmuz 2026',
    hours: 12,
    topics: [
      'RAG (Retrieval-Augmented Generation) nedir, ne zaman tercih edilir?',
      'RAG mimari evrimi: naive → advanced → modular RAG',
      'Embedding modelleri: sentence-transformers, E5, BGE, multilingual seçim kriterleri',
      'MTEB liderlik tablosu okuma ve dile özel model seçimi',
      'Vector store\'lar: ChromaDB, Qdrant, Pinecone, Weaviate karşılaştırma',
      'PDF/DOCX/HTML doküman yükleme ve metadata çıkarımı',
      'Chunking stratejileri: fixed-size, recursive character, semantic chunking',
      'Dense retrieval, sparse retrieval (BM25), hybrid yaklaşımlar',
      'MMR (Maximal Marginal Relevance) ile çeşitlilik',
      'Cross-encoder reranker ve Cohere Rerank entegrasyonu',
      'LangChain LCEL (LangChain Expression Language) ile zincir kurulumu',
      'LangGraph ile state-machine tabanlı multi-step / multi-agent RAG akışı',
      'RAGAS framework: faithfulness, answer relevance, context precision metrikleri',
      'Production patterns: async streaming, structured output (Pydantic), response caching',
      'Maliyet optimizasyonu: prompt caching, model routing, token budget',
    ],
    notebooks: [
      { name: 'modul04_01_embeddings_karsilastirma.ipynb', desc: 'Sentence-Transformers ile embedding üretimi, MTEB skor karşılaştırması' },
      { name: 'modul04_02_chromadb_kurulum.ipynb', desc: 'ChromaDB ile koleksiyon yönetimi: add, query, delete, metadata filter' },
      { name: 'modul04_03_pdf_chunking_pipeline.ipynb', desc: 'PDF setinden chunking → embedding → vector store dolumu pipeline\'ı' },
      { name: 'modul04_04_langchain_lcel.ipynb', desc: 'LangChain LCEL ile retriever | prompt | LLM | parser zinciri kurma' },
      { name: 'modul04_05_hybrid_retrieval_rerank.ipynb', desc: 'BM25 + dense hybrid + MMR + cross-encoder reranker entegrasyonu' },
      { name: 'modul04_06_langgraph_agent.ipynb', desc: 'LangGraph ile query routing + reflection adımları içeren agent tabanlı RAG' },
      { name: 'modul04_07_ragas_degerlendirme.ipynb', desc: 'RAGAS ile faithfulness, answer relevance, context precision metrikleri' },
      { name: 'modul04_08_production_patterns.ipynb', desc: 'Async streaming, structured output (Pydantic) ve response caching pratiği' },
    ],
    datasets: ['Türkçe kurumsal PDF seti (anonim)', 'Wikipedia TR makale koleksiyonu', 'TR yasal mevzuat metinleri'],
    libraries: ['langchain', 'langgraph', 'langchain-community', 'chromadb', 'qdrant-client', 'sentence-transformers', 'rank-bm25', 'ragas', 'pypdf', 'unstructured'],
    assignments: [
      'Kurumsal bir PDF setinden chunking → embedding → ChromaDB → LCEL ile RAG zinciri kur; 5 farklı soruda doğruluğu test et.',
      'Aynı veri setinde dense, sparse (BM25) ve hybrid retrieval\'ı karşılaştır; RAGAS\'la context precision raporla.',
      'LangGraph ile query routing (basit/karmaşık soru ayrımı) + reflection adımı içeren bir agent RAG kur.',
    ],
    resources: [
      { label: 'LangChain dokümantasyonu', url: 'https://python.langchain.com/' },
      { label: 'LangGraph', url: 'https://langchain-ai.github.io/langgraph/' },
      { label: 'ChromaDB', url: 'https://docs.trychroma.com/' },
      { label: 'Sentence-Transformers', url: 'https://www.sbert.net/' },
      { label: 'MTEB Leaderboard', url: 'https://huggingface.co/spaces/mteb/leaderboard' },
      { label: 'RAGAS', url: 'https://docs.ragas.io/' },
      { label: 'Cohere Rerank', url: 'https://docs.cohere.com/docs/rerank-overview' },
    ],
    pptxFile: 'modul04_rag_mimarisi.pptx',
    pptxDriveId: undefined,
  },
  {
    id: 5,
    slug: '05',
    title: 'Fine-Tuning: PEFT, LoRA ve QLoRA',
    subtitle: 'Unsloth · Axolotl · GGUF Conversion · HF Publish',
    section: 'FINE-TUNING',
    sectionColor: 'bg-accent',
    days: 'Gün 5-6',
    dateRange: '14-17 Temmuz 2026',
    hours: 6,
    topics: [
      'Fine-tuning vs RAG: hangi durumda hangisi? Karar çerçevesi',
      'Supervised fine-tuning (SFT) yaşam döngüsü',
      'Instruction format, chat template ve ShareGPT formatı',
      'PEFT (Parameter-Efficient Fine-Tuning) teorisi ve avantajları',
      'LoRA (Low-Rank Adaptation): rank, alpha, target modules hiperparametreleri',
      'QLoRA: 4-bit quantization ile LoRA — bellek tasarrufu',
      'Unsloth ile Google Colab T4 üzerinde hızlı QLoRA fine-tuning',
      'Training metrikleri: loss, perplexity, overfit kontrolü (TensorBoard, W&B)',
      'Axolotl ile YAML config-driven fine-tuning iş akışı',
      'LoRA adapter\'ın değerlendirilmesi (perplexity, görev-spesifik metrikler)',
      'Adapter merge, GGUF\'a dönüştürme ve Ollama ile lokal çalıştırma',
      'Hugging Face Hub\'a model publish: model card yazımı, lisans, README',
    ],
    notebooks: [
      { name: 'modul05_01_dataset_hazirlama.ipynb', desc: 'Türkçe instruction veri setini chat template ile Datasets formatına dönüştürme' },
      { name: 'modul05_02_unsloth_qlora.ipynb', desc: 'Google Colab T4 üzerinde Unsloth ile 7B model QLoRA fine-tuning' },
      { name: 'modul05_03_axolotl_yaml.ipynb', desc: 'Axolotl ile YAML config-driven fine-tuning workflow' },
      { name: 'modul05_04_adapter_merge_gguf.ipynb', desc: 'LoRA adapter\'ı base model\'e merge etme ve GGUF formatına dönüştürme' },
      { name: 'modul05_05_hf_publish.ipynb', desc: 'Eğitilen modeli Hugging Face Hub\'a publish etme, model card yazma' },
    ],
    datasets: ['Türkçe instruction dataset (alpaca-tr örneği)', 'Türkçe soru-cevap özel veri seti', 'ShareGPT TR (sentetik)'],
    libraries: ['unsloth', 'axolotl', 'transformers', 'trl', 'peft', 'accelerate', 'bitsandbytes', 'wandb', 'tensorboard'],
    assignments: [
      'Küçük Türkçe instruction veri seti hazırla, Unsloth ile bir 7B modeli QLoRA ile fine-tune et; loss eğrisini W&B\'de raporla.',
      'Aynı eğitimi Axolotl ile YAML config kullanarak tekrarla; iki yöntemin geliştirici deneyimini karşılaştır.',
      'Fine-tuned adapter\'ı merge edip GGUF\'a çevir, Ollama\'da çalıştır ve baseline modelle Türkçe yanıtları kıyasla.',
    ],
    resources: [
      { label: 'Unsloth', url: 'https://github.com/unslothai/unsloth' },
      { label: 'Axolotl', url: 'https://github.com/axolotl-ai-cloud/axolotl' },
      { label: 'PEFT (HuggingFace)', url: 'https://huggingface.co/docs/peft' },
      { label: 'TRL (Transformer Reinforcement Learning)', url: 'https://huggingface.co/docs/trl' },
      { label: 'LoRA paper (Hu 2021)', url: 'https://arxiv.org/abs/2106.09685' },
      { label: 'QLoRA paper (Dettmers 2023)', url: 'https://arxiv.org/abs/2305.14314' },
    ],
    pptxFile: 'modul05_fine_tuning_lora.pptx',
    pptxDriveId: undefined,
  },
  {
    id: 6,
    slug: '06',
    title: 'GenAI DevOps, Güvenlik ve Capstone',
    subtitle: 'Google AI Studio · Antigravity · Prompt Injection · PII',
    section: 'DEVOPS',
    sectionColor: 'bg-accent',
    days: 'Gün 6',
    dateRange: '17 Temmuz 2026',
    hours: 3,
    topics: [
      'GenAI DevOps yaşam döngüsü: prompt → eval → deploy → monitor',
      'Google AI Studio: prompt management, dataset yönetimi, comparison testing',
      'Antigravity IDE ile agent-driven kod geliştirme workflow\'u',
      'Prompt injection nedir? Direct ve indirect injection senaryoları',
      'Output validation: schema enforcement, JSON parsing, refuse cevaplar',
      'PII (Personally Identifiable Information) filtering: regex + NER yaklaşımları',
      'Output guardrails: NeMo Guardrails, Guardrails AI, custom validators',
      'Maliyet izleme: token sayımı, model routing, cache hit rate',
      'Capstone: RAG + lokal fine-tuned model + Docker deployment uçtan uca proje',
    ],
    notebooks: [
      { name: 'modul06_01_ai_studio_management.ipynb', desc: 'Google AI Studio\'da prompt management, A/B comparison ve dataset yönetimi' },
      { name: 'modul06_02_antigravity_workflow.ipynb', desc: 'Antigravity IDE ile agent geliştirme ve plan-execute workflow\'u' },
      { name: 'modul06_03_prompt_injection_defense.ipynb', desc: 'Prompt injection saldırı senaryoları ve savunma katmanları' },
      { name: 'modul06_04_guardrails_pii.ipynb', desc: 'Output validation, PII filtering ve guardrails ile güvenli LLM yanıtları' },
      { name: 'modul06_05_capstone_template.ipynb', desc: 'Capstone proje şablonu: RAG + fine-tuned model + Docker deploy' },
    ],
    datasets: ['Türkçe PII örnek seti (TC kimlik, telefon, IBAN)', 'Prompt injection saldırı koleksiyonu (jailbreak örnekleri)'],
    libraries: ['guardrails-ai', 'nemoguardrails', 'presidio-analyzer', 'presidio-anonymizer', 'instructor', 'langchain'],
    assignments: [
      'Bir RAG sistemine 3 farklı prompt injection saldırısı dene, ardından guardrails ile savun ve sonucu raporla.',
      'PII filtering pipeline kur: TC kimlik, telefon, e-posta ve IBAN\'ı tespit edip maskeler bir Pydantic validator yaz.',
      'CAPSTONE: 6 modülden öğrendiklerinle uçtan uca bir LLM ürünü teslim et — RAG + (opsiyonel fine-tuned model) + Docker deploy + kısa sunum.',
    ],
    resources: [
      { label: 'Google AI Studio', url: 'https://aistudio.google.com/' },
      { label: 'Antigravity', url: 'https://antigravity.google/' },
      { label: 'Guardrails AI', url: 'https://www.guardrailsai.com/docs' },
      { label: 'NeMo Guardrails', url: 'https://docs.nvidia.com/nemo/guardrails/' },
      { label: 'Microsoft Presidio (PII)', url: 'https://microsoft.github.io/presidio/' },
      { label: 'OWASP LLM Top 10', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/' },
    ],
    pptxFile: 'modul06_genai_devops_guvenlik.pptx',
    pptxDriveId: undefined,
  },
];

export function getModuleBySlug(slug: string): Module | undefined {
  return modules.find(m => m.slug === slug);
}

export const sectionColors: Record<string, string> = {
  'TEMEL':       'text-primary border-primary',
  'EKOSISTEM':   'text-secondary border-secondary',
  'RAG':         'text-secondary border-secondary',
  'FINE-TUNING': 'text-accent border-accent',
  'DEVOPS':      'text-accent border-accent',
};

// Geriye dönük uyumluluk için (eski kodu yumuşak göçermek için)
// Yeni kodda doğrudan `modules` ve `getModuleBySlug` kullan.
export const weeks = modules;
export const getWeekBySlug = getModuleBySlug;
export type Week = Module;
