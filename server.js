const express = require('express');
const tools = require('./tools');

// load exchange rate before Server start
// exchangeRate = {
//   curr: '幣別名稱',
//   rate: curr/NT (curr 1 元可以換多少台幣)
// }
var exchangeRate = [];
loadExc();

// On Init.
const PORT = process.env.PORT || 8686;
const app = express();
app.listen(PORT, () => { console.log('Node.js Server ON') });

// Routing - 路由
app.set('view engine', 'ejs');
app.get('/', (request, response) => { response.render('home', { exchangeRate : exchangeRate }); });

function loadExc()
{
	tools.loadExchangeRate_ANUE(function(data){
		exchangeRate = data;
		console.log(`[server.js] Load ${exchangeRate.length} exchange rate data.`);
	});

	// Daily get new data
	setTimeout(loadExc, 24 * 60 * 60 * 1000);
}