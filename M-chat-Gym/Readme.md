🏋️‍♂️ Facebook Messenger AI Customer Service Bot for Gyms

An automated, intelligent AI Customer Service Assistant for Gyms built using n8n, Groq LLM Model, Google Sheets, and Facebook Messenger Graph API.

This assistant automatically handles user inquiries on Facebook Messenger regarding gym locations, subscription prices, workout schedules, trainers, and policies, while utilizing dynamic real-time data stored in a Google Sheet.

🌟 Key Features

🤖 Automated Messenger AI Agent: Powered by Groq AI model for natural, friendly, and context-aware Arabic customer interactions.

📊 Dynamic Knowledge Base Integration: Real-time data retrieval for pricing, schedules, offers, and locations directly from Google Sheets.

🔄 Seamless Facebook Meta Verification: Built-in dual-path handling for Webhook Verification (GET) and live message processing (POST).

👥 Gender-Specific Clarification: Proactively asks whether the inquiry is for Men or Women to provide accurate schedule details.

🎯 Cross-Selling & Value Creation: Dynamically recommends special offers and highlights certified professional trainers.

🛡️ Fallback / Out-of-Scope Protection: Politely redirects non-gym related topics back to gym services.

🏗️ Architecture & Flowchart

The workflow receives webhooks from Facebook Messenger, processes verification requests instantly, filters incoming user messages, queries the Google Sheets tool via an AI Agent, and responds back through Meta Graph API.

graph TD
    %% Nodes
    Meta[Facebook Messenger API] -->|GET Verification| Webhook[Webhook Node]
    Meta -->|POST Incoming Message| Webhook
    
    Webhook -->|GET Path| Respond[Respond to Webhook]
    Respond -->|hub.challenge| Meta

    Webhook -->|POST Path| EditFields[Edit Fields Node]
    EditFields -->|Extracted senderId & User Message| AIAgent[AI Agent]

    subgraph AI Subsystem
        Groq[Groq Chat Model] --- AIAgent
        Memory[Simple Memory] --- AIAgent
        GSheet[Google Sheets Tool] --- AIAgent
    end

    AIAgent -->|Generates Response| HTTP[HTTP Request Node]
    HTTP -->|Sends Response Payload| Meta


🧩 Workflow Breakdown

1. Webhook Integration (GET & POST)

GET Requests: Listens for Facebook Meta Verification challenge parameters (hub.mode, hub.challenge, hub.verify_token). Returns the challenge string directly via the Respond to Webhook node.

POST Requests: Captures live incoming user text messages and recipient PSIDs from Facebook Messenger.

2. Data Extraction (Edit Fields Node)

Extracts and normalizes the incoming payload fields:

senderId: The user's unique Facebook ID.

userMessage: The plain text message sent by the user.

3. AI Agent & Tools Integration

LLM Engine: Groq Chat Model (Groq Chat Model).

Conversation History: Simple Memory node to maintain context throughout the chat session.

Tool (Google Sheets): Searches and pulls up-to-date rows containing branch details (Dokki, Nasr City, Mohandessin), subscription plans, rules, and offers.

4. Response Delivery (HTTP Request Node)

Constructs a valid Graph API JSON payload and sends the text back to Messenger:

{
  "recipient": {
    "id": "{{ $('Edit Fields').item.json.senderId }}"
  },
  "messaging_type": "RESPONSE",
  "message": {
    "text": {{ JSON.stringify($json.output) }}
  }
}


📋 System Prompt Guidelines

The AI Agent follows a strict customer service prompt configured with the following logic:

Role & Tone: Welcoming, highly polite Arabic customer service voice with friendly emojis.

Clarification First: If gender (Men/Women) is not mentioned for schedules or pricing, it asks before querying the dataset.

Google Sheets Priority: Always fetches active offers, branch timings, and plan pricing directly from the connected sheet tool.

Out-of-Scope Safeguard: Politely declines non-gym queries and redirects users to gym subscriptions and information.

🛠️ Setup & Environment Variables

Requirements

n8n (Self-hosted or Cloud)

Groq API Key

Google Sheets API Credentials

Facebook Developer App with Messenger Product enabled

Page Access Token from Meta

Environment Configuration in n8n

Import the provided workflow JSON into your n8n workspace.

Connect your Groq API credential to the Groq Chat Model node.

Authenticate your Google Sheets account and link the designated document ID.

Set the HTTP Request node parameters:

URL: https://graph.facebook.com/v19.0/me/messages

Authentication: Access Token (Facebook Page Access Token)

📁 Repository Structure

.
├── DemoPhotos         # Main n8n Workflow Screenshots
├── README.md          # Project Documentation
├── Gym                # Production AI System 
└── policies.txt       # Gym Operational Policies and Data Schema


🤝 Support & Contribution

Feel free to open an issue or pull request if you want to contribute to enhancing prompt logic or adding new n8n tools!