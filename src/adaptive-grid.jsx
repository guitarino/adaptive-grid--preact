/**
 * @license MIT
 * @copyright Kirill Shestakov 2017
 * @see https://github.com/guitarino/adaptive-grid--preact/
 */

import preact from 'preact';

import style from './adaptive-grid.css';

var
  styleInitialized = false,
  // the easiest way is to just insert a style
  // into <style> tag so that all elements
  // share the same style
  insertCSS = function(css) {
    var where = (
      document.head ||
      document.body ||
      document.documentElement
    );
    var style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = css;
    where.appendChild(style);
  }
;

export default class AdaptiveGrid extends preact.Component {
  // initially, when no element is mounted yet,
  // insert style into DOM
  componentWillMount() {
    if (!styleInitialized) {
      styleInitialized = true;
      insertCSS(style);
    }
  }

  render() {
    return (
      <div class='AdaptiveGrid'>Component!</div>
    )
  }
}