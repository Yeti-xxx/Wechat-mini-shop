<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <button type="primary" class="btn-login" @click="getUserInfo">一键登录</button>
    <text class="tip-text">登录后享更多权益</text>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    name: "my-login",
    computed: {
      ...mapState('m_user', ['redirectInfo'])
    },
    data() {
      return {

      }
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
      // 获取用户基本信息
      getUserInfo() {
        const res = uni.getUserProfile({
          desc: "获取基本信息",
          success: (res) => {
            this.updateUserInfo(res.userInfo)
            this.getToken(res)
          }
        })
      },
      async getToken(info) {
        // 获取code属性
        const res = await uni.login().catch(err => err)
        if (res.errMsg !== 'login:ok') {
          return uni.$showMsg('登录失败')
        }
        //声明查询对象
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        const {
          data: loginResult
        } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        // 由于接口404，此处直接通过登录
        // if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
        uni.$showMsg('登录成功')
        this.updateToken(
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
          )
        this.navigateBack()
      },
      navigateBack() {
        if (this.redirectInfo && this.redirectInfo.openType==='switchTab') {
          console.log(this.redirectInfo.from);
          uni.switchTab({
            url:this.redirectInfo.from,
            complete:()=>{
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 750rpx;

    .btn-login {
      width: 70%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #C00000;
    }

    .tip-text {
      font-size: 12px;
      color: gray;

    }
  }
</style>
