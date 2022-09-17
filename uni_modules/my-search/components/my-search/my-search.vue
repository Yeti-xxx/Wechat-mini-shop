<template>
  <view class="my-search-container" :style="{'background-color':bgcolor}" @click="searchBoxHandler">
    <view class="my-search-box" :style="{'border-radius':radius+'px'}">
      <!-- 使用Uni图标组件 -->
      <uni-icons type="search" size="30">
      </uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>
<script>
  export default {
    name: 'mySearch',
    // 自定义属性，加强通用性
    props:{
      bgcolor:{
        type:String,
        default:'#c00000'
      },
      radius:{
        type:Number,
        default:18
      }
    },
    data(){
      return{
        
      }
    },
    methods:{
      searchBoxHandler(){
        // 触发外界传入的事件
        this.$emit('myclick')
      }
    }
  }
</script>
<style lang="scss">
  .my-search-container {
    height: 50px;
    // background-color: #c00000;
    display: flex;
    align-items: center;
    padding: 0 10px;
    .my-search-box {
      display: flex;
      height: 36px;
      background-color: #fff;
      // border-radius: 18px;
      width: 100%;
      align-items: center;
      justify-content: center;
      .placeholder {
        font-size: 15px;
        margin-left: 5px;
      }

    }

  }
</style>
