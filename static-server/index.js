const express = require('express')
const path = require('path')
const app = express()

const filepath = path.join(__dirname, './public')
const port = 8888

app.use(express.static(filepath))

app.listen(port, () => {
  console.log(`项目运行在localhost, 端口为 ${port}`)
})