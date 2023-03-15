const digz = require('digz');
const Koa = require('koa');
const Router = require('@koa/router');
const {listen} = require('rc')(require('./package.json').name, {listen: 3000});

const app = new Koa();
const router = new Router();

router.get('/:host/:port/:wait', async(ctx, next) => {
    const {params: {host, port, wait}} = ctx;
    const d = new Date();
    const waitTime = (((wait > 60) && wait) || 60);
    const timestr = [d.getHours(), d.getMinutes()].join(':');
    console.info(`will query ${host}:${port} after ${waitTime} sec.`)
    await new Promise((res, rej) => {
        setTimeout(async() => {
            const s = await digz.query({
                host,
                port
            });
            ctx.body = [timestr, s.players_connected].join('| ');
            res();
        }, waitTime * 1000);
    });
});

app
  .use(router.routes())
  .use(router.allowedMethods());

console.info(`server listen on: ${listen}`)
app.listen(listen);
