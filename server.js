const express = require('express');
const app = express();
const fs = require('fs');

const counties = require('./counties.json');

// Endpoint to get all counties
app.get('/counties', (req, res) => {
  res.json(counties);
});

// Endpoint to get details of a specific county by name
app.get('/counties/:name', (req, res) => {
  const countyName = req.params.name;
  const county = counties.find((county) => county.name === countyName);

  if (county) {
    res.json(county);
  } else {
    res.status(404).json({ error: 'County not found' });
  }
});

// Endpoint to update the details of a specific county by name
app.post('/counties/:name', (req, res) => {
  const countyName = req.params.name;
  const updatedCounty = req.body;

  const index = counties.findIndex((county) => county.name === countyName);

  if (index !== -1) {
    counties[index] = updatedCounty;
    res.json({ message: 'County updated successfully' });
  } else {
    res.status(404).json({ error: 'County not found' });
  }
});

const port = 3005;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
