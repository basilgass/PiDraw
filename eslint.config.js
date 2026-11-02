import eslint from "@eslint/js"
import {defineConfig} from "eslint/config"
import typescriptEslint from "typescript-eslint"

export default defineConfig(
	{ignores: ['*.d.ts', '**/coverage', '**/dist', 'scripts/**', 'src/completions/data.ts']},
	{
		extends: [
			eslint.configs.recommended,
			...typescriptEslint.configs.strictTypeChecked,
			...typescriptEslint.configs.stylisticTypeChecked,
		],
		languageOptions: {
			parserOptions: {
				project: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			semi: ['error', 'never'],
			"@typescript-eslint/explicit-member-accessibility": ["error", {
				accessibility: "no-public"
			}],
			curly: ['error', 'multi-line'],
			"prefer-const": ["error", {
				"destructuring": "all",
				"ignoreReadBeforeAssign": false
			}],
			"one-var": ["error", "never"],
			"@typescript-eslint/no-unused-vars": ["error", {
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
				caughtErrorsIgnorePattern: "^_",
			}],
			"@typescript-eslint/unified-signatures": "off",
			"@typescript-eslint/no-unnecessary-condition": "warn",
			"@typescript-eslint/restrict-template-expressions": ["error", {
				allowNumber: true,
				allowAny: false,
				allowBoolean: false,
				allowNullish: false,
				allowRegExp: false,
				allowNever: false,
			}],
		}
	},
)
