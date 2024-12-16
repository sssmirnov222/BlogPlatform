import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import ArticlItem from './components/ArticlItem/ArticlItem';
import Articl from './components/Articles/Articl';
import { ArticlList } from './components/ArticlList/ArticlList';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/articles" element={<ArticlItem />} />
        <Route path="/articles/:slug" element={<ArticlList />} />
      </Routes>
    </div>
  );
}

export default App;
