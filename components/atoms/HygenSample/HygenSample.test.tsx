import renderer from 'react-test-renderer'
import { describe, expect, it } from 'vitest'
import { HygenSample } from './'

describe('atoms/HygenSample', () => {
  it('Snap Shot', () => {
    const component = renderer.create(<HygenSample title="" />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
