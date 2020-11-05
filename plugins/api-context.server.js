// Теперь функция this.$api на сервере будет напрямую вызывать метод контроллера,
// а на клиенте this.$api отправлять http запрос через axios.

export default (context, inject) => {
    inject("server", () => true);
    inject("api", async (controller, method, params) => {
        /*try {
            if (params && params.httpcall) {
                return await context.$axios["$" + (params ? "post" : "get")](
                    "/api/" + controller + "/" + method,
                    params
                );
            }*/
            let api = require("../api/" + controller.replace(/^\/+|\/+$|\.+/g, ""));
            return await api[method](params);
        /*} catch (e) {
            console.error(e);
            throw e;
        }*/
    });
};