export default {
  namespaced: true,
  state: () => ({
    // 收货地址
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    // token身份认证
    token: uni.getStorageSync('token') || '',
    // 用户基本信息
    userInfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    // 重定向的object对象
    redirectInfo: null
  }),

  // 方法
  mutations: {
    updateAddress(state, address) {
      state.address = address
      this.commit('m_user/saveAddressToStorage')
    },
    // 持久化存储收货地址
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo
      this.commit('m_user/saveUserInfoToStorage')
    },
    // 持久化存储用户信息
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userInfo))
    },
    updateToken(state, token) {
      state.token = token
      this.commit('m_user/saveTokenToStorage')
    },
    // 持久化存储token
    saveTokenToStorage(state) {
      uni.setStorageSync('token', JSON.stringify(state.token))
    },
    updateRedirectInfo(state, redirectInfo) {
      state.redirectInfo = redirectInfo

    }
  },

  getters: {
    // 抽离address
    addstr(state) {
      if (state.address.provinceNam) {
        return ''
      }

      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }

  }

}
