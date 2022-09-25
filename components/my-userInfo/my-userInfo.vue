<template>
  <view class="my-userinfo-container">
    <!-- 头像和名称 -->
    <view class="top-box">
      <image :src="userInfo.avatarUrl" class="avater"></image>
      <view class="nickname">
        {{userInfo.nickName}}
      </view>
    </view>
    <!-- 信息面板 -->
    <view class="panel-list">
      <!-- 第一个面板 -->
      <view class="panel">
        <view class="panel-body">
          <view class="panel-item">
            <text>0</text>
            <text>收藏的店铺</text>
          </view>
          <view class="panel-item">
            <text>0</text>
            <text>收藏的商品</text>
          </view>
          <view class="panel-item">
            <text>0</text>
            <text>关注的商品</text>
          </view>
          <view class="panel-item">
            <text>0</text>
            <text>足迹</text>
          </view>
        </view>
      </view>
      <!-- 第二个面板 -->
      <view class="panel">
        <!-- 面板的标题 -->
        <view class="panel-title">我的订单</view>
        <!-- 面板的主体 -->
        <view class="panel-body">
          <!-- 面板主体中的 item 项 -->
          <view class="panel-item">
            <image src="/static/my-icons/icon1.png" class="icon"></image>
            <text>待付款</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon2.png" class="icon"></image>
            <text>待收货</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon3.png" class="icon"></image>
            <text>退款/退货</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon4.png" class="icon"></image>
            <text>全部订单</text>
          </view>
        </view>
      </view>
      <!-- 第三个面板 -->
      <view class="panel">
        <view class="panel-list-item">
          <text>收货地址</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item">
          <text>联系客服</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item" @click="logout">
          <text>退出登录</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    name: "my-userInfo",
    computed: {
      ...mapState('m_user', ['userInfo'])
    },
    data() {
      return {

      };
    },
    methods: {
      ...mapMutations('m_user', ['updateAddress', 'updateToken', 'updateUserInfo']),
      async logout() {
        // 询问用户是否退出登录
        const res = await uni.showModal({
          title: '提示',
          content: '确认退出登录吗？',
        }).catch(err => err)
        if (res.errMsg === 'showModal:ok' && res.confirm) {
          this.updateUserInfo({})
          this.updateToken('')
          this.updateAddress({})
        }
      }
    }
  }
</script>

<style lang="scss">
  .my-userinfo-container {
    height: 100%;
    background-color: #F4F4F4;

    .top-box {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 400rpx;
      background-color: #c00000;

      .avater {
        width: 90px;
        height: 90px;
        border-radius: 45px;
        border: 2px solid #FFF;
        box-shadow: 0 1px 5px black;
      }

      .nickname {
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        margin-top: 10px;
      }
    }
  }

  .panel-list {
    padding: 0 10px;
    position: relative;
    top: -10px;

    .panel {
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
      background-color: white;
      border-radius: 3px;
      margin-bottom: 8px;

      .panel-list-item {
        height: 45px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 15px;
        padding: 0 10px;
      }

      .panel-title {
        line-height: 45px;
        padding-left: 10px;
        font-size: 15px;
        border-bottom: 1px solid #f4f4f4;
      }

      .panel-body {
        display: flex;
        justify-content: space-around;

      }

      .panel-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 10px 0;
        font-size: 13px;

        .icon {
          width: 35px;
          height: 35px;
        }
      }
    }
  }
</style>
