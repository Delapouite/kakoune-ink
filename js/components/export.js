const { createElement: h, Component } = require('react')

class Export extends Component {
    render() {
        return h('div', {className: 'export'},
            h('h2', null, 'Export'),
            h('p', null,
                'Copy text into a new kakoune buffer, then `:w ~/.config/kak/colors/' +
                this.props.exportName +
                '.kak` and `:colorscheme ' +
                this.props.exportName +
                '`.'),
            h('textarea', {
                onKeyDown: (e) => this.onKeyDown(e),
                ref: 'exportedSource',
                value: this.props.exportedSource,
                readOnly: true}),
            h('button', {
                type: 'submit',
                className: 'button',
                onClick: () => this.onClick ()},
                'Close'))
    }

    componentDidMount() {
        var el = this.refs.exportedSource
        el.select()
        el.focus()
    }

    onClick() {
        this.props.clearExportedSource()
    }

    onKeyDown(e) {
        if (e.keyCode === 27 || e.keyCode === 13) {
            this.props.clearExportedSource()
        }
    }
}

module.exports = Export
