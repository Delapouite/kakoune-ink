var Color = require('color')

function postProcessColor(color, postProcess) {
    return Color(color)
        .lighten(postProcess.brightness)
        .saturate(postProcess.saturation)
        .hexString()
        .toLowerCase()
        .slice(1)
}

function exportFace(name, props, postProcess) {
    var str = [`face ${name} `]

    if (props.color)
        str.push(`rgb:${postProcessColor(props.color, postProcess)}`)
    else
        str.push('default')

    if (props.backgroundColor)
        str.push(`,rgb:${postProcessColor(props.backgroundColor, postProcess)}`)
    else
        str.push(',default')

    if (props.highlight)
      str.push(`+${props.highlight[0]}`)

    return str.join('')
}

function exportScheme(scheme, postProcess) {
    var reset = [
        // code
        'value',
        'type',
        'identifier',
        'string',
        'error',
        'keyword',
        'operator',
        'attribute',
        'comment',
        'meta',

        // text
        'title',
        'header',
        'bold',
        'mono',
        'block',
        'link',
        'bullet',
        'list',

        // ui
        'Default',

        'PrimarySelection',
        'SecondarySelection',
        'PrimaryCursor',
        'SecondaryCursor',

        'MatchingChar',
        'Search',
        'Whitespace',
        'BufferPadding',

        'LineNumbers',
        'LineNumberCursor',

        'MenuBackground',
        'MenuForeground',
        'MenuInfo',
        'Information',
        'Error',

        'StatusLine',
        'StatusLineMode',
        'StatusLineInfo',
        'StatusLineValue',
        'StatusCursor',
        'Prompt',
    ]

    var str = ['# code\n']
    var faces = scheme

    reset.forEach(resetFace => {
        if (!(resetFace in faces)) {
            faces[resetFace] = {}
        }
    })

    for (var face in faces) {
        if (face === 'title') str.push('\n# text\n')
        if (face === 'Default') str.push('\n# kakoune UI\n')

        str.push(exportFace(face, faces[face], postProcess))
    }

    return str.join('\n')
}

function exportColorScheme(state) {
    return state.activeScheme === 'light'
        ? exportScheme(state.schemes.light, state.postProcess.light)
        : exportScheme(state.schemes.dark, state.postProcess.dark)
}

module.exports = exportColorScheme
