// true 开发环境， false 生产环境
let test = true
//let base = 'http://192.168.5.28:8000'
let base = 'https://erp-wxapi.27yn.cn'
//  let base = test ? 'http://192.168.5.28:8000' : 'https://wxapi.lyfz.net'
// let base = test ? 'https://wxapi.lyfz.net' : 'https://erp-wxapi.27yn.cn'

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
	getReservationDescription: `${base}/api/template/ma/get_reservation_description`, // 获取档期
	getAgreementDescription: `${base}/api/template/ma/get_server_description`, // 获取预约协议说明
	getAgreementDescription: `${base}/api/template/ma/get_server_description`, // 获取预约协议说明
	getReservationServer: `${base}/api/template/ma/get_server_as_regards`, // 获取关于

	// 定位
	getCityShop: `${base}/api/template/ma/get_city_shop`, // 获取门店信息
	listBrand: `${base}/api/template/ma/list_brand`, // 获取品牌分类

	// 分类
	getListAssemblyOnlineCategory: `${base}/api/template/ma/list_assembly_online_category`, // 获取套系类别列表
	getPageAssemblyOnline: `${base}/api/template/ma/page_assembly_online`, // 获取套系分页
	getAssemblyOnlineDetail: `${base}/api/template/ma/get_assembly_online_detail`, // 获取套系详情
	addFeedBackOne: `${base}/api/feedback/addOne`, // 意见反馈-添加
	getMyFeedBackList: `${base}/api/feedback/list`, // 意见反馈-用户查看列表
	
	// 购物车                  
	reservationPhotoDate: `${base}/api/template/ma/auth/reservation_photo_date`, // 获取预约拍照档期
	typographyCost: `${base}/api/template/ma/auth/typography_cost`, // 查询档期费用
	listCategory: `${base}/api/template/ma/auth/list_category`, // 获取类别列表
	order: `${base}/api/template/ma/auth/order`, // 下单
	orders: `${base}/api/template/ma/test_pay`, // 下单ove
	cellectAssembly: `${base}/api/template/ma/assembly_collect`, //  收藏
	getCollectList: `${base}/api/template/ma/get_assembly_collect_list`, // 获取套系收藏集合
	delCollectOne: `${base}/api/template/ma/delete_assembly_collect`, // 删除套系收藏
	getAssemblyCollect: `${base}/api/template/ma/get_assembly_collect`, // 获取套系收藏数据

	// 订单
	orderDetails: `${base}/api/template/ma/auth/order_details`, // 订单详情
	orderProcess: `${base}/api/template/ma/auth/order_process`, // 订单流程
	orderList: `${base}/api/template/ma/auth/order_list`, // 获取订单列表
	orderPay: `${base}/api/template/ma/auth/order_pay`, // 订单支付
	orderClose: `${base}/api/template/ma/auth/order_close`, // 关闭订单

	getPtdetail: `${base}/api/template/ma/get_assembly_online_detail_type`, // 获取线上图文套系详情
	getPropelDetail: `${base}/api/template/ma/getAssemblyOnlineDetailByPropel`, // 根据推荐套系获取详情
	getMaAssemblyOnlineTitle: `${base}/api/template/ma/page_assembly_online_title`, // 获得图文类别下的套系
    //getH5Map:'https://restapi.amap.com/v3/ip' // 获取h5位置

	addRecommendOne: `${base}/api/template/ma/add_and_update_assembly`, // 添加或者保存小程序推荐套系
	get_discount: `${base}/api/template/ma/get_discount`, // 获取折扣
	getCustomerContactByMobile: `${base}/api/template/ma/getCustomerContactByMobile`, // 通过手机号码获取是否折扣
	getStandardList: `${base}/api/ma/find_standard_server`, // 获取标准服务
	getTextImageList: `${base}/api/template/ma/list_image_text`, // 获取公众号图文列表
	getRecommendAssemblyList: `${base}/api/template/ma/list_recommend_assembly` // 获取小程序推荐套系列表
	
}

export default baseUrl
