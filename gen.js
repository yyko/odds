const moment = require('moment');


const convertToAttrs = function(h){
    var p, s;
    s = '';
    for (p in h){
      s += p + "='" + h[p] + "' ";
    }
    return s.trim();
  }

const wrapInTag = function(tag, h, s) {
  return "<" + tag + " " + convertToAttrs(h) + ">" + s + "</" + tag + ">";
};

const keys = h=>Object.keys(h);


const table = (xs)=>{
  const ps = keys(xs[0]);
  const headers = ps.map(x=>wrapInTag('th', {}, x)).join('');
  const headRow = wrapInTag('tr', {class:'tableizer-firstrow'}, headers);
  const thead = wrapInTag('thead', {}, headRow);
  const rows = xs.map(x=>wrapInTag('tr', {}, ps.map(p=>wrapInTag('td', {}, x[p])).join(''))).join('');
  const tbody = wrapInTag('tbody', {}, rows);
  const t = [thead, tbody].join('');
  const table = wrapInTag('table', {class:'table odds-table'}, t);
  return table;
}

const odds_block = (xs, iso8601d) =>{
  const tbl = table(xs);
  const p = wrapInTag('p', {}, '*Current odds Updated ' + moment(iso8601d).format(' MMMM Do, YYYY'));

  return wrapInTag('div', {class:'promo-table'}, [tbl, p].join(''));

}


exports.table = table;
exports.odds_block = odds_block