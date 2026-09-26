<div align="center">
  <h1>Automated RAG Ingestion Pipeline v2 (Deduplicated Data Sync)</h1>
  <p><strong>An incremental document processing pipeline featuring Google Drive synchronization, deduplication tracking via Google Sheets, and Qdrant Vector DB indexing in n8n.</strong></p>

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
  <strong>Version 2</strong> improves upon the initial RAG pipeline by introducing <strong>idempotent, deduplicated document ingestion</strong>. Built with <strong>n8n</strong>, the workflow executes on a scheduled hourly cron job or manual trigger, compares Google Drive files against an inventory tracking sheet in <strong>Google Sheets</strong> using custom JavaScript logic, appends new file logs, and processes only unsynced documents into <strong>Qdrant Vector Database</strong> via <strong>Hugging Face Embeddings</strong> and batch looping.
</p>

<h2 id="architecture">Architecture & Execution Flow</h2>
<p>The workflow routes drive contents and existing sheet records into a comparison script to ensure zero duplicate vector embeddings:</p>

<pre><code>[ Schedule Trigger (Hourly) / Manual Exec ]
               │
       ┌───────┴───────────────────────┐
       ▼                               ▼
[ Search files & folders ]   [ Get row(s) in sheet ]
       │                               │
       └───────────────┬───────────────┘
                       ▼
                 [ Merge Node ]
                       │
                       ▼
            [ Code Node (JS Logic) ]  <--- (Filters out already ingested File IDs)
                       │
                       ▼
             [ Append row in sheet ]  <--- (Logs newly discovered files)
                       │
                       ▼
               [ Download file ]
                       │
                       ▼
            [ Loop Over Items Node ]
                       │
                       ▼
            [ Qdrant Vector Store ]
              ├──► [ Default Data Loader ] (Chunking & Parsing)
              └──► [ Embeddings HuggingFace ] (Dense Vector Generation)
</code></pre>

<h2 id="key-features">Key Features</h2>
<ul>
  <li><strong>Dual Trigger Modes:</strong> Supports both manual execution for bulk imports and automated hourly cron runs via <code>Schedule Trigger</code>.</li>
  <li><strong>Stateful Deduplication:</strong> Queries <strong>Google Sheets</strong> to build an inventory of previously processed <code>fileId</code> records, preventing duplicate vector embeddings.</li>
  <li><strong>Custom JavaScript Sync Filtering:</strong> Executes null-safe set matching in the <code>Code in JavaScript</code> node to isolate strictly unsynced files.</li>
  <li><strong>Audit Logging:</strong> Logs newly processed document names and IDs into Google Sheets using <code>Append row in sheet</code> for real-time visibility.</li>
  <li><strong>Batch Document Chunking:</strong> Processes downloaded documents safely item-by-item through the <code>Loop Over Items</code> node to manage vector database ingestion smoothly.</li>
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
    <td><strong>Scheduling & Triggers</strong></td>
    <td>Schedule Trigger, Manual Workflow Trigger</td>
  </tr>
  <tr>
    <td><strong>Storage & Synchronization</strong></td>
    <td>Google Drive API, Google Sheets API</td>
  </tr>
  <tr>
    <td><strong>Deduplication Engine</strong></td>
    <td>n8n Code Node (JavaScript / Node.js)</td>
  </tr>
  <tr>
    <td><strong>Batch Processing</strong></td>
    <td>n8n Loop Over Items Node</td>
  </tr>
  <tr>
    <td><strong>Embeddings Engine</strong></td>
    <td>Hugging Face Inference Embeddings API</td>
  </tr>
  <tr>
    <td><strong>Vector Database</strong></td>
    <td>Qdrant Vector Store</td>
  </tr>
</table>

<h2 id="setup--installation">Setup & Configuration</h2>

<h3>Prerequisites</h3>
<ul>
  <li>An active <strong>n8n</strong> instance.</li>
  <li>Google Workspace service/OAuth2 credentials with <strong>Google Drive</strong> and <strong>Google Sheets</strong> API access.</li>
  <li>A Google Sheet configured with headers (e.g., <code>file_Name</code>, <code>fileId</code>).</li>
  <li>Valid credentials for <strong>Hugging Face API</strong> and an active <strong>Qdrant Vector Store</strong> instance.</li>
</ul>

<h3>Configuration Steps</h3>
<ol>
  <li>
    <strong>Import Workflow:</strong>
    <p>Import the JSON file for pipeline v2 into your n8n workspace.</p>
  </li>
  <li>
    <strong>Configure Node Properties:</strong>
    <ul>
      <li>Set the target folder ID in the <code>Search files and folders</code> node.</li>
      <li>Link the inventory tracking document in <code>Get row(s) in sheet</code> and <code>Append row in sheet</code>.</li>
      <li>Verify that node names inside the <code>Code in JavaScript</code> node match your canvas labels (e.g., <code>Get row(s) in sheet</code> and <code>Search files and folders</code>).</li>
      <li>Configure Qdrant database host parameters and Hugging Face model endpoints.</li>
    </ul>
  </li>
  <li>
    <strong>Activate Automation:</strong>
    <p>Enable the workflow to execute every hour, or click <strong>Execute Workflow</strong> to run a manual sync cycle.</p>
  </li>
</ol>

<h2>License</h2>
<p>This project is open-source and available under the <a href="LICENSE">MIT License</a>.</p>