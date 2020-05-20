module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "jasmine": true
    },
    "extends": ["eslint:recommended", "airbnb-base"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "plugins": ["jasmine"],
    "rules": {
        "no-underscore-dangle": ["error", { "allow": ["_id", "_embedded", "_page"] }],
        "prefer-promise-reject-errors": 0,
        "indent": ["error", 4],
    }
};
