import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    searchHistoryList: []
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    // 搜素的历史记录本地存贮
    searchHistoryList (state, payload) {
      let arr = state.searchHistoryList
      arr.unshift(payload)
      // 对本地存储数据进行去重
      arr = [...new Set(arr)]
      state.searchHistoryList = arr
    },
    // 根据索引删除一个
    delHistory (state, index) { state.searchHistoryList.splice(index, 1) },
    // 删除所有的历史记录
    delAllHistory (state) { state.searchHistoryList = [] }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
