const Router = require('koa-router');

const User = require('./models/users');
const oms = require('./services/oms');
const inventory = require('./services/inventory');

const router = new Router();

router.get('/health', (ctx) => {
  return ctx.response.body = 'OK';
});

router.get('/getUser', async (ctx) => {
  ctx.response.body = await User.findById(ctx.request.query.id);
  ctx.status = 200;
});

router.get('/createUser', async (ctx) => {
  ctx.response.body = await User.create(ctx.request.query);
  ctx.status = 200;
});

router.put('/updateUser', async (ctx) => {
  await User.update(ctx.request.body);
  ctx.status = 200;
});

router.get('/deleteUser', async (ctx) => {
  await User.delete(ctx.request.query.id);
  ctx.status = 200;
});

router.post('/orderWithInvoice', async (ctx) => {
  const orderData = ctx.request.body;

  const orderId = oms.order.create({
    ...orderData,
    status: 'new',
  });

  const invoiceId = oms.invoice.create(orderData);

  for (let { id, count } of orderData.products) {
    const product = await inventory.product.getById(id);

    await inventory.product.update({
      ...product,
      reserved: product.reserved + count
    });
  }

  oms.order.update({
    ...orderData,
    status: 'ready',
  });

  ctx.response.body = { orderId, invoiceId };
  ctx.status = 200;
});

module.exports = router;
