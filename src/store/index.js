import Vue from 'vue'
import Vuex from 'vuex'
import jwt from "../common/jwt"
import http from "../http"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0, // count 를 0 으로 초기화
    token: {
      accessToken: jwt.getToken(),
    }, // 토큰정보
    isAuthenticated: !!jwt.getToken(),
  },
  getters: {
    getAccessToken: function (state) {
      return state.token.accessToken
    },
    isAuthenticated: function (state) {
      return state.isAuthenticated
    },
  },
  mutations: {
    logout: function (state, payload = {}) {
      console.log(payload)
      state.token.accessToken = ""
      state.isAuthenticated = false
      jwt.destroyToken()
      alert('로그아웃 되었습니다!')
    },
    login: function (state, payload = {}) {
      state.token.accessToken = payload.accessToken
      state.isAuthenticated = true
      jwt.saveToken(payload.accessToken)
    },
  },
  actions: {
    logout: function (context, payload) {
      return new Promise(resolve => {
        setTimeout(function () {
          context.commit("logout", payload)
          resolve({})
        }, 1000)
      })
    },
    register: function (context, payload) {
      console.log("register")
      let params = {
        user_id: payload.userId,
        password: payload.userPassword,
        user_name: payload.userName,
      }
      return new Promise((resolve) => {
        http
          .post("/admin/signup", params)
          .then(response => {
            const { data } = response
            console.log(data)
            context.commit("login", {
              accessToken: data.accessToken,
            })

            resolve(response)
          })
          .catch(error => {
            alert(error.response.data.message)
            //reject(error)
          })
      })
    },
    login: function (context, payload) {
      if (this.userId=="") {
        alert("아이디를 입력해주세요!");
        return false;
      }
      if (this.password=="") {
        alert("비밀번호를 입력해주세요!");
        return false;
      }
      let params = {
        user_id: payload.userId,
        password: payload.password,
      }
      return new Promise((resolve) => {
        http
          .post("/admin/signin", params)
          .then(response => {
            const { data } = response
            context.commit("login", {
              accessToken: data.accessToken,
            })

            resolve(response)
          })
          .catch(error => {

            alert(error.response.data.message)
          })
      })
    },
  },
  modules: {
   
  }
})

