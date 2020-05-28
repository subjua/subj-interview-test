const Koa = require('koa');
const config = require('config');
const bodyParserMW = require('koa-bodyparser');

const router = require('./lib/routes');

const logMiddleware = async (ctx, next) => {
  const start = Date.now();

  await next();

  console.debug('Koa handle request', {
    method: ctx.request.method,
    url: ctx.request.url,
    http_status: ctx.response.status,
    duration: Date.now() - start,
  })
};

async function start() {
  const app = new Koa();

  app
    .use(logMiddleware)
    .use(bodyParserMW())
    .use(router.allowedMethods())
    .use(router.routes())
    .listen(config.get('port'));

  console.log(`Server start done: http://${config.get('host')}:${config.get('port')}`);
}

start()
  .catch(error => {
    console.error('Server start failed: ', error);

    process.exit(1);
  });

process.on('uncaughtException', (error) => {
  console.error('Server process uncaught exception: ', error)
});
