// Sample.stories.ts|tsx

import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Sample } from './Sample'

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Modern/Sample',
  component: Sample,
} as ComponentMeta<typeof Sample>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Sample> = (args) => <Sample {...args} />

export const FirstStory = Template.bind({})

FirstStory.args = {
  /*👇 The args you need here will depend on your component */
  title: 'sample',
}
