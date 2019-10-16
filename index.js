const endpoint = 'https://script.google.com/macros/s/AKfycbxcnZJ9I1x97BA5rRndv3LzE-i7wGSKmt3KDizMz3CnouLGyDg/exec';
const express = require('express');
const get = require('./get');
const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', (request, response) => {
  get.data(endpoint)
    .then(html=>{
        response.render('index', {html});
        //response.send(html);
      })
    .catch(err=>console.log(err));
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});
