const { createElement: h, PropTypes, Component } = require('react')

const { spaces, fill, merge } = require('../actions/utils')

class Kakoune extends Component {
    render() {
        if (this.props.parsedSource === undefined) return null

        return h('pre', {
            style: this.props.getStyle('Default'),
            onMouseOver: () => this.onMouseOver(),
            onClick: () => this.onClick(),
            onMouseOut: () => this.onMouseOut(),
            children: [
                h(Source, merge(this.props, {key: 'source'})),
                h(BufferPadding, merge(this.props, {key: 'bufferPadding'})),
                h(Information, merge(this.props, {key: 'Information'})),
                h(Menu, merge(this.props, {key: 'menu'})),
                h(StatusLine, merge(this.props, {key: 'statusLine'}))
            ]})
    }

    onMouseOver() {
        this.props.setHoverFace('Default')
    }

    onMouseOut() {
        this.props.setHoverFace(undefined)
    }

    onClick() {
        this.props.selectFace('Default')
    }
}
Kakoune.propTypes = {
  parsedSource: PropTypes.array,

  getStyle: PropTypes.func.isRequired,
  setHoverFace: PropTypes.func.isRequired,
  selectFace: PropTypes.func.isRequired,
}

class Part extends Component {
    render() {
        var attributes = (this.props.face === undefined ? null : {
            style: this.props.getStyle(this.props.face),
            onClick: (e) => this.onClick(e),
            onMouseOver: (e) => this.onMouseOver(e),
        })

        return h('span', attributes, this.props.content)
    }

    onMouseOver(e) {
        this.props.setHoverFace(this.props.face)
        e.stopPropagation()
    }

    onClick(e) {
        this.props.selectFace(this.props.face)
        e.stopPropagation()
    }
}
Part.propTypes = {
    setHoverFace: PropTypes.func.isRequired,
    selectFace: PropTypes.func.isRequired,
}

const Source = (props) =>
    h('span',
        null,
        props.parsedSource.map((lineParts, index) =>
            h(Line, merge(props, {key: index, lineParts, index}))))

class Line extends Component {
    render() {
        var children = [h(LineNumber, merge(this.props, {key: 'lineNumber'}))]
            .concat(this.lineParts())
            .concat([h('span', {key: 'newLine'}, '\n')])

        return h('span', {children})
    }

    lineParts() {
        return this.props.lineParts.map((linePart, index) =>
            h(Part, merge(
                 this.props,
                 {key: index, face: linePart.face, content: linePart.content})))
    }
}
Line.propTypes = {
    lineParts: PropTypes.array.isRequired
}

class LineNumber extends Component {
    render() {
        if (this.props.widgetsVisibility.lineNumbers === 'hide') return null

        return h(Part, merge(
            this.props,
            {face: 'LineNumbers', content: this.getContent()}
        ))
    }

    getContent() {
        var line = this.props.index + 1
        var lineCount = this.props.parsedSource.length
        var fillCount = 1 + (lineCount.toString().length - line.toString().length)
        return ' '.repeat(fillCount) + line + ' '
    }
}
LineNumber.propTypes = {
    index: PropTypes.number.isRequired,
    activeFile: PropTypes.string.isRequired,
    parsedSource: PropTypes.array.isRequired,
    widgetsVisibility: PropTypes.object.isRequired
}

const BufferPadding = (props) => {
    if (props.activeFile === 'ui') return null

    var lineCount = Math.max(0, 32 - props.parsedSource.length)
    var content = (fill('~') + '\n').repeat(lineCount)

    return h(Part, merge(props, {face: 'BufferPadding', content}))
}

const StatusLine = (props) => {
    if (props.widgetsVisibility.statusLine === 'hide') return null

    return (
        h('div', null,
            h(Part, merge(props, { face: 'Prompt', content: 'prompt:' })),
            h(Part, merge(props, { face: 'StatusLine', content: 'command' })),
            h(Part, merge(props, { face: 'StatusCursor', content: ' ' })),
            h(Part, merge(props, { face: 'StatusLine', content: spaces(15) })),
            h(Part, merge(props, { face: 'StatusLine', content: ' ' })),
            h(Part, merge(props, { face: 'StatusLine', content: 'file.kak 8:42' })),
            h(Part, merge(props, { face: 'StatusLine', content: ' ' })),
            h(Part, merge(props, { face: 'StatusLineInfo', content: '[+]' })),
            h(Part, merge(props, { face: 'StatusLine', content: ' ' })),
            h(Part, merge(props, { face: 'StatusLineMode', content: 'mode' })),
            h(Part, merge(props, { face: 'StatusLine', content: ' ' })),
            h(Part, merge(props, { face: 'StatusLineInfo', content: '1 sel' })),
            h(Part, merge(props, { face: 'StatusLine', content: ' ' })),
            h(Part, merge(props, { face: 'StatusLineInfo', content: 'param=' })),
            h(Part, merge(props, { face: 'StatusLineValue', content: '42' })),
            h(Part, merge(props, { face: 'StatusLine', content: ' ' })),
            h(Part, merge(props, { face: 'StatusLineInfo', content: 'reg=' })),
            h(Part, merge(props, { face: 'StatusLineValue', content: 'x' })),
            h(Part, merge(props, { face: 'StatusLine', content: ' ' })),
            h(Part, merge(props, { face: 'StatusLine', content: '- client@[session]' })),
        )
    )
}

const Information = (props) => {
    if (props.widgetsVisibility.information === 'hide') return null

    return (
        h('div', null,
            h('div', null,
                h(Part, merge(props, { face: 'BufferPadding', content: spaces(70) })),
                h(Part, merge(props, { face: 'Information', content: '┌───────┤ info ├──────┐' })),
            ),
            h('div', null,
                h(Part, merge(props, { face: 'BufferPadding', content: spaces(70) })),
                h(Part, merge(props, { face: 'Information', content: '│ useful explanation. │' })),
            ),
            h('div', null,
                h(Part, merge(props, { face: 'BufferPadding', content: spaces(70) })),
                h(Part, merge(props, { face: 'Information', content: '└─────────────────────┘' })),
            )
        )
    )
}

const Menu = (props) => {
    if (props.widgetsVisibility.menu === 'hide') return null

    return (
        h('div', null,
            h('div', null,
                h(Part, merge(props, { face: 'MenuBackground', content: 'command' + spaces(16) })),
                h(Part, merge(props, { face: 'MenuForeground', content: 'command1' + spaces(15) })),
                h(Part, merge(props, { face: 'MenuBackground', content: 'command2' + spaces(15) })),
                h(Part, merge(props, { face: 'MenuBackground', content: 'command3' + spaces(16) }))
            ),
            h('div', null,
                h(Part, merge(props, { face: 'MenuBackground', content: 'command5' + spaces(15) })),
                h(Part, merge(props, { face: 'MenuBackground', content: 'command6' + spaces(15) })),
                h(Part, merge(props, { face: 'MenuBackground', content: 'command7' + spaces(39) })),
            )
        )
    )
}

module.exports = Kakoune
