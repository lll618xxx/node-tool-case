const path = require('path')

// 定义爬虫的页面
const url = 'https://segmentfault.com/hottest/monthly'
// 定义excel存放的路径
const excelPath = path.join(__dirname, 'result.xlsx')
// 定义元素范围
const ele =  'div.wrapper div.news-list div.news__item-info' 
// 定义数据属性 ['具体元素'， '属性', '别名']
const attr = [
    ['a', 'href', '链接'],
    ['span.votes-num', '', '点赞数'],
    ['h4.news__item-title', '', '标题名字'],
    ['span.author a', '', '作者名字'],
] 

module.exports = {
    url,
    excelPath,
    ele,
    attr
}