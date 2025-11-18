const propertyOrder = require("./css-property-order.cjs");

module.exports = {
  extends: [
    "stylelint-config-recommended",
    "stylelint-config-standard",
    "stylelint-config-css-modules",
    // 'stylelint-config-clean-order',
    "stylelint-config-standard-scss",
  ],
  plugins: [
    "stylelint-scss",
    "stylelint-high-performance-animation",
    "stylelint-selector-bem-pattern",
    "stylelint-order",
  ],
  ignoreFiles: ["./coverage/**/*.css", "./dist/**/*.css"],
  rules: {
    "selector-class-pattern": [
      "^[a-z0-9\\-]+(--[a-z0-9\\-]+)?(__[a-z0-9\\-]+)?$",
      {
        message:
          "Selector should be written in BEM (Block Element Modifier) notation.",
      },
    ],
    // Limit the number of universal selectors in a selector,
    // to avoid very slow selectors
    "selector-max-universal": 1,
    // Ordering
    "order/properties-order": propertyOrder,
    "declaration-empty-line-before": null,
    // --------
    // SCSS rules
    // --------
    "scss/dollar-variable-colon-space-before": "never",
    "scss/dollar-variable-colon-space-after": "always",
    "scss/dollar-variable-no-missing-interpolation": true,
    "scss/dollar-variable-pattern": /^[a-z-]+$/,
    "scss/double-slash-comment-whitespace-inside": "always",
    "scss/operator-no-newline-before": true,
    "scss/operator-no-unspaced": true,
    "scss/selector-no-redundant-nesting-selector": true,
    // Allow SCSS and CSS module keywords beginning with `@`
    "scss/at-rule-no-unknown": null,

    // 'scss/dollar-variable-empty-line-before': null,
  },
};
