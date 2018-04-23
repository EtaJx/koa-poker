const Router = require('koa-router');
const router = new Router();

router.get('/', (ctx, next) => {
  console.log('yes, this is index');
});

module.exports = router;