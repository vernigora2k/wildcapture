import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { WhatWeDo } from './pages/WhatWeDo';
import { Volumetric } from './pages/Volumetric';
import { SamB } from './pages/SamB';

function App() {
  useEffect(() => {
    document.title = "Wildcapture"
  }, [])

  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Switch>
          <Route path={'/'} exact component={Home}></Route>
          <Route path={'/whatwedo'} component={WhatWeDo}></Route>
          <Route path={'/volumetric'} component={Volumetric}></Route>
          <Route path={'/vol-samb-url'} component={SamB}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
