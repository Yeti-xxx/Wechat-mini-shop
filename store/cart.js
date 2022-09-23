export default {
  // 为当前模块开启命名空间
  namespaced: true,
  // 模块的 state 数据
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),

  // 模块的 mutations 方法
  mutations: {
    addToCart(state, goods) {
      // 根据提交的商品的Id，查询购物车中是否存在这件商品
      // 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)

      if (!findResult) {
        // 如果购物车中没有这件商品，则直接 push
        state.cart.push(goods)
      } else {
        // 如果购物车中有这件商品，则只更新数量即可
        findResult.goods_count++
      }
      this.commit('m_cart/saveToStorage')
    },
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // 更新购物车中的勾选状态
    updateGoodsState(state, goods) {

      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_state = goods.goods_state
        this.commit('m_cart/saveToStorage')
      }
    },
    // 更新购物车商品数量
    updateGoodsCount(state, goods) {
      // 根据 goods_id 查询购物车中对应商品的信息对象
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findResult) {
        // 更新对应商品的数量
        findResult.goods_count = goods.goods_count
        // 持久化存储到本地

        this.commit('m_cart/saveToStorage')
      }
    },
    // 删除商品
    removeGoodsById(state, goods_id) {
      // 调用数组的 filter 方法进行过滤
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      // 持久化存储到本地
      this.commit('m_cart/saveToStorage')
    },
    // 全选按钮改变商品勾选状态
    updateAllGoodsState(state, newState) {
      state.cart.forEach(x => x.goods_state = newState)
      // 持久化存储到本地
      this.commit('m_cart/saveToStorage')
    }

  },

  // 模块的 getters 属性
  getters: {
    // 所有商品总数量
    total(state) {
      return state.cart.reduce((total, item) => total += item.goods_count, 0)
    },
    // 购物车已勾选数量
    checkedCount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
    },
    // 获取已勾选商品的总价格
    checkGoodsAmount(state) {
      return state.cart.filter(x => x.goods_state)
                        .reduce((total, item) => total += item.goods_count * item.goods_price, 0)
                        .toFixed(2)
    }
  },
}
