const rp = require('request-promise');
const cheerio = require('cheerio');

const getBookDetail = async (bookId) => {

    const BASE_URL = `https://book.qidian.com/info/${bookId}`;

    let bookDetail = await rp(BASE_URL).then(body=>{
        var $ = cheerio.load(body);
        let tags = []
        let imgSrc = $('.book-information .book-img img').attr("src");
        let title = $('.book-information .book-info h1 em').text();
        let author = $('.book-information .book-info .writer').text();
        $('.book-information .book-info .tag').find('span').each((index, item) => {
            tags.push($(item).text())
        })
        $('.book-information .book-info .tag').find('a').each((index, item) => {
            tags.push($(item).text())
        })
        let sign = $('.book-information .book-info .intro').text();
        let intro = $('.book-content-wrap .left-wrap .book-info-detail .book-intro p').text().replace(/\s+/g,"");
        let catalog = []
        $('.catalog-content-wrap  .volume-wrap .volume').each((index, temp) => {
            $(temp).find('.cf li').each((index, item) => {
                catalog.push({
                    title: $(item).find('a').text(),
                    content: $(item).find('a').attr('href')
                })
            })
        })

        return {
            imgSrc,
            title,
            author,
            tags,
            sign,
            intro,
            catalog
        }

    })

    return bookDetail;

}

module.exports = getBookDetail;

