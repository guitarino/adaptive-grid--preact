import preact from 'preact';
import { AdaptiveGrid, AdaptiveGridItem } from '../../build/adaptive-grid';

import './App.css';

let Card = (props) => (
  <div class="Card">
    <div class="Card__container">
      <div class="Card__centering"></div>
      <div class="Card__content">
        {props.children}
      </div>
    </div>
  </div>
);

export default class App extends preact.Component {
  render() {
    return (
      <div class='App'>
        <AdaptiveGrid baseWidth={150} baseHeight={150}>
          <AdaptiveGridItem minHeight={300}>
            <Card>One</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem minWidth={300} minHeight={300}>
            <Card>Two</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem minWidth={300}>
            <Card>Three</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem minWidth={300} minHeight={300}>
            <Card>Four</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem minWidth={300} minHeight={300}>
            <Card>Five</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem>
            <Card>Six</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem minWidth={300} minHeight={300}>
            <Card>Seven</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem minHeight={300}>
            <Card>Eight</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem minWidth={300}>
            <Card>Nine</Card>
          </AdaptiveGridItem>
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