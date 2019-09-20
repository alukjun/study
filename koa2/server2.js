const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');

// one路由
let oneRouter = new Router();

oneRouter.get('/', async(ctx, next) => {
    ctx.body = '你好，我这里是oneRouter页'
})

// two路由
let twoRouter = new Router();

twoRouter.get('/', async(ctx, next) => {
    ctx.body = '你好, 我这里是twoRouter页'
}).get('/home', async(ctx, next) => {
    ctx.body = '你好, 我这里是home页'
})

// 装载所有子路由

let indexRouter = new Router();

indexRouter.use('/one', oneRouter.routes(), oneRouter.allowedMethods());
indexRouter.use('/two', twoRouter.routes(), twoRouter.allowedMethods());

app.use(indexRouter.routes()).use(indexRouter.allowedMethods());

app.listen('4545', () => {
    console.log('server is running at http://localhost:4545');
});