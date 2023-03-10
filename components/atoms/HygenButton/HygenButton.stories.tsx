import type { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { HygenButton } from '.'

type T = typeof HygenButton
type Meta = ComponentMeta<T>
type Story = ComponentStoryObj<T>

export default {
  component: HygenButton,
  args: {},
} as Meta

export const Default: Story = {}
