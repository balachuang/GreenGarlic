# GreenGarlic

我的 Node.js 練習 - 滙率轉換器
綠蒜頭 --> 蒜會綠 --> 算滙率

## Info
- host on Render.com
  - url: https://greengarlic.onrender.com
- Node.js plugins:
  - npm install cheerio
  - npm install request
- Data Source:
  - 臺灣銀行牌告匯率
  - url: https://rate.bot.com.tw/xrt?Lang=zh-TW

## Render.com Steps:
1. Signin Render.com
2. Create Project
3. Create Service --> WEB SERVICE
4. credentials --> balachuang --> configure in GitHub --> select GreenGarlic
5. select GitHub path: balachuang \ GreenGarlic
6. install command: npm install
7. deploy command: node server.js

## Reference:
- ejs: https://hsuchihting.github.io/node/20221023/3934524839/
- 抓網頁: https://blog.gtwang.org/programming/scraping-the-web-with-nodejs/
