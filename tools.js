module.exports = {
	loadExchangeRate: function (updateBack) {
		// load exchange rate
		var request = require("request");
		var cheerio = require("cheerio");

		// 臺灣銀行牌告匯率
		var url = "https://rate.bot.com.tw/xrt?Lang=zh-TW";
		
		// 取得網頁資料
		var exchangeRate = [];
		request(
			url, 
			function (error, response, body){
				if (error) {
					console.log('Get Exchange Error: ' + error);
					return;
				}

				// 用 cheerio 解析 html 資料, 轉成 1 NT$ = x 外幣$
				exchangeRate = [{curr: '新台幣 (NTD)', rate: 1.0}];
				var $ = cheerio.load(body);
				$('table[title="牌告匯率"] tbody tr').map((idx, elm) => {
					var curr = $(elm).find('td[data-table="幣別"]').find('div.xrt-cur-indent').text().trim();
					var excr = $(elm).find('td[data-table="本行現金賣出"]').eq(0).text().trim();
					try{
						exchangeRate.push({
							curr: curr,
							rate: (1.0 / eval(excr))
						});
					}catch(e){
						console.error(`Parsing exchange rate fail: ${curr} :: ${excr}`);
					}
				});
				console.log(`[refreshEx.js] Load ${exchangeRate.length} exchange rate data.`);
				updateBack(exchangeRate);
			}
		);

		return Promise.resolve('done');
	}
};
