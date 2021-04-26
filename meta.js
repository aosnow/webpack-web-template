module.exports = {
  prompts: {
    name: {
      type: 'input',
      name: 'name',
      message: 'Project name',
      required: true
    },

    description: {
      type: 'input',
      name: 'description',
      message: 'Description',
      required: true,
      default: 'A web project using element-ui'
    },

    author: {
      type: 'input',
      name: 'author',
      message: 'Author',
      default: 'mudas'
    },

    version: {
      type: 'string',
      name: 'version',
      message: 'Version',
      required: true,
      default: '0.0.1'
    }
  },
  completeMessage: '{{#inPlace}}To get started:\n\n  npm install\n  npm run serve{{else}}To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm run serve{{/inPlace}}'
};
