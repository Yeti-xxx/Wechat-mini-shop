<template>
  <view>
    <view class="my-settle-container">
      <!-- 全选 -->
      <label for="radio">
        <radio color="#c00000" :checked="isFullCheck" @click="changeAllstate" /><text>全选</text>
      </label>
      <!-- 合计 -->
      <view class="amount-box">
        合计:<text class="amount">￥{{checkGoodsAmount}}</text>
      </view>
      <!-- 结算按钮 -->
      <view class="btn-settle" @click="settlement">
        结算({{checkedCount}})
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    name: "my-settle",
    data() {
      return {
        // 倒计时秒数
        seconds: 3,
        // 定时器id
        timer: null
      };
    },
    computed: {
      ...mapState('m_user', ['token']),
      ...mapState('m_cart', ['cart']),
      ...mapGetters('m_cart', ['checkedCount', 'checkGoodsAmount', 'total']),
      ...mapGetters('m_user', ['addstr']),
      isFullCheck() {
        if (this.total === this.checkedCount) {
          return true
        }
        return false;
      }

    },
    methods: {
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      ...mapMutations('m_user', ['updateRedirectInfo']),
      changeAllstate() {
        this.updateAllGoodsState(!this.isFullCheck)
      },
      // 用户点击结算按钮
      settlement() {
        if (!this.checkedCount) {
          return uni.$showMsg('请选择要结算的商品')
        }
        if (!this.addstr) {
          return uni.$showMsg('请选择收货地址')
        }
        if (!this.token) {
          return this.delayNavigate()
        }
        // 发起支付
        this.payOrder()
      },
      async payOrder() {
        // 创建订单信息对象,
        const orderInfo = {
          // order_price:this.checkGoodsAmount,开发期间建议写死订单价格
          order_price: 0.01,
          consignee_addr: this.addstr,
          goods: this.cart.filter(x => x.goods_state).map(x => ({
            goods_id: x.goods_id,
            goods_number: x.goods_count,
            goods_price: x.goods_price
          }))
        }
        // 发起创建订单,
        const {
          data: res
        } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
        if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
        // 1.3 得到服务器响应的“订单编号”
        const orderNumber = res.message.order_number
        // 发起请求获取订单支付信息
        const {
          data: res2
        } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {
          order_number: orderNumber
        })
        if (res2.meta.status !== 200) return uni.$showError('预付订单生成失败！')
        // 2.3 得到订单支付相关的必要参数
        const payInfo = res2.message.pay
        console.log(payInfo)
        // 3. 发起微信支付
        const [err, payRes] = await uni.requestPayment(payInfo)
        console.log(payRes);
        //未完成支付
        if (err) return uni.$showMsg('订单未支付！')
        // 完成了支付，进一步查询支付的结果
        const {
          data: res3
        } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', {
          order_number: orderNumber
        })
        //检测到订单未支付
        if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
        // 检测到订单支付完成
        uni.showToast({
          title: '支付完成！',
          icon: 'success'
        })
      },
      // 延时导航到登录页面
      delayNavigate() {
        this.showTips(this.seconds)
        // 2. 创建定时器，每隔 1 秒执行一次
        this.timer = setInterval(() => {
          // 2.1 先让秒数自减 1
          this.seconds--
          if (this.seconds <= 0) {
            clearInterval(this.timer)
            uni.switchTab({
              url: '/pages/my/my',
              success: () => {
                this.updateRedirectInfo({
                  openType: 'switchTab',
                  from: '../cart/cart'
                })
              }
            })
            // 为了防止再次弹出提示框
            return
          }
          // 2.2 再根据最新的秒数，进行消息提示
          this.showTips(this.seconds)
        }, 1000)
      },
      // 展示倒计时
      showTips(n) {
        uni.showToast({
          // 不展示任何图标
          icon: 'none',
          // 提示的消息
          title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
          // 为页面添加透明遮罩，防止点击穿透
          mask: true,
          // 1.5 秒后自动消失
          duration: 1500
        })
      }
    }
  }
</script>

<style lang="scss">
  .my-settle-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    z-index: 999;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;

    .radio {
      display: flex;
      align-items: center;
    }

    .amount-box {
      .amount {
        color: #c00000;
        font-weight: bold;

      }
    }

    .btn-settle {
      background-color: #c00000;
      height: 50px;
      color: white;
      line-height: 50px;
      padding: 0 10px;
      min-width: 100px;
      text-align: center;
    }
  }
</style>
