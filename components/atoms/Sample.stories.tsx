// Sample.stories.ts|tsx

import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { Sample } from './Sample'

//π This default export determines where your story goes in the story list
export default {
  /* π The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Modern/Sample',
  component: Sample,
} as ComponentMeta<typeof Sample>

//π We create a βtemplateβ of how args map to rendering
const Template: ComponentStory<typeof Sample> = (args) => <Sample {...args} />

export const FirstStory = Template.bind({})

FirstStory.args = {
  /*π The args you need here will depend on your component */
  title: 'sample',
}
