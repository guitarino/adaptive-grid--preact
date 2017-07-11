import preact from 'preact';
import { AdaptiveGrid, AdaptiveGridItem } from '../../build/adaptive-grid';

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
    let w = 150;
    let h = 150;
    return (
      <div class='App'>
        <AdaptiveGrid baseWidth={w} baseHeight={h} maxColumns={8}>
          <AdaptiveGridItem>
            <Card>One</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem>
            <Card>Two</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem minWidth={2*w} minHeight={2*h}>
            <Card>Three</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem minWidth={2*w}>
            <Card>Four</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem minWidth={2*w} minHeight={2*h}>
            <Card>Five</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem minWidth={2*w}>
            <Card>Six</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem>
            <Card>Seven</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem>
            <Card>Eight</Card>
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