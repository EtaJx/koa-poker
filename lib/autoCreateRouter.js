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
        let routerNames = fs.readdirSync(routerPath);
        const {app} = this.options;
        for (let name of routerNames) {
            try {
                let fileName = path.basename(name, '.js');
                console.log(fileName);
                let router = new Router({
                    prefix: `/${fileName}`
                });
                let tempRouterArr = fs.readFileSync(`${routerPath}/${name}`, 'utf8').match(/'([^']*)'/g);
                let routerArr = [];
                tempRouterArr.forEach((val) => {
                    if (val.indexOf('/') > 0) {
                        val = val.replace(/\'/g, '');
                        routerArr.push(val);
                    }
                });
                console.log(routerArr);
                router.use(routerArr);
                app.use(router.routes());
            } catch (err) {
                console.error(err);
            }
        }
    }
}
// new AutoCreateRouter({}).init()
module.exports = AutoCreateRouter;