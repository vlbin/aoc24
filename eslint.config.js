import functional from "eslint-plugin-functional";
import tseslint from "typescript-eslint";

export default tseslint.config({
	files: ["**/*.ts"],

	extends: [
		tseslint.configs.recommended,
		functional.configs.recommended,
		functional.configs.stylistic,
	],
	languageOptions: {
		parser: tseslint.parser,
		parserOptions: {
			projectService: true,
		},
	},
	rules: {
		"functional/no-conditional-statements": "error",
		"functional/no-expression-statements": "off",
		"functional/no-return-void": "off",
	},
});
