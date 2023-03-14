import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Task } from '.'

type TaskProps = ComponentProps<typeof Task>

export default {
  component: Task,
} as Meta<TaskProps>

const task = {
  id: '1',
  title: 'Test Task',
  state: 'TASK_INBOX',
}

export const Template: StoryObj<TaskProps> = {
  args: {
    task: { ...task },
    onArchiveTask(id) {
      console.log(id)
    },
    onPinTask(id) {
      console.log(id)
    },
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
