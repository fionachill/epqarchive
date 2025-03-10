// This file is used to configure the proxy for the development server.
const { createProxyMiddleware } = require('http-proxy-middleware'); 

module.exports = function(app) {
    app.use(
        '/api/fetch-xml',
        createProxyMiddleware({
            target: 'http://localhost:3000',
            changeOrigin: true,
        })
    );
};