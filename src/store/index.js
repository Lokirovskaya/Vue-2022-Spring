import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 0:游客 1:普通用户 2:管理员 3:封禁用户
    // 建议不要用 this.$store.state.userstate 直接读这个字段，而是用下面的 this.$store.getters.islogged 之类的方法
    userstate: 0,
    userid: 0,
    username: "iL1nks",
    token: "",
    // sex: "OTHER",
    // phone_num: "18000000000",
    // email: "19374252@buaa.edu.cn",
    // school: "北京航空航天大学",
    // city: "北京市",
    // address: "北京市海淀区学院路37号",
    // user_status: "禁言中",
    // exp_now: 120, //当前经验值
    // exp_next_lv: 200, //下一等级经验值
  },
  getters: {
    is_unlogged(state) { return state.login_state === 0; },  // 游客？
    is_normal(state) { return state.login_state === 1; },  // 普通用户？
    is_admin(state) { return state.login_state === 2; },  // 管理员？
    is_banned(state) { return state.login_state === 3; },  // 被禁言？
    is_logged(state) { return state.login_state !== 0 }, // 已登录？
    // 能发帖？
    is_able_to_reply(state) { return state.login_state === 1 || state.login_state === 2; },
  },
  mutations: {
    set_userstate_to_unlogged(state) { state.login_state = 0; },
    set_userstate_to_normal(state) { state.login_state = 1; },
    set_userstate_to_admin(state) { state.login_state = 2; },
    set_userstate_to_banned(state) { state.login_state = 3; },
    set_userid(state, userid) { state.userid = userid; },
    set_username(state, username) { state.userid = username; },
    set_token(state, token) { state.token = token; },
  },
  actions: {
  },
  modules: {
  }
})
