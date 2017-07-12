import { renderApp } from './App.Builder';

import 'resize-sensor--preact/build/resize-sensor.css';
import './App.Builder.css';

document.addEventListener('DOMContentLoaded', function() {
  renderApp(
    document.getElementById('preact-root')
  );
})