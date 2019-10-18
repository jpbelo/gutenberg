module.exports = function( api ) {
	api.cache( true );

	return {
		presets: [ '@wordpress/babel-preset-default' ],
		plugins: [ 'babel-plugin-inline-json-import' ],
		env: {
			test: {
				plugins: [ 'babel-plugin-require-context-hook' ],
			},
		},
	};
};
