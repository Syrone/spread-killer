const { override, addWebpackModuleRule } = require("customize-cra")

module.exports = override(
  addWebpackModuleRule({
    test: /\.(jpe?g|png)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        loader: 'webp-loader',
        options: {
          quality: 75
        }
      }
    ]
  })
)
