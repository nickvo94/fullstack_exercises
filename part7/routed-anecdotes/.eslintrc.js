module.exports = {
	'env': {
		'es2021': true,
		'node': true,
		'browser': true
	},
	'extends': [
		'eslint:recommended',
	],
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'plugins': ['react'],
	'rules': {
		'react/jsx-uses-react': 'error',   
		'react/jsx-uses-vars': 'error', 
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		]
	}
}
