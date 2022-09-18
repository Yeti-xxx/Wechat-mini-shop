<template>
  <view>
    <!-- 自定义绑定事件 -->
    <mySearch @myclick="gotoSearch"></mySearch>
    <view class="scroll-view-container">
      <!-- 左侧滑动区域 -->
      <scroll-view scroll-y="true" :style="{height:wh+'px'}" class="left-scroll-view">
        <block v-for="(item,i) in cateList" :key="i">
          <view :class="['left-scroll-view-item',i===active?'active':'']" @click="activeChange(i)">{{item.cat_name}}
          </view>
        </block>
      </scroll-view>
      <!-- 右侧滑动区域 -->
      <scroll-view scroll-y="true" :style="{height:wh+'px'}" class="right-scroll-view" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
          <!-- //二级分类的标题 -->
          <view class="cate-lv2-title">{{item2.cat_name}}</view>
          <!-- //三级分类内容 -->
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
              <image :src="item3.cat_icon" mode=""></image>
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  // 导入search组件
  import mySearch from '@/uni_modules/my-search/components/my-search/my-search.vue'
  export default {
    components:{
      mySearch
      },
    data() {
      return {
        // 可用的屏幕高度
        wh: 0,
        cateList: [],
        // 二级分类列表
        cateLevel2: [],
        // 默认激活项为0
        active: 0,
        // 用于重置三级分类中scroll高度
        scrollTop: 0
      };
    },
    onLoad() {
      uni.getSystemInfo({

      }).then(res => {
        this.wh = res.windowHeight
      })
      this.getcateList()
    },
    methods: {
      // 获取分类列表数据
      async getcateList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        // 判断是否获取失败
        if (res.meta.status !== 200) return uni.$showMsg()
        // 转存数据
        // 为一级列表赋值
        this.cateList = res.message
        // 为二级列表赋值
        // 默认为第一项
        this.cateLevel2 = res.message[0].children
      },
      activeChange(i) {
        this.active = i
        // 重置scrolltop,如果每次scrollTop的值均相同，则切换页面时不会回到顶部
        // 所以，我们使scrollTop在0,1之间切换
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
        // 当切换分类时，需要为二级分类列表数据进行替换
        this.cateLevel2 = this.cateList[i].children
      },
      // 从三级列表跳转到商品列表
      gotoGoodsList(item) {
        uni.navigateTo({
<<<<<<< HEAD
          // url: '/subpackage/goods_list/goods_list?cid=' + item.cat_id
          url: '/subpackage/goods_list/goods_list'
=======
          url: '/subpak/goods_list/goods_list?cid=' + item.cat_id
        })
      },

      gotoSearch(){
        uni.navigateTo({
          url:'/subpak/search/search'
>>>>>>> search
        })
      }


    },

  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        line-height: 60px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 12px;

        // 激活项的样式
        &.active {
          background-color: #ffffff;
          position: relative;

          // 渲染激活项左侧的红色指示边线
          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }

  .cate-lv2-title {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    padding: 15px 0;
  }

  .cate-lv3-list {
    display: flex;
    flex-wrap: wrap;

    .cate-lv3-item {
      width: 33.33%;
      display: flex;
      flex-direction: column;
      align-items: center;

      image {
        width: 60px;
        height: 60px;
      }

      text {
        font-size: 12px;
      }
    }
  }

  .right-scroll-view {
    background-color: #ffffff;
  }
</style>
