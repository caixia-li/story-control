const Router = require('koa-router');
const router = new Router();
const callCloudDb = require('../utils/callCloudDb');
const callCloudStorage = require('../utils/callCloudStorage');

router.post('/getBlogList',async (ctx,next)=>{
    let { start,count} = ctx.request.body;
    const query = `db.collection("blog").skip(${start}).limit(${count}).get()`;
    let res = await callCloudDb(ctx,"databasequery",query);
    ctx.body = {
        code:200,
        data:res.data
    }
})

router.post('/getImgList',async (ctx,next)=>{
    let {imgList} = ctx.request.body;
    let file_list = [];
    imgList.forEach(item => {
        file_list.push({
            fileid:item,
            max_age:7200
        })
    });
    let body = {
        env: ctx.state.ENV,
        file_list
    }
    let res = await callCloudStorage("batchdownloadfile",body);
    ctx.body = {
        code:200,
        data:res.file_list
    }

})

router.post('/removeBlog',async (ctx,next)=>{
    let { imgList,doc } = ctx.request.body;
    const query = `db.collection("blog").doc("${doc}").remove()`;
    let dbRes = await callCloudDb(ctx,"databasedelete",query);
    let body  = {
        env: ctx.state.ENV,
        fileid_list:imgList
    }
    let storageRes = await callCloudStorage("batchdeletefile",body);
    ctx.body = {
        code:200,
        data:"删除成功"
    }


})

module.exports = router;