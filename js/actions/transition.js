var ReactCSSTransitionGroup = require('react-addons-css-transition-group')

var transition = React.addons.CSSTransitionGroup;
var transitionFast = children => transition({transitionName: 'fast-transition'}, children);

module.exports = {
    transitionFast
};
