
export const actions = { // полчения данных из api ( могут быть асинхронными )
  async create({commit},data) {
    try {
        return await this.$axios.$post('/api/comment/create', data);
    } catch (e) {
        commit('setError',e, { root: true });
    }
  }
};