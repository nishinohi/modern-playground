import renderer from 'react-test-renderer'
import { describe, expect, it } from 'vitest'
import { Task } from './'

describe('atoms/Task', () => {
  it('Snap Shot', () => {
    const component = renderer.create(
      <Task
        task={{
          id: 'a',
          state: 'state',
          title: 'title',
        }}
        onArchiveTask={(id) => console.log(id)}
        onPinTask={(id) => console.log(id)}
      />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
