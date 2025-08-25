# File Upload API Integration Guide

This server exposes a `/upload` endpoint for file uploads, which stores files and returns a public URL for access.

## Prerequisites

- **Node.js** v18 or newer
- **npm** (or compatible package manager)
- Environment variables:
  - `BOT_TOKEN` (Telegram Bot Token)
  - `PORT` (optional; defaults to 3000)
- Packages used:
  - `express`
  - `multer`
  - `node-fetch`
  - `dotenv`

Install requirements:
```bash
npm install express multer node-fetch dotenv
```

## Endpoint: `/upload`

- **Method:** `POST`
- **Form field:** `file` (single file upload)
- **Response:** JSON with `url` and `fileSize`

### Example Request (Frontend)

You can use a simple HTML form:
```html
<form id="uploadForm" enctype="multipart/form-data">
  <input type="file" name="file" />
  <button type="submit">Upload</button>
</form>
<script>
document.getElementById('uploadForm').onsubmit = async function(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const response = await fetch('/upload', {
    method: 'POST',
    body: formData
  });
  const result = await response.json();
  if (result.url) {
    alert('File uploaded: ' + result.url);
  } else {
    alert('Error: ' + (result.error || 'Unknown'));
  }
};
</script>
```

Or use JavaScript directly:
```js
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', async (e) => {
  const formData = new FormData();
  formData.append('file', e.target.files[0]);
  const res = await fetch('/upload', { method: 'POST', body: formData });
  const data = await res.json();
  console.log(data.url); // Public URL to the uploaded file
});
```

### Example Usage (Other Node.js Projects)

You can use `node-fetch` or `axios` to interact with the endpoint:

```js
import fetch from 'node-fetch';
import fs from 'fs';

async function uploadFile(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const formData = new FormData();
  formData.append('file', fileStream);

  const res = await fetch('http://localhost:3000/upload', {
    method: 'POST',
    body: formData
  });
  const result = await res.json();
  console.log(result.url); // Uploaded file public URL
}

uploadFile('./path/to/your/file.jpg');
```

For CommonJS:
```js
const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

const form = new FormData();
form.append('file', fs.createReadStream('./yourfile.png'));

fetch('http://localhost:3000/upload', { method: 'POST', body: form })
  .then(res => res.json())
  .then(console.log);
```

## Error Handling

- If no file is uploaded: `{ error: "no file uploaded" }`
- If upload fails: `{ error: "upload failed >_<" }`
- For file retrieval errors: `{ error: "file not found" }`

## File Retrieval

After upload, the response contains a public URL (e.g., `/files/{id}`) for accessing the uploaded file. You can use this URL to display or download the file in your application.

---

