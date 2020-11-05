const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const UserModel = require('../models/user.model');

// Авторизация
module.exports.login = async (req,res) => {
    //res.setHeader('Content-Type', 'application/json');
    const candidate = await UserModel.findOne({ 'login': req.body.login });
    if(candidate) {
        const isPasswordCorrect = bcrypt.compareSync(req.body.password,candidate.password);
        if(isPasswordCorrect) {

            const token = jwt.sign({
                userId: candidate._id,
                login: candidate.login,
            }, config.JWT ,{expiresIn: 60 * 60});

            res.json({ token });

        } else {
            //res.status(401).json({ message:'Не верный пароль' }); // дыра в безопастности
            res.status(404).json({ message: 'Пользователь не найден' });
        }
    } else {
        res.status(404).json({ message: 'Пользователь не найден'});
    }
};

// Создание пользвоателя
module.exports.createUser = async (req,res) => {
    
    res.setHeader('Content-Type', 'application/json');
    const candidate = await UserModel.findOne({ 'login': req.body.login });
    if(candidate) {
        res.status(409).json({ message:'Такой логин уже занят' });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const user = new UserModel({
            login: req.body.login,
            password: bcrypt.hashSync(req.body.password,salt),
        });
        await user.save();
        res.status(201).json({user}); // 201 - успешное создание
    }
};