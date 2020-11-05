async function login(formData) {
    try {
        formData = Object.keys(formData).map(k =>`${encodeURIComponent(k)}=${encodeURIComponent(formData[k])}`).join('&');
        return await require('axios').post('/api/auth/login',formData);
    } catch (err) {
        return err;
    }
}
async function createUser(formData) {
    try {
        return await require('axios').post('/api/auth/createUser',formData);
    } catch (err) {
        return err;
    }
}

export { login, createUser };