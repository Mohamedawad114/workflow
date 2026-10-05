# Meeting Scheduler Bot

A Telegram bot built with **n8n** that schedules 1-to-1 meetings for a business owner. Send a text or voice message, and an AI agent finds the employee, checks your calendar for conflicts, asks for confirmation, creates the Google Calendar event, and emails the employee.

## Features

- Text and **voice message** input (voice is transcribed with Groq Whisper)
- Employee lookup by name in MongoDB
- Future-date validation
- Calendar conflict detection before booking
- Confirmation step (Confirm / Edit / Cancel)
- Auto-generated meeting description if none is provided
- Creates a Google Calendar event with the employee as attendee (Google Meet optional)
- Sends the employee an email with the meeting details
- Per-chat conversation memory

## How It Works

```
Telegram Trigger
      │
      ▼
     If ── text ───────────────────────┐
      │                                │
    voice                              │
      ▼                                ▼
 Get a file → Fix name → Groq Whisper → AI Agent → Telegram reply
                                          │
        ┌───────────┬──────────┬──────────┼───────────┐
        ▼           ▼          ▼          ▼           ▼
   Groq Chat    Simple     MongoDB    Google       Gmail
     Model      Memory     (Find)     Calendar     (Send)
                                    (Get / Create)
```

## Tech Stack

| Part | Tool |
|---|---|
| Automation | n8n (self-hosted) |
| Chat interface | Telegram Bot |
| LLM | Groq (`llama-3.3-70b-versatile`) |
| Speech-to-text | Groq Whisper (`whisper-large-v3-turbo`) |
| Employee database | MongoDB |
| Calendar | Google Calendar |
| Email | Gmail |

## Setup

### 1. Prerequisites

- n8n running locally or on a server
- A Telegram bot token from [@BotFather](https://t.me/BotFather)
- A [Groq](https://console.groq.com) API key
- A MongoDB database with an `employees` collection
- Google OAuth credentials (Calendar + Gmail)

### 2. Employees collection

Each document should look like:

```json
{
  "role": "Developer",
  "name": "Ahmed Ali",
  "number": "+201000000000",
  "email": "ahmed@example.com"
}
```

### 3. Import the workflow

1. In n8n: **Workflows → Import from File** and select the workflow JSON.
2. Create the credentials and attach them to the nodes:
   - **Telegram API**
   - **Groq API** (Chat Model)
   - **Header/Bearer Auth** for the transcription request (`Bearer gsk_...`)
   - **MongoDB**
   - **Google Calendar OAuth2**
   - **Gmail OAuth2**

### 4. Configure key nodes

**Transcription (HTTP Request)**

- Method: `POST`
- URL: `https://api.groq.com/openai/v1/audio/transcriptions`
- Body Content Type: `Form-Data`
  - `file`: type **n8n Binary File**, field `data`
  - `model`: `whisper-large-v3-turbo`
  - `language`: `ar` or `en` (improves accuracy)

**Fix name (Code node)** — Telegram voice files use `.oga`, which Groq rejects:

```javascript
$input.item.binary.data.fileName = 'voice.ogg';
$input.item.binary.data.fileExtension = 'ogg';
$input.item.binary.data.mimeType = 'audio/ogg';
return $input.item;
```

**AI Agent**

- Prompt (User Message): `{{ $json.text || $json.message.text }}`
- System Message: the scheduler prompt (validation rules, response formats, tool usage)

**Simple Memory**

- Session ID: `{{ $('Telegram Trigger').item.json.message.chat.id }}`
- Context Window Length: `5`–`10`

### 5. Activate

Activate the workflow and message your bot on Telegram.

## Usage

Text or voice:

> Schedule a meeting with Ahmed Ali

The bot replies with the employee found and asks for any missing details. You can answer with:

```
Create a calendar event: Start 2026-10-12 10:00, End 2026-10-12 10:30,
Summary: Quick check-in with Ahmed Ali
```

The bot then shows a summary. Reply **Confirm** to create the event and send the email.

## Troubleshooting

| Problem | Fix |
|---|---|
| `file must be one of the following types` | Add the **Fix name** Code node before the HTTP request |
| `model is a required property` | Add the `model` field to the Form-Data body |
| `Request too large ... TPM` | Use a Groq model with a higher token limit, or shorten the system prompt |
| Prompt shows `undefined` | Use `{{ $json.text \|\| $json.message.text }}` |
| Agent doesn't call a tool | Make sure node names match the names used in the system prompt |

## Author

**Mohamed Awad** — Software Engineer
