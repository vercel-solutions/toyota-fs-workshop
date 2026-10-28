import antfu from '@antfu/eslint-config'

import importRules from './rules/import'
import linePaddingRules from './rules/line-padding'
import commonRules from './rules/common'

export default antfu({
  react: true,
  typescript: true,
  nextjs: true,
  formatters: {
    css: true,
  },
}, {
  rules: {
    '@next/next/no-img-element': 'off',
    'node/prefer-global/process': 'off',
    'react-refresh/only-export-components': 'off',
    'react/no-array-index-key': 'off',
  },
}).append(importRules, linePaddingRules, commonRules)
