const { createElement: h, Component, PropTypes } = require('react')
const Kakoune = require('./kakoune')

const Left = (props) =>
    h('article', {},
        h(Kakoune, props),
        h(Paste, props))

class Paste extends Component {
    render() {
        if (this.props.parsedSource !== undefined) return null

        return h('textarea', {
            ref: 'pastedSource',
            onChange: (e) => this.onPaste(e),
            className: 'paste',
            placeholder: 'Paste `:TOhtml` output here.',
            value: ''})
    }

    componentDidUpdate() {
        if (this.props.parsedSource !== undefined) return
        this.refs.pastedSource.focus()
    }

    onPaste(e) {
        this.props.parseSource(e.target.value)
    }
}
Paste.propTypes = {
    parsedSource: PropTypes.array,

    parseSource: PropTypes.func.isRequired
}

module.exports = Left
