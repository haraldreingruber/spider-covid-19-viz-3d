module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "mdcs",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "space-before-function-paren": ["error", {
            "anonymous": "always",
            "named": "always",
            "asyncArrow": "ignore"
        }],
    }
};