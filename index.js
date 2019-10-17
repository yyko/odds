const express = require('express');
const get = require('./get');
const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', (request, response) => {
  get.races()
    .then(races=>{
      response.render('index', {races});
    })
    .catch(err=>response.send(err));
  });


app.get('/race', (request, response) =>{
  const q = request.query;
  if (q.name) {
    get.race_data(q.name)
      .then(html=>{
        response.render('race', {name:q.name, html});
      })
      .catch(err=>response.send(err));
  }
});


app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});