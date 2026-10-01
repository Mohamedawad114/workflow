# 🤖 StaffSync — AI Agentic Meeting Scheduler

> An autonomous AI Agent that manages, conflict-checks, and schedules 1-to-1 meetings via **Telegram**, powered by **n8n**, **Groq (LLaMA 3.3)**, **MongoDB Atlas**, **Google Calendar**, and **Gmail API**.

---

## 💡 Overview

**StaffSync** automates meeting scheduling using natural language via Telegram. The AI Agent dynamically queries employee records, checks calendar availability, creates Google Calendar events with Google Meet links, and sends official email invitations.

---

## 🏗️ Architecture & Decision Flow

flowchart TD
    A([📱 Telegram Message]) --> B[n8n Webhook]
    B --> C{Memory Node\nchat.id}
    C --> D[AI Agent Orchestrator\nGroq / LLaMA 3.3]
    
    D -->|Lookup Employee| E[MongoDB Atlas Tool]
    E -->|Return Email/Role| D
    
    D -->|Book Event| F[Google Calendar Tool]
    F -->|Return Event Link| D
    
    D -->|Send Invite| G[Gmail API Tool]
    G -->|Confirmation| D
    
    D -->|Reply| H([💬 Telegram User])

✨ Key Features

Natural Language Parsing: Handles scheduling requests (e.g., "Book 30 mins with Maha tomorrow at 10 AM").

Dynamic Entity Lookup: Fetches employee details from MongoDB Atlas.

Session Persistence: Tracks conversation memory per user using Telegram chat.id.

Calendar & RSVP Sync: Creates Google Calendar events and sends direct RSVP emails (Send Updates: all).

Resilient Retry Logic: Automatic retries for rate limits (429) and upstream errors (503).

🛠️ Tech Stack
Orchestration: n8n (Docker-hosted)
AI Engine: Groq API (LLaMA 3.3 70B)
Messaging: Telegram Bot API
Database: MongoDB Atlas
Integrations: Google Calendar API, Gmail API

⚡ Quick Setup
Docker Execution:

Bash
docker run -d --name n8n -p 5678:5678 -e WEBHOOK_URL="https://YOUR_DOMAIN.ngrok-free.app/" docker.n8n.io/n8nio/n8n
n8n Import: Import workflow.json and connect Telegram, Groq, MongoDB, Google Calendar, and Gmail credentials.

Session ID: In the Memory node, set Session ID to {{ $json.message.chat.id }}.

Google Calendar: Enable Send Updates: all under node Options.

📄 License
MIT License.