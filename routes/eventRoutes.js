const express = require('express');
const router = express.Router();
const {
    getAllEvents,
    getEventById,
    getEventsByCategory,
} = require('../models/eventModel');

router.get('/', (req, res) => {
    const { category } = req.query;

    try {
        if (category) {
            const events = getEventsByCategory(category);
            return res.json({ id:null,events:events });
        }

        const events = getAllEvents();
        res.json({ events });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id', (req, res) => {
    const event = getEventById(req.params.id);

    if (!event) {
        return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ events: event });
});

module.exports = router;