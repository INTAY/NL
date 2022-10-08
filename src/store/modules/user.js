import { loginService, logout, getInfo } from '@/api/login'
import { getMenu } from '@/api/roleManage'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { msgUnreadCountApi } from "@/api/messageCenter"

const user = {
  state: {
    token: getToken(),
    name: '',
    imgUrl: '',
    roles: [],
    menuData:[],
    msgCount:""
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_IMGURL: (state, imgUrl) => {
      state.imgUrl = imgUrl
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENU:(state,menuData)=>{
      state.menuData = menuData
    },
    SET_MSG_COUNT:(state,msgCount)=>{
      state.msgCount = msgCount
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //获取权限菜单
    GetMenuData({ commit }) {
        return new Promise((resolve, reject) => {
          getMenu().then(response => {
            window.localStorage.setItem("menuData",JSON.stringify(response.data));
          commit('SET_MENU', response.data)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      let staffId = window.localStorage.getItem("staffId");
      return new Promise((resolve, reject) => {
        getInfo(staffId).then(response => {
          const data = response.data
          commit('SET_NAME', data.name)
          commit('SET_IMGURL', data.imgUrl)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 消息未读数据
    GetMsgUnreadCount({ commit }) {
      return new Promise((resolve, reject) => {
        let params = {
          receiverId:localStorage.getItem('staffId')
        }
        msgUnreadCountApi(params).then(response => {
          commit('SET_MSG_COUNT', response.data)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
