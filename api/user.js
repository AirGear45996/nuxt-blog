
const axios = require('axios');

// we can get data from any DB
async function getDataFromDB() {
    return [1,2,3];//(await require("axios").get(`http://localhost:8000/read`)).data;
}

async function index() {
    
    let res = await getDataFromDB();

    // some business logic
    /*let ret = res.data.map(el => {
        return {
            id: el.id,
            full_name: el.first_name + " " + el.last_name,
            highlight: el.first_name.charAt(0) === "J"
        };
    });
    ret = ret.sort(() => 0.5 - Math.random());*/

    return res; //ret;
}

async function show({id}) {
    let res = await getDataFromDB();
    return res.data.filter(el => el.id == id)[0];
}

export {index, show};