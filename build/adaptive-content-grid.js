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

function ContentContainer(props) {
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
};

// This component doesn't really matter
function EmptyComponent(props) {
  return _preact2.default.h(
    'div',
    null,
    props.children
  );
};

// this grid composes the regular adaptive grid to add the 'content' functionality

var AdaptiveGrid = exports.AdaptiveGrid = function (_preact$Component) {
  _inherits(AdaptiveGrid, _preact$Component);

  function AdaptiveGrid() {
    _classCallCheck(this, AdaptiveGrid);

    return _possibleConstructorReturn(this, (AdaptiveGrid.__proto__ || Object.getPrototypeOf(AdaptiveGrid)).apply(this, arguments));
  }

  _createClass(AdaptiveGrid, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var newChildren = this.props.children.map(this.mapChildren),
          style = this.visible ? {} : {
        visibility: 'hidden'
      };
      return _preact2.default.h(
        'div',
        { style: style },
        _preact2.default.h(
          _adaptiveGrid.AdaptiveGrid,
          {
            ref: function ref(adaptiveGrid) {
              return _this2.adaptiveGridRef = adaptiveGrid;
            },
            baseWidth: this.props.baseWidth,
            baseHeight: this.props.baseHeight,
            maxColumns: this.props.maxColumns
          },
          newChildren
        )
      );
    }
  }, {
    key: 'mapChildren',
    value: function mapChildren(child, i) {
      if (!(this.props.baseWidth > 0)) return child;
      if (!(this.props.baseHeight > 0)) return child;
      if (child.nodeName !== _adaptiveGrid.AdaptiveGridItem) return child;
      if (!child.attributes) return child;
      if (child.attributes.minHeight !== 'content') return child;
      if (this.needsResizing === undefined) {
        this.needsResizing = true;
        this.visible = false;
      }
      var nextChild = child.children[0],
          NextChildComponent = nextChild.nodeName,
          nextChildAttributes = nextChild.attributes,
          nextChildChildren = nextChild.children,
          containerHeight = this.state.contentHeight[i] + this.state.padding[i],
          minHeight = containerHeight || this.props.baseHeight,
          fullHeight = Math.ceil(minHeight / this.props.baseHeight) * this.props.baseHeight,
          refs = {},
          containerRef = function containerRef(element) {
        refs.container = element;
      },
          expandableContainerRef = function expandableContainerRef(element) {
        refs.expandableContainer = element;
      };
      // Edge case for when there's no container for the content provided
      if (typeof nextChild === 'string') {
        nextChildChildren = nextChild;
        nextChild = _preact2.default.h(
          'div',
          null,
          nextChildChildren
        );
        NextChildComponent = nextChild.nodeName;
        nextChildAttributes = nextChild.attributes;
        nextChildChildren = nextChild.children;
      }
      return _preact2.default.h(
        _adaptiveGrid.AdaptiveGridItem,
        _extends({}, child.attributes, {
          minHeight: minHeight
        }),
        _preact2.default.h(
          'div',
          { ref: containerRef },
          _preact2.default.h(
            NextChildComponent,
            nextChildAttributes,
            _preact2.default.h(
              ContentContainer,
              {
                expandableContainerRef: expandableContainerRef,
                contentGap: fullHeight - minHeight,
                verticalAlign: child.attributes.verticalAlign,
                onContentResize: this.onContentResize(i, refs)
              },
              nextChildChildren
            )
          )
        )
      );
    }
  }, {
    key: 'bindAll',
    value: function bindAll() {
      this.mapChildren = this.mapChildren.bind(this);
      this.onContentResize = this.onContentResize.bind(this);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.bindAll();
      this.visible = true;
      this.state = { contentHeight: [], padding: [] };
    }

    // to avoid seeing overlap between grid items, we defer
    // making grid visible by a few frames so that it has time
    // to change sizes

  }, {
    key: 'makeVisible',
    value: function makeVisible() {
      var self = this;
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          window.requestAnimationFrame(function () {
            self.visible = true;
            self.forceUpdate();
          });
        });
      });
    }

    // callback for when the content for an item is resized

  }, {
    key: 'onContentResize',
    value: function onContentResize(i, refs) {
      var self = this;
      return function (w, h) {
        if (self.needsResizing) {
          self.needsResizing = false;
          self.makeVisible();
        }
        var contentHeight = self.state.contentHeight.slice(),
            padding = self.state.padding.slice();
        contentHeight[i] = h;
        // at initial render, the padding will be container - content
        if (!(i in padding)) {
          padding[i] = refs.container.clientHeight - h;
        }
        // at all further renders, the padding will be container - expanded content
        else {
            padding[i] = refs.container.clientHeight - refs.expandableContainer.clientHeight;
          }
        self.setState({
          contentHeight: contentHeight,
          padding: padding
        });
      };
    }
  }]);

  return AdaptiveGrid;
}(_preact2.default.Component);

;
//# sourceMappingURL=adaptive-content-grid.js.map