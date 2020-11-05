export default {

  head: { // Global page headers (https://go.nuxtjs.dev/config-head)
    title: 'nuxt-blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: 'red' },
  css: [ // Global CSS (https://go.nuxtjs.dev/config-css)
      'normalize.css/normalize.css',
      'element-ui/lib/theme-chalk/index.css',
      '@/assets/css/main.scss'
  ],
  plugins: [ // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    '@/plugins/globals',
    '@/plugins/element-ui',
      '@/plugins/axios',

    //region поддключение this.$api(controller,method,params = {})

    // Ппредставим, что у нас на странице находится 20 компонентов которые запрашивают данные через API,
    // таким образом за один запрос страницы c Nuxt сервером будет установлено 20 дополнительных внутренних http
    // соединений.
    // Nuxt HTTP сервер может обрабатывать более 55 тысяч запросов в секунду, однако создавая внутренние HTTP запросы,
    // мы уменьшаем потенциальные ресурсы сервера в десятки раз.
    // Но ведь когда мы рендерим страницу на сервере, у нас есть прямой доступ до всех контроллеров в папке /api/

    // Эти плагины решают данную проблему:
    '@/plugins/api-context.client.js', // отрабатывает на клиенте, создаёт ajax запрос через axios
    '@/plugins/api-context.server.js'  // отрабатывает на сервере, напрямую обращается к controller через required
    //endregion

  ],
  components: true, // Auto import components (https://go.nuxtjs.dev/config-components)
  buildModules: [ // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    '@nuxtjs/pwa'
  ],
  modules: [ // Modules (https://go.nuxtjs.dev/config-modules)
    '@nuxtjs/axios', // https://go.nuxtjs.dev/axios
    '@nuxtjs/markdownit', // https://www.npmjs.com/package/@nuxtjs/markdownit
  ],
  serverMiddleware: [
      //region api
      // Подключим наш API Server к Nuxt через serverMiddleware
      //... обработка параметров request.params -> конвертируем в json
      { path: "/api", handler: require("body-parser").json() },
      {
        path: "/api",
        handler: (req, res, next) => {
          const url = require("url");
          req.query = url.parse(req.url, true).query;
          req.params = { ...req.query, ...req.body };
          next();
        }
      },
      //.... обработчик внешних запросов ( от клиента )
      { path: "/api", handler: "@/serverMiddleware/api-server.js" }
      //endregion
  ],
  markdownit: {
    // [optional] markdownit options
    // See https://github.com/markdown-it/markdown-it
    injected: true,
    preset: 'default',
    linkify: true,
    breaks: true,
    html: true,
    use: [
      'markdown-it-div',
      'markdown-it-attrs',
      'markdown-it-highlightjs'
    ]
  },
  build: { // Build Configuration (https://go.nuxtjs.dev/config-build)
    transpile: [/^element-ui/],
  },

  env: {
    appName: 'SSR Blog'
  },
  axios: { // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    baseURL: process.env.BASE_URL || "http://localhost:8000",
  },
  /*pwa: {
    workbox: {
      /!* workbox options *!/
    },
    meta: {
      /!* meta options *!/
    }
  }*/
}

/**
 * deploy на herok:
 *  npm run build -> в папке .nuxt появится папка dist
 *
 *  установить ( если не установлен ) heroku: https://devcenter.heroku.com/articles/heroku-cli
 *  Зарегаться в системе: http://heroku.com/
 *
 *  создать новое приложение в heroku
 *
 *  Дока по деплою: https://ru.nuxtjs.org/faq/heroku-deployment/
 *
 *  в package.json Добавить скрипт: "heroku-postbuild": "npm run build"
 *
 *  в package.json Добавить:
 *  "engines": {
 *    "node": "10.x"
 *  },
 *
 *  Далее поставим системные переменные:
 *
 *  - Задём в настроки приложения на heroku, например: https://dashboard.heroku.com/apps/nuxt-ssr-blog-alkov/settings
 *  -
 *
 */
