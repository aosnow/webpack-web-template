module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  // 与 vue.config.js 同步的 alias 别名
  moduleNameMapper: {
    '^{{ name }}(.*)$': '<rootDir>/packages/$1'
  },
  // 需要转换的 esm 例外模块（默认不转换所有 node_modules 中的模块）
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!lodash-es)',
    '<rootDir>/node_modules/(?!@mudas/*)'
  ]
};
