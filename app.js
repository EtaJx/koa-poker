const request = require('request');
const cheerio = require('cheerio');
const koa = require('koa');
const app = new koa();
const AutoRouter = require('./lib/autoCreateRouter');

new AutoRouter({
  app
}).init()
// const getList = () => {
//   return new Promise((resolve, reject) => {
//     request({
//       url: 'https://www.xiaohongshu.com/explore',
//       headers: {
//         'User-Agent': 'request'
//       }
//     }, (err, response, body) => {
//       if (err) {
//         throw new Error(err);
//       }
//       if (response.statusCode === 200) {
//         const $ = cheerio.load(body);
//         let infos = $('div.note-info');
//         let infoArr = [];
//         infos.each(function () {
//           let infoObj = {
//             img: `https:${$(this).find('img').attr('src')}`,
//             title: $(this).find('h3').text()
//           };
//           infoArr.push(infoObj);
//         });
//         resolve(infoArr);
//       }
//     })
//   })
// }

// app.use(async ctx => {
//   const list = await getList();
//   console.log(list);
//   console.log(ctx.request);
//   ctx.body = list;
// })
app.listen(3000);
