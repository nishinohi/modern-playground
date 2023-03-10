---
to: <%= abs_path %>/<%= component_name %>.test.tsx
---
import renderer from 'react-test-renderer'
import { describe, expect, it } from 'vitest'
import { <%= component_name %> } from "./"

describe("<%= path %>", () => {
  it("Snap Shot", () => {
    const component = renderer.create(<<%= component_name %> />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
