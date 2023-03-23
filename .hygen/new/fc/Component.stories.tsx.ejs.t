---
to: <%= abs_path %>/<%= component_name %>.stories.tsx
---
import type { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { <%= component_name %> } from './<%= component_name %>'

export default {
  component: <%= component_name %>,
} as ComponentMeta<typeof <%= component_name %>>

export const Default: ComponentStoryObj<typeof <%= component_name %>> = {
  args: {},
}
