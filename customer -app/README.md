<div align="center">
  <h1>Hotel Booking Customer Support AI Agent</h1>
  <p><strong>A headless AI Support Agent designed for React frontends, handling hotel reservation inquiries, cancellations, and policies via Webhook API.</strong></p>

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
  This project implements a backend AI customer support engine for hotel booking platforms. Built on <strong>n8n</strong>, the workflow operates headlessly via a <strong>Webhook Trigger (POST)</strong> to seamlessly integrate with custom frontend clients (such as <strong>React.js</strong>). The underlying <strong>AI Agent</strong> utilizes <strong>Groq Chat Model</strong> for fast inference, <strong>Simple Memory</strong> for managing active session conversations, and <strong>Tavily Search API</strong> for live external lookups.
</p>

<h2 id="architecture">Architecture & API Flow</h2>
<p>The client app sends HTTP POST requests directly to the n8n Webhook endpoint, which routes payload context to the AI Agent and streams back structured JSON responses to the React UI:</p>

<pre><code>[ Custom React.js Frontend Client ] 
                 │
                 ▼ (HTTP POST Request)
             [ Webhook ] 
                 │
                 ▼
          [ AI Agent Core ]
                 ├──► [ Groq Chat Model ] (Fast Inference Engine)
                 ├──► [ Simple Memory ] (In-Memory Session Context)
                 └──► [ Tavily HTTP Request Tool ] (Policy & Live Search)
                 │
                 ▼ (HTTP Response JSON)
[ Custom React.js Frontend Client ]
</code></pre>

<h2 id="key-features">Key Features</h2>
<ul>
  <li><strong>Headless Webhook Integration:</strong> Listens to HTTP POST requests via <code>Webhook</code> node, allowing flexible integration with React, Next.js, or mobile application frontends.</li>
  <li><strong>Hotel Customer Support Domain:</strong> Designed to answer FAQs regarding room availability, booking policies, check-in/out protocols, and cancellation terms.</li>
  <li><strong>Low-Latency AI Engine:</strong> Powered by Groq Chat Model for ultra-fast response delivery necessary for interactive web interfaces.</li>
  <li><strong>Session Context Management:</strong> Uses <code>Simple Memory</code> to maintain conversation continuity during multi-turn chat sessions.</li>
  <li><strong>Dynamic External Search:</strong> Integrates Tavily Search API via HTTP Request to fetch updated online info or external policy details when required.</li>
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
    <td><strong>API Interface</strong></td>
    <td>n8n Webhook Node (POST Endpoint)</td>
  </tr>
  <tr>
    <td><strong>Frontend Client</strong></td>
    <td>Custom React.js Application</td>
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
    <td><strong>Memory Management</strong></td>
    <td>Simple Memory</td>
  </tr>
  <tr>
    <td><strong>Web Search Tool</strong></td>
    <td>Tavily Search API (via HTTP Request Node)</td>
  </tr>
</table>

<h2 id="setup--installation">Setup & Configuration</h2>

<h3>Prerequisites</h3>
<ul>
  <li>An active <strong>n8n</strong> instance with a public URL or local tunnel (e.g., Ngrok).</li>
  <li>A valid <strong>Groq API Key</strong> for LLM inference.</li>
  <li>A valid <strong>Tavily Search API Key</strong> configured in the HTTP Request node.</li>
</ul>

<h3>Configuration Steps</h3>
<ol>
  <li>
    <strong>Import Workflow:</strong>
    <p>Import the JSON configuration file into your n8n workspace.</p>
  </li>
  <li>
    <strong>Configure Webhook Endpoint:</strong>
    <ul>
      <li>Open the <code>Webhook</code> node and set the HTTP Method to <code>POST</code>.</li>
      <li>Copy the generated <strong>Test URL</strong> / <strong>Production URL</strong>.</li>
    </ul>
  </li>
  <li>
    <strong>Set Up Credentials:</strong>
    <ul>
      <li>Add your Groq credentials into the <code>Groq Chat Model</code> node.</li>
      <li>Insert your Tavily API key inside the HTTP Request node targeting <code>https://api.tavily.com/search</code>.</li>
    </ul>
  </li>
  <li>
    <strong>Connect React Frontend:</strong>
    <p>In your React project, send a <code>POST</code> payload containing the user prompt and session details to the n8n Webhook URL:</p>
    <pre><code>fetch('YOUR_N8N_WEBHOOK_URL', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ chatInput: 'What is the cancellation policy?' })
});</code></pre>
  </li>
</ol>

<h2>License</h2>
<p>This project is open-source and available under the <a href="LICENSE">MIT License</a>.</p>