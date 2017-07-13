'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdaptiveGrid = exports.AdaptiveGridItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _preact2 = _interopRequireDefault(_preact);

var _resizeSensorPreact = require('resize-sensor--preact');

var _resizeSensorPreact2 = _interopRequireDefault(_resizeSensorPreact);

var _adaptiveGrid = require('./adaptive-grid');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.AdaptiveGridItem = _adaptiveGrid.AdaptiveGridItem;

// wraps content of a grid into an expandable container and content container
// and adds resize sensor on the content container

function Content(props) {
  var paddingTop, paddingBottom;
  if (props.verticalAlign === 'middle') {
    paddingTop = props.contentGap / 2;
    paddingBottom = props.contentGap / 2;
  } else if (props.verticalAlign === 'bottom') {
    paddingTop = props.contentGap;
    paddingBottom = 0;
  } else {
    paddingTop = 0;
    paddingBottom = props.contentGap;
  }
  return _preact2.default.h(
    'div',
    {
      ref: props.expandableContainerRef,
      style: {
        display: 'inline-block',
        width: '100%',
        position: 'relative',
        paddingTop: paddingTop + 'px',
        paddingBottom: paddingBottom + 'px'
      }
    },
    _preact2.default.h(
      'div',
      {
        style: {
          display: 'inline-block',
          width: '100%',
          position: 'relative'
        }
      },
      _preact2.default.h(_resizeSensorPreact2.default, { onResize: props.onContentResize }),
      props.children
    )
  );
}

// this grid composes the regular adaptive grid to add the 'content' functionality

var AdaptiveGrid = exports.AdaptiveGrid = function (_preact$Component) {
  _inherits(AdaptiveGrid, _preact$Component);

  function AdaptiveGrid() {
    _classCallCheck(this, AdaptiveGrid);

    return _possibleConstructorReturn(this, (AdaptiveGrid.__proto__ || Object.getPrototypeOf(AdaptiveGrid)).apply(this, arguments));
  }

  _createClass(AdaptiveGrid, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.state = { contentHeight: [], padding: [] };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.state = { contentHeight: [], padding: [] };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // for every content grid item, find the first element and wrap its children in the
      // <Content /> wrapper
      return _preact2.default.h(
        _adaptiveGrid.AdaptiveGrid,
        {
          baseWidth: this.props.baseWidth,
          baseHeight: this.props.baseHeight,
          maxColumns: this.props.maxColumns
        },
        this.props.children.map(function (child, i) {
          if (child.nodeName === _adaptiveGrid.AdaptiveGridItem) {
            var props = child.attributes;
            if (props && props.minHeight === 'content') {
              // will be adding a <Content /> within the first child of grid item
              var nextChild = child.children[0];
              var NextChildComponent = nextChild.nodeName;
              var nextChildAttributes = nextChild.attributes;
              var nextChildChildren = nextChild.children;
              // calculations:
              var containerHeight = _this2.state.contentHeight[i] + _this2.state.padding[i];
              var minHeight = containerHeight || _this2.props.baseHeight;
              var fullHeight = Math.ceil(minHeight / _this2.props.baseHeight) * _this2.props.baseHeight;
              var container, expandableContainer;
              // if everything's ok
              if (minHeight > 0 && fullHeight > 0) {
                return _preact2.default.h(
                  _adaptiveGrid.AdaptiveGridItem,
                  _extends({}, props, {
                    minHeight: minHeight
                  }),
                  _preact2.default.h(
                    'div',
                    { ref: function ref(element) {
                        return container = element;
                      } },
                    _preact2.default.h(
                      NextChildComponent,
                      nextChildAttributes,
                      _preact2.default.h(
                        Content,
                        {
                          expandableContainerRef: function expandableContainerRef(element) {
                            return expandableContainer = element;
                          },
                          contentGap: fullHeight - minHeight,
                          verticalAlign: props.verticalAlign,
                          onContentResize: function onContentResize(w, h) {
                            var contentHeight = _this2.state.contentHeight.slice();
                            var padding = _this2.state.padding.slice();
                            contentHeight[i] = h;
                            // at initial render, the padding will be container - content
                            if (!padding[i]) {
                              padding[i] = container.clientHeight - h;
                            }
                            // at all further renders, the padding will be container - expanded content
                            else {
                                padding[i] = container.clientHeight - expandableContainer.clientHeight;
                              }
                            _this2.setState({
                              contentHeight: contentHeight,
                              padding: padding
                            });
                          }
                        },
                        nextChildChildren
                      )
                    )
                  )
                );
              }
            }
          }
          return child;
        })
      );
    }
  }]);

  return AdaptiveGrid;
}(_preact2.default.Component);

;
//# sourceMappingURL=adaptive-content-grid.js.map