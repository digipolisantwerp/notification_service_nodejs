const express = require('express');

const router = express.Router();
const notificationController = require('./notification.controller');

exports.notificationRouter = (config) => {
    const notification = notificationController.notificationController(config);


    /**
     * GET requests
     */
    router.get('/', notification.getAllInAppMessages);
    router.get('/overview', notification.getAllInAppMessagesUnreadCount);

    /**
     * PATCH requests
     */
    router.patch('/:messageId', notification.setInAppMessageStatus);


    /**
     * Delete requests
     */
    router.delete('/:messageId', notification.deleteInAppMessage);

    return router;
};
