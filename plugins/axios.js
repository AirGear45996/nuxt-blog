export default function ({ $axios, redirect, store, route }) {

    // позволяет прехватывает запрос и что то с ним делать
    $axios.interceptors.request.use( request => {

        if(
            !request.headers.common.Authorization &&
            store.getters['auth/token']
        ) {
            const token = store.getters['auth/token'];
            request.headers.common.Authorization = `Bearer ${token}`;
        }

        return request;
    });

    // ошибки
    $axios.onError(error => {
        if(error.response) {
            if(error.response.status === 500) { // Ошибка сервера
                console.error('Server 500 error');
            }
            if(error.response.status === 401) { // Ошибка авторизации
                if(route.path.indexOf('/admin/') !== -1) {
                    redirect('/admin/login?msg=session');
                    store.dispatch('auth/logout');
                }
            }
        }
    });

}