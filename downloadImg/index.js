
/**
 * 抓取网页图片
 */
//载入第3方request模块
const request = require("request");
//载入第3方cheerio模块
const cheeric = require("cheerio");
//载入内置path模块
const path = require("path");
//载入内置fs模块
const fs = require("fs");
 
 
//测试抓取图片的网页地址
const testImageUrl = "https://cd.junjue888.com/blh_vrbt_ch_xj_v4/?subChannel=A71xJLP4&projectid=7198443798745595959&promotionid=7198443991611080761&creativetype=131&clickid=EIeIz5yDzI8DGOHoto69zewHIIvwsLmojP0DMA444fmlwwNCKTlBNTY1RDkxLUY4MDEtNDM4MC1CQjFDLTU1RkQ0NjI3RjA0NnU2MzcxSICQvP0CkAEA&ad_id=1757432728618045&_toutiao_params=%7B";
//抓取到的图片本地保存路径
const downloadImagePath = path.join(__dirname,"images");
 
//开始抓取目标网址页的图片请求
request(testImageUrl,function(err,res,body){
    if(!err && res)
    {      
        let $ = cheeric.load(body);//加载网页
        console.log($("img").length)
        $("img").each(function(i,elem){//遍历文档中所有图片标签
            let imgSrc = $(this).attr("src");//获取图片的url
            console.log("当前抓取的图片下载url：",imgSrc);
 
            let filName = imgSrc.split('/').pop(); 
            //使用request模块读取流直接写入fs写入流
            if(imgSrc.startsWith("http"))
               request.get(imgSrc).pipe(fs.createWriteStream(path.join(downloadImagePath,filName), { 'encoding': 'utf8' }));
        });
    }else
    {
        console.log(err);
    }
});
