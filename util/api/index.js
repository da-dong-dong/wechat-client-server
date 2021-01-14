// true 开发环境， false 生产环境
let test = true

let base_other = test ? 'https://api.27yn.cn': 'https://api.lyfz.net'
let base = test ? 'http://192.168.5.15:8000' : 'https://napi.lyfz.net'

let baseUrl = {
    getTicket: `${base_other}/sso/v1/ticket/login`, //登录
    getLongin: `${base}/api/template/ma/js_code2_session`, //获取微信登录凭证
}

export default baseUrl