//
// npm run new:sfc -- --tag=p
//
module.exports = {
  prompt: ({ inquirer, args }) => {
    const questions = [
      {
        type: 'select',
        name: 'category',
        message: 'Which Atomic Design category?',
        choices: ['atoms', 'molecules', 'organisms', 'templates'],
      },
      {
        type: 'input',
        name: 'component_name',
        message: 'What is the name of component?',
      },
      {
        type: 'confirm',
        name: 'have_props',
        message: 'Is it have props?',
        initial: 'y',
      },
    ]
    return inquirer.prompt(questions).then((answers) => {
      const { category, component_name, have_props } = answers
      const path = `${category}/${component_name}`
      const abs_path = `components/${path}`
      const type_annotate = have_props ? 'React.FC<Props>' : 'React.FC'
      const props = have_props ? '(props)' : '()'
      const tag = args.tag ? args.tag : 'div'
      return { ...answers, path, abs_path, type_annotate, props, tag }
    })
  },
}
