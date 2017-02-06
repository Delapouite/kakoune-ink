const { createElement: h, Component, PropTypes } = require('react')
const files = require('../constants/files')
const { merge } = require('../actions/utils')

const Header = (props) =>
    h('header', {},
        h('div', {className: 'wrap clear-fix'},
            h('h1', {}, 'kakoune ink'),
            h(Files, merge(props)),
            h(Panes, merge(props))))

const Files = (props) =>
    h('ul', {
        className: 'nav files'},
        h(FileLink, merge(props, {
            type: 'html',
            title: 'HTML'
        })),
        h(FileLink, merge(props, {
            type: 'css',
            title: 'CSS'
        })),
        h(FileLink, merge(props, {
            type: 'javascript',
            title: 'JavaScript'
        })),
        h(FileLink, merge(props, {
            type: 'java',
            title: 'Java'
        })),
        h(FileLink, merge(props, {
            type: 'c',
            title: 'C'
        })),
        h(FileLink, merge(props, {
            type: 'ui',
            title: 'UI'
        }))
        // h(PasteLink, props)
    )

class FileLink extends Component {
    render() {
        return h('li', {
            className: (this.props.type === this.props.activeFile ? 'active' : '')},
            h('a', {onClick: () => this.onClick() }, this.props.title))
    }

    onClick() {
        this.props.setParsedSource(files[this.props.type].parsedSource)
        this.props.setActiveFile(this.props.type)
    }
}
FileLink.propTypes = {
    activeFile: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,

    setParsedSource: PropTypes.func.isRequired,
    setActiveFile: PropTypes.func.isRequired,
}

class PasteLink extends Component {
    render() {
        return h('li', {
            className: (this.props.activeFile === undefined ? ' active' : '')},
            h('a', {onClick: () => this.onClick() }, 'Paste'))
    }

    onClick() {
        this.props.setParsedSource(undefined)
        this.props.setActiveFile(undefined)
    }
}
PasteLink.propTypes = {
    activeFile: PropTypes.string.isRequired,
    setParsedSource: PropTypes.func.isRequired,
    setActiveFile: PropTypes.func.isRequired,
}

const Panes = (props) =>
    h('ul', {className: 'nav panes'},
        h(Pane, merge(props, {id: 'dark'}), 'Dark'),
        h(Pane, merge(props, {id: 'light'}), 'Light'),
        h(Pane, merge(props, {id: 'default'}), 'Default'))

class Pane extends Component {
    render() {
        var className = (this.props.additionalClass !== undefined ? this.props.additionalClass : '') +
            (this.props.activeScheme ===  this.props.id ? ' active' : '')

        return h('li', {
            className,
            onClick: () => this.onClick()},
            h('a', {onClick: () => this.onClick(), children: this.props.children}))
    }

    onClick() {
        this.props.setActiveScheme(this.props.id)
    }
}
Pane.propTypes = {
    id: PropTypes.string.isRequired,
    activeScheme: PropTypes.string.isRequired,
    setActiveScheme: PropTypes.func.isRequired,
}

module.exports = Header
