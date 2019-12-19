module.exports = {
  devServer: {
    proxy: {
      '^/api/v1': {
        target: '/api/v1',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
