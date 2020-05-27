const NotificationService = require('./notification.service');

exports.notificationController = (config) => {
    const notificationService = new NotificationService(config);


    const handleError = (err, res) => {
        if (err.status_code) {
            res.status(err.status_code);
        } else {
            res.status(500);
        }

        res.json(err);
    };

    return {
        /**
         * Get all in app messages
         * */
        getAllInAppMessages: (req, res) => {
            const queryParams = req.query;

            notificationService.getAllInAppMessages(queryParams).then((response) => {
                res.json(response);
            }).catch((err) => {
                handleError(err, res);
            });
        },

        /**
         * Get a count of all in app messages
         * */
        getAllInAppMessagesUnreadCount: (req, res) => {
            const queryParams = req.query;

            notificationService.getAllInAppMessagesUnreadCount(queryParams).then((response) => {
                res.json(response);
            }).catch((err) => {
                handleError(err, res);
            });
        },

        /**
         * set message status
         * */
        setInAppMessageStatus: (req, res) => {
            const { messageId } = req.params;
            notificationService.setInAppMessageStatus(messageId, req.body).then((response) => {
                res.json(response);
            }).catch((err) => {
                handleError(err, res);
            });
        },


        /**
         * delete an in app message
         * */
        deleteInAppMessage: (req, res) => {
            const { messageId } = req.params;
            notificationService.deleteInAppMessage(messageId).then((response) => {
                res.json(response);
            }).catch((err) => {
                handleError(err, res);
            });
        },
    };
};
