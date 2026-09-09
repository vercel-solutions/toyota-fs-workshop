import antfu from '@antfu/eslint-config'

import importRules from './rules/import'
import linePaddingRules from './rules/line-padding'
import commonRules from './rules/common'

export default antfu({
  react: true,
  typescript: true,
  formatters: {
    css: true,
  },
}).append(importRules, linePaddingRules, commonRules)
