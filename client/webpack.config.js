const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
	// mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
		publicPath: '/',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,

				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[hash][ext][query]',
				},
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'static/images/[hash][ext][query]', // Updated path
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new CompressionPlugin({
			filename: '[path][base].gz',
			algorithm: 'gzip',
			test: /\.(js|css|html|svg)$/,
			threshold: 10240,
			minRatio: 0.8,
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
		},
		port: 9000,
		open: true,
		hot: true,
		historyApiFallback: true,
		compress: true,
		proxy: [
			{
				context: ['/graphql'],
				target:
					process.env.NODE_ENV === 'production'
						? '/api/graphql'
						: 'http://localhost:8000',
				secure: false,
				pathRewrite: {
					'^/graphql':
						process.env.NODE_ENV === 'production' ? '/api/graphql' : '/graphql',
				},
				changeOrigin: true,
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					compress: {
						drop_console: true,
					},
				},
			}),
			new CssMinimizerPlugin(),
		],
		splitChunks: {
			chunks: 'all',
		},
		runtimeChunk: 'single', // Ensure runtime chunk is handled correctly
	},
	resolve: {
		extensions: [
			'.js',
			'.jsx',
			'.json',
			'.woff',
			'.woff2',
			'.eot',
			'.ttf',
			'.otf',
		],
		modules: ['node_modules'],
	},
};
