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
            setActivePane:  this.setActivePane,
            setActiveVariant: this.setActiveVariant,
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
            setActivePane: this.setActivePane,
            setActiveVariant: this.setActiveVariant,
            setWidgetVisibility: this.setWidgetVisibility,
            setExportName: this.setExportName,
            setPostProcessProps: this.setPostProcessProps,
            setSectionVisibility: this.setSectionVisibility,
            setSelectedFaceProps: this.setSelectedFaceProps
        }))
    },

    componentDidMount() {
        document.body.className = this.state.activeVariant
    },

    componentDidUpdate() {
        localStorage.setItem('state', JSON.stringify(this.state))
    },

    startAppTransition(variant, transition = 'variant-transition', duration = 500) {
        setTimeout(() => {
            document.body.className = variant + ' ' + transition
            setTimeout(() => document.body.className = variant, duration)
        }, 0)
    },

    getFace(face) {
        var faces =  this.state[this.state.activeVariant]
        return face in faces ? faces[face] : {}
    },

    getModifiedFaces() {
        var initialFaces = initialState[this.state.activeVariant]
        var faces = this.state[this.state.activeVariant]

        return Object.keys(faces).filter(face => {
            return !(face in initialFaces && _.isEqual(initialFaces[face], faces[face]))
        })
    },

    getStyle(face) {
        return getFaceStyle(
            this.getFace('Default'),
            this.getFace(face),
            this.state.postProcess[this.state.activeVariant])
    },

    resetFace(face) {
        var {activeVariant} = this.state
        var state = {
            [activeVariant]: _.cloneDeep(this.state[activeVariant])
        }

        if (face in initialState[activeVariant]) {
            state[activeVariant][face] = _.cloneDeep(initialState[activeVariant][face])
        } else {
            delete state[activeVariant][face]
        }

        this.setState(state)
    },

    setHoverFace(hoverFace) {
        this.setState({hoverFace})
    },

    setSelectedFaceProps(props) {
        var {activeVariant, selectedFace} = this.state
        var state = {
            [activeVariant]: _.cloneDeep(this.state[activeVariant])
        }

        if (!(selectedFace in state[activeVariant])) {
            state[activeVariant][selectedFace] = {}
        }

        Object.assign(state[activeVariant][selectedFace], props)
        this.setState(state)
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
        var {activeVariant, selectedFace} = this.state
        var props = {}

        if (selectedFace in initialState[activeVariant] &&
            prop in initialState[activeVariant][selectedFace]) {
            props[prop] = initialState[activeVariant][selectedFace][prop]
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

    setActivePane(activePane) {
        this.setState({activePane})
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
        Object.assign(state.postProcess[this.state.activeVariant], props)
        this.setState(state)
    },

    setActiveVariant(activeVariant) {
        this.setState({activeVariant})
        this.startAppTransition(activeVariant)
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
        this.startAppTransition(initialState.activeVariant, 'reset-transition', 750)
    }
})

module.exports = App
