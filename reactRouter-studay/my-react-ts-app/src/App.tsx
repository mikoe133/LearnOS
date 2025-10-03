
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import MRouter from './router';
import Tabbar from './components/Tabbar';
import Museter from './router/useRoutes';
function App() {

  return (
    <>
      <BrowserRouter>
        {/* <MRouter ></MRouter> */}
        <Tabbar></Tabbar>
        <Museter></Museter>

      </BrowserRouter>
    </>
  )
}

export default App
