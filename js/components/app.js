var _ = require('lodash')
var { createClass, createElement: h } = require('react')

var Header = require('./header')
var Left = require('./left')
var Right = require('./right')
var Footer = require('./footer')
var Export = require('./export')

var initialState = require('../constants/initial-state')

var parse = require('../actions/parser')
var exporter = require('../actions/exporter')
// var {transitionFast} = require('../actions/transition');
var { merge } = require('../actions/utils')
var { getFaceStyle } = require('../actions/style')

var App = createClass({
    getInitialState() {
        return localStorage.getItem('state') !== null
            ? JSON.parse(localStorage.getItem('state'))
            : _.cloneDeep(initialState)
    },

    render() {
        return h('div', {},
            // children: transitionFast([ // Only really used for `Export`
            //     this.getHeader(),
            //     this.getMain(),
            //     this.getFooter(),
            //     this.getExport()
            // ])
            this.getHeader(),
            this.getMain(),
            this.getFooter(),
            this.getExport()
        )
    },

    getHeader() {
        return h(Header, merge(this.state, {
            setActiveFile: this.setActiveFile,
            setActiveScheme: this.setActiveScheme,
            setParsedSource: this.setParsedSource
        }))
    },

    getMain() {
        return h('main', { className: 'wrap clear-fix' },
            this.getLeft(),
            this.getRight()
        )
    },

    getFooter() {
        return h(Footer, {
            setActiveFile: this.setActiveFile,
            setParsedSource: this.setParsedSource
        })
    },

    getExport() {
        if (this.state.exportedSource === undefined) return null
        return h(Export, merge(this.state, {
            clearExportedSource: this.clearExportedSource,
            exportName: this.state.exportName,
            exportedSource: this.state.exportedSource
        }))
    },

    getLeft() {
        return h(Left, merge(this.state, {
            getFace: this.getFace,
            getStyle: this.getStyle,
            parseSource: this.parseSource,
            selectFace: this.selectFace,
            setHoverFace: this.setHoverFace,
            setParsedSource: this.setParsedSource
        }))
    },

    getRight() {
        return h(Right, merge(this.state, {
            deleteSelectedFaceProp: this.deleteSelectedFaceProp,
            exportColorScheme: this.exportColorScheme,
            getFace: this.getFace,
            getModifiedFaces: this.getModifiedFaces,
            selectFace: this.selectFace,
            resetFace: this.resetFace,
            resetSelectedFaceProp: this.resetSelectedFaceProp,
            resetState: this.resetState,
            setActiveColor: this.setActiveColor,
            setActiveScheme: this.setActiveScheme,
            setWidgetVisibility: this.setWidgetVisibility,
            setExportName: this.setExportName,
            setPostProcessProps: this.setPostProcessProps,
            setSectionVisibility: this.setSectionVisibility,
            setSelectedFaceProps: this.setSelectedFaceProps
        }))
    },

    componentDidMount() {
        document.body.className = this.state.activeScheme
    },

    componentDidUpdate() {
        localStorage.setItem('state', JSON.stringify(this.state))
    },

    startAppTransition(scheme, transition = 'variant-transition', duration = 500) {
        setTimeout(() => {
            document.body.className = scheme + ' ' + transition
            setTimeout(() => document.body.className = scheme, duration)
        }, 0)
    },

    getFace(face) {
        var faces =  this.state.schemes[this.state.activeScheme]
        return face in faces ? faces[face] : {}
    },

    getModifiedFaces() {
        var initialFaces = initialState.schemes[this.state.activeScheme]
        var faces = this.state.schemes[this.state.activeScheme]

        return Object.keys(faces).filter(face => {
            return !(face in initialFaces && _.isEqual(initialFaces[face], faces[face]))
        })
    },

    getStyle(face) {
        return getFaceStyle(
            this.getFace('Default'),
            this.getFace(face),
            this.state.postProcess[this.state.activeScheme])
    },

    resetFace(face) {
        const {activeScheme} = this.state
        const scheme = Object.assign({}, this.state.schemes[activeScheme])
        if (face in initialState.schemes[activeScheme]) {
            scheme[face] = Object.assign({}, initialState.schemes[activeScheme][face])
        } else {
            delete scheme[face]
        }
        const schemes = Object.assign({}, this.state.schemes, { [activeScheme]: scheme })
        this.setState(Object.assign({}, this.state, { schemes }))
    },

    setHoverFace(hoverFace) {
        this.setState({hoverFace})
    },

    setSelectedFaceProps(props) {
        var {activeScheme, selectedFace} = this.state
        const scheme = Object.assign({}, this.state.schemes[activeScheme])
        if (selectedFace in scheme) {
            scheme[selectedFace] = Object.assign({}, scheme[selectedFace], props)
        } else {
            scheme[selectedFace] = {}
        }
        const schemes = Object.assign({}, this.state.schemes, { [activeScheme]: scheme })
        this.setState(Object.assign({}, this.state, { schemes }))
    },

    deleteSelectedFaceProp(prop) {
        if (this.state.selectedFace === 'Default') {
            this.resetSelectedFaceProp(prop)
        } else {
            var props = {}
            props[prop] = undefined
            this.setSelectedFaceProps(props)
        }
    },

    resetSelectedFaceProp(prop) {
        var {activeScheme, selectedFace} = this.state
        var props = {}
        if (selectedFace in initialState.schemes[activeScheme] &&
            prop in initialState.schemes[activeScheme][selectedFace]) {
            props[prop] = initialState.schemes[activeScheme][selectedFace][prop]
        } else {
            props[prop] = undefined
        }

        this.setSelectedFaceProps(props)
    },

    selectFace(selectedFace) {
        this.setState({selectedFace})
    },

    setParsedSource(parsedSource) {
        this.setState({parsedSource})
    },

    setActiveFile(activeFile) {
        this.setState({activeFile})
    },

    setExportName(exportName) {
        this.setState({exportName})
    },

    setSectionVisibility(section, visibility) {
        var state = {sectionsVisibility: _.cloneDeep(this.state.sectionsVisibility)}
        state.sectionsVisibility[section] = visibility
        this.setState(state)
    },

    // widgets are parts of kakoune ui like status line, info box…
    setWidgetVisibility(widget, visibility) {
        var state = {widgetsVisibility: _.cloneDeep(this.state.widgetsVisibility)}
        state.widgetsVisibility[widget] = visibility
        this.setState(state)
    },

    setPostProcessProps(props) {
        var state = {
            postProcess: _.cloneDeep(this.state.postProcess)
        }
        Object.assign(state.postProcess[this.state.activeScheme], props)
        this.setState(state)
    },

    setActiveScheme(activeScheme) {
        this.setState({activeScheme})
        this.startAppTransition(activeScheme)
    },

    setActiveColor(activeColor) {
        this.setState({activeColor})
    },

    parseSource(source) {
        this.setState({parsedSource: parse(source)})
    },

    exportColorScheme() {
        this.setState({ exportedSource: exporter(_.cloneDeep(this.state)) })
    },

    clearExportedSource() {
        this.setState({exportedSource: undefined})
    },

    resetState() {
        this.setState(_.cloneDeep(initialState))
        this.startAppTransition(initialState.activeScheme, 'reset-transition', 750)
    }
})

module.exports = App
