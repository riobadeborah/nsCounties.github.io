const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3005;

// Load environment variables from a .env file (make sure to add .env to your .gitignore)
require('dotenv').config();

const jsonBinUrl = 'https://api.jsonbin.io/v3/b/657a1b59266cfc3fde6873a9/latest';
const masterKey = process.env.JSONBIN_MASTER_KEY;

app.use(express.json());

// Middleware to check if the master key is provided in the request headers
const checkMasterKey = (req, res, next) => {
  const providedKey = req.headers['x-master-key'];

  if (!providedKey || providedKey !== masterKey) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  next();
};

// Endpoint to get all counties using the JSONBin API
app.get('/counties', checkMasterKey, async (req, res) => {
  try {
    const response = await fetch(jsonBinUrl, {
      headers: {
        'X-Master-Key': masterKey,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get details of a specific county by name using the JSONBin API
app.get('/counties/:name', checkMasterKey, async (req, res) => {
  const countyName = req.params.name;

  try {
    const response = await fetch(`${jsonBinUrl}/${countyName}`, {
      headers: {
        'X-Master-Key': masterKey,
      },
    });

    if (response.ok) {
      const data = await response.json();
      res.json(data);
    } else {
      res.status(response.status).json({ error: 'County not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on https://api.jsonbin.io/v3/b/657a1b59266cfc3fde6873a9/latest`);
});
