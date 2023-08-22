import './App.css';
import Home from './pages/Home';
import Navbar from './components/ui/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Recipes from './pages/Recipes/Recipes';
import Order from './pages/Order/Order';

function App() {
  return (
    <>
      <header className={'header'}></header>
      <BrowserRouter>
        {/* <head>
          <meta name="og:title" content="The Chef App" />
          <meta name="og:description" content="" />
          <meta name="og:image" content="" />
        </head>
        <body> */}
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<Order />} />
            <Route path="/recipes" element={<Recipes />} />
          </Routes>
        </main>
        <footer></footer>
        {/* </body> */}
      </BrowserRouter>
    </>
  );
}

export default App;
