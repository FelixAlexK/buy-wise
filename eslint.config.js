// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  typescript: true,
  jsx: true,
  basePath: __dirname,
  formatters: true,
  jsonc: true,
  ignores:
    ['dist/*', 'node_modules/*', 'public/*'],
  

  rules: {
    'react/no-comment-textnodes': 'off',
    'react-hooks-extra/no-unnecessary-use-prefix': 'off',
    'react-hooks-extra/prefer-use-state-lazy-initialization': 'off',
  },
})
