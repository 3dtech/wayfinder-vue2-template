module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './'  : '/',
  outputDir: './dist/'
  //outputDir: '../../public/layouts/' + require('path').basename(__dirname)
}
