<template>
  <view>
    <view class="my-settle-container">
      <!-- 全选 -->
      <label for="radio">
        <radio color="#c00000" :checked="isFullCheck" @click="changeAllstate"/><text>全选</text>
      </label>
      <!-- 合计 -->
      <view class="amount-box">
        合计:<text class="amount">￥{{checkGoodsAmount}}</text>
      </view>
      <!-- 结算按钮 -->
      <view class="btn-settle">
        结算({{checkedCount}})
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    name: "my-settle",
    data() {
      return {

      };
    },
    computed:{
      ...mapGetters('m_cart',['checkedCount','checkGoodsAmount']),
      ...mapGetters('m_cart',['total']),
      isFullCheck(){
        if(this.total===this.checkedCount){
          return true
        }
        return false;
      }
      
    },
    methods:{
      ...mapMutations('m_cart',['updateAllGoodsState']),
      changeAllstate(){
        this.updateAllGoodsState(!this.isFullCheck)
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
