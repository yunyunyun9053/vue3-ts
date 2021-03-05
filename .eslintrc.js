module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'generator-star-spacing': 'off',
    'no-mixed-operators': 0,
		'no-tabs': 0,
    'vue/max-attributes-per-line': [
      2,
      {
        'singleline': 6,
        'multiline': {
          'max': 1,
          'allowFirstLine': false
        }
      }
    ],
    'vue/attribute-hyphenation': 0,
    'vue/html-self-closing': 0,
    'vue/component-name-in-template-casing': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/no-unused-components': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'vue/html-closing-bracket-newline': 0,
    // 'vue/no-parsing-error': 0,
		'quotes': [
      2,
      'single',
      {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }
		],
    'semi': [
      2,
      'never',
      {
        'beforeStatementContinuationChars': 'never'
      }
		],
    'no-delete-var': 2,
    'prefer-const': [
      2,
      {
        'ignoreReadBeforeAssign': false
      }
    ],
    'template-curly-spacing': 'off',
    'indent': 'off',
    'space-before-function-paren': ['error', {
      "anonymous": "always",
      "named": "ignore",
      "asyncArrow": "always"
    }]
	}
}
