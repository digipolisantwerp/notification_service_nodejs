let axios = require('axios');
let authService = require('../services/auth');
let profileService = require('../services/profile');

/**
 * Get all in app messages
 * @param {object} auth required
 * @param queryParams optional
 */
exports.get_all_in_app_messages = (auth, queryParams) => {
  return new Promise((resolve, reject) => {
    authService.validate_jwt(auth).then(async (response) => {
      let requestOptions = {
        headers: {
          'Authorization': 'Bearer ' + auth,
          'ApiKey': process.env.API_KEY
        }
      };
      delete queryParams.auth;
      let params = Object.keys(queryParams).map((key) => {
          return encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key])
      }).join('&');
      const profile = await profileService.get_user_profile(auth);

      axios.get(process.env.NOTIFICATON_API + 'inboxes/' + profile.data.id+ '/messages?' + params, requestOptions).then((response) => {

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
    }).catch((err) => {
      reject({ 'status_code': 401, 'status_text': 'Authentication no longer valid. Please re-authenticate.' });
    });
  });
};

/**
 * Get a count of in app unread messages
 * @param {object} auth required
 */
exports.get_all_in_app_messages_unread_count = (auth) => {
  return new Promise((resolve, reject) => {
    authService.validate_jwt(auth).then(async (response) => {
      let requestOptions = {
        headers: {
          'Authorization': 'Bearer ' + auth,
          'ApiKey': process.env.API_KEY
        }
      };
      const profile = await profileService.get_user_profile(auth);

      axios.get(process.env.NOTIFICATON_API + 'inboxes/' + profile.data.id, requestOptions).then((response) => {
        if (response.status === 200) {
          resolve(handle_response(response.status, response.data.unread));
        } else {
          reject({ 'status_code': response.status, 'status_text': response.statusText });
        }
      }).catch((err) => {
        reject(handle_error(err));
      });
    }).catch((err) => {
      reject({ 'status_code': 401, 'status_text': 'Authentication no longer valid. Please re-authenticate.' });
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
    authService.validate_jwt(auth).then(async (response) => {
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
    }).catch((err) => {
      reject({ 'status_code': 401, 'status_text': 'Authentication no longer valid. Please re-authenticate.' });
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
    authService.validate_jwt(auth).then(async (response) => {
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
    }).catch((err) => {
      reject({ 'status_code': 401, 'status_text': 'Authentication no longer valid. Please re-authenticate.' });
    });
  });
};

/**
 * Helper function for handling responses
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

/**
 * Helper function for handling errors
 */
handle_error = (error) => {
  let data = {
    status_code: (error.response) ? parseInt(error.response.data.status) : 500,
    status_text: (error.response) ? error.response.data.extraInfo : ''
  }

  return data;
};
