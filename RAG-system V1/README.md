<div align="center">
  <h1>Automated Document Ingestion & RAG Vector Pipeline</h1>
  <p><strong>An automated document ingestion and embedding pipeline powered by Google Drive Trigger, Hugging Face Embeddings, and Qdrant Vector DB in n8n.</strong></p>

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
  This project implements an automated Retrieval-Augmented Generation (RAG) data ingestion pipeline. Built using <strong>n8n</strong>, the workflow monitors a designated <strong>Google Drive</strong> folder for newly created files, automatically downloads them, extracts textual content via a <strong>Default Data Loader</strong>, generates dense vector representations using <strong>Hugging Face Inference Embeddings</strong>, and indexes the resulting vectors directly into a <strong>Qdrant Vector Database</strong>.
</p>

<h2 id="architecture">Architecture & Data Ingestion Flow</h2>
<p>The ingestion process runs fully asynchronously whenever a new document is detected in Google Drive:</p>

<pre><code>[ Google Drive (New File Created) ] 
                 │
                 ▼ (Google Drive Trigger)
          [ Download File ]
                 │
                 ▼
     [ Qdrant Vector Store ]
       ├──► [ Default Data Loader ] (Document Parsing & Text Extraction)
       └──► [ Embeddings HuggingFace Inference ] (Vector Generation)
                 │
                 ▼
    [ Stored Vectors in Qdrant ]
</code></pre>

<h2 id="key-features">Key Features</h2>
<ul>
  <li><strong>Automated Document Trigger:</strong> Real-time detection of newly added documents via <code>Google Drive Trigger (fileCreated)</code>.</li>
  <li><strong>Seamless File Downloading:</strong> Retrieves raw binary files directly from Google Cloud storage using the <code>Download file</code> node.</li>
  <li><strong>Document Parsing & Chunking:</strong> Processes incoming document formats into indexed text segments using n8n's <code>Default Data Loader</code>.</li>
  <li><strong>Hugging Face Vectorization:</strong> Uses Hugging Face inference models for generating high-dimensional embeddings.</li>
  <li><strong>Persistent Vector Storage:</strong> Upserts generated embeddings and associated document metadata directly into a <code>Qdrant Vector Store</code> instance.</li>
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
    <td><strong>Data Source Trigger</strong></td>
    <td>Google Drive API (fileCreated Trigger)</td>
  </tr>
  <tr>
    <td><strong>File Processing</strong></td>
    <td>n8n Google Drive Download Node</td>
  </tr>
  <tr>
    <td><strong>Document Loader</strong></td>
    <td>n8n Default Data Loader</td>
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
  <li>A connected <strong>Google Drive OAuth2</strong> account with access to the source folder.</li>
  <li>A valid <strong>Hugging Face API Token</strong> (Read access).</li>
  <li>An active <strong>Qdrant</strong> cluster URL and API Key (or self-hosted Qdrant Docker instance).</li>
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
      <li>Authenticate the <code>Google Drive Trigger</code> and <code>Download file</code> nodes with your Google Cloud credentials.</li>
      <li>Configure your Hugging Face API Token in the <code>Embeddings HuggingFace Inference</code> node.</li>
      <li>Set up host URL and collection name in the <code>Qdrant Vector Store</code> node.</li>
    </ul>
  </li>
  <li>
    <strong>Activate Automation:</strong>
    <p>Toggle the workflow switch to <strong>Active</strong>. Upload a PDF or text document to your Google Drive folder to test the automated vector ingestion pipeline.</p>
  </li>
</ol>

<h2>License</h2>
<p>This project is open-source and available under the <a href="LICENSE">MIT License</a>.</p>