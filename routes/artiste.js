const express = require('express');
const router = express.Router();

const artisteController = require('../controllers/artisteController');
const auth = require('../controllers/authentificationController');

router.get('/', artisteController.getAll);
router.get('/:id', artisteController.getById);
router.put('/', auth, artisteController.create);
router.post('/:id', auth, artisteController.update);
router.delete('/:id', auth, artisteController.delete);

module.exports = router;


