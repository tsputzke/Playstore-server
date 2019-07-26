const express = require('express');
const morgan = require('morgan');
const playstoreApps = require('./playstore-data');

const app = express();

app.use(morgan('common'));

app.get('/playstoreApps', (req, res) => {
  const {sort, genres} = req.query;

  if(sort) {
    if(!['rating', 'app'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must either be rating or app')
    }
  }

  if(genres) {
    if(!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genres)) {
      return res
        .status(400)
        .send('Genres must be one of the following: Action, Puzzle, Strategy, Casual, Arcade, Card')
    }
  }

  let results = playstoreApps
    .filter(app =>
      app
        .Genres
        .toLowerCase()
        .includes(genres.toLowerCase())
    );

  if(sort) {
    results
      .sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    }); 
  }  

  res 
    .json(results);
})

app.listen(8000, () => {
  console.log('Server started on PORT 8000')
});