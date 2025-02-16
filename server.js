const express = require('express');

// load exchange rate
var exchangeRate = [];
loadExc();

// On Init.
const PORT = process.env.PORT || 8686;
const app = express();
app.listen(PORT, () => { console.log('Node.js Server ON') });

// Routing - 路由
app.set('view engine', 'ejs');
app.get('/', (request, response) => {
	console.log(exchangeRate);
	response.render('home', { exchangeRate : exchangeRate });
});
app.get('/hello', (request, response) => {
	// 叫 express 去 render views 底下叫做 hello 的檔案，副檔名可省略
	response.render('hello');
})

function loadExc()
{
	// load exchange rate
	var request = require("request");
	var cheerio = require("cheerio");

	// 臺灣銀行牌告匯率
	var url = "https://rate.bot.com.tw/xrt?Lang=zh-TW";
	
	// 取得網頁資料
	request(url, function (error, response, body)
	{
		if (error) {
			console.log('Get Exchange Error: ' + error);
			return;
		}

		// 用 cheerio 解析 html 資料
		var $ = cheerio.load(body);
		$('table[title="牌告匯率"] tr').map((idx, elm) => {
			var curr = $(elm).find('td[data-table="幣別"]').find('div.xrt-cur-indent').text().trim();
			var excr = $(elm).find('td[data-table="本行現金賣出"]').eq(0).text().trim();
			if (excr != '-') exchangeRate.push({
				curr: curr,
				rate: eval(excr)
			});
			// console.log('load: ' + curr + ' :: ' + excr);
		});
	});
}