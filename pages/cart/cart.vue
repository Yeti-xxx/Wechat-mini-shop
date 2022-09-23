<template>
  <view class="cart-container" v-if="cart.length!==0">
    <!-- 收货地址 -->
    <my-address></my-address>
    <!-- 商品列表标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 右侧文本 -->
      <text class="cart-title-text">
        购物车
      </text>
    </view>
    <!-- 渲染商品信息 -->
    <uni-swipe-action>
      <block v-for="(goods,i) in cart" :key="i">
        <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
          <view class="goods-item">
            <!-- 商品左侧图片区域 -->
            <view class="goods-item-left">
              <radio :checked="goods.goods_state" color="#c00000" @click="radioHandler(goods)"></radio>
              <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
            </view>
            <!-- 商品右侧信息区域 -->
            <view class="goods-item-right">
              <!-- 商品标题 -->
              <view class="goods-name">{{goods.goods_name}}</view>
              <view class="goods-info-box">
                <!-- 商品价格 -->
                <view class="goods-price">￥{{toFixed(goods.goods_price)}}</view>
                <uni-number-box :min="1" :value="goods.goods_count" @change="numChangeHandler($event,goods)">
                </uni-number-box>
              </view>
            </view>
          </view>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <!-- 使用自定义，结算组件 -->
    <my-settle></my-settle>
  </view>
  <!-- 购物车空时的页面 -->
  <view class="empty-cart" v-else>
    <uni-icons type="shopping-cart" size="28"></uni-icons>
    <image src="../../static/my-icons/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">购物车空空如也~</text>
  </view>
</template>

<script>
  import badgeMix from '../../mixins/tabbar-badge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    mixins: [badgeMix],
    computed: {
      ...mapState('m_cart', ['cart']),
      toFixed(num) {
        return (num) => {
          return Number(num).toFixed(2)
        }
      }
    },
    onShow() {},
    data() {
      return {
        options: [{
          text: '删除', // 显示的文本内容
          style: {
            backgroundColor: '#C00000' // 按钮的背景颜色
          }
        }]
      }
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
      radioHandler(goods) {
        goods.goods_state = !goods.goods_state
        this.updateGoodsState(goods)
      },
      numChangeHandler(e, goods) {
        goods.goods_count = e
        this.updateGoodsCount(goods)
      },
      swipeActionClickHandler(goods) {
        this.removeGoodsById(goods.goods_id)
      }
    }

  }
</script>

<style lang="scss">
  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      font-size: 14px;
      margin-left: 10px;
    }
  }

  .goods-item {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-pic {
        margin-right: 5px;
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-info-box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .goods-price {
          color: #c00000;
        }
      }
    }
  }

  .cart-container {
    padding-bottom: 50px;
  }

  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 80px;
    height: 100%;
    width: 100%;
    .empty-img{
      width: 90px;
      height: 90px;
    }
    .tip-text{
      font-size: 12px;
      color: gray;
      margin-top: 12px;
    }
  }
</style>
