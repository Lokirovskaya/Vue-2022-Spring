import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_state : 0, // 0:游客 1:登陆用户 2:管理员
  },
  getters: {
  },
  mutations: {
    change_state0(state){ //切换到游客状态
      state.login_state = 0;
    },
    change_state1(state){ //切换到登陆用户状态
      state.login_state = 1;
    },
    change_state2(state){ //切换到管理员状态
      state.login_state = 2;
    },
  },
  actions: {
  },
  modules: {
  }
})
