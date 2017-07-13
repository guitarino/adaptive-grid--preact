import preact from 'preact';
import ResizeSensor from 'resize-sensor--preact';
import { AdaptiveGrid as DefaultAdaptiveGrid, AdaptiveGridItem } from './adaptive-grid';

export { AdaptiveGridItem };

// wraps content of a grid into an expandable container and content container
// and adds resize sensor on the content container
function Content(props) {
  var paddingTop, paddingBottom;
  if (props.verticalAlign === 'middle') {
    paddingTop = props.contentGap / 2;
    paddingBottom = props.contentGap / 2;
  }
  else if (props.verticalAlign === 'bottom') {
    paddingTop = props.contentGap;
    paddingBottom = 0;
  }
  else {
    paddingTop = 0;
    paddingBottom = props.contentGap;
  }
  return (
    <div
      ref={props.expandableContainerRef}
      style={{
        display: 'inline-block',
        width: '100%',
        position: 'relative',
        paddingTop: (paddingTop + 'px'),
        paddingBottom: (paddingBottom + 'px')
      }}
    >
      <div
        style={{
          display: 'inline-block',
          width: '100%',
          position: 'relative'
        }}
      >
        <ResizeSensor onResize={props.onContentResize} />
        {props.children}
      </div>
    </div>
  );
}

// this grid composes the regular adaptive grid to add the 'content' functionality
export class AdaptiveGrid extends preact.Component {
  componentWillMount() {
    this.state = {contentHeight: [], padding: []};
  }

  componentWillReceiveProps() {
    this.state = {contentHeight: [], padding: []};
  }

  render() {
    // for every content grid item, find the first element and wrap its children in the
    // <Content /> wrapper
    return (
      <DefaultAdaptiveGrid
        baseWidth={this.props.baseWidth}
        baseHeight={this.props.baseHeight}
        maxColumns={this.props.maxColumns}
      >
        {
          this.props.children.map((child, i) => {
            if (child.nodeName === AdaptiveGridItem) {
              var props = child.attributes;
              if (props && props.minHeight === 'content') {
                // will be adding a <Content /> within the first child of grid item
                var nextChild = child.children[0];
                var NextChildComponent = nextChild.nodeName;
                var nextChildAttributes = nextChild.attributes;
                var nextChildChildren = nextChild.children;
                // calculations:
                var containerHeight = this.state.contentHeight[i] + this.state.padding[i];
                var minHeight = (containerHeight || this.props.baseHeight);
                var fullHeight = Math.ceil(minHeight / this.props.baseHeight) * this.props.baseHeight;
                var container, expandableContainer;
                // if everything's ok
                if (minHeight > 0 && fullHeight > 0) {
                  return (
                    <AdaptiveGridItem
                      {...props}
                      minHeight={minHeight}
                    >
                      <div ref={(element) => container = element}>
                        <NextChildComponent {...nextChildAttributes}>
                          <Content
                            expandableContainerRef={(element) => expandableContainer = element}
                            contentGap={fullHeight - minHeight}
                            verticalAlign={props.verticalAlign}
                            onContentResize={(w,h)=>{
                              var contentHeight = this.state.contentHeight.slice();
                              var padding = this.state.padding.slice();
                              contentHeight[i] = h;
                              // at initial render, the padding will be container - content
                              if (!padding[i]) {
                                padding[i] = container.clientHeight - h;
                              }
                              // at all further renders, the padding will be container - expanded content
                              else {
                                padding[i] = container.clientHeight - expandableContainer.clientHeight;
                              }
                              this.setState({
                                contentHeight: contentHeight,
                                padding: padding
                              });
                            }}
                          >
                            {nextChildChildren}
                          </Content>
                        </NextChildComponent>
                      </div>
                    </AdaptiveGridItem>
                  )
                }
              }
            }
            return child;
          })
        }
      </DefaultAdaptiveGrid>
    )
  }
};