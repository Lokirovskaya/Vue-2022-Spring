import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_state : 0, // 0:游客 1:登陆用户 2:管理员
    username: "iL1nks",
    sex: "OTHER",
    phone_num: "18000000000",
    email: "19374252@buaa.edu.cn",
    school: "北京航空航天大学",
    city: "北京市",
    address: "北京市海淀区学院路37号",
    user_status: "禁言中",
    exp_now: 120, //当前经验值
    exp_next_lv: 200, //下一等级经验值
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
