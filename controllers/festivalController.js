const {Sequelize} = require("sequelize");
const Festival = require('../models/index').Festival;
const Artiste = require('../models/index').Artiste;

exports.getAll = (req, res, next) => {
    Festival.findAll({
        attributes: ['date_deb', 'date_fin', 'id']
    }).then(festival => {
        res.status(200).json(festival)
    }).catch(err => res.status(500).json({error: err.message}))
}

exports.getById = (req, res, next) => {
    //Recherche du festival
    Festival.findOne({
        attributes: ['date_deb', 'date_fin', 'id'],
        where: {
            id: req.params.id
        }
    }).then(festival => {
        //Si le festival existe
        if(festival) {
            res.status(200).json(festival);
        } else {
            res.status(404).json({error: 'Le festival n\'a pas été trouvé'})
        }
    }).catch(err => res.status(500).json({error :err.message}))
}

exports.update = (req, res, next) => {
    Festival.findOne({
        where: {
            id: req.params.id
        }
    }).then(festival => {
        // Si le  festival existe
        if (festival) {
            festival.date_deb = req.body.date_deb
            festival.date_fin = req.body.date_fin
            // On enregistre les modifications dans la base de données
            festival.save()
                .then(res.status(200).json())
                .catch(err => res.status(500).json(err))
        } else res.status(404).json({error: 'Le festival n\'a pas été trouvé'})
    }).catch(err => res.status(500).json(err))
}

exports.delete = (req, res, next) => {
    Festival.findOne({
        where: {
            id: req.params.id
        }
    }).then(festival => {
        // Si l'artiste existe
        if (festival) {
            // On détruit le festival
            festival.destroy()
                .then(() => res.status(200).json())
                .catch(err => res.status(500).json(err))
        } else res.status(404).json({error: 'Le festival n\'a pas été trouvé'})
    }).catch(err => res.status(500).json(err))
}

exports.create = (res, req, next) => {
    Festival.findOne({
        where: {
            date_deb: req.body.date_deb
        }
    }).then(festival => {
        if (festival) {
            res.status(409).json({error: 'Le festival existe deja'})
        }
        // on créer le festival si il n'existe pas
        else {
            Festival.create({
                date_deb: req.body.date_deb,
                date_fin: req.body.date_fin,
            }).then(() => {
                res.status(201).json()
            }).catch(err => res.status(500).json(err))
        }
    }).catch(err => res.status(500).json(err))
}