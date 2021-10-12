import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: [{
        id:"01",
        userInput: "admin01",
        pswdInput: "123456"
      },
      {
        id:"02",
        userInput: "admin02",
        pswdInput: "123456"
      },
    ],
  },
  getters: {},
  mutations: {},
  actions: {},
})

export default store
