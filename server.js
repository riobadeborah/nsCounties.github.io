const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 443;

// Sample data
let counties = [
  {
    "name": "Halifax",
    "population": 480523,
    "coordinates": {
      "latitude": 44.6488,
      "longitude": -63.5752
    }
  },
  {
    "name": "Colchester",
    "population": 53178,
    "coordinates": {
      "latitude": 45.3695,
      "longitude": -63.1335
    }
  },
  {
    "name": "Hants",
    "population": 44535,
    "coordinates": {
      "latitude": 45.0708,
      "longitude": -64.1869
    }
  },
  {
    "name": "Kings",
    "population": 64479,
    "coordinates": {
      "latitude": 45.0967,
      "longitude": -64.7232
    }
  },
  {
    "name": "Lunenburg",
    "population": 49770,
    "coordinates": {
      "latitude": 44.3728,
      "longitude": -64.3179
    }
  },
  {
    "name": "Cumberland",
    "population": 30803,
    "coordinates": {
      "latitude": 45.8261,
      "longitude": -64.1208
    }
  },
  {
    "name": "Pictou",
    "population": 45087,
    "coordinates": {
      "latitude": 45.8083,
      "longitude": -62.5541
    }
  },
  {
    "name": "Annapolis",
    "population": 22694,
    "coordinates": {
      "latitude": 44.5924,
      "longitude": -65.4208
    }
  },
  {
    "name": "Queens",
    "population": 10589,
    "coordinates": {
      "latitude": 44.0515,
      "longitude": -64.6868
    }
  },
  {
    "name": "Guysborough",
    "population": 7463,
    "coordinates": {
      "latitude": 44.4333,
      "longitude": -64.5992
    }
  },
  {
    "name": "Antigonish",
    "population": 20629,
    "coordinates": {
      "latitude": 45.6168,
      "longitude": -61.9985
    }
  },
  {
    "name": "Richmond",
    "population": 9155,
    "coordinates": {
      "latitude": 44.6599,
      "longitude": -63.5924
    }
  },
  {
    "name": "Inverness",
    "population": 17616,
    "coordinates": {
      "latitude": 45.9561,
      "longitude": -61.3096
    }
  },
  {
    "name": "Victoria",
    "population": 7147,
    "coordinates": {
      "latitude": 46.4070,
      "longitude": -60.4753
    }
  },
  {
    "name": "Shelburn",
    "population": 14032,
    "coordinates": {
      "latitude": 43.7580,
      "longitude": -65.3208
    }
  },
  {
    "name": "Yarmouth",
    "population": 25325,
    "coordinates": {
      "latitude": 43.8374,
      "longitude": -66.1173
    }
  },
  {
    "name": "Digby",
    "population": 17892,
    "coordinates": {
      "latitude": 44.6215,
      "longitude": -65.7575}
    }
 
];

app.use(bodyParser.json());

// GET all counties
app.get('/counties', (req, res) => {
  res.json(counties);
});

// GET details of a specific county
app.get('/counties/:name', (req, res) => {
  const countyName = req.params.name;
  const county = counties.find(c => c.name === countyName);

  if (county) {
    res.json(county);
  } else {
    res.status(404).json({ error: 'County not found' });
  }
});

// POST to insert a new county
app.post('/counties', (req, res) => {
  const newCounty = req.body;

  if (newCounty.name && newCounty.population && newCounty.coordinates) {
    counties.push(newCounty);
    res.status(201).json(newCounty);
  } else {
    res.status(400).json({ error: 'Invalid county data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
