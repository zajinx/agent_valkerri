const WorkerPlugin = require('worker-plugin')
module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      publish: ['github']
    }
  },
  configureWebpack: {
    plugins: [new WorkerPlugin()]
  }
}