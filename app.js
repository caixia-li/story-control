const koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const app = new koa();
const router = new Router();

app.use(cors({
    origin:['http://localhost:8080'],
    credentials:true
}))

const book = require('./routers/bookList');
router.use('/book',book.routes());
const swiper = require('./routers/swiperList');
router.use('/swiper',swiper.routes());
const blog = require('./routers/blogList');
router.use('/blog',blog.routes());
const login = require('./routers/login');
router.use('/login',login.routes());


app.use(async (ctx,next)=>{
    ctx.state.ENV = 'shopping-gpdk9'
    await next();
})

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods()); 

app.listen(3000,()=>{
    console.log('3000 is ok')
})