const express = require('express');
const router = express.Router();

const festivalController = require('../controllers/festivalController');
const auth = require('../controllers/authentificationController');

router.get('/', festivalController.getAll);
router.get('/:id', festivalController.getById);
router.put('/', auth, festivalController.create);
router.post('/:id', auth, festivalController.update);
router.delete('/:id', auth, festivalController.delete);

module.exports = router;


