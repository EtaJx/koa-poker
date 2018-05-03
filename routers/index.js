const path = require('path');
const fs = require('fs');
const Router = require('koa-router');
const router = new Router({
  prefix: `/${path.basename(__filename, '.js')}`
});

router.get('/', (ctx, next) => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('../dist/index.html');
});

module.exports = router;
