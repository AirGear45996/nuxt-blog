// Т.к. мы часто будем пользоваться нашим API, то давайте немного улучшим код
// Создадим плагин для использования нашего API
// Чтобы можно было использовать this.$api("users", "show", {id: id});

export default (context, inject) => {
    inject("api", async (controller, method, params) => {
        //try {
            params = Object.keys(params).map(k =>`${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
            return await context.$axios["$" + (params ? "post" : "get")](
                "/api/" + controller + "/" + method,
                params
            );
        /*} catch (e) {
            //console.log('--------- api-context.client.js ---------');
            //console.error(e);
            //throw e;
            return e;
        }*/
    });
};