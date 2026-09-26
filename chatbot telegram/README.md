<div align="center">
  <h1>Telegram AI Agent with Web Search & Memory</h1>
  <p><strong>A conversational Telegram Bot powered by Groq, Tavily Search API, and Simple Memory orchestration in n8n.</strong></p>

  <p>
    <a href="#overview"><b>Overview</b></a> •
    <a href="#architecture"><b>Architecture</b></a> •
    <a href="#key-features"><b>Key Features</b></a> •
    <a href="#tech-stack"><b>Tech Stack</b></a> •
    <a href="#setup--installation"><b>Setup</b></a>
  </p>
</div>

<hr />

<h2 id="overview">Overview</h2>
<p>
  This project implements an intelligent, real-time Telegram Bot capable of answering user queries using up-to-date web data. Built on top of <strong>n8n</strong>, the workflow integrates an <strong>AI Agent</strong> connected to <strong>Groq Chat Model</strong> for fast LLM inference, <strong>Tavily Search API</strong> (via HTTP Request Tool) for live web research, and <strong>Simple Memory</strong> to retain context across multi-turn conversations.
</p>

<h2 id="architecture">Architecture & Workflow</h2>
<p>The workflow triggers automatically upon receiving a Telegram message, routes the query through the AI Agent to determine if web search is necessary, maintains conversational state, and responds back to the user on Telegram.</p>

<pre><code>[ Telegram User ] 
       │
       ▼ (Telegram Trigger)
  [ AI Agent Core ]
       ├──► [ Groq Chat Model ] (Inference Engine)
       ├──► [ Simple Memory ] (Context Retention)
       └──► [ Tavily HTTP Request Tool ] (Real-Time Web Search)
       │
       ▼ (Send Text Message)
[ Telegram User ]
</code></pre>

<h2 id="key-features">Key Features</h2>
<ul>
  <li><strong>Real-Time Web Search:</strong> Integrates Tavily Search API as a dynamic tool for fetching live information beyond the LLM's knowledge cutoff.</li>
  <li><strong>High-Speed LLM Inference:</strong> Utilizes Groq for near-instant response generation.</li>
  <li><strong>Conversational Memory:</strong> Features <code>Simple Memory</code> node to hold contextual chat history for natural multi-turn discussions.</li>
  <li><strong>Automated Telegram Integration:</strong> Listens to incoming webhook updates via <code>Telegram Trigger</code> and streams finalized responses back through <code>Send a text message</code>.</li>
</ul>

<h2 id="tech-stack">Tech Stack</h2>
<table>
  <tr>
    <th>Component</th>
    <th>Technology / Tool</th>
  </tr>
  <tr>
    <td><strong>Orchestration Platform</strong></td>
    <td>n8n</td>
  </tr>
  <tr>
    <td><strong>Core Agent Engine</strong></td>
    <td>n8n AI Agent</td>
  </tr>
  <tr>
    <td><strong>LLM Provider</strong></td>
    <td>Groq Chat Model</td>
  </tr>
  <tr>
    <td><strong>Web Search Tool</strong></td>
    <td>Tavily Search API (via HTTP Request)</td>
  </tr>
  <tr>
    <td><strong>State / Memory</strong></td>
    <td>Simple Memory</td>
  </tr>
  <tr>
    <td><strong>Messaging Interface</strong></td>
    <td>Telegram Bot API (via BotFather)</td>
  </tr>
</table>

<h2 id="setup--installation">Setup & Configuration</h2>

<h3>Prerequisites</h3>
<ul>
  <li>An active <strong>n8n</strong> instance.</li>
  <li><strong>Telegram Bot Token</strong> obtained from <code>@BotFather</code>.</li>
  <li><strong>Groq API Key</strong> for fast LLM response generation.</li>
  <li><strong>Tavily Search API Key</strong> configured in the HTTP Request tool.</li>
</ul>

<h3>Configuration Steps</h3>
<ol>
  <li>
    <strong>Import Workflow:</strong>
    <p>Import the JSON configuration file into your n8n workspace.</p>
  </li>
  <li>
    <strong>Set Up Credentials:</strong>
    <ul>
      <li>Configure your <code>Telegram Trigger</code> and <code>Send a text message</code> nodes with your Telegram Bot credentials.</li>
      <li>Set up the <code>Groq Chat Model</code> node credentials.</li>
      <li>Ensure the HTTP Request node targeting <code>https://api.tavily.com/search</code> includes your Tavily API Key in the payload/headers.</li>
    </ul>
  </li>
  <li>
    <strong>Activate Workflow:</strong>
    <p>Toggle the workflow switch to <strong>Active</strong> to begin listening for incoming Telegram interactions.</p>
  </li>
</ol>

<h2>License</h2>
<p>This project is open-source and available under the <a href="LICENSE">MIT License</a>.</p>