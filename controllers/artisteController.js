const {Festival} = require("../models/index");
const Artiste = require('../models/index').Artiste;

exports.getAll = (req, res, next) => {
    Artiste.findAll({
        attributes: ['id', 'nom', 'photo', 'date_passage', 'heure_passage', 'style']
    }).then(artistes => {
        res.status(200).json(artistes)
    }).catch(err => res.status(500).json({error: err.message}))
}

exports.getById = (req, res, next) => { // http://127.0.0.1:3000/artiste/1 par exemple
    Artiste.findOne({
        attributes: ['id', 'nom', 'photo', 'date_passage', 'heure_passage', 'style'],
        where: {
            id: req.params.id
        }
    }).then(artistes => {
        //Si le festival existe
        if(artistes) {
            res.status(200).json(artistes);
        } else {
            res.status(404).json({error: 'L\'artiste n\'a pas été trouvé'})
        }
    }).catch(err => res.status(500).json({error :err.message}))
}

exports.update = (req, res, next) => {
    Artiste.findOne({
        where: {
            id: req.params.id
        }
    }).then(artistes => {
        // Si l'artiste existe
        if (artistes) {
                artistes.nom = req.body.nom
                artistes.photo = req.body.photo
                artistes.heure_passage = req.body.heure_passage
                artistes.date_passage = req.body.date_passage
                artistes.style = req.body.style
            // On enregistre les modifications dans la base de données
                artistes.save()
                    .then(res.status(200).json())
                    .catch(err => res.status(500).json(err))
        } else res.status(404).json({error: 'L\'artiste n\'a pas été trouvé'})
    }).catch(err => res.status(500).json(err))
}

exports.delete = (req, res, next) => {
    Artiste.findOne({
        where: {
            id: req.params.id
        }
    }).then(artistes => {
        // Si l'artiste existe
        if (artistes) {
                // On détruit l'artiste
            artistes.destroy()
                    .then(() => res.status(200).json())
                    .catch(err => res.status(500).json(err))
        } else res.status(404).json({error: 'L\'artiste n\'a pas été trouvé'})
    }).catch(err => res.status(500).json(err))
}

exports.create = (req, res, next) => {
    //vérifier que l'artiste n'existe pas
    console.log(req.body)
    Artiste.findOne({
        where: {
            nom: req.body.nom
        }
    }).then(artistes => {
        if (artistes) {
            res.status(409).json({error: 'L\'artiste existe deja'})
        }
    // on créer l'artiste si il n'existe pas
        else {
            Artiste.create({
                nom: req.body.nom,
                photo: req.body.photo,
                heure_passage: req.body.heure_passage,
                date_passage: req.body.date_passage,
                style: req.body.style
            }).then(() => {
                res.status(201).json()
            }).catch(err => res.status(500).json(err))
        }
    }).catch(err => res.status(500).json(err))
}