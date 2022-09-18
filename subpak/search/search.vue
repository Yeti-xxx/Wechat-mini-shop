<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" cancelButton="none" bgColor="#fff" focus="true"></uni-search-bar>
    </view>
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="serachResults.length !==0">
      <view class="sugg-item" v-for="(good,i) in serachResults" :key="i" @click="gotoDetail(good.goods_id)">
        <view class="goods-name">
          {{good.goods_name}}
        </view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item, i) in historyReverse" :key="i" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 延迟器
        timer: null,
        // 搜索关键词
        kw: '',
        serachResults: [],
        historyList: []
      };
    },
    onLoad() {
      // 页面加载时，获取搜素历史
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    computed: {
      // 将搜索历史列表的数组翻转，但用新的数组接受，防止元素组顺序紊乱
      historyReverse() {
        return [...this.historyList].reverse()
      }

    },
    methods: {
      input(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = e
          console.log(e);
          this.getSearchList()
        }, 500)
      },
      // 获取搜索建议数据
      async getSearchList() {
        //判断搜索关键词是否为空
        if (this.kw.length === 0) {
          this.serachResults = []
          return
        }
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.kw
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.serachResults = res.message
        // 获取到查询建议后，搜索历史添加该项
        this.saveSearchHistory()
      },
      gotoDetail(id) {
        console.log(id);
        uni.navigateTo({
          url: '/subpak/goods_detail/goods_detail?goods_id=' + id
        })
      },
      saveSearchHistory() {
        // 将数组转化为set对象
        const set = new Set(this.historyList)
        //为了搜索顺序，在添加之前先移除对应kw之前的所在外置
        set.delete(this.kw)
        // 再将其添加到后面
        set.add(this.kw)
        this.historyList = Array.from(set)
        // 实现搜索历史数组持久化存储
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      // 清空历史记录
      cleanHistory() {
        this.historyList = []
        uni.setStorageSync('kw', '[]')
      },
      // 点击历史记录跳转商品列表
      gotoGoodsList(kw) {
        uni.navigateTo({
          url: '/subpak/goods_list/goods_list?query=' + kw
        })
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

  .sugg-list {
    padding: 0 5px;

    // height: 900px;
    .sugg-item {
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .goods-name {
        // 文字不允许换行（单行文本）
        white-space: nowrap;
        // 溢出部分隐藏
        overflow: hidden;
        // 文本溢出后，使用 ... 代替
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

  .history-box {
    padding: 0 5px;

    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;

      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
        color: #000;
        background-color: #eee;
        border-color: #eee;
      }
    }
  }
</style>
