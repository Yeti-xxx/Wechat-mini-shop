<template>
  <view>
    <view class="goods-list">
      <view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
        <view class="goods-item">
          <!-- 商品左侧图片区域 -->
          <view class="goods-item-left">
            <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
          </view>
          <!-- 商品右侧信息区域 -->
          <view class="goods-item-right">
            <!-- 商品标题 -->
            <view class="goods-name">{{goods.goods_name}}</view>
            <view class="goods-info-box">
              <!-- 商品价格 -->
              <view class="goods-price">￥{{toFixed(goods.goods_price)}}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  // import myGoods from '@/uni_modules/my-good/components/my-good/my-good.vue'
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pasesize: 10
        },
        goodsList: [],
        // 数据的总条数，实现分页
        total: 0,
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        // 页面节流阀
        isLoding: true
      };
    },
    computed: {
      // 处理金额显示位数
      toFixed(num) {
        return (num) => {
          return Number(num).toFixed(2)
        }
      }
    },
    onLoad(option) {
      this.queryObj.query = option.query || ''
      this.queryObj.cid = option.cid || ''
      this.getGoodsList()
    },
    onReachBottom() {
      if (this.queryObj.pagenum * this.queryObj.pasesize >= this.total) {
        return uni.$showMsg("数据加载完毕")
      }
      if (this.isLoding) {
        return
      }
      this.queryObj.pagenum++
      this.getGoodsList()
    },
    onPullDownRefresh() {
      // 重置关键数据
      this.queryObj.pagenum = 1
      this.total = 0
      this.isLoding = false
      this.goodsList = []
      this.getGoodsList(() => uni.stopPullDownRefresh())
    },
    methods: {
      // 获取商品列表数据
      async getGoodsList(cb) {
        // 打开节流阀
        this.isLoding = true
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        if (res.meta.status !== 200) return uni.$showMsg()
        // 为 data 中的数据赋值
        // 新旧数组拼接
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
        this.isLoding = false
        cb && cb()
        // console.log(this.goodsList);
      },
      gotoDetail(goods){
        uni.navigateTo({
          url:'/subpak/goods_detail/goods_detail?goods_id=' + goods.goods_id
        })
      }
    }

  }
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
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
        .goods-price {
          color: #c00000;
        }
      }
    }
  }
</style>
