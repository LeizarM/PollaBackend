const express = require('express');
const router = express.Router();
const pollaController = require('../controllers/pollaController');


router.post('/login',pollaController.login);

router.post('/tournament', pollaController.getAllTournament);

router.post('/matches', pollaController.matchesXTournament);

router.post('/bet', pollaController.submitBet);

router.post('/expire',pollaController.expire);

router.post('/seebets', pollaController.seeBets);

router.post('/noSeebeets', pollaController.noSeeBets);

module.exports = router;
