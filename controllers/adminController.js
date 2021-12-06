const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/index').Admin;


const keyToken = 'CS969dVVN70s2vWD5pxJUCsRE499308uTacBU179OQ06rgn5oIfZissIK13O7uA7k70Lpr48m3TxgvixGKBCD9OFKEvsQN5kp7J3HTxV7kSk8wuK0446yJGE5MJ4hj90xrQWCi0X2i3XB505wc047A93ekNjhng47meRWyymyuQ1501B2EiR6eovJx5oVEq248p9HI9u';

exports.login = (req, res, next) => {
    //Vérification que l'admin exite
    Admin.findOne({
        attributes: ["login", "password", "id"],
        where: {
            login: req.body.login
        }
    }).then(admin => {
        //Si il exite
        if (admin) {
            bcrypt.compare(req.body.password, admin.password)
                .then(valid => {
                    if (!valid)
                        res.status(401).json({error: "mot de passe incorrect"})
                    else {
                        res.status(200).json({
                            idAdmin: admin.id,
                            token: jwt.sign({
                                idAdmin: admin.id,
                                login: admin.login
                            },
                            keyToken)
                        })
                    }
                })
        }
    })
}

// Inscription d'un utilisateur
exports.register = (req, res) => {
    console.log("test");
    if (!(req.body.login) && req.body.password) {
        res.status(403).json({error: 'missing pseudo or password'})
    } else {
        bcrypt.hash(req.body.password, 10)
            .then(password => {
                Admin.create({
                    login: req.body.login,
                    password: password
                }).then(admin => {
                    res.status(201).json({
                        idAdmin: admin.id,
                        login: admin.login,
                        password: admin.password,
                        token: jwt.sign(
                            {idAdmin: admin.id, login: admin.login},
                            keyToken,
                        )
                    });
                }).catch(err => {
                    console.log(err)
                    res.status(500).json(err)
                })
            }).catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    }
}