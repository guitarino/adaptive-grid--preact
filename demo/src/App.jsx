import preact from 'preact';
import AdaptiveGrid from '../../build/adaptive-grid';

import './App.css';

export default class App extends preact.Component {
  render() {
    return (
      <div class='App'>
          <AdaptiveGrid />
      </div>
    );
  }
};

export function renderApp(where) {
  preact.render(
    <App />,
    where
  );
}