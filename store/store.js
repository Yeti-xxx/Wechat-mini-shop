// 从vuex中导入store的构造方法
import moduleCart from '../store/cart'
import moduleUser from '../store/user.js'
import {
  createStore
} from 'vuex'


//创建一个新的store实例，然后挂载上面的三个对象
const store = createStore({
  modules:{
    'm_cart': moduleCart,
    'm_user': moduleUser
  }
})
//导出store实例
export default store
