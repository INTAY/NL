const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  historyRouter: state => state.app.historyRouter,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  terminalType: state => state.types.terminalType,
  userStatus: state => state.types.userStatus,
  dataSources: state => state.types.dataSources,
  industryData: state => state.types.industryData,
  positionChannel: state => state.types.positionChannel,
  
}
export default getters
