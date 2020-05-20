let axios = require('axios');

/**
 * Get all in app messages
 * @param {object} auth required
 * @param queryParams optional
 */
exports.get_all_in_app_messages = (auth, queryParams) => {
    return new Promise((resolve, reject) => {
        let requestOptions = {
            headers: {
                'Authorization': 'Bearer ' + auth,
                'ApiKey': process.env.API_KEY
            }
        };
        let userId = queryParams.userId;
        delete queryParams.auth;
        delete queryParams.userId;
        let params = Object.keys(queryParams).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key])
        }).join('&');

        axios.get(process.env.NOTIFICATON_API + 'inboxes/' + userId + '/messages?' + params, requestOptions).then((response) => {

            if (response.status === 200) {
                const objectToReturn = {
                    messages: response.data._embedded.messages,
                    currentPage: response.data._page.number,
                    totalPages: response.data._page.totalPages
                };
                resolve(handle_response(response.status, objectToReturn));
            } else {
                reject({ 'status_code': response.status, 'status_text': response.statusText });
            }
        }).catch((err) => {
            reject(handle_error(err));
        });
    });
};

/**
 * Get a count of in app unread messages
 * @param {object} auth required
 */
exports.get_all_in_app_messages_unread_count = (auth, queryParams) => {
    return new Promise((resolve, reject) => {
        let requestOptions = {
            headers: {
                'Authorization': 'Bearer ' + auth,
                'ApiKey': process.env.API_KEY
            }
        };
        axios.get(process.env.NOTIFICATON_API + 'inboxes/' + queryParams.userId, requestOptions).then((response) => {
            if (response.status === 200) {
                resolve(handle_response(response.status, response.data.unread));
            } else {
                reject({ 'status_code': response.status, 'status_text': response.statusText });
            }
        }).catch((err) => {
            reject(handle_error(err));
        });
    });
};

/**
 * set a status of an in app message
 * @param {object} auth required
 * @param id required
 * @param {object} body required
 */
exports.set_in_app_message_status = (auth, id, body) => {
    return new Promise((resolve, reject) => {
        let requestOptions = {
            headers: {
                'Authorization': 'Bearer ' + auth,
                'ApiKey': process.env.API_KEY
            }
        };
        axios.patch(process.env.NOTIFICATON_API + 'messages/' + id, body, requestOptions).then((response) => {
            if (response.status === 200) {
                resolve(handle_response(response.status, response.data));
            } else {
                reject({ 'status_code': response.status, 'status_text': response.statusText });
            }
        }).catch((err) => {
            reject(handle_error(err));
        });
    });
};


/**
 * delete an in app message
 * @param {object} auth required
 * @param id required
 */
exports.delete_in_app_message = (auth, id) => {
    return new Promise((resolve, reject) => {
        let requestOptions = {
            headers: {
                'Authorization': 'Bearer ' + auth,
                'ApiKey': process.env.API_KEY
            }
        };
        axios.delete(process.env.NOTIFICATON_API + 'messages/' + id, requestOptions).then((response) => {
            if (response.status === 200) {
                resolve(handle_response(response.status));
            } else {
                reject({ 'status_code': response.status, 'status_text': response.statusText });
            }
        }).catch((err) => {
            reject(handle_error(err));
        });
    });
};

/**
 * Helper function for handling responses
 */
handle_response = (res_code, res_data, ) => {
    return {
        'status_code': res_code,
        'data': res_data
    };
};

/**
 * Helper function for handling errors
 */
handle_error = (error) => {
    return {
        status_code: (error.response) ? parseInt(error.response.data.status) : 500,
        status_text: (error.response) ? error.response.data.extraInfo : ''
    }
};
