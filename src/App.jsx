// import logo from './logo.svg';
import './App.css';
import { Display } from './Pages/Display';
import { Home } from './Pages/Home';
// import { Navbar } from './Pages/Navbar';
import Navbar2 from './Pages/Navbar2';
import { Routes,Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (

    <BrowserRouter>
    <div className="App">
      <Navbar2/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/users" element={<Display/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
