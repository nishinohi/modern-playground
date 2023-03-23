import type { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { HygenSample } from './HygenSample'

export default {
  component: HygenSample,
} as ComponentMeta<typeof HygenSample>

export const Default: ComponentStoryObj<typeof HygenSample> = {
  args: {
    title: 'sample',
  },
}
