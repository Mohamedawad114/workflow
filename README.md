# ⚡ n8n Workflows

<p align="center">
  <img src="https://n8n.io/favicon.ico" width="120" alt="n8n Logo">
</p>
# Production-Grade n8n AI & Automation Workflows


A centralized repository containing production-grade **n8n workflows**, focusing on Multi-Agent architectures, Retrieval-Augmented Generation (RAG), Autonomous AI Assistants, and Smart Business Automations. 

This repository serves as a showcase of practical AI engineering using **n8n**, **Groq LLM**, **Qdrant**, **MongoDB**, **Google Workspace**, and various communication platforms (Telegram, Webhooks).

---

## - Tech Stack & Core Integrations

- **Orchestration:** n8n (Self-Hosted / Cloud Workflow Automation)
- **AI Models & Engines:** Groq Chat Models (Llama/Mixtral), Groq Whisper (Speech-to-Text)
- **Vector Search & RAG:** Qdrant Vector Store, HuggingFace Embeddings, OpenAI Embeddings
- **Databases & Memory:** MongoDB (Persistent Chat Memory), Simple Memory
- **Third-Party APIs:** Tavily Web Search API, Google Calendar API, Gmail API, Google Drive, Airtable
- **Messaging & Triggers:** Telegram Bot API, Custom Webhooks, n8n Form Submissions

---

## - Repository Structure & Workflows

### - 1. AI Conversational Assistants & Chatbots

#### 1.1 Telegram AI Assistant with Web Search (`chat-bot telegram.json`)
* **Overview:** A real-time Telegram bot that leverages an AI Agent with web search capabilities.
* **Architecture:** 
  - **Trigger:** `Telegram Trigger` (listens for incoming user messages).
  - **Reasoning:** `AI Agent` powered by `Groq Chat Model`.
  - **Memory:** `Simple Memory` for short-term contextual conversation.
  - **Tools:** `HTTP Request Tool` integrated with `Tavily API` for live web searches.
  - **Action:** `Send a Text Message` back to Telegram.

#### 1.2 Web/App AI Chatbot (`chat-bot.json`)
* **Overview:** A general-purpose AI Chatbot workflow designed for web UI or application integration with persistent database storage.
* **Architecture:**
  - **Trigger:** `Chat Trigger` (When chat message sent).
  - **Memory:** `MongoDB Chat Memory` for cross-session, persistent conversation history.
  - **Tools:** `Tavily API` for real-time information retrieval via HTTP Request.

#### 1.3 Customer Care / Webhook AI Agent (`customer-app.json`)
* **Overview:** An API-driven AI customer support agent designed to be called programmatically via webhooks from custom web or mobile frontends.
* **Architecture:**
  - **Trigger:** `Webhook` (POST request).
  - **Processing:** `AI Agent` + `Groq Chat Model` + `Simple Memory` + `Tavily Search Tool`.

---

### - 2. AI Executive & Meeting Assistants (Multi-Tool Automation)

#### 2.1 Meeting & Task Assistant - V1 (`meeting-assistant.json`)
* **Overview:** An AI assistant that automates workspace management, document retrieval, and event scheduling via natural language Telegram commands.
* **Key Features:**
  - Querying stored knowledge in `MongoDB`.
  - Scheduling meetings via `Google Calendar API`.
  - Sending automated email updates via `Gmail API`.

#### 2.2 Voice-Enabled Executive Assistant - V2 (`meeting-assistant V2.json`)
* **Overview:** An advanced iteration of the Executive Assistant supporting **voice notes / audio messages** alongside text, dynamically routing execution paths.
* **Architecture & Flow:**
  - **Audio Routing:** A logical `If` node branches input:
    - **Text Path:** Directed straight to the `AI Agent`.
    - **Voice Path:** Fetches file via `Telegram Get File` -> converts/formats via `Code in JavaScript` -> transcribes audio via `Groq Whisper API (STT)` -> forwards transcribed text to `AI Agent`.
  - **Tool Set:**
    - `Google Calendar` (Get & Create Events)
    - `Gmail` (Send emails)
    - `MongoDB` (Find Documents / Context retrieval)

---

### - 3. RAG Pipelines & Knowledge Indexing (Qdrant)

#### 3.1 Single Document RAG Pipeline - V1 (`RAG.json`)
* **Overview:** Event-driven vector indexing pipeline for single document ingestion into Qdrant.
* **Workflow:**
  1. Triggered on new file uploads via `Google Drive Trigger`.
  2. Downloads the raw file from Google Drive.
  3. Uses `HuggingFace Embeddings` / `OpenAI Embeddings` to vectorize document content via `Default Data Loader`.
  4. Stores embedded vectors into `Qdrant Vector Store`.

#### 3.2 Scheduled Batch Ingestion Pipeline - V2 (`RAG-V2.json`)
* **Overview:** An enterprise-grade ETL pipeline designed to batch process, track, and index multiple Google Drive documents automatically.
* **Workflow:**
  1. Scheduled execution via `Schedule Trigger` (or manual trigger).
  2. Searches Google Drive folders and cross-references indexed files with a `Google Sheet` database.
  3. Uses `Merge` and `JavaScript Code` nodes for data transformation and deduplication.
  4. Appends sync records to Google Sheets.
  5. Iterates through files using `Loop Over Items` node to download, chunk, embed (`HuggingFace Embeddings`), and store vectors into `Qdrant`.

---

### - 4. Business Intelligence & Automation Tools

#### 4.1 Automated CV & Candidate Analysis (`cv analyziz.json`)
* **Overview:** Webhook-triggered candidate screening workflow that analyzes incoming applicant data and stores structured feedback.
* **Workflow:**
  - Receives candidate payload via `Webhook`.
  - Passes details to a `Basic LLM Chain` driven by `Groq`.
  - Parses LLM output via `Code in JavaScript`.
  - Creates structured candidate records in `Airtable` and sends evaluation summaries via `Gmail`.

#### 4.2 Form Sentiment Analysis Pipeline (`sentiment analyziz.json`)
* **Overview:** Real-time customer feedback analysis system processing form submissions.
* **Workflow:**
  - Triggers on `n8n Form Submission`.
  - Evaluates text tone and sentiment using a `Basic LLM Chain` (`Groq`).
  - Combines raw submission data with sentiment scores via `Merge` node.
  - Automatically logs organized feedback records into `Airtable`.

---

## - How to Import & Run These Workflows

1. **Prerequisites:**
   - A running instance of **n8n** (version 1.0+ recommended).
   - API Keys for respective services (`Groq`, `Tavily`, `Qdrant`, `OpenAI`, `Google Workspace OAuth2`, `Airtable`).

2. **Importing:**
   - Open your n8n dashboard.
   - Click on **Workflows** -> **Import from File**.
   - Select any `.json` file from this repository.

3. **Credentials Setup:**
   - Configure your credentials in n8n for nodes with warning badges (e.g., Telegram Bot Token, Groq API Key, Qdrant Credentials).
   - Activate the workflow!

---
