const koa = require('koa');
const app = new koa();

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log('er')
  ctx.set('X-Response-Time', `${ms}ms`)
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  console.log('yi')
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

app.use(async ctx => {
  console.log('san')
  ctx.body = 'Hello World';
})

app.listen(3000);