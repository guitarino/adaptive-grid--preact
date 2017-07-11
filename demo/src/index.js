import { renderApp } from './App';

import 'resize-sensor--preact/build/resize-sensor.css';
import './App.css';

document.addEventListener('DOMContentLoaded', function() {
  renderApp(
    document.getElementById('preact-root')
  );
})