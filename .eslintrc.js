module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/essential",
        "plugin:@typescript-eslint/recommended",
        "@nuxtjs/eslint-config-typescript"
    ],
    parserOptions: {
        ecmaVersion: "latest",
        parser: "@typescript-eslint/parser",
        sourceType: "module"
    },
    plugins: [
        "vue",
        "@typescript-eslint"
    ],
    rules: {
        "vue/script-setup-no-uses-vars": "off",
        "vue/require-v-for-key": "off",
        "vue/no-mutating-props": "off",
        "vue/require-default-prop": "off",
        "vue/multi-word-component-names": "off",
        "@typescript-eslint/no-unused-vars": "off",
        camelcase: "off",
        quotes: [
            "error",
            "double"
        ],
        semi: [
            "error",
            "always"
        ],
        indent: [
            "warn",
            4
        ],
        "no-multi-spaces": [
            "error"
        ]
    }
};
