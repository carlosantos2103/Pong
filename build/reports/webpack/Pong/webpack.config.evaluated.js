{
  mode: 'production',
  resolve: {
    modules: [
      'D:\\00\\Programacao\\KotlinJs\\Pong\\build\\js\\packages\\Pong\\kotlin-dce',
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
      'D:\\00\\Programacao\\KotlinJs\\Pong\\build\\js\\packages\\Pong\\kotlin-dce\\Pong.js'
    ]
  },
  output: {
    path: 'D:\\00\\Programacao\\KotlinJs\\Pong\\build\\distributions',
    filename: [Function: filename],
    library: 'Pong',
    libraryTarget: 'umd'
  },
  devtool: 'source-map'
}