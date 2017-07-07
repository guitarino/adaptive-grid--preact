'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _preact2 = _interopRequireDefault(_preact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright Kirill Shestakov 2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @see https://github.com/guitarino/adaptive-grid--preact/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var style = '.AdaptiveGrid{color:red;}';


var styleInitialized = false,

// the easiest way is to just insert a style
// into <style> tag so that all elements
// share the same style
insertCSS = function insertCSS(css) {
  var where = document.head || document.body || document.documentElement;
  var style = document.createElement('style');
  style.type = 'text/css';
  style.textContent = css;
  where.appendChild(style);
};

var AdaptiveGrid = function (_preact$Component) {
  _inherits(AdaptiveGrid, _preact$Component);

  function AdaptiveGrid() {
    _classCallCheck(this, AdaptiveGrid);

    return _possibleConstructorReturn(this, (AdaptiveGrid.__proto__ || Object.getPrototypeOf(AdaptiveGrid)).apply(this, arguments));
  }

  _createClass(AdaptiveGrid, [{
    key: 'componentWillMount',

    // initially, when no element is mounted yet,
    // insert style into DOM
    value: function componentWillMount() {
      if (!styleInitialized) {
        styleInitialized = true;
        insertCSS(style);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _preact2.default.h(
        'div',
        { 'class': 'AdaptiveGrid' },
        'Component!'
      );
    }
  }]);

  return AdaptiveGrid;
}(_preact2.default.Component);

exports.default = AdaptiveGrid;
//# sourceMappingURL=adaptive-grid.js.map