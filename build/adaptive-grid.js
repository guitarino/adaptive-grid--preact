'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdaptiveGrid = exports.AdaptiveGridItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _preact2 = _interopRequireDefault(_preact);

var _resizeSensorPreact = require('resize-sensor--preact');

var _resizeSensorPreact2 = _interopRequireDefault(_resizeSensorPreact);

require('./adaptive-grid.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright Kirill Shestakov 2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @see https://github.com/guitarino/adaptive-grid--preact/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var AdaptiveGridItem = exports.AdaptiveGridItem = function (_preact$Component) {
  _inherits(AdaptiveGridItem, _preact$Component);

  function AdaptiveGridItem() {
    _classCallCheck(this, AdaptiveGridItem);

    return _possibleConstructorReturn(this, (AdaptiveGridItem.__proto__ || Object.getPrototypeOf(AdaptiveGridItem)).apply(this, arguments));
  }

  _createClass(AdaptiveGridItem, [{
    key: 'render',
    value: function render() {
      return _preact2.default.h(
        'div',
        { 'class': 'AdaptiveGridItem', style: this.props.style },
        'Hello there'
      );
    }
  }]);

  return AdaptiveGridItem;
}(_preact2.default.Component);

;

function isFilled(colStart, rowStart, colEnd, rowEnd, arr) {
  var isFilled = false;
  arr.forEach(function (borders) {
    var colStart2 = borders[0];
    var rowStart2 = borders[1];
    var colEnd2 = borders[2];
    var rowEnd2 = borders[3];
    if (colStart < colEnd2 && colEnd > colStart2 && rowEnd2 > rowStart && rowStart2 < rowEnd) {
      isFilled = true;
      return false;
    }
  });
  return isFilled;
}

function doFill(colStart, rowStart, colEnd, rowEnd, arr) {
  arr.push([colStart, rowStart, colEnd, rowEnd]);
}

var AdaptiveGrid = exports.AdaptiveGrid = function (_preact$Component2) {
  _inherits(AdaptiveGrid, _preact$Component2);

  function AdaptiveGrid() {
    _classCallCheck(this, AdaptiveGrid);

    var _this2 = _possibleConstructorReturn(this, (AdaptiveGrid.__proto__ || Object.getPrototypeOf(AdaptiveGrid)).call(this));

    _this2.onResize = _this2.onResize.bind(_this2);
    _this2.state = { width: 0 };
    return _this2;
  }

  _createClass(AdaptiveGrid, [{
    key: 'onResize',
    value: function onResize(width) {
      this.setState({ width: width });
    }
  }, {
    key: 'render',
    value: function render() {
      var availableWidth = this.state.width;
      console.log(availableWidth);
      var maxHeight = 0;
      if (availableWidth > 0) {
        var baseWidth = this.props.baseWidth;
        var baseHeight = this.props.baseHeight;
        var totalColumns = Math.floor(availableWidth / baseWidth);
        var colWidth = availableWidth / totalColumns;
        var childrenInfo = this.props.children.map(function (child) {
          var width = baseWidth;
          var height = baseHeight;
          if (child.attributes) {
            if (child.attributes.minWidth) {
              width = child.attributes.minWidth;
            }
            if (child.attributes.minHeight) {
              height = child.attributes.minHeight;
            }
          }
          return {
            cols: Math.ceil(width / baseWidth),
            rows: Math.ceil(height / baseHeight)
          };
        });
        var remainingElements = [].slice.call(this.props.children);
        var remainingElementsIds = Object.keys(this.props.children);
        var childrenCoords = [];
        var row = 0;
        var boundaries = [];
        while (remainingElements.length) {
          for (var col = 0; col < totalColumns; col++) {
            for (var elId = 0; elId < remainingElements.length; elId++) {
              var childId = remainingElementsIds[elId];
              var cols = childrenInfo[childId].cols;
              var rows = childrenInfo[childId].rows;
              if (col + cols <= totalColumns) {
                if (!isFilled(col, row, col + cols, row + rows, boundaries)) {
                  remainingElements.splice(elId, 1);
                  remainingElementsIds.splice(elId, 1);
                  elId--;
                  childrenCoords[childId] = [col, row];
                  doFill(col, row, col + cols, row + rows, boundaries);
                  break;
                }
              }
            }
          }
          row++;
        }
        this.props.children.forEach(function (child, i) {
          if (!child.attributes) {
            child.attributes = {};
          }
          child.attributes.style = {
            position: 'absolute',
            left: childrenCoords[i][0] * colWidth + 'px',
            top: childrenCoords[i][1] * baseHeight + 'px',
            width: childrenInfo[i].cols * colWidth + 'px',
            height: childrenInfo[i].rows * baseHeight + 'px'
          };
          var edge = (childrenCoords[i][1] + childrenInfo[i].rows) * baseHeight;
          if (edge > maxHeight) maxHeight = edge;
          // console.log(child.attributes);
        });
      }
      return _preact2.default.h(
        'div',
        { 'class': 'AdaptiveGrid', style: { height: maxHeight } },
        _preact2.default.h(_resizeSensorPreact2.default, {
          onResize: this.onResize
        }),
        this.props.children
      );
    }
  }]);

  return AdaptiveGrid;
}(_preact2.default.Component);
//# sourceMappingURL=adaptive-grid.js.map