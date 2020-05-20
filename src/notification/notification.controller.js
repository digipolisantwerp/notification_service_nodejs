const notificationService = require('./notification.service');

function handleError(err, res) {
    if (err.status_code) {
        res.status(err.status_code);
    } else {
        res.status(500);
    }

    res.json(err);
}


/**
 * Get all in app messages
 * */
exports.getAllInAppMessages = (req, res) => {
    const { auth } = req.query;
    const queryParams = req.query;

    notificationService.getAllInAppMessages(auth, queryParams).then((response) => {
        res.json(response);
    }).catch((err) => {
        handleError(err, res);
    });
};

/**
 * Get a count of all in app messages
 * */
exports.getAllInAppMessagesUnreadCount = (req, res) => {
    const { auth } = req.query;
    const queryParams = req.query;

    notificationService.getAllInAppMessagesUnreadCount(auth, queryParams).then((response) => {
        res.json(response);
    }).catch((err) => {
        handleError(err, res);
    });
};

/**
 * set message status
 * */
exports.setInAppMessageStatus = (req, res) => {
    const { auth } = req.query;
    const { messageId } = req.params;
    notificationService.setInAppMessageStatus(auth, messageId, req.body).then((response) => {
        res.json(response);
    }).catch((err) => {
        handleError(err, res);
    });
};


/**
 * delete an in app message
 * */
exports.deleteInAppMessage = (req, res) => {
    const { auth } = req.query;
    const { messageId } = req.params;
    notificationService.deleteInAppMessage(auth, messageId).then((response) => {
        res.json(response);
    }).catch((err) => {
        handleError(err, res);
    });
};
