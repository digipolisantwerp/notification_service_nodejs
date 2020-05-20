const axios = require('axios');

/**
 * Helper function for handling responses
 */
const handleResponse = (resCode, resData) => ({
    status_code: resCode,
    data: resData,
});

/**
 * Helper function for handling errors
 */
const handleError = (error) => ({
    status_code: (error.response) ? error.response.data.status : 500,
    status_text: (error.response) ? error.response.data.extraInfo : '',
});

/**
 * Get all in app messages
 * @param {object} auth required
 * @param queryParams optional
 */
exports.getAllInAppMessages = (auth, queryParams) => new Promise((resolve, reject) => {
    const sentQueryParams = queryParams;
    const requestOptions = {
        headers: {
            Authorization: `Bearer ${auth}`,
            ApiKey: process.env.API_KEY,
        },
    };
    const { userId } = sentQueryParams;
    delete sentQueryParams.auth;
    delete sentQueryParams.userId;
    const params = Object.keys(sentQueryParams).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(sentQueryParams[key])}`).join('&');

    axios.get(`${process.env.NOTIFICATON_API}inboxes/${userId}/messages?${params}`, requestOptions).then((response) => {
        if (response.status === 200) {
            const objectToReturn = {
                messages: response.data._embedded.messages,
                currentPage: response.data._page.number,
                totalPages: response.data._page.totalPages,
            };
            resolve(handleResponse(response.status, objectToReturn));
        } else {
            reject({ status_code: response.status, status_text: response.statusText });
        }
    }).catch((err) => {
        reject(handleError(err));
    });
});

/**
 * Get a count of in app unread messages
 * @param {object} auth required
 */
exports.getAllInAppMessagesUnreadCount = (auth, queryParams) => new Promise((resolve, reject) => {
    const requestOptions = {
        headers: {
            Authorization: `Bearer ${auth}`,
            ApiKey: process.env.API_KEY,
        },
    };
    axios.get(`${process.env.NOTIFICATON_API}inboxes/${queryParams.userId}`, requestOptions).then((response) => {
        if (response.status === 200) {
            resolve(handleResponse(response.status, response.data.unread));
        } else {
            reject({ status_code: response.status, status_text: response.statusText });
        }
    }).catch((err) => {
        reject(handleError(err));
    });
});

/**
 * set a status of an in app message
 * @param {object} auth required
 * @param id required
 * @param {object} body required
 */
exports.setInAppMessageStatus = (auth, id, body) => new Promise((resolve, reject) => {
    const requestOptions = {
        headers: {
            Authorization: `Bearer ${auth}`,
            ApiKey: process.env.API_KEY,
        },
    };
    axios.patch(`${process.env.NOTIFICATON_API}messages/${id}`, body, requestOptions).then((response) => {
        if (response.status === 200) {
            resolve(handleResponse(response.status, response.data));
        } else {
            reject({ status_code: response.status, status_text: response.statusText });
        }
    }).catch((err) => {
        reject(handleError(err));
    });
});


/**
 * delete an in app message
 * @param {object} auth required
 * @param id required
 */
exports.deleteInAppMessage = (auth, id) => new Promise((resolve, reject) => {
    const requestOptions = {
        headers: {
            Authorization: `Bearer ${auth}`,
            ApiKey: process.env.API_KEY,
        },
    };
    axios.delete(`${process.env.NOTIFICATON_API}messages/${id}`, requestOptions).then((response) => {
        if (response.status === 200) {
            resolve(handleResponse(response.status));
        } else {
            reject({ status_code: response.status, status_text: response.statusText });
        }
    }).catch((err) => {
        reject(handleError(err));
    });
});
