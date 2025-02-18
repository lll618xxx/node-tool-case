const axios = require('axios');
const CryptoJS = require('crypto-js');
const fs = require('fs');

// 腾讯云 API 配置
const secretId = 'SecretId'; // 替换为你的 SecretId
const secretKey = 'SecretKey'; // 替换为你的 SecretKey
const endpoint = 'tmt.tencentcloudapi.com'; // 腾讯云翻译 API 的 endpoint
const region = 'ap-guangzhou'; // 区域
const action = 'FileTranslate'; // 文件翻译的 Action
const version = '2018-03-21'; // API 版本

// 生成签名
function getSignature(params, secretKey) {
    // 1. 按字典序排序参数
    const sortedParams = Object.keys(params)
        .sort()
        .map(key => `${key}=${params[key]}`)
        .join('&');

    // 2. 生成待签名字符串
    const stringToSign = 'POST' + endpoint + '/?' + sortedParams;

    // 3. 使用 HMAC-SHA256 计算签名
    const signature = CryptoJS.HmacSHA256(stringToSign, secretKey)
        .toString(CryptoJS.enc.Base64);

    return signature;
}

// 文件翻译请求
async function translateFile(filePath, sourceLang, targetLang) {
    const fileContent = fs.readFileSync(filePath, 'base64');

    const params = {
        Action: action,
        Version: version,
        Region: region,
        Source: sourceLang,
        Target: targetLang,
        ProjectId: 0, // 项目 ID，默认为 0
        SourceText: fileContent,
        Timestamp: Math.floor(Date.now() / 1000),
        Nonce: Math.floor(Math.random() * 100000),
        SecretId: secretId,
    };

    // 生成签名并添加到参数中
    params.Signature = getSignature(params, secretKey);

    try {
        const response = await axios.post(`https://${endpoint}`, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        console.log('翻译结果:', response.data);
    } catch (error) {
        console.error('请求失败:', error.response.data);
    }
}

// 调用翻译函数
translateFile('./test.txt', 'zh', 'en'); // 替换为你的文件路径和语言代码