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
    let
      w = 225,
      h = 200
    ;
    this.state = {
      w: w,
      h: h,
      grid: (
        [...Array(50)].map((u,i)=>(
          Math.random() > 0.4 ? (
            <AdaptiveGridItem
              minWidth={Math.random()*2*w}
              minHeight={Math.random()*2*h}
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
                  Array(Math.ceil(50*Math.random()+1)).join("lore m ip sum ")
                }
              </Card>
            </AdaptiveGridItem>
          )
        ))
      )
    };
  }
  render() {
    return (
      <div class='App'>
        <div>
          <a href='index.html'>Regular Adaptive Grid</a>
        </div>
        <AdaptiveGrid baseWidth={ this.state.w } baseHeight={ this.state.h }>
          { this.state.grid }
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