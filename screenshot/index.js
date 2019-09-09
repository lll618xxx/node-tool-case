const screenshot = require('screenshot-desktop')
const fs = require('fs')

screenshot()
.then((img) => {
    console.log(img)
    //将截取的图片存入根目录out.jpg
    fs.writeFile('out.jpg', img,function(err){
        if(err){
            throw err
        }
        console.log('written to out.jpg')
    })
})