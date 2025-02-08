const { createProxyMiddleware } = require('http-proxy-middleware');

const target =
	process.env.NODE_ENV === 'production'
		? '/api/graphql'
		: 'http://localhost:8000';

module.exports = function (app) {
	app.use(
		'/graphql',
		createProxyMiddleware({
			target: target,
			changeOrigin: true,
			pathRewrite: {
				'^/graphql':
					process.env.NODE_ENV === 'production' ? '/api/graphql' : '/graphql',
			},
		})
	);
};
