// postcss.config.js
// 会自动读取这个文件
module.exports = {
    plugins: {
      'postcss-px-to-viewport': {
        viewportWidth: 375,
      },
    },
  };
  