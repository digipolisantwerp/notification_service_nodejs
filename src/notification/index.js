const notificationController = require('./notification.controller');
const notificationRouter = require('./notification.router');

module.exports = { ...notificationController, ...notificationRouter };
