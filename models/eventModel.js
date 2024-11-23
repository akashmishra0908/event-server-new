const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../db.json');

const getAllEvents = () => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};

const getEventById = (id) => {
    const events = getAllEvents();
    return events.find(event => event.id === id);
};
const getEventsByCategories = (categories) => {
    const events = getAllEvents();

    // If no categories specified or 'all' is included, return all events
    if (!categories || categories.length === 0 ||
        categories.some(cat => cat.toLowerCase() === 'all')) {
        return events;
    }

    // Filter events that match any of the specified categories
    return events.filter(event =>
        categories.some(category =>
            event.category.toLowerCase() === category.toLowerCase()
        )
    );
};

module.exports = {
    getAllEvents,
    getEventById,
    getEventsByCategories,
};