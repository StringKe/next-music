## 介绍

这是一个基于腾讯云 `Cloudbase` 落地的一个音乐网站，所有 `API` 来自 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 音源、图像等资源均来自 网易云音乐，本项目仅限学习使用

## 开发

1.  预览地址：
2.  Music Api 地址：[https://t.cugxuan.cn/music](https://t.cugxuan.cn/backend_music)
3.  Cloudbase 信息 地址：[https://t.cugxuan.cn/music](https://t.cugxuan.cn/backend)

### Cloudbase

[文档](https://cloudbase.net/framework.html)
```shell script
    // 安装
    npm install -g @cloudbase/cli@latest

    // 登陆 使用私聊提供的密钥登陆
    tcb login --apiKeyId XXXX --apiKey XXXX

    // 同步代码到线上
    tcb
```
### 后端 API

如果使用 `cloudbase sdk` 则不需要注意请求方式，其他需要使用 `http` 请求方式，请求 `body` 必须为 `JSON`

请求地址： 

请求方式： POST

| 参数名    | 是否必须 | 类型     | 例子                 |
| ------ | ---- | ------ | ------------------ |
| action | 是    | string | custom_get_actions |
| params | 否    | object | {}                 |
