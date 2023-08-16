import './App.css';
import Home from './pages/Home';
import Navbar from './components/ui/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <head>
        <meta name="og:title" content="The Chef App" />
        <meta name="og:description" content="" />
        <meta name="og:image" content="" />
      </head>
      <body>
        <header className={'header'}></header>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <footer></footer>
      </body>
    </BrowserRouter>
  );
}

export default App;
