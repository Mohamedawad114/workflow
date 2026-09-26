<div align="center">
  <h1>AI Chatbot with Web Search & MongoDB Memory</h1>
  <p><strong>A hosted web chat interface powered by Groq, MongoDB Atlas Chat Memory, and Tavily Search API in n8n.</strong></p>

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
  This project implements an intelligent web-hosted AI Chatbot designed to provide real-time, context-aware assistance. Built using <strong>n8n</strong>, the system connects a native <strong>Chat Trigger</strong> interface to an <strong>AI Agent</strong> backed by <strong>Groq Chat Model</strong> for fast inference, <strong>Tavily Search API</strong> for live web information retrieval, and <strong>MongoDB Atlas Chat Memory</strong> for persistent chat history across user sessions.
</p>

<h2 id="architecture">Architecture & Workflow</h2>
<p>The workflow triggers directly via n8n's hosted chat interface, maintains long-term session context using MongoDB Atlas, and invokes web search on-demand when user queries require live data.</p>

<pre><code>[ Web Chat UI (Hosted Trigger) ] 
              │
              ▼
       [ AI Agent Core ]
              ├──► [ Groq Chat Model ] (Fast LLM Engine)
              ├──► [ MongoDB Chat Memory ] (Persistent Atlas Database)
              └──► [ Tavily HTTP Request Tool ] (Real-Time Web Search)
              │
              ▼
[ User Chat Response ]
</code></pre>

<h2 id="key-features">Key Features</h2>
<ul>
  <li><strong>Embedded Web Chat Interface:</strong> Uses n8n's native Chat Trigger for simple embedding into websites or direct hosted chat access.</li>
  <li><strong>Persistent Conversation Storage:</strong> Integrates MongoDB Atlas Chat Memory to store chat history and maintain long-term user context across sessions.</li>
  <li><strong>Real-Time Web Search:</strong> Equips the AI Agent with Tavily API via HTTP Request to pull up-to-date online information when needed.</li>
  <li><strong>High-Speed LLM Processing:</strong> Powered by Groq API for rapid context generation and low-latency response delivery.</li>
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
    <td><strong>Database Memory</strong></td>
    <td>MongoDB Atlas (MongoDB Chat Memory Node)</td>
  </tr>
  <tr>
    <td><strong>Web Search Tool</strong></td>
    <td>Tavily Search API (via HTTP Request)</td>
  </tr>
  <tr>
    <td><strong>User Interface</strong></td>
    <td>n8n Hosted Chat Trigger (n8n Chat Interface)</td>
  </tr>
</table>

<h2 id="setup--installation">Setup & Configuration</h2>

<h3>Prerequisites</h3>
<ul>
  <li>An active <strong>n8n</strong> instance.</li>
  <li>A <strong>MongoDB Atlas</strong> cluster & connection string URI.</li>
  <li><strong>Groq API Key</strong> for LLM inference.</li>
  <li><strong>Tavily Search API Key</strong> configured in the HTTP Request tool.</li>
</ul>

<h3>Configuration Steps</h3>
<ol>
  <li>
    <strong>Import Workflow:</strong>
    <p>Import the JSON configuration file into your n8n workspace.</p>
  </li>
  <li>
    <strong>Configure Credentials:</strong>
    <ul>
      <li>Set up your <strong>MongoDB Atlas</strong> connection details in the <code>MongoDB Chat Memory</code> node (database name & collection name).</li>
      <li>Configure your <strong>Groq API</strong> key inside the <code>Groq Chat Model</code> node.</li>
      <li>Set up your <strong>Tavily API Key</strong> inside the HTTP Request node targeting <code>https://api.tavily.com/search</code>.</li>
    </ul>
  </li>
  <li>
    <strong>Test & Embed:</strong>
    <p>Open the chat UI directly via the <code>When chat message...</code> trigger URL or embed the widget into your frontend web application.</p>
  </li>
</ol>

<h2>License</h2>
<p>This project is open-source and available under the <a href="LICENSE">MIT License</a>.</p>