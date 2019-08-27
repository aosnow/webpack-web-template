module.exports = {
  presets: [
    ['@vue/app', {
      polyfills: [
        'es6.promise',
        'es6.symbol'
      ]
    }]
  ],
  // 很重要，保障 dist/xxx.common.js 测试时正确引用内部单元
  include: /(src|packages)/i
};
