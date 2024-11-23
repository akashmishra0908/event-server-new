const express = require('express');
const router = express.Router();
const {
    getAllEvents,
    getEventById,
    getEventsByCategories,
} = require('../models/eventModel');

router.get('/', (req, res) => {
    const { category } = req.query;

    try {
        let categories;
        if (category) {
            // Handle both string and array formats
            categories = Array.isArray(category) ? category : [category];
            const events = getEventsByCategories(categories);
            return res.json({ id: null, events: events });
        }

        const events = getAllEvents();
        res.json({ events });
    } catch (err) {
        console.error('Error handling events request:', err);
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