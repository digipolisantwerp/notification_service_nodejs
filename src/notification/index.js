const notificationController = require('./notification.controller');

function notificationModule(router, prefix) {
    /**
     * GET requests
     */
    router.get(`${prefix}/`, notificationController.getAllInAppMessages);
    router.get(`${prefix}/overview`, notificationController.getAllInAppMessagesUnreadCount);

    /**
     * PATCH requests
     */
    router.patch(`${prefix}/:messageId`, notificationController.setInAppMessageStatus);


    /**
     * Delete requests
     */
    router.delete(`${prefix}/:messageId`, notificationController.deleteInAppMessage);
}

module.exports = notificationModule;
