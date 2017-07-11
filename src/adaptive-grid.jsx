/**
 * @license MIT
 * @copyright Kirill Shestakov 2017
 * @see https://github.com/guitarino/adaptive-grid--preact/
 */

import preact from 'preact';
import ResizeSensor from 'resize-sensor--preact';

import './adaptive-grid.css';

export class AdaptiveGridItem extends preact.Component {
  render() {
    return (
      <div class="AdaptiveGridItem" style={this.props.style}>Hello there</div>
    )
  }
};

function isFilled(colStart, rowStart, colEnd, rowEnd, arr) {
  var isFilled = false;
  arr.forEach((borders) => {
    var colStart2 = borders[0];
    var rowStart2 = borders[1];
    var colEnd2 = borders[2];
    var rowEnd2 = borders[3];
    if (colStart < colEnd2 && colEnd > colStart2 &&
      rowEnd2 > rowStart && rowStart2 < rowEnd ) {
      isFilled = true;
      return false;
    }
  });
  return isFilled;
}

function doFill(colStart, rowStart, colEnd, rowEnd, arr) {
  arr.push([colStart, rowStart, colEnd, rowEnd]);
}

export class AdaptiveGrid extends preact.Component {
  constructor() {
    super();
    this.onResize = this.onResize.bind(this);
    this.state = {width: 0};
  }
  onResize(width) {
    this.setState({width: width});
  }
  render() {
    var availableWidth = this.state.width;
    console.log(availableWidth);
    var maxHeight = 0;
    if (availableWidth > 0) {
      var baseWidth = this.props.baseWidth;
      var baseHeight = this.props.baseHeight;
      var totalColumns = Math.floor(availableWidth / baseWidth);
      var colWidth = availableWidth / totalColumns;
      var childrenInfo = this.props.children.map((child) => {
        var width = baseWidth;
        var height = baseHeight;
        if(child.attributes) {
          if(child.attributes.minWidth) {
            width = child.attributes.minWidth;
          }
          if(child.attributes.minHeight) {
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
      while(remainingElements.length) {
        for(var col = 0; col < totalColumns; col++) {
          for(var elId = 0; elId < remainingElements.length; elId++) {
            var childId = remainingElementsIds[elId];
            var cols = childrenInfo[childId].cols;
            var rows = childrenInfo[childId].rows;
            if(col + cols <= totalColumns) {
              if(!isFilled(col, row, col + cols, row + rows, boundaries)) {
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
      this.props.children.forEach((child, i) => {
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
    return (
      <div class='AdaptiveGrid' style={{height: maxHeight}}>
        <ResizeSensor
          onResize={this.onResize}
        />
        {this.props.children}
      </div>
    );
  }
}