const {query} = require('digz');
const Koa = require('koa');
const Router = require('@koa/router');
const {listen, template} = require('rc')(
    require('./package.json').name,
    {listen: 3000, template: 'default'}
);

const app = new Koa();
const router = new Router();

const tmpl = require(`./templates/${template}.js`);

router.get('/:host/:port/:wait', async(ctx, next) => {
    const {params: {host, port, wait}} = ctx;
    const waitTime = (isNaN(wait) && 60) || parseInt(wait);
    console.info(`will query ${host}:${port} after ${waitTime} sec.`)
    await new Promise((res, rej) => {
        setTimeout(async() => {
            const d = new Date();
            const timestr = [
                d.getHours(),
                d.getMinutes()
            ].join(':');
            const sq = await query({
                host,
                port
            });
            ctx.body = tmpl({
                timestr,
                sq
            });
            console.info(sq);
            res();
        }, waitTime * 1000);
    });
});

app
  .use(router.routes())
  .use(router.allowedMethods());

console.info(`server listen on: ${listen}`)
app.listen(listen);
