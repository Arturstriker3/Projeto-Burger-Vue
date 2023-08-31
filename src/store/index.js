import { createStore } from 'vuex'

export default createStore({
  state: {
    esta_logado: false,
  },
  getters: {
  },
  mutations: {
    logar: state => state.esta_logado = true,
    deslogar: state => state.esta_logado = false,
  },
  actions: {
  },
  modules: {
  }
})
