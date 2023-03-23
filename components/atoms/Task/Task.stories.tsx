import type { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { Task } from './'

export default {
  component: Task,
} as ComponentMeta<typeof Task>

const task = {
  id: '1',
  title: 'Test Task',
  state: 'TASK_INBOX',
}

export const Template: ComponentStoryObj<typeof Task> = {
  args: {
    task: { ...task },
  },
}

export const Default = {
  ...Template,
  parameters: {
    backgrounds: { default: 'blue' },
  },
}

export const Pinned = {
  ...Template,
}

export const Archived = {
  ...Template,
}
