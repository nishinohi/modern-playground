import renderer from 'react-test-renderer'
import { describe, expect, it } from 'vitest'
import { HygenButton } from './'

describe('atoms/HygenButton', () => {
  it('Snap Shot', () => {
    const component = renderer.create(<HygenButton />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
