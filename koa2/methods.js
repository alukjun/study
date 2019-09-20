const Koa = require('koa')
const app = new Koa()
    // const Router = require('koa-router')
import Router from 'koa-router';
const router = new Router()


const bodyParser = require('koa-bodyparser');
app.use(bodyParser()); // 解析request的body

router.get('/data/:id', async(ctx, next) => {
    let url = ctx.url;

    // let data = ctx.request.query;
    // let dataQueryString = ctx.request.querystring;

    // ctx.body = {
    //     url,
    //     data,
    //     dataQueryString
    // }
    let data = ctx.params;
    ctx.body = {
        data,
        status: 200,
    };
})

router.get('/post', async(ctx, next) => {
    // 模拟一段提交页面
    let html = `
        <form action="/post/result" method="post">
            <p>你长的最像哪位明星</p>
            <input name="name" type="text" placeholder="请输入名字：" />
            <br/>
            <p>输入一段你知道的车牌号</p>
            <input name="num" type="text" placeholder="请输入车牌号：" />
            <br/>
            <input type="submit" value="确定不改了哦"/>
        </form>`
    ctx.body = html;
})

router.post('/post/result', async(ctx, next) => {
    // 我们可以从ctx的request.body拿到提交上来的数据
    let { name, num } = ctx.request.body;

    if (name && num) {
        ctx.body = `hello，你最像的明星是:${name},ch你知道的车牌号是:${num}`;
        ctx.cookies.set('xungeer', num, {
            domain: 'localhost', // 写cookie所在的域名
            path: '/post/result', // 写cookie所在的路径
            maxAge: 10 * 60 * 1000, // cookie有效时长
            expires: new Date('201-05-10'), // cookie失效时间
            httpOnly: false, // 是否只用于http请求中获取
            overwrite: false // 是否允许重写
        })
    } else {
        ctx.body = `啊哦~你填写的信息有误`;
    }
})



app.use(router.routes());

app.listen('4444', () => {
    console.log('访问4444端口成功123')
})