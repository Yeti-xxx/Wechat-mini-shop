<template>
  <view class="my-container">

    <my-userInfo v-if="token">
      
    </my-userInfo>
    <my-login v-else>
    
    </my-login>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import badgeMix from '../../mixins/tabbar-badge.js'
  export default {
    mixins: [badgeMix],
    computed:{
      ...mapState('m_user',['token'])
    },
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss">
page,.my-container{
  height: 100%;
}
</style>
