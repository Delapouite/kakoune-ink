const Color = require('color')
const files = require('./files')

const c = '0123456789ABCDEF'.split('').map(x => `#${x}${x}${x}${x}${x}${x}`)

const reverse = (face) => {
    let r = {}
    if (face.color) r.color = Color(face.color).negate().hexString()
    if (face.backgroundColor) r.backgroundColor = Color(face.backgroundColor).negate().hexString()
    if (face.highlight) r.highlight = face.highlight
    return r
}

const initialState = {
    _version: 0,
    activeColor: 'foreground',
    activeFile: 'intro',
    activePane: 'light',
    activeVariant: 'light',
    exportName: 'my-colorscheme',
    exportedSource: undefined,
    hoverFace: undefined,
    parsedSource: files.intro.parsedSource,
    selectedFace: 'Default',
    postProcess: {
        light: {
            brightness: 0,
            saturation: 0
        },
        dark: {
            brightness: 0,
            saturation: 0
        }
    },
    widgetsVisibility: {
        lineNumbers: 'show',
        information: 'hide',
        menu: 'hide',
        statusLine: 'show'
    },
    sectionsVisibility: {
        selectedFace: 'show',
        color: 'show',
        highlight: 'show',
        postProcess: 'hide',
        modifiedFaces: 'hide',
        export_: 'show',
        widgets: 'hide',
        dangerZone: 'hide'
    },
    light: {
        // code
        value: {color: c[0]},
        type: {color: c[2]},
        identifier: {color: c[2]},
        string: {color: c[0]},
        error: {backgroundColor: c[0]},
        keyword: {color: c[2], highlight: 'bold'},
        operator: {color: c[2]},
        attribute: {color: c[0]},
        comment: {color: c[8]},
        meta: {color: c[7]},

        // text
        title: {color: c[0], highlight: 'bold'},
        header: {color: c[0]},
        bold: {color: c[0], highlight: 'bold'},
        italic: {color: c[1], highlight: 'italic'},
        mono: {color: c[3], backgroundColor: c[13]},
        block: {color: c[3], backgroundColor: c[13]},
        link: {color: c[0]},
        bullet: {color: c[0]},
        list: {color: c[2]},

        // ui
        Default: {color: c[3], backgroundColor: c[15]},

        PrimarySelection: {color: c[15], backgroundColor: c[3]},
        SecondarySelection: {color: c[14], backgroundColor: c[5]},
        PrimaryCursor: {color: c[15], backgroundColor: c[0], highlight: 'bold'},
        SecondaryCursor: {color: c[14], backgroundColor: c[2], highlight: 'bold'},

        MatchingChar: {backgroundColor: c[12]},
        Search: {backgroundColor: c[12]},
        Whitespace: {backgroundColor: c[12]},
        BufferPadding: {color: c[12]},

        LineNumbers: {color: c[12]},
        LineNumberCursor: {color: c[9]},

        MenuForeground: {color: c[14], backgroundColor: c[2]},
        MenuBackground: {backgroundColor: c[13]},
        MenuInfo: {backgroundColor: c[10]},
        Information: {backgroundColor: c[11]},
        Error: {color: c[14], backgroundColor: c[2]},

        StatusLine: {color: c[3], backgroundColor: c[13]},
        StatusLineMode: {color: c[14], backgroundColor: c[2]},
        StatusLineInfo: {color: c[0], backgroundColor: c[12] },
        StatusLineValue: {color: c[0], backgroundColor: c[11] },
        StatusCursor: {backgroundColor: c[8] },
        Prompt: {color: c[14], backgroundColor: c[2]},
    }
}
initialState.dark = Object.keys(initialState.light).reduce((acc, k) => {
    const face = initialState.light[k]
    acc[k] = reverse(face)
    return acc
}, {})
module.exports = initialState
