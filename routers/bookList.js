const Router = require('koa-router');
const router = new Router();
const callCloudDb = require('../utils/callCloudDb');
const getBookDetail = require('../utils/getBookDetail');

router.post('/addBook', async (ctx, next) => {
    const { bookId } = ctx.request.body;
    let searchQuery = `db.collection("bookList").where({bookId:"${bookId}"}).count()`;
    let searchRes = await callCloudDb(ctx, "databasecount", searchQuery);
    let count = searchRes.count;

    if (count == 0) {
        let bookDetail = await getBookDetail(bookId);
        let query = `db.collection("bookList").add({
        data: {
            imgSrc:"${bookDetail.imgSrc.trim()}",
            title:"${bookDetail.title}",
            author:"${bookDetail.author}",
            tags:"${bookDetail.tags}",
            sign:"${bookDetail.sign}",
            intro:${JSON.stringify(bookDetail.intro).replace(/\s+/g, '')},
            catalog:${JSON.stringify(bookDetail.catalog).replace(/\s+/g, '')},
            bookId:"${bookId}"
        }
    })`

        let res = await callCloudDb(ctx, "databaseadd", query)
        ctx.body = {
            code: 200,
            data: "添加成功"
        }
    }else{
        ctx.body = {
            code: 202,
            data: "该书已经添加"
        }
    }
})

router.post('/getBooks',async (ctx,next)=>{
    let { start,count} = ctx.request.body;
    let query = `db.collection("bookList").skip(${start}).limit(${count}).get()`;
    let res = await callCloudDb(ctx,"databasequery",query)
    ctx.body = {
        code:200,
        data:res.data
    }
})

router.post('/removeBook',async (ctx,next)=>{
    let { bookId } = ctx.request.body;
    let query = `db.collection("bookList").where({bookId:'${bookId}'}).remove()`;
    let res = await callCloudDb(ctx,"databasedelete",query);
    ctx.body = {
        code:200,
        data:"删除成功"
    }
})



module.exports = router;