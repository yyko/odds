const endpoint = 'https://script.google.com/macros/s/AKfycbxcnZJ9I1x97BA5rRndv3LzE-i7wGSKmt3KDizMz3CnouLGyDg/exec';
const axios = require('axios');
const gen = require('./gen');

const races = ()=>{
  const url = endpoint + '?q=races';
  return new Promise((resolve, reject)=>{
    axios.get(url)
      .then(res=>{
      resolve(res.data.data);
    })
    .catch(err=>reject(err));

  })
}

const race_data = (name) => {
  const url = endpoint + '?q=race&name=' + encodeURIComponent(name);
  return new Promise((resolve, reject)=>{
    axios.get(url)
      .then(res=>{
        const status = res.data.status;
        if (status == 'ok') {
          const table = res.data.data.table;
          const date = res.data.data.date;
          const html = gen.odds_block(table, date);
          resolve(html);
        } else {
          reject(res.data.data);
        }
       })
      .catch(err=>reject(err));

  })

}
exports.races = races;
exports.race_data = race_data;