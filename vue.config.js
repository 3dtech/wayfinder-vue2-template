module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './'  : '/',
  outputDir: './dist/',
  //outputDir: '../../public/layouts/' + require('path').basename(__dirname)
  pwa: {
    name: '3D Wayfinder',
    themeColor: '#262E30',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: "src-sw.js",
      swDest: 'service-worker.js',
    }
  }
}
