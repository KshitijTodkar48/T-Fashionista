module.exports = {
  extends: ["custom/next"],
  "rules": {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/prefer-ts-expect-error": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "eslint-comments/require-description": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "no-console": 0,
    "react/no-unescaped-entities": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "@typescript-eslint/no-floating-promises": ["warn"]
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@", "./src"]
        ],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
      }
    }
  }
};
