const notificationService = require('./notificationService');


/**
 * Get all in app messages
 * */
exports.get_all_in_app_messages = (req, res) => {
    let auth = req.query.auth;
    let queryParams = req.query;

    notificationService.get_all_in_app_messages(auth, queryParams).then((response) => {
        res.json(response);
    }).catch((err) => {
        handle_error(err, res);
    });
};

/**
 * Get a count of all in app messages
 * */
exports.get_all_in_app_messages_unread_count = (req, res) => {
    let auth = req.query.auth;

    notificationService.get_all_in_app_messages_unread_count(auth).then((response) => {
        res.json(response);
    }).catch((err) => {
        handle_error(err, res);
    });
};

/**
 * set message status
 * */
exports.set_in_app_message_status = (req, res) => {
    let auth = req.query.auth;
    let messageId = req.params.messageId;
    notificationService.set_in_app_message_status(auth, messageId, req.body).then((response) => {
        res.json(response);
    }).catch((err) => {
        handle_error(err, res);
    });
};


/**
 * delete an in app message
 * */
exports.delete_in_app_message = (req, res) => {
    let auth = req.query.auth;
    let messageId = req.params.messageId;
    notificationService.delete_in_app_message(auth, messageId).then((response) => {
        res.json(response);
    }).catch((err) => {
        handle_error(err, res);
    });
};


function handle_error(err, res) {
    if (err.status_code) {
        res.status(err.status_code);
    } else {
        res.status(500);
    }

    res.json(err);
}
