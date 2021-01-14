import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { WhatWeDo } from './pages/WhatWeDo';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Switch>
          <Route path={'/'} exact component={Home}></Route>
          <Route path={'/whatwedo'} component={WhatWeDo}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
