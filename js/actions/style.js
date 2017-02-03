var Color = require('color')

function getFaceStyle(normal, face, postProcess) {
    var color = 'color' in face ?  face.color : undefined
    var backgroundColor = 'backgroundColor' in face ?  face.backgroundColor : undefined

    var style = {}

    switch (face.highlight) {
        case 'bold':
            style.fontWeight = '700'
            break
        case 'italic':
            style.fontStyle = 'italic'
            break
        case 'underline':
            style.textDecoration = 'underline'
            break
        case 'undercurl':
            style.borderBottom = '1px dotted #888888'
            break
    }

    if (color !== undefined) {
        style.color = Color(color)
            .lighten(postProcess.brightness)
            .saturate(postProcess.saturation)
            .hexString()
    } else {
        style.color = undefined
    }

    if (backgroundColor !== undefined) {
        style.backgroundColor = Color(backgroundColor)
            .lighten(postProcess.brightness)
            .saturate(postProcess.saturation)
            .hexString()
    } else {
        style.backgroundColor = undefined
    }

    return style
}

module.exports = {
    getFaceStyle
}
