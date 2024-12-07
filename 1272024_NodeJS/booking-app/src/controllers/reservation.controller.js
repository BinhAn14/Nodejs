const Reservation = require('../models/reservation.model');

exports.createReservation = async (req, res) => {
    try {
        const { service_id, date, time, number_of_people } = req.body;
        const user_id = req.user.userId;
        const reservation = new Reservation({ user_id, service_id, date, time, number_of_people });
        await reservation.save();
        res.status(201).json({ message: 'Reservation created successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error creating reservation' });
    }
};

exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ user_id: req.user.userId }).populate('service_id');
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching reservations' });
    }
};

exports.deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        await Reservation.findByIdAndDelete(id);
        res.json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting reservation' });
    }
};
