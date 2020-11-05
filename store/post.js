//region данные
export const state = () => ({
  posts: null
});
//endregion

//region Мутации
// mutations вызывается через commit, например: store.commit('setToken',{token:'newToken'}');
export const mutations = { // методы изменения store ( только синхронные )
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
  }
};
//endregion

//region Экшены - вызывается через dispatch, например:
//    store.dispatch('increment'); # если в store/index.js
//    store.dispatch('auth/increment'); # если в store/auth.js
export const actions = { // полчения данных из api ( могут быть асинхронными )
    async fetch() {
        return await this.$axios.$get('/api/post/')
            .catch(error => {
                console.log('error: ', error);
                //commit('setError',error.response.data.message,{root:true});
            });
    },
    async fetchById({commit,dispatch},id) {
        return await this.$axios.$get(`/api/post/${id}`)
            .catch(error => {
                console.log('error: ', error);
                //commit('setError',error.response.data.message,{root:true});
            });
    },
    async delete({commit,dispatch},id) {
        return await this.$axios.$delete(`/api/post/admin/${id}`)
            .catch(error => {
                commit('setError',error.response.data.message,{root:true});
            });
    },
    async update({commit,dispatch},{id,text}) {
        return await this.$axios.$put(`/api/post/admin/${id}`,{text})
            .catch(error => {
                commit('setError',error.response.data.message,{root:true});
            });
    },
    async create({commit,dispatch},data) {

        const formData = new FormData();

        formData.append('title' , data.title    );
        formData.append('text'  , data.text     );
        formData.append('image' , data.image, data.image.name   );

        return await this.$axios.$post('/api/post/admin/', formData)
            .then(res => {
                return true;
            }).catch(error => {
                commit('setError',error.response.data.message,{root:true});
            });

    },
    async addView({commit,dispatch},{id,views}) {
        return await this.$axios.$put(`/api/post/${id}`,{views})
            .catch(error => {
                commit('setError',error.response.data.message,{root:true});
            });
    },
    async getAnalytics({commit}) {
        try {
            return await this.$axios.$get('/api/post/analytics');
        } catch (e) {
            commit('setError',e.response.data.message,{root:true});
            throw e;
        }

    },
};
//endregion

//region Геттеры
export const getters = { //  обновление/получение данных из store
    //fetch: s => s.posts // s - сокращение от state
};
//endregion