import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export default {
  rules: {
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'node/prefer-global/process': 'off',
    'style/quotes': ['error', 'double']
  },
} satisfies TypedFlatConfigItem
