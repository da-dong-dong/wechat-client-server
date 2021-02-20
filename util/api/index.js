// true 开发环境， false 生产环境
let test = true

// let base = test ? 'http://192.168.5.15:8000' : 'https://wxapi.lyfz.net'
let base = test ? 'https://wxapi.lyfz.net' : 'https://erp-wxapi.27yn.cn'

let baseUrl = {
	// 小程序首页
	getHomeData: `${base}/api/template/ma/get_home_decoration`, // 获取首页排版数据
	getOrderContract: `${base}/api/template/ma/auth/order_contract`, // 订单合同
	updOrderContract: `${base}/api/template/ma/auth/update_order_contract`, // 更改合同
	updOrderContractState: `${base}/api/template/ma/auth/update_order_contract_status`, // 更改合同状态
	
	// 我的
    getCode: `${base}/api/template/ma/js_code2_session`, // 获取微信登录凭证
	getUserInfo: `${base}/api/template/ma/auth/get_user_info`, // 获取用户信息
    setPhoneNoInfo: `${base}/api/template/ma/auth/set_phone_no_info`, // 设置小程序用户手机信息
    setUserInfo: `${base}/api/template/ma/auth/set_user_info`, // 设置小程序用户信息
	updateUserInfo: `${base}/api/template/ma/auth/update_user_info`, // 修改个人信息
	sendVerificationCode: `${base}/api/template/ma/auth/send_verification_code`, // 发送修改密码验证码
	updatePassword: `${base}/api/template/ma/auth/update_password`, // 修改密码
	getAssemblyDescription: `${base}/api/template/ma/get_assembly_description`, // 获取套系服务说明
	getReservationDescription: `${base}/api/template/ma/get_reservation_description`, // 获取预约服务说明
	
	// 定位
	getCityShop: `${base}/api/template/ma/get_city_shop`, // 获取门店信息
	listBrand: `${base}/api/template/ma/list_brand`, // 获取品牌分类
	
	// 分类
	getListAssemblyOnlineCategory: `${base}/api/template/ma/list_assembly_online_category`, // 获取套系类别列表
	getPageAssemblyOnline: `${base}/api/template/ma/page_assembly_online`, // 获取套系分页
	getAssemblyOnlineDetail: `${base}/api/template/ma/get_assembly_online_detail`, // 获取套系详情
	
	// 购物车
	reservationPhotoDate: `${base}/api/template/ma/auth/reservation_photo_date`, // 获取预约拍照档期
	typographyCost: `${base}/api/template/ma/auth/typography_cost`, // 查询档期费用
	listCategory: `${base}/api/template/ma/auth/list_category`, // 获取类别列表
	order: `${base}/api/template/ma/auth/order`, // 下单
	orders: `${base}/api/template/ma/test_pay`, // 下单ove
	
	// 订单
	orderDetails: `${base}/api/template/ma/auth/order_details`, // 订单详情
	orderProcess: `${base}/api/template/ma/auth/order_process`, // 订单流程
	orderList: `${base}/api/template/ma/auth/order_list`, // 获取订单列表
	orderPay: `${base}/api/template/ma/auth/order_pay`, // 订单支付
	orderClose: `${base}/api/template/ma/auth/order_close`, // 关闭订单


    //getH5Map:'https://restapi.amap.com/v3/ip' // 获取h5位置
}

export default baseUrl