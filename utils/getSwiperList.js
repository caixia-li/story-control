const rp = require('request-promise');
const cheerio = require('cheerio');

const getSwiperList = async ()=>{
    const BASE_URL= "https://www.qdmm.com/";
    return await rp(BASE_URL).then(body=>{
        var $ = cheerio.load(body);
        let swiperList = [];
        $('#switchable-slides li').each((index,item)=>{
            let temp = $(item).find('a').attr('href')
            swiperList.push({
                bookId:temp.substring(temp.length-10),
                imgSrc:$(item).find('img').attr('data-src') || $(item).find('img').attr('src')
            })
        })
        return swiperList;
    })
}

module.exports = getSwiperList;