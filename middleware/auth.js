// Защищаем страницу about от не авторизованных пользователей

export default function ({store,redirect}) {
  if(!store.getters['auth/isAuth']) {
    redirect('/admin/login')
  }
}