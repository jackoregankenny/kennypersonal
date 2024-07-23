const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

async function fetchResources() {
  const apiUrl = process.env.NOCODB_API_URL;
  const apiKey = process.env.NOCODB_API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error('NocoDB API URL or API Key is not set');
  }

  const response = await fetch(apiUrl, {
    headers: {
      'xc-auth': apiKey,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch resources');
  }

  const data = await response.json();
  const resources = data.map((item) => ({
    id: item.id,
    title: item.title,
    url: item.url,
    tag: item.tag,
    description: item.description,
  }));

  const outputPath = path.join(__dirname, '../public/resources-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(resources, null, 2));
  console.log('Resources data fetched and saved successfully');
}

fetchResources().catch(console.error);