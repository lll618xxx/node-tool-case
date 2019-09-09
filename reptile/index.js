const superagent = require('superagent')
const cheerio = require('cheerio')
const xlsx = require('node-xlsx')
const fs = require('fs')
const options = require('./options')

superagent.get(options.url)
    .then(res => {
        const bufferdata = [{
            name: 'sheet1',
            data: [options.attr.map((item, index, arr) => {
                return arr[index][2]
            })]
        }]
       
        const $ = cheerio.load(res.text);
        
        $(options.ele).each((index, item) => {
            let arr = []
            options.attr.forEach((v, i, a) => {
                arr.push(a[i][1] ? $(item).find(a[i][0]).attr(a[i][1]) : $(item).find(a[i][0]).text())
            })
            bufferdata[0].data.push(arr)
        })
       
        fs.writeFile(options.excelPath, xlsx.build(bufferdata), (err) =>{
            if (err) throw err;
            console.log('写入Excel成功');
        })
    })
    .catch(err => {
        console.log(err)
    });


