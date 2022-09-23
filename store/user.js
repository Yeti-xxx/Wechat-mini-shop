export default {
  namespaced: true,
  state: () => ({
    // 收货地址
    address: JSON.parse(uni.getStorageSync('address') || '{}')
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
