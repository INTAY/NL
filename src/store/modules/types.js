import Vue from 'vue'
import axios from '@/https/index'
import Cookies from 'js-cookie'

const app = {
  state: {
    terminalType:[],  // 终端类型
    userStatus: [],   // 终端用户状态
    dataSources: [],   // 终端数据来源
    industryData: [],   // 行业类型
    positionChannel: [],   // 销售品渠道
  },
  mutations: {
    TERMINAL_TYPE: (state,terminalType) => {
      state.terminalType = terminalType;
    },
    USER_STATUS: (state,userStatus) => {
      state.userStatus = userStatus;
    },
    DATA_SOURCES: (state,dataSources) => {
      state.dataSources = dataSources;
    },
    INDUSTRY_DATA: (state,industryData) => {
      state.industryData = industryData;
    },
    POSITION_CHANNEL: (state,positionChannel) => {
      state.positionChannel = positionChannel;
    },
    
  },
  // actions: {
  //   terminalTypeList: ({ commit }) => {
  //     let { _this } = new Vue();
  //     var terminalType = [];
  //     axios.postAjax(serviceGateway + service532 +  'dict/select' , {type:'terminal_type'}).then(res => {
  //       res.result.forEach(item => {
  //         var obj = {
  //           value:item.code,
  //           label:item.desc
  //         }
  //         terminalType.push(obj);
  //       })
  //     });

  //     commit('TERMINAL_TYPE', terminalType)
  //   },
  //   userStatusList({ commit }) {
  //     var userStatus = [];
  //     axios.postAjax(serviceGateway + service532 +  'dict/select' , {type:'terminal_user_status'}).then(res => {
  //       res.result.forEach(item => {
  //         var obj = {
  //           value:item.code,
  //           label:item.desc
  //         }
  //         userStatus.push(obj);
  //       })
  //     });

  //     commit('USER_STATUS', userStatus)
  //   },
  //   dataSourcesList({ commit }) {
  //     var dataSources = [];
  //     axios.postAjax(serviceGateway + service532 +  'dict/select' , {type:'terminal_source'}).then(res => {
  //       res.result.forEach(item => {
  //         var obj = {
  //           value:item.code,
  //           label:item.desc
  //         }
  //         dataSources.push(obj);
  //       })
  //     });

  //     commit('DATA_SOURCES', dataSources)
  //   },
  //   industryDataList({ commit }) {
  //     var industryData = [];
  //     axios.postAjax(serviceGateway + service532 +  'dict/select' , {type:'terminal_industry'}).then(res => {
  //       res.result.forEach(item => {
  //         var obj = {
  //           value:item.code,
  //           label:item.desc
  //         }
  //         industryData.push(obj);
  //       })
  //     });
  //     commit('INDUSTRY_DATA', industryData)
  //   },
  //   positionChannelList({ commit }) {
  //     var positionChannel = [];
  //     axios.postAjax(serviceGateway + service532 +  'dict/select' , {type:'position_channel'}).then(res => {
  //       res.result.forEach(item => {
  //         var obj = {
  //           value:item.code,
  //           label:item.desc
  //         }
  //         positionChannel.push(obj);
  //       })
  //     });
  //     commit('POSITION_CHANNEL', positionChannel)
  //   },
  // }
}

export default app
