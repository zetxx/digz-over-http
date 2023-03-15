const digz = require('digz');
const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

router.get('/:host/:port/:wait', async(ctx, next) => {
    const {params: {host, port, wait}} = ctx;
    const d = new Date();
    const timestr = [d.getHours(), d.getMinutes()].join(':');
    await new Promise((res, rej) => {
        setTimeout(async() => {
            const s = await digz.query({
                host,
                port
            });
            ctx.body = [timestr, s.players_connected].join('| ');
            res();
        }, (((wait > 60) && wait) || 60) * 1000);
    });
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
