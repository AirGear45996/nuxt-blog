import Cookie from 'cookie'; // для парсинга куков из строки в массив
import Cookies from 'js-cookie'; // запись/удаление куков
import jwtDecode from 'jwt-decode';

//region данные
export const state = () => ({
  token: null
});
//endregion

//region Мутации
// mutations вызывается через commit, например: store.commit('setToken',{token:'newToken'}');
export const mutations = { // методы изменения store ( только синхронные )
  setToken(state, token) {
      //console.log('token: ', token);
    state.token = token
  },
  clearToken(state) {
    state.token = null
  }
};
//endregion

//region Экшены
// actions вызывается через dispatch, например:
//    store.dispatch('increment'); # если в store/index.js
//    store.dispatch('auth/increment'); # если в store/auth.js
export const actions = { // полчения данных из api ( могут быть асинхронными )
    nuxtServerInit({dispatch}) {
      console.log('Я вызываюсь только один раз на серверной части');
      // Тут удобно формировать логику по авторизаци пользователя
      // Или предзагрузки данных, необходимых для работы приложения
    },
    setToken({commit},token) {
        this.$axios.setToken(token,'Bearer');
        commit('setToken',token);
        Cookies.set('jwt-token',token);
    },
    logout({commit}) {
        this.$axios.setToken(false);
        commit('clearToken');
        Cookies.remove('jwt-token');
    },
    async login({commit,dispatch},data) {
        data = Object.keys(data).map(k =>`${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&');
        return await this.$axios.$post('/api/auth/login',data )
            .then(res => {
                dispatch('setToken',res.token);
                return true;
            }).catch(error => {
                commit('setError',error.response.data.message,{root:true});
            });
        /*return await this.$api('auth','login',data).then(res => {
            dispatch('setToken',res.token);
            return true;
        })
        .catch(error => {
            commit('setError',error.response.data.message,{root:true});
        });*/
    },
    async create({commit},data) {
      return await this.$axios.$post(
          '/api/auth/createUser',
          Object.keys(data).map(k =>`${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&') )
          .then(res => {
              return res;
          })
          .catch(error => {
              commit('setError',error.response.data.message,{root:true});
          });
    },
    autoLogin({dispatch}) {
        const cookieStr = process.browser ? document.cookie : this.app.context.req.headers.cookie;
        const cookies = Cookie.parse(cookieStr || '') || {};
        const token = cookies['jwt-token'];

        if(isJwtValid(token)) {
            dispatch('setToken',token);
        } else {
            dispatch('logout');
        }
    }
};
//endregion

//region Геттеры
export const getters = { //  обновление/получение данных из store
  isAuth: s => !!s.token, // s - сокращение от state
  token: s => s.token // s - сокращение от state
};
//endregion

function isJwtValid(token) {
    if(!token) {
        return false;
    }

    const jwtData = jwtDecode(token) || {};
    const exp = jwtData.exp || 0;

    return ( new Date().getTime() / 1000 ) < exp
}