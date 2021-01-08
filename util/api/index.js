// true 开发环境， false 生产环境
let test = false

let base_other = test ? 'https://api.27yn.cn': 'https://api.lyfz.net'

let baseUrl = {
    getTicket: `${base_other}/sso/v1/ticket/login`, //登录
}

export default baseUrl