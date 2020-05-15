let notificationController = require('./notificationController');

module.exports = function (router, prefix) {
    /**
     * GET requests
     */
    router.get(`${prefix}/`, notificationController.get_all_in_app_messages);
    router.get(`${prefix}/overview`, notificationController.get_all_in_app_messages_unread_count);

    /**
     * PATCH requests
     */
    router.patch(`${prefix}/:messageId`, notificationController.set_in_app_message_status);


    /**
     * Delete requests
     */
    router.delete(`${prefix}/:messageId`, notificationController.delete_in_app_message);
}

