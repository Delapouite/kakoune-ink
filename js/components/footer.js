const { createElement: h } = require('react')
const files = require('../constants/files')

const Footer = (props) =>
    h('footer', null,
        h('ul', {className: 'nav links'},
            h('li', null,
                h('a', {onClick: () => {
                    props.setActiveFile('about')
                    props.setParsedSource(files.about.parsedSource)
                }}, 'About')),
            h('li', null,
                h('a', {href: 'https://github.com/Delapouite/kakoune-ink'}, 'GitHub'))))

module.exports = Footer
