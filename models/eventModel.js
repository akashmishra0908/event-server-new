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

const getEventsByCategory = (category) => {
    const events = getAllEvents();
    return events.filter(event => event.category.toLowerCase() === category.toLowerCase());
};

module.exports = {
    getAllEvents,
    getEventById,
    getEventsByCategory,
};
