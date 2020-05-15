let jwt = require('jsonwebtoken');
let crypto = require('crypto');

/**
 * Validate a JWT token
 * @param {object} jwtToken required
 */
exports.validate_jwt = (jwtToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(jwtToken, process.env.JWT_ENCRYPTION_VALIDATE, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    reject({'status_code': 401, 'message': 'Authentication expired. Please re-authenticate'});
                } else {
                    reject(err);
                }
            } else {
                decoded.aData = decrypt_token(decoded.aData);
                decoded.rData = decrypt_token(decoded.rData);

                resolve(decoded);
            }
        });
    });
}

/**
 * Helper function for encrypting tokens
 * @param {string} token required
 */
encrypt_token = (token) => {
    let encryption_key = crypto.createCipher('aes-128-cbc', process.env.JWT_ENCRYPTION_SECRET);
    let encrypted_token = encryption_key.update(token, 'utf8', 'hex');
    encrypted_token += encryption_key.final('hex');

    return encrypted_token;
}

/**
 * Helper function for decrypting tokens
 * @param {string} token required
 */
decrypt_token = (token) => {
    let encryption_key = crypto.createDecipher('aes-128-cbc', process.env.JWT_ENCRYPTION_SECRET);
    let decrypted_token = encryption_key.update(token, 'hex', 'utf8');
    decrypted_token += encryption_key.final('utf8');

    return decrypted_token;
}

/**
 * Helper function for decrypting tokens
 * @param {string} text required
 */
encrypt_logout_data = (text, password) => {
    let hash = crypto.createHash('sha1');
    hash.update(password);
    let key = hash.digest().slice(0, 16);
    let ivBuffer = Buffer.alloc(16);
    let cipher = crypto.createCipheriv('aes-128-ctr', key, ivBuffer);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
}
