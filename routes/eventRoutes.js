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
            return res.json({ success: true, data: events, count: events.length });
        }

        const events = getAllEvents();
        res.json({ success: true, data: events, count: events.length });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.get('/:id', (req, res) => {
    const event = getEventById(req.params.id);

    if (!event) {
        return res.status(404).json({ success: false, error: 'Event not found' });
    }

    res.json({ success: true, data: event });
});

module.exports = router;
