const express = require('express');
const tools = require('./tools');

// load exchange rate before Server start
var exchangeRate = [];
loadExc();

// On Init.
const PORT = process.env.PORT || 8686;
const app = express();
app.listen(PORT, () => { console.log('Node.js Server ON') });

// Routing - 路由
app.set('view engine', 'ejs');
app.get('/', (request, response) => { response.render('home', { exchangeRate : exchangeRate }); });

async function loadExc()
{
	tools.loadExchangeRate(function(data){
		exchangeRate = data;
		console.log(`[server.js] Load ${exchangeRate.length} exchange rate data.`);
	});

	// Daily get new data
	setTimeout(loadExc, 24 * 60 * 60 * 1000);
}