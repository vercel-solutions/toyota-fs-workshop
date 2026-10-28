import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export default {
  rules: {
    'perfectionist/sort-imports': ['error', {
      groups: [
        [
          'type-builtin',
          'type-external',
          'type-internal',
          'type-parent',
          'type-sibling',
          'type-index',
        ],
        ['value-builtin', 'value-external'],
        'value-internal',
        ['value-parent', 'value-sibling', 'value-index'],
        'side-effect',
        'style',
        'unknown',
      ],
      newlinesBetween: 1,
      internalPattern: ['^@/.+', '^@workshop/.+'],
      environment: 'bun',
    }],
  },
} satisfies TypedFlatConfigItem
