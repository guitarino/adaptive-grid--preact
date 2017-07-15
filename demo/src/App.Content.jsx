import preact from 'preact';
import { AdaptiveGrid, AdaptiveGridItem } from '../../build/adaptive-content-grid';
import 'preact/devtools';

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
  componentWillMount() {
    let w = 150;
    let h = 150;
    this.state = (
      Array.from(Array(50)).map((u,i)=>(
        Math.random() > 0.4 ? (
          <AdaptiveGridItem
            minWidth={Math.random()*3*w}
            minHeight={Math.random()*3*h}
          >
            <Card>{ i }</Card>
          </AdaptiveGridItem>
        ) : (
          <AdaptiveGridItem
            minWidth={(Math.random()*2+1)*w}
            minHeight='content'
            verticalAlign='middle'
          >
            <Card>
                {
                  ("lorem ip sum ").repeat(50*Math.random()+1)
                }
            </Card>
          </AdaptiveGridItem>
        )
      ))
    );
  }
  render() {
    let w = 150;
    let h = 150;
    return (
      <div class='App'>
        <div>
          <a href='index.html'>Regular Adaptive Grid</a>
        </div>
        <AdaptiveGrid baseWidth={w} baseHeight={h}>
          { this.state }
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