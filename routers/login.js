const Router = require('koa-router');
const router = new Router();
const mysqlQuery = require('../utils/mySqlQuery');

router.post('/', async (ctx, next) => {
    let { userName, password } = ctx.request.body;
    const query = `select * from user where userName = '${userName}' and password = '${password}'`;
    let res = await mysqlQuery(query)

    console.log(res)

    ctx.body = {
        code: 200
    }
})

module.exports = router;