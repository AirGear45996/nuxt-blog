//region данные
export const state = () => ({
  error: null
});
//endregion

//region Мутации
// mutations вызывается через commit, например: store.commit('setToken',{token:'newToken'}');
export const mutations = { // методы изменения store ( только синхронные )
  setError(state, error) {
    console.log('setError: ', error);
    state.error = error;
  },
  clearError() {
    state.error = null
  }
};
//endregion

export const actions = { // полчения данных из api ( могут быть асинхронными )
  nuxtServerInit({dispatch}) {
    dispatch('auth/autoLogin');
  }
};

//region Геттеры
export const getters = { //  обновление/получение данных из store
  error: s => s.error // s - сокращение от state
};
//endregion