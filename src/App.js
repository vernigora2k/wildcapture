import { OrbitControls } from '@react-three/drei';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Canvas } from 'react-three-fiber';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { WhatWeDo } from './pages/WhatWeDo';


function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  )
}

function App() {
  return (
    <>
    <BrowserRouter>
      <div className="container">
        <Header />
        <Switch>
          <Route path={'/'} exact component={Home}></Route>
          <Route path={'/whatwedo'} component={WhatWeDo}></Route>
        </Switch>
      </div>
    </BrowserRouter>
    {/* <Canvas>
      <OrbitControls />
      <Box />
    </Canvas> */}
    </>
  );
}

export default App;