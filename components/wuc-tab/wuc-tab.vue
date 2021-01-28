/******************************** tab栏 ***************************************/
<template>
  <scroll-view class="wuc-tab" :class="tabClass" :style="tabStyle" scroll-with-animation scroll-x :scroll-left="scrollLeft">
    <div v-if="!textFlex">
      <div class="wuc-tab-item" :class="[index === tabCur ? selectClass + ' cur':'']" v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabSelect(index,$event)">
        <text :class="item.icon"></text>
        <span>{{item.name}}</span>
      </div>
    </div>

    <div class="flex text-center" v-if="textFlex">
      <div class="wuc-tab-item flex-sub" :class="index === tabCur ? selectClass + ' cur':''" v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabSelect(index,$event)">
        <text :class="item.icon"></text>
        <span class="border_post">
            {{item.name}}
            <view class="border_box" v-if="showBorder">
                <view class="border"></view>
                <view class="border"></view>
            </view>
        </span>
      </div>
    </div>
  </scroll-view>
</template>
<script>
export default {
    name: 'wuc-tab',
    data() {
        return {};
    },
    props: {
        tabList: {
            type: Array,
            default() {
                return [];
            }
        },
        tabCur: {
            type: Number,
            default() {
                return 0;
            }
        },
        tabClass: {
            type: String,
            default() {
                return '';
            }
        },
        tabStyle: {
            type: String,
            default() {
                return '';
            }
        },
        textFlex: {
            type: Boolean,
            default() {
                return true;
            }
        },
        selectClass: {
            type: String,
            default() {
                return 'text-blue';
            }
        },
        showBorder: {
            type: Boolean,
            default() {
                return true;
            }
        },
    },
    methods: {
        tabSelect(index, e) {
            if (this.currentTab === index) return false;
            this.$emit('update:tabCur', index);
            this.$emit('change', index);
        }
    },
    computed: {
        scrollLeft() {
            return (this.tabCur - 1) * 60;
        }
    }
};
</script>
<style lang="scss" scoped>
.border_post{
    position: relative;
}
.border_box{
    width: 80rpx;
    height: 6rpx;
    position: absolute;
    bottom: -10px;
    right: 50%;
    transform: translate(50%, 0px);
    display: flex;
    
}
div,
scroll-view,
swiper {
	box-sizing: border-box;
}
.wuc-tab {
    white-space: nowrap;
}
.wuc-tab-item {
    height: 90upx;
    display: inline-block;
    line-height: 90upx;
    margin: 0 10upx;
    padding: 0 20upx;
    font-size: 30rpx;
    color: #333333;
}

.wuc-tab-item.cur {
    .border{
        width: 50rpx;
        height: 100%;
        border-radius: 20rpx;
        background: #5893FF;
        &:nth-child(1){
            margin-right: 10rpx;
        }
        &:nth-child(2){
            width: 20rpx;
        }
    }
}

.wuc-tab.fixed {
	position: fixed;
	width: 100%;
	top: 0;
	z-index: 1024;
	box-shadow: 0 1upx 6upx rgba(0, 0, 0, 0.1);
}

.flex {
    display: flex;
}
.text-center {
    text-align: center;
}
.flex-sub {
    flex: 1;
}
.text-blue{
  color:#FF4852;
}
.text-white{
  color:#ffffff;
}
.bg-white{
    background-color: #ffffff;
}
.bg-blue{
    background-color: #5893FF;
}
.text-orange{
  color: #f37b1d
}

.text-xl {
	font-size: 36upx;
}
</style>
