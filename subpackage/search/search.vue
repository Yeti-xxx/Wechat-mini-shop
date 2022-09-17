<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" cancelButton="none" bgColor="#fff" focus="true"></uni-search-bar>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    },
    methods:{
      input(e){
        console.log(e);
      }
    }
  }
</script>

<style lang="scss">
.search-box {
  // 设置定位效果为“吸顶”
  position: sticky;
  // 吸顶的“位置”
  top: 0;
  // 提高层级，防止被轮播图覆盖
  z-index: 999;
}
</style>
