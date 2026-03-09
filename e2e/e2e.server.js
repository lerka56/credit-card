const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  static: {
    directory: './dist',
  },
  port: 9000,
  hot: false, // Отключаем hot reload для тестов
  liveReload: false,
  open: false,
});

server.start().then(() => {
  console.log('Server started on port 9000');
  if (process.send) {
    process.send('ok');
  }
}).catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});