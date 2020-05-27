const axios = require('axios');

module.exports = class NotificationService {
    constructor(config) {
        this.config = config;
    }


    /**
     * Helper function for handling responses
     */
    static handleResponse(resCode, resData) {
        return {
            status_code: resCode,
            data: resData,
        };
    }

    /**
     * Helper function for handling errors
     */
    static handleError(error) {
        return {
            status_code: (error.response) ? error.response.data.status : 500,
            status_text: (error.response) ? error.response.data.extraInfo : '',
        };
    }


    /**
     * Get all in app messages
     * @param queryParams optional
     */
    getAllInAppMessages(queryParams) {
        return new Promise((resolve, reject) => {
            const sentQueryParams = queryParams;
            const requestOptions = {
                headers: {
                    ApiKey: this.config.API_KEY,
                },
            };
            const { userId } = sentQueryParams;
            delete sentQueryParams.userId;
            const params = Object.keys(sentQueryParams).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(sentQueryParams[key])}`).join('&');

            axios.get(`${this.config.NOTIFICATION_API}inboxes/${userId}/messages?${params}`, requestOptions).then((response) => {
                if (response.status === 200) {
                    const objectToReturn = {
                        messages: response.data._embedded.messages,
                        currentPage: response.data._page.number,
                        totalPages: response.data._page.totalPages,
                    };
                    resolve(NotificationService.handleResponse(response.status, objectToReturn));
                } else {
                    reject({ status_code: response.status, status_text: response.statusText });
                }
            }).catch((err) => {
                reject(NotificationService.handleError(err));
            });
        });
    }

    /**
     * Get a count of in app unread messages
     */
    getAllInAppMessagesUnreadCount(queryParams) {
        return new Promise((resolve, reject) => {
            const requestOptions = {
                headers: {
                    ApiKey: this.config.API_KEY,
                },
            };
            axios.get(`${this.config.NOTIFICATION_API}inboxes/${queryParams.userId}`, requestOptions).then((response) => {
                if (response.status === 200) {
                    resolve(NotificationService
                        .handleResponse(response.status, response.data.unread));
                } else {
                    reject({ status_code: response.status, status_text: response.statusText });
                }
            }).catch((err) => {
                reject(NotificationService.handleError(err));
            });
        });
    }

    /**
     * set a status of an in app message
     * @param id required
     * @param {object} body required
     */
    setInAppMessageStatus(id, body) {
        return new Promise((resolve, reject) => {
            const requestOptions = {
                headers: {
                    ApiKey: this.config.API_KEY,
                },
            };
            axios.patch(`${this.config.NOTIFICATION_API}messages/${id}`, body, requestOptions).then((response) => {
                if (response.status === 200) {
                    resolve(NotificationService.handleResponse(response.status, response.data));
                } else {
                    reject({ status_code: response.status, status_text: response.statusText });
                }
            }).catch((err) => {
                reject(NotificationService.handleError(err));
            });
        });
    }


    /**
     * delete an in app message
     * @param id required
     */
    deleteInAppMessage(id) {
        return new Promise((resolve, reject) => {
            const requestOptions = {
                headers: {
                    ApiKey: this.config.API_KEY,
                },
            };
            axios.delete(`${this.config.NOTIFICATION_API}messages/${id}`, requestOptions).then((response) => {
                if (response.status === 200) {
                    resolve(NotificationService.handleResponse(response.status));
                } else {
                    reject({ status_code: response.status, status_text: response.statusText });
                }
            }).catch((err) => {
                reject(NotificationService.handleError(err));
            });
        });
    }
};
