const { createElement: h, PropTypes, Component } = require('react')
const { merge } = require('../actions/utils')

const Right = (props) =>
    h('aside', null,
        h(SelectedFace, merge(props, {key: 0, firstSection: true})),
        h(Colors, merge(props, {key: 1})),
        h(Highlight, merge(props, {key: 2})),
        h(PostProcess, merge(props, {key: 3})),
        h(ModifiedFaces, merge(props, {key: 4})),
        h(Widgets, merge(props, {key: 5})),
        h(Export, merge(props, {key: 6}))
    )

const SelectedFace = (props) => {
    var { selectedFace, hoverFace } = props

    var className = 'line selected-face-line'
    var content = (hoverFace !== undefined && hoverFace !== selectedFace ?
        hoverFace : null)

    return h(Section, merge(props, {
        id: 'selectedFace',
        title: 'Selected face'}),
        h('div', {className},
            h('span', {className: 'left'}, selectedFace),
            h('span', {className: 'right'}, content)))
}

const Colors = (props) => {
    var face = props.getFace(props.selectedFace)
    var normal = props.getFace('Default')

    return h(Section, merge(props, {
        id: 'color',
        title: 'Color'}),
        h(Color, {
            pageBackgroundColor: props.activeScheme === 'light' ? '#ffffff' : '#000000',
            id: 'foregroundColor',
            activeId: 'foreground',
            active: props.activeColor === 'foreground',
            prop: 'color',
            accessKey: 'f',
            value: face.color !== undefined ? face.color : normal.color,
            color: face.color,
            label: 'Foreground',
            deleteSelectedFaceProp: props.deleteSelectedFaceProp,
            resetSelectedFaceProp: props.resetSelectedFaceProp,
            setActiveColor: props.setActiveColor,
            setSelectedFaceProps: props.setSelectedFaceProps
        }),
        h(Color, {
            pageBackgroundColor: props.activeScheme === 'light' ? '#ffffff' : '#000000',
            id: 'backgroundColor',
            activeId: 'background',
            active: props.activeColor === 'background',
            prop: 'backgroundColor',
            accessKey: 'b',
            value: face.backgroundColor !== undefined ? face.backgroundColor : normal.backgroundColor,
            color: face.backgroundColor,
            label: 'Background',
            deleteSelectedFaceProp: props.deleteSelectedFaceProp,
            resetSelectedFaceProp: props.resetSelectedFaceProp,
            setActiveColor: props.setActiveColor,
            setSelectedFaceProps: props.setSelectedFaceProps
        }))
}

class Color extends Component {
    render() {
        return h('div', {className: 'line color-line'},
            h('div', {className: 'left'},
                h('input', {
                    key: this.props.id,
                    type: 'color',
                    id: this.props.id,
                    accessKey: this.props.accessKey,
                    value: this.props.value,
                    onClick: (e) => this.onClick(e),
                    onChange: (e) => this.onChange(e)
                }),
                h(ColorOverlay, {
                    value: this.props.color,
                    pageBackgroundColor: this.props.pageBackgroundColor})),
            h('div', {
                className: 'right' + (this.props.active === true ? ' active' : '')},
                h('label', {
                    htmlFor: this.props.id},
                    this.props.label)))
    }

    onChange(e) {
        var props = {[this.props.prop]: e.target.value}
        this.props.setSelectedFaceProps(props)
    }

    onClick(e) {
        this.props.setActiveColor(this.props.activeId)

        if (e.shiftKey === true) {
            this.props.deleteSelectedFaceProp(this.props.prop)
            e.preventDefault()
        } else if (e.altKey === true) {
            this.props.resetSelectedFaceProp(this.props.prop)
            e.preventDefault()
        }
    }
}
Color.propTypes = {
  id: PropTypes.string.isRequired,
  prop: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  activeId: PropTypes.string.isRequired,
  accessKey: PropTypes.string.isRequired,

  setActiveColor: PropTypes.func.isRequired,
  setSelectedFaceProps: PropTypes.func.isRequired,
  deleteSelectedFaceProp: PropTypes.func.isRequired,
  resetSelectedFaceProp: PropTypes.func.isRequired,
}

class ColorOverlay extends Component {
    render() {
        return h('div', {
            className: this.className(),
            style: this.style()})
    }

    className() {
        var className = 'color-overlay'

        if (this.props.value === undefined) {
            return className + ' none'
        }
        if (this.props.value === this.props.pageBackgroundColor) {
            return className + ' border'
        }
        return className
    }

    style() {
        return (this.props.value === undefined ?
            {} : {backgroundColor: this.props.value})
    }
}

const Highlight = (props) => {
    var button = (args) => h(HighlightButton, merge(props, args))

    return h(Section, merge(props, {
        id: 'highlight',
        title: 'Highlight'}),
        h('div', {className: 'line'},
            button({type: 'NONE', content: 'n'}),
            button({type: 'bold', content: 'b'}),
            button({type: 'italic', content: 'i'}),
            button({type: 'underline', content: 'u'})))
}

class HighlightButton extends Component {
    render() {
        return h('button', {
            className: this.className(this.props.type),
            onClick: (e) => this.onClick(e)},
            h('span', {}, this.props.content))
    }

    className(type) {
        var {getFace, selectedFace} = this.props

        var selectedType = (getFace(selectedFace).highlight === undefined ?
            'NONE' : getFace(selectedFace).highlight)

        return 'highlight-button ' + type.toLowerCase() +
            (type === selectedType ? ' active' : '')
    }

    onClick(e) {
        if (e.shiftKey === true) {
            this.props.deleteSelectedFaceProp('highlight')
            e.preventDefault()
        } else if (e.altKey === true) {
            this.props.resetSelectedFaceProp('highlight')
            e.preventDefault()
        } else {
            this.props.setSelectedFaceProps({highlight: this.props.type})
        }
    }
}
HighlightButton.propTypes = {
    type: PropTypes.string.isRequired
}

class PostProcess extends Component {
    render() {
        var {brightness, saturation} = this.props.postProcess[this.props.activeScheme]
        var brightnessClassName = 'left' + (Number(brightness) === 0 ? ' inactive' : '')
        var saturationClassName = 'left' + (Number(saturation) === 0 ? ' inactive' : '')

        return h(Section, merge(this.props, {
            id: 'postProcess',
            title: 'Post process'}),
            h('div', {className: 'line post-process-line'},
                h('div', {className: brightnessClassName}, 'Brightness'),
                h('div', {
                    className: 'right',
                    onClick: (e) => this.onBrightnessClick(e)},
                    h('input', {
                        type: 'range',
                        min: -0.25,
                        max: 0.25,
                        step: 0.025,
                        value: brightness,
                        onChange: (e) =>  this.onChangeBrightness(e)}))),
            h('div', {className: 'line post-process-line'},
                h('div', {className: saturationClassName}, 'Saturation'),
                h('div', {
                    className: 'right',
                    onClick: (e) => this.onSaturationClick(e)},
                    h('input', {
                        type: 'range',
                        min: -1.0,
                        max: 1.0,
                        step: 0.1,
                        value: saturation,
                        onChange: (e) => this.onChangeSaturation(e)}))))
    }

    onChangeBrightness(e) {
        this.props.setPostProcessProps({brightness: e.target.value})
    }

    onChangeSaturation(e) {
        this.props.setPostProcessProps({saturation: e.target.value})
    }

    onBrightnessClick(e) {
        if (e.shiftKey === true || e.altKey === true) {
            this.props.setPostProcessProps({brightness: 0})
        }
    }

    onSaturationClick(e) {
        if (e.shiftKey === true || e.altKey === true) {
            this.props.setPostProcessProps({saturation: 0})
        }
    }
}

const ModifiedFaces = (props) => {
    var modifiedFaces = props.getModifiedFaces()
    var children = modifiedFaces.map((face, index) =>
        h(ModifiedFace, {
            key: index,
            face,
            selectFace: props.selectFace,
            resetFace: props.resetFace}))
    return h(Section, merge(props, {
        id: 'modifiedFaces',
        title: 'Modified faces',
        children}))
}

const ModifiedFace = ({ face, selectFace, resetFace }) =>
    h('div', {className: 'line button-line'},
        h('div', {className: 'left pointer'},
            h('span', { onClick: () => selectFace(face) }, face)),
        h('div', {className: 'right'},
            h('button', {
                className: 'small-button',
                onClick: () => resetFace(face) },
                'Reset')))

ModifiedFace.propTypes = {
    face: PropTypes.string.isRequired,
    selectFace: PropTypes.func.isRequired,
    resetFace: PropTypes.func.isRequired
}

class Export extends Component {
    render() {
        return h(Section, merge(this.props, {
            id: 'export_',
            title: 'Export'}),
            h('div', {className: 'line export-line-input'},
                h('div', {className: 'left'},
                    h('label', {}, 'Name')),
                h('div', {className: 'right'},
                    h('input', {
                        type: 'text',
                        value: this.props.exportName,
                        onChange: (e) => this.onChange(e)}))),
            h('div', {className: 'line button-line'},
                h('div', {className: 'left'},
                    h('button', {
                        className: 'small-button',
                        onClick: () => { if (confirm('Do you really want to reset?')) this.props.resetState() }},
                        'Reset')),
                h('div', {className: 'right'},
                    h('button', {
                        className: 'small-button',
                        onClick: () => this.onExportClick()},
                        'Export'))))
    }

    onChange(e) {
        this.props.setExportName(e.target.value)
    }

    onExportClick() {
        this.props.exportColorScheme()
    }
}
Export.propTypes = {
    exportName: PropTypes.string.isRequired,

    setExportName: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    exportColorScheme: PropTypes.func.isRequired,
}

const Widgets = (props) =>
    h(Section, merge(props, {
        id: 'widgets',
        title: 'Widgets'}),
        h(Widget, {
            setWidgetVisibility: props.setWidgetVisibility,
            label: 'Line numbers',
            widget: 'lineNumbers',
            visibility: props.widgetsVisibility.lineNumbers}),
        h(Widget, {
            setWidgetVisibility: props.setWidgetVisibility,
            label: 'Information',
            widget: 'information',
            visibility: props.widgetsVisibility.information}),
        h(Widget, {
            setWidgetVisibility: props.setWidgetVisibility,
            label: 'Menu',
            widget: 'menu',
            visibility: props.widgetsVisibility.menu}),
        h(Widget, {
            setWidgetVisibility: props.setWidgetVisibility,
            label: 'Status line',
            widget: 'statusLine',
            visibility: props.widgetsVisibility.statusLine}))

class Widget extends Component {
    render() {
        var buttonText = (this.props.visibility === 'show' ? 'Hide' : 'Show')

        return h('div', {className: 'line button-line'},
            h('div', {className: 'left'}, this.props.label),
            h('div', {className: 'right'},
                h('button', {
                    className: 'small-button',
                    onClick: () => this.onClick()},
                    buttonText)))
    }

    onClick() {
        var visibility = this.props.visibility === 'show' ? 'hide' : 'show'
        this.props.setWidgetVisibility(this.props.widget, visibility)
    }
}

class Section extends Component {
    render() {
        var className = this.props.firstSection === true ? 'first' : null
        var title = this.props.title
        var icon = 'icon ' + (this.isExpanded() ? 'ion-ios7-minus-empty' : 'ion-ios7-plus-empty')

        var children = [
            h('h2', {onClick: () => this.onClick()}, title, h('span', {className: icon}))]
            .concat((this.isExpanded() === true ? this.props.children : []))

        return h('section', { className, children})
    }

    isExpanded() {
        return this.props.sectionsVisibility[this.props.id] === 'show'
    }

    onClick() {
        var toggledVisibility = (this.props.sectionsVisibility[this.props.id] === 'show' ?
            'hide' : 'show')

        this.props.setSectionVisibility(this.props.id, toggledVisibility)
    }
}
Section.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    firstSection: PropTypes.bool,
    sectionsVisibility: PropTypes.object.isRequired,

    setSectionVisibility: PropTypes.func.isRequired
}

module.exports = Right
