const express = require('express');
const { authenticate } = require('../middleware/auth.middleware');
const { createReservation, getReservations, deleteReservation } = require('../controllers/reservation.controller');
const router = express.Router();

router.post('/', authenticate, createReservation);
router.get('/', authenticate, getReservations);
router.delete('/:id', authenticate, deleteReservation);

module.exports = router;
