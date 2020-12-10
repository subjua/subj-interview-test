const Koa = require('koa');
const config = require('config');
const bodyParserMW = require('koa-bodyparser');

const router = require('./lib/routes');

const errorMiddleware = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.error(err);

    ctx.status = err.status || 500;
    ctx.set('Content-Type', 'application/json');

    return {
      success: false,
      error: err.message,
      data: null,
    };
  } finally {
    return {
      success: true,
      error: null,
      data: ctx.response.body,
    }
  }
};

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
    .use(errorMiddleware)
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
