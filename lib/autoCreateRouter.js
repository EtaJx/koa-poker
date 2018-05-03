const path = require('path');
const fs = require('fs');
const rootPath = path.join(__dirname, '..');
const routerPath = path.join(rootPath, '/routers');
const Router = require('koa-router');

class AutoCreateRouter {
  constructor (options) {
    this.options = options;
  }
  init () {
    console.log('filename', __filename);
    let routerNames = fs.readdirSync(routerPath);
    const {app} = this.options;
    for (let name of routerNames) {
      try {
        let router = require(`${routerPath}/${name}`)
        app.use(router.routes());
      } catch (err) {
        console.error(err);
      }
    }
  }
}
// new AutoCreateRouter({}).init()
module.exports = AutoCreateRouter;
