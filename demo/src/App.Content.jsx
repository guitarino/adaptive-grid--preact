import preact from 'preact';
import { AdaptiveGrid, AdaptiveGridItem } from '../../build/adaptive-content-grid';

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
        <div>
          <a href='index.html'>Regular Adaptive Grid</a>
        </div>
        <AdaptiveGrid baseWidth={w} baseHeight={h} maxColumns={8}>
          <AdaptiveGridItem>
            <Card>One</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem>
            <Card>Two</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem minWidth={2*w} minHeight='content' verticalAlign='middle'>
            <Card>
              <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel odio, fugit quia possimus dolor laboriosam soluta molestiae dolores reprehenderit nam. Iure adipisci sed dolore dolores perspiciatis maiores quod rem a!</div>
              <div>Maiores velit inventore, quis obcaecati recusandae dolores fuga quae modi ab optio, molestiae, reiciendis officiis reprehenderit iure eum sint veritatis atque sapiente. Doloribus perspiciatis ipsa assumenda odio quasi vel, aliquid.</div>
              <div>Voluptatem id corporis aliquam, in omnis? Culpa voluptatum impedit, magni inventore praesentium molestiae. Accusamus quidem cupiditate, sint voluptatibus mollitia rerum cum a esse. Nobis cum, soluta sint. Ducimus, doloremque quidem!</div>
            </Card>
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
          <AdaptiveGridItem minWidth={2*w} minHeight={2*h}>
            <Card>Nine</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem minHeight={2*h}>
            <Card>Ten</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem>
            <Card>Eleven</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem>
            <Card>Twelve</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem minHeight={2*h}>
            <Card>Thirteen</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem minWidth={2*w} minHeight={2*h}>
            <Card>Fourteen</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem minWidth={2*w}>
            <Card>Fifteen</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem>
            <Card>Sixteen</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem>
            <Card>Seventeen</Card>
          </AdaptiveGridItem>
          <AdaptiveGridItem>
            <Card>Eighteen</Card>
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