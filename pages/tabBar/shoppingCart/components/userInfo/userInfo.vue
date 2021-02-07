/******************************** 用户类型判断 ***************************************/
<template>
    <view>
        <view class="paddingTB20  paddingRL20 fontSize32 fontWight">  客户信息  </view>
        <view class="paddingT10" v-for="(item,index) in userInfo" :key="index">
             <!-- 昵称 -->
            <picker v-if="index == 0" @change="changeCallName($event, item)" :value="item.sex" :range="callName">
                <view class="userbox flex paddingRL20" >
                    <view class="border flex paddingTB20">
                        <view class="flex">
                            <text class="paddingRL20">称呼</text>
                            <text class="width">{{callName[item.sex]}}</text>
                        </view>
                        <i-icon class="icon" type="enter" size="20" color="#707070"  />
                    </view>
                </view>
            </picker>
             <!-- 昵称 -->
            <picker v-if="index == 1" @change="changeCallName1($event, item)" :value="item.sex" :range="callName">
                <view class="userbox flex paddingRL20" >
                    <view class="border flex paddingTB20">
                        <view class="flex">
                            <text class="paddingRL20">称呼</text>
                            <text class="width">{{callName[item.sex]}}</text>
                        </view>
                        <i-icon class="icon" type="enter" size="20" color="#707070"  />
                    </view>
                </view>
            </picker>
            <!-- 姓名 -->
            <view class="userbox flex paddingRL20" >
                <view class="flex">
                    <text class="paddingRL20">姓名</text>
                    <input class="width" type="text" placeholder="请输入姓名" v-model="item.name"/>
                </view>
                <i-icon class="icon" type="" size="20" color="#707070"  />
            </view>
            <!-- 电话号码 -->
            <view class="userbox flex paddingRL20" >
                <view class="border flex paddingTB20">
                    <view class="flex">
                        <text class="paddingRL20">手机号码</text>
                        <input class="width" type="text" placeholder="请输入手机号" v-model="item.mobile"/>
                    </view>
                    <i-icon class="icon" type="" size="20" color="#707070"  />
                </view>
            </view>
            <!-- 生日 -->
            <picker mode="date" :value="item.birthdayTime" @change="bindDateChange($event, item)">
                <view class="userbox flex paddingRL20" >
                    <view class="border flex paddingTB20">
                        <view class="flex">
                            <text class="paddingRL20">生日</text>
                            <text class="width">{{item.birthdayTime ? item.birthdayTime : '生日' | times}}</text>
                        </view>
                        <i-icon class="icon" type="enter" size="20" color="#707070"  />
                    </view>
                </view>
            </picker>
        </view>
    </view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getUserInfo } from '@/util/api/user.js'
    export default {
        props:['type'],
        computed:{
			...mapGetters('user',[
                'get_shopId',
                'get_phone',
                'get_nickName',
                'get_sex',
            ]),
        },
        data(){
            return{
                userInfo:[], // 循环数据
                // 主联系人
                onlineCustomerContactDtos:{
                    address: "", // 地址
                    birthdayLunar: true, // 是否农历
                    birthdayTime: 0, // 出生日期
                    callName: "", // 联系人称呼
                    display: true, // 是否显示
                    email: "", // 邮箱
                    main: true, // 是否主联系人
                    mobile: "", // 手机号码
                    name: "", // 客户姓名
                    qq: "", // QQ
                    sex: 0, // 	性别，false：女，true：男
                    tel: "", // 固定电话
                    wechat: "", //	微信
                    workUnit: "", // 工作单位
                },
                callName:[],
                index:0,
            }
        },
        mounted(){
            this.orderUserInfo(this.type)
            if(!this.get_phone || !this.get_nickName){
                this.getUserInfoAPI()
            }else{
                // 初始数据
                this.onlineCustomerContactDtos.name = this.get_nickName
                this.onlineCustomerContactDtos.sex = this.get_sex
                this.onlineCustomerContactDtos.mobile = this.get_phone
                this.getMainParams()
            }
            
		},
        methods:{
            ...mapActions('user',[
                'act_nickName'
            ]),

            // 设置昵称
            changeCallName(e, item){
                item.sex = e.target.value
                
                if(this.userInfo.length>1){
                    this.userInfo[1].sex = this.userInfo[0].sex == 0 ? 1 : 0
                }
            },

            // 设置昵称
            changeCallName1(e, item){
                item.sex = e.target.value
                this.userInfo[0].sex = this.userInfo[1].sex == 0 ? 1 : 0
            },

			// 生日
			bindDateChange (e, item) {
				item.birthdayTime = new Date(e.target.value).getTime()
            },

            // 主联系人
            getMainParams(){
                // 更改性别
                this.onlineCustomerContactDtos.sex = this.onlineCustomerContactDtos.sex==1?0:1
                this.userInfo.push(this.onlineCustomerContactDtos)
                console.log(this.userInfo)
                this.$forceUpdate()
                if(this.type == 'WEDDING_DRESS'){
                    this.getSecondParams()
                }
            },

            // 获取用户信息AIP
            getUserInfoAPI(){
                getUserInfo().then(res=>{
                    let {headimgUrl,nickName,phone,sex,birthday,province,city,area} = res.data.data
                    this.act_nickName({headimgUrl,nickName,phone,sex,birthday,province,city,area})
                    // 初始数据
                    this.onlineCustomerContactDtos.name = nickName
                    this.onlineCustomerContactDtos.sex = sex
                    this.onlineCustomerContactDtos.mobile = phone
                    this.getMainParams()
                })
            },

            // 次联系人
            getSecondParams(){
				let p = {
					address: null, //地址
					birthdayLunar: false, //是否农历	
					birthdayTime: null,	//出生日期
					callName: null,	//	联系人称呼
					display:true, //是否显示	
					email: null, //邮箱
					main: false,	//是否主联系人	
					mobile:  null, //手机号码	
					name: null,	//客户姓名	
					qq: null, //QQ
					sex: 1, //性别
					tel: null, //固定电话	
					wechat: null //微信
                }
                // 更改性别
                p.sex = this.onlineCustomerContactDtos.sex==0?1:0
				this.userInfo.push(p)
				this.$forceUpdate()
            },

            // 订单类型判断客户
            // 过滤订单类型显示不同用户
            orderUserInfo(val){
                console.log(val)
                switch (val) {
                    case 'WEDDING_DRESS':
                        this.callName=['新郎','新娘']
                        break;
                    case 'PREGNANT':
                        this.callName=['孕爸','孕妈']
                        break;
                    case 'BABY':
                        this.callName=['爸爸','妈妈']
                        break;
                    case 'PORTRAY':
                        this.callName=['先生','女士']
                        break;
                    case 'SERVICE':
                        this.callName=['先生','女士']
                        break;
                    case 'WEDDING':
                        this.callName=['新郎','新娘']
                        break;
                    default:
                        break;
                }
            },
            callNameText(val,sex){
                console.log(val,sex)
                let text = '';
                switch (val) {
                    case 'WEDDING_DRESS':
                        text = sex==0?'新郎':'新娘'
                        break;
                    case 'PREGNANT':
                        text = sex==0?'孕爸':'孕妈'
                        break;
                    case 'BABY':
                        text = sex==0?'爸爸':'妈妈'
                        break;
                    case 'PORTRAY':
                        text = sex==0?'先生':'女士'
                        break;
                    case 'SERVICE':
                        text = sex==0?'先生':'女士'
                        break;
                    case 'WEDDING':
                        text = sex==0?'新郎':'新娘'
                        break;
                    default:
                        break;
                }
                return text 
            },
            
            save(){
                //判断第二个联系人
				let params = JSON.parse(JSON.stringify(this.userInfo))
				if(params.length > 1){
					params.map((item,index)=>{
						if(index > 0){
							if(item.name == null || item.name == ''){
								params.splice(index,1)
							}else{
								if(item.mobile == ''){
									item.mobile = null
								}
							}
						}
					})
                }
                
                params.map(item =>{
                    // 设置昵称
                   item.callName = this.callNameText(this.type,item.sex)
					if(item.sex == 0){
                        item.sex = true
                    }else{
                        item.sex = false
                    }
				})
                return params
            }
            
        }
    }
</script>

<style lang="scss" scoped>
.userbox{
    justify-content: space-between;
    align-items: center;
    height: 80rpx;
    box-sizing: content-box;
    margin-bottom: 20rpx;
    .flex{
        .width{
            width: 300rpx;
        }
        .paddingRL20{
            width: 150rpx;
        }
    }
}
.border{
    width: 100%;
    border-top: 1px solid #D1D1D1;   
    justify-content: space-between;
    align-items: center;
}
</style>