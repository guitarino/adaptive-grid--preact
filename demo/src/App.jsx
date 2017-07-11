import preact from 'preact';
import { AdaptiveGrid, AdaptiveGridItem } from '../../build/adaptive-grid';

import './App.css';

export default class App extends preact.Component {
  render() {
    return (
      <div class='App'>
        <AdaptiveGrid
          baseWidth={100}
          baseHeight={100}
        >
          <AdaptiveGridItem
            minWidth={200}
          />
          <AdaptiveGridItem />
          <AdaptiveGridItem />
          <AdaptiveGridItem
            minWidth={300}
            minHeight={200}
          />
          <AdaptiveGridItem />
          <AdaptiveGridItem
            minWidth={200}
          />
          <AdaptiveGridItem />
          <AdaptiveGridItem />
          <AdaptiveGridItem
            minWidth={300}
            minHeight={200}
          />
          <AdaptiveGridItem />
        </AdaptiveGrid>
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