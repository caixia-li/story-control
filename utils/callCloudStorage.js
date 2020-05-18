const rp = require('request-promise');
const getAccessToken = require('./getAccessToken');

const callCloudStorage = async ( fnName, body) => {
    const ACCESS_TOKEN = await getAccessToken();
    const BASE_URL = `https://api.weixin.qq.com/tcb/${fnName}?access_token=${ACCESS_TOKEN}`;

    const options = {
        method:'POST',
        url:BASE_URL,
        body:body,
        json:true
    }

    return await rp(options).then(res=>{
        return res
    }).catch(err=>{
        return err
    })

}

module.exports = callCloudStorage;