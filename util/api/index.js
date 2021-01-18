// true 开发环境， false 生产环境
let test = true

let base_other = test ? 'https://api.27yn.cn': 'https://api.lyfz.net'
let base = test ? 'http://192.168.5.15:8000' : 'https://napi.lyfz.net'

let baseUrl = {
    getTicket: `${base_other}/sso/v1/ticket/login`, // 登录

    getCode: `${base}/api/template/ma/js_code2_session`, // 获取微信登录凭证
    getAuthorState: `${base}/api/template/ma/authorization_state`, // 获取用户授权状态
    setPhoneNoInfo: `${base}/api/template/ma/set_phone_no_info`, // 设置小程序用户手机信息
    setUserInfo: `${base}/api/template/ma/set_user_info`, // 设置小程序用户信息

    getH5Map:'https://restapi.amap.com/v3/ip' // 获取h5位置
}

export default baseUrl