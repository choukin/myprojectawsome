import hogan from 'hogan.js'


const templateSource = '{{message}}'

const context = {message: 'Hello template!'}

const template = hogan.compile(templateSource)

console.log(template.render(context));

