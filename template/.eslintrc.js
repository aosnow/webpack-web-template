// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: { parser: 'babel-eslint' },
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['off', 'never'],
    'import/no-unresolved': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/newline-after-import': 'off',
    'import/no-duplicates': 'off',
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'import/no-mutable-exports': 'off',

    'no-restricted-syntax': 'off',
    'no-nested-ternary': 'off',
    'object-shorthand': 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'prefer-destructuring': 'off',
    'operator-linebreak': 'off',
    'no-useless-computed-key': 'off',

    // 语句块内的前后是否需要空白行隔开
    'padded-blocks': 'off',
    // 强制驼峰法命名规则
    'camelcase': 'off',
    // Object 属性是否必须在新的一行书写
    'object-curly-newline': 'off',
    // 不检测行的最大长度（考虑到 base64 图片编码）
    'max-len': 'off',
    // 引号风格检测（禁止检测没有变量引入的模板字符串）
    'quotes': 'off',
    // 混合运算符检测
    'no-mixed-operators': 'off',
    // 换行符检测
    'linebreak-style': 'off',
    // 允许使用位运算
    'no-bitwise': 'off',
    // 允许累加、累减
    'no-plusplus': 'off',
    // 允许在条件中进行赋值
    'no-cond-assign': 'off',
    // 允许连续多等号赋值
    'no-multi-assign': 'off',
    // 允许对函数参数重新赋值
    'no-param-reassign': 'off',
    // 关闭推荐未重新赋值的let变量设置成const常量
    'prefer-const': 'off',
    // 关闭推荐模板字符串
    'prefer-template': 'off',
    // 关闭switch/default检测
    'default-case': 'off',
    // 是否允许空语句块
    'no-empty': ['error', { 'allowEmptyCatch': true }],
    // 禁止出现未使用的表达式
    'no-unused-expressions': 'off',
    // 禁止变量和方法的前置下划线，类定义私有成员要用到
    'no-underscore-dangle': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 要求或禁止尾随逗号（比如Object末位属性）
    'comma-dangle': ['error', 'never'],
    // 要求或禁止语句块 {} 之前是否有空格
    'space-before-blocks': ['error', 'always'],
    // 函数定义时括号前是否需要空格
    'space-before-function-paren': ['error', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    // 是否允许使用 console 语句
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 箭头函数的函数体样式：是否需要｛｝包含
    'arrow-body-style': 'off',
    // 箭头函数的参数表是否需要括号包起来
    'arrow-parens': 'off',
    // 匿名函数是否需要规定函数名
    'func-names': 'off',
    // 大括号的换行风格
    'brace-style': ['error', 'stroustrup', { 'allowSingleLine': true }],
    // 当存在更简单的三元运算写法时，是否简化如：“x ? x : ''”开启时需要简化为 “x || ''”
    'no-unneeded-ternary': ['error', { 'defaultAssignment': true }],
    // 属性访问时用 . 还是 []，允许关键字
    'dot-notation': 'off',
    // 是否强制要求函数统一 return value 格式
    'consistent-return': 'off',
    // 是否提示优化 \ 的使用
    'no-useless-escape': 'off',
    // 是否要求变量提前声明
    'no-use-before-define': ['error', {
      'functions': false,
      'classes': false
    }],
    'wrap-iife': ['error', 'inside'],
    'indent': 'off',

    // syntax
    // ---------------------------------------------------------------------------
    'no-else-return': 'off',
    'guard-for-in': 'off',
    'no-lonely-if': 'off',
    'lines-between-class-members': 'off',
    'class-methods-use-this': 'off',
    'prefer-spread': 'off',

    // flowtype
    // ---------------------------------------------------------------------------
    'flowtype/space-before-type-colon': 'off',
    'flowtype/no-types-missing-file-annotation': 'off'
  }
};
