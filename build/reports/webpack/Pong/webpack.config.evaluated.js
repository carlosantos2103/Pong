{
  mode: 'development',
  resolve: {
    modules: [
      'node_modules'
    ]
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'kotlin-source-map-loader'
        ],
        enforce: 'pre'
      }
    ]
  },
  entry: {
    main: [
      'D:\\00\\Programação\\KotlinJs\\Pong\\build\\js\\packages\\Pong\\kotlin\\Pong.js'
    ]
  },
  output: {
    path: 'D:\\00\\Programação\\KotlinJs\\Pong\\build\\distributions',
    filename: [Function: filename],
    library: 'Pong',
    libraryTarget: 'umd'
  },
  devtool: 'eval-source-map',
  devServer: {
    inline: true,
    lazy: false,
    noInfo: true,
    open: true,
    overlay: false,
    port: 8080,
    contentBase: [
      'D:\\00\\Programação\\KotlinJs\\Pong\\build\\processedResources\\Js\\main'
    ]
  }
}