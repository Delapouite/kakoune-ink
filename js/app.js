const { createElement: h } = require('react')
const ReactDOM = require('react-dom')

const App = require('./components/app')

ReactDOM.render(h(App), document.getElementById('root'))
