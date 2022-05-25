const app = require('express')();
const userRoutes = require('../routes/userRoutes');

app.use('/api', userRoutes);

module.exports = app;