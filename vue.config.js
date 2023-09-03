const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  devServer: {
    port: 8080, // Define a porta desejada, como 8081
  },
  transpileDependencies: true,
})