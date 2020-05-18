const Router = require('koa-router');
const router = new Router();
const callCloudDb = require('../utils/callCloudDb');
const getSwiperList = require('../utils/getSwiperList');

router.post('/updateSwiper',async(ctx,next)=>{
    let swiperList = await getSwiperList();
    const query = `db.collection("bookSwiper")
    .where({
        _id:"a9bfcffc5eb3b456002e24f61f548268"
    })
    .update({
        data:{
            swiperList:${JSON.stringify(swiperList)}
        }
    })` 
    let res = await callCloudDb(ctx,"databaseupdate",query);
    ctx.body = {
        code:200,
        data:swiperList
    } 
})

router.post('/getSwiper',async (ctx,next)=>{
    const query = `db.collection("bookSwiper").get()`;
    let res = await callCloudDb(ctx,"databasequery",query);
    ctx.body = {
        code:200,
        data:JSON.parse(res.data).swiperList
    }
})

module.exports = router;