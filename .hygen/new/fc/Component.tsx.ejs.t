---
to: <%= abs_path %>/<%= component_name %>.tsx
---
<% if (have_props) { -%>
/**
 * 
 */
export type Props = {}
<% } -%>
/**
 * 
 */
export const <%= component_name %>: <%- type_annotate %> = <%= props %> => {
  return <<%= tag %>></<%= tag %>>
}
