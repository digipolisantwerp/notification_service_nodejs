let axios = require('axios');
let authModel = require('./auth');

/**
 * Get current logged in users profile
 * @param {object} auth required
 */
exports.get_user_profile = (auth) => {
    return new Promise((resolve, reject) => {
        authModel.validate_jwt(auth).then((response) => {
            var access_token = response.aData;

            get_profile(access_token).then((response) => {
                if (response.success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch((err) => {
                reject(err);
            });
        }).catch((err) => {
            reject({'status_code': 401, 'message': 'Authentication no longer valid. Please re-authenticate.'});
        });
    });
};

/**
 * Helper function for getting profile data
 * @param {string} access_token required
 */
get_profile = (access_token) => {
    return new Promise((resolve, reject) => {
        let meUrl = process.env.MPROFILE_API_PROD + '/me';
        let requestOptions = {headers: {"Authorization": "Bearer " + access_token}};

        axios.get(meUrl, requestOptions).then((response) => {
            if (response.data.success) {
                resolve(response.data);
            } else {
                reject({'status_code': 404, 'message': 'Failed to get user profile'});
            }
        }).catch((err) => {
            reject({'status_code': 500, 'message': err.response.data});
        });
    });
};

/**
 * Helper function for handling responses
 * @param {object} response required
 */
handle_response = (res_code, res_data, optionalData = {}) => {
    let data = {
        'status_code': res_code,
        'data': res_data
    };

    if (Object.keys(optionalData).length > 0) {
        for (let key of Object.keys(optionalData)) {
            data[key] = optionalData[key];
        }
    }

    return data;
};
