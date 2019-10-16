const axios = require('axios');
const gen = require('./gen');

const data = (endpoint)=>{
   return new Promise((resolve, reject)=>{
    axios.get(endpoint)
      .then(res=>{
      const tables_map = res.data.tables_map;
      const update_map = res.data.update_map;
      let html = '';
      for(var table_name in tables_map){
        let xs = tables_map[table_name];
        let d = update_map[table_name];
        html += table_name + gen.odds_block(xs, d);
        };
      resolve(html); 
      })
      .catch(err=>reject(err));
   
  })
}


exports.data = data;
