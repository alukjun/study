// 导入koa（导入的其实是一个class需要大写）
const Koa = require('koa');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

// 引入request body解析器
const bodyParser = require('koa-bodyparser');

const fs = require('fs');

const controller = require('./controller');

// 创建一个Koa对象
const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// parse request body
app.use(bodyParser());

// add controllers
app.use(controller());

app.listen(3000);

console.log('app started at port 3000...');