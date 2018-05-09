const request = require('request');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const koa = require('koa');
const app = new koa();
const AutoRouter = require('./lib/autoCreateRouter');
// const koaWebpackDevMiddleware = require('./lib/koaWebpackDevMiddleware.js');
const koaWebpack = require('koa-webpack');
const convert = require('express-to-koa');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const koaWebpackHotMiddleware = require('koa-webpack-hot-middleware');
const config = require('./config/webpack.config.js');
const compiler = webpack(config);

app.use(convert(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
})));
app.use(koaWebpackHotMiddleware(compiler, {
  publicPath: config.output.publicPath
}))
compiler.hooks.emit.tapAsync({
  name: 'createHtmlFile',
}, function (compilation, cb) {
  for (let filename in compilation.assets) {
    let filepath = path.resolve(__dirname, `./dist/${filename}`)
    let dirname = path.dirname(filepath)
    // console.lgo(fs.existsSync(dirname))
    // if (!fs.existsSync(dirname)) {
    // touch(filename)
    // }
    fs.writeFileSync(filepath, compilation.assets[filename].source())
  }
  cb();
});
// compiler.hooks('emit', function (compilation, cb) {
//   for (let filename in compilation.assets) {
//     if (filename.endsWith('.html')) {
//       let filepath = path.resolve(__dirname, filename)
//       let dirname = path.dirname(filepath)
//       if (!fs.existsSync(dirname)) {
//         mkdir('-p', dirname)
//       }
//       fs.writeFile(filepath, compilation.assets[filename].source())
//     }
//   }
//   cb();
// })
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
