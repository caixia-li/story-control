const rp = require('request-promise');
const fs = require('fs');
const path = require('path');

const APPID = "wx0b49013fb3f8e32b";
const APPSECRET = "8231d1cbc9555988617e5cd093b029ea"
const url = ` https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`;
const fileName = path.resolve(__dirname,'access_token');

const updateAccessToken = async ()=>{
    let res = await rp(url).then(res=>{
        return JSON.parse(res)
    })
    if(res.access_token){
        fs.writeFileSync(fileName,JSON.stringify({
            access_token:res.access_token,
            createTime:(new Date()).getTime()
        }))
    }else{
        await updateAccessToken();
    }
}

const getAccessToken = async ()=>{
    try{
        let res = fs.readFileSync(fileName,'utf8');
        let data = JSON.parse(res)

        let nowTime = (new Date()).getTime();
        let createTime = data.createTime;

        if(nowTime - createTime >= 7200*1000){
            await updateAccessToken();
            await getAccessToken();
        }

        return data.access_token;

    }catch{
        await updateAccessToken();
        await getAccessToken();
    }
}


module.exports = getAccessToken;