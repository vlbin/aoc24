import functional from 'eslint-plugin-functional';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  files: ['**/*.ts'],

  extends: [tseslint.configs.recommended, functional.configs.recommended, functional.configs.stylistic, prettier],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
    },
  },
  rules: {
    'functional/no-conditional-statements': 'error',
    'functional/no-expression-statements': 'off',
    'functional/functional-parameters': 'off',
    'functional/no-return-void': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
});
