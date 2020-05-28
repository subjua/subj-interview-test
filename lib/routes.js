const Router = require('koa-router');

const router = new Router();

router.get('/health', (ctx) => {
  return ctx.response.body = 'OK';
});

module.exports = router;
