export default {
  namespaced: true,
  state: {
    list: [],
    detail: {}
  },
  getters: {
    getList: state => state.list,
    getDetail: state => state.detail
  },
  mutations: {
    UPDATE_LIST (state, list) {
      state.list = list
    },
    PUSH_LIST (state, list) {
      state.list = state.list.concat(list)
    },
    UPDATE_DETAIL (state, detail) {
      state.detail = {...state.detail, ...detail}
    }
  },
  actions: {
    refreshList ({commit}) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('UPDATE_LIST', [{id: 1, name: '111'}, {id: 2, name: '222'}, {id: 3, name: '333'}])
          resolve()
        }, 2000)
      })
    },
    upRefreshList ({commit}) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('PUSH_LIST', [{id: new Date().getTime(), name: '111'}])
          resolve()
        }, 2000)
      })
    },
    updateDetailName ({commit, state}, name) {
      commit('UPDATE_DETAIL', {...state.detail, name: name})
    }
  }
}
