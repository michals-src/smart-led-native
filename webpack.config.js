const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
	const config = await createExpoWebpackConfigAsync(
		{
			...env,
			babel: {
				dangerouslyAddModulePathsToTranspile: ['nativewind'],
			},
		},
		argv
	);

	config.module.rules.push({
		test: /\.css$/i,
		use: ['postcss-loader'],
	});

	config.module.rules.push({
		test: /\.ttf$/,
		loader: 'url-loader', // or directly file-loader
		include: path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
	});

	return config;
};
