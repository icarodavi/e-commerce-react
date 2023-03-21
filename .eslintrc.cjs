module.exports = {
    env: {
        es2021: true,
    },
    extends: [
        "airbnb",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint", "react-hooks"],
    rules: {
        "import/prefer-default-export": "off",
        "comma-dangle": "off",
        "jsx-a11y/label-has-associated-control": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "react/jsx-props-no-spreading": "off",
        "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
        "@typescript-eslint/explicit-function-return-type": [
            "off",
            {
                allowExpressions: true
            }
        ],
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                ts: "never",
                tsx: "never"
            }
        ],
        "no-tabs": 0,
        "react/jsx-indent-props": ["error", 4],
        "jsx-quotes": ["warn", "prefer-double"],
        quotes: ["off", "prefer-double"],
        indent: ["error", 4, { SwitchCase: 1, VariableDeclarator: 1 }],
        "@typescript-eslint/indent": ["error"],
        "react/jsx-indent": ["error", 4],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error"
    },
    settings: {
        "import/resolver": {
            typescript: {}
        }
    },
    overrides: [
        {
            files: ["*.ts"],
            rules: {
                indent: "off",
            },
        },
        {
            files: ["*.tsx"],
            rules: {
                "max-len": "off",
                "@typescript-eslint/indent": [2, 4],
            },
        },
    ],
};
