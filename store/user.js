/** данные ( функция, которая возвращет объект с данными ) */
export const state = () => ({
  users: []
});

/** методы изменения store ( только синхронные ) первый параметр это state, второй данные ( то что будем передавать ) */
export const mutations = {
  setUsers(state, users) {
    state.users = users
  }
};

/** методы для полчения данных из api ( могут быть асинхронными ) */
export const actions = {
  async fetch({commit}) {
    //const users =  await this.$api("user", "index");


    commit('setUsers',[]);
  }
};

/** getters - обновление/получение данных из store */
export const getters = {
  list: s => s.users // s - сокращение от state
};