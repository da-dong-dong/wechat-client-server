<template>
    <view class="signture_content">
        <view class="signture_div">
            <div class="order_num">订单号: B2010114000</div>
            <div class="flex">
                <span class="name">女士</span>
                <span class="flex_1">李一帅</span>
            </div>
            <div class="flex">
                <span class="name">女士</span>
                <span class="flex_1">李一帅</span>
            </div>
        </view>
        <view class="signture_div">
            <div class="flex_no">
                <div class="num">1</div>
                <div class="explain">本合同订阅之日有效期一年, 所有照片的著作权归北遇映画所有</div>
            </div>
            <div class="flex_no">
                <div class="num">2</div>
                <div class="explain">本合同订阅之日有效期一年, 所有照片的著作权归北遇映画所有</div>
            </div>
            <div class="flex_no">
                <div class="num">3</div>
                <div class="explain">本合同订阅之日有效期一年, 所有照片的著作权归北遇映画所有</div>
            </div>
            <div class="flex_no">
                <div class="num">4</div>
                <div class="explain">本合同订阅之日有效期一年, 所有照片的著作权归北遇映画所有</div>
            </div>
            <div class="sign_border">
                <div >客户签字: </div>
            </div>
        </view>
    </view>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.signture_content{
    .signture_div{
        padding: 20rpx 0;
        background: #fff;
        border-radius: 16rpx;
        margin-bottom: 20rpx;
        .order_num{
            padding: 20rpx;
            border-bottom: 1px solid #ECECEC;
        }
        .sign_border{
            padding: 20rpx;
            padding-top: 30rpx;
            border-top: 1px solid #ECECEC;
            font-weight: 600;
        }
        .flex_no{
            padding: 20rpx;
            display: flex;
            color: #6C6C6C;
            .num{
                width: 30rpx;
            }
            .explain{
                flex: 1;
            }
        }
        .flex{
            padding: 20rpx;
            border-bottom: 1px solid #ECECEC;
            .name{
                width: 140rpx;
                margin-right: 80rpx;
                text-align: justify;
                text-align-last: justify;
            }
            &:last-child{
                border: none;
            }
            .flex_1{
                view{
                    padding: 8rpx 0;
                }
            }
        }
    }
}
</style>
