const rp = require('request-promise');
const getAccessToken = require('./getAccessToken');

const callCloudDb = async (ctx,fnName,query)=>{
    const ACCESS_TOKE = await getAccessToken();
    const BASE_URL = `https://api.weixin.qq.com/tcb/${fnName}?access_token=${ACCESS_TOKE}`;

    const options = {
        method:'POST',
        url:BASE_URL,
        body:{
            env:ctx.state.ENV,
            query:query
        },
        json:true
    }

    return await rp(options).then(res=>{
        return res
    }).catch(err=>{
        return err
    })

}

module.exports = callCloudDb;