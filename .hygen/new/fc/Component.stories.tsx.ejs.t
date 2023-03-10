---
to: <%= abs_path %>/<%= component_name %>.stories.tsx
---
import type { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { <%= component_name %> } from "."

type T = typeof <%= component_name %>
type Meta = ComponentMeta<T>;
type Story = ComponentStoryObj<T>;

export default {
  component: <%= component_name %>,
  <% if (have_props) { -%>
  args: {},
  <% } -%>
} as Meta

export const Default: Story = {}