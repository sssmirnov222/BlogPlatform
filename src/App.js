import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import ArticlItem from './components/ArticlItem/ArticlItem';
import Articl from './components/Articles/Articl';
import { ArticlList } from './components/ArticlList/ArticlList';
import SingUp from './components/SingUp/SingUp';
import SingIp from './components/SignIn/SignIn';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/sign-up" element={<SingUp />} />
        <Route path="/sign-in" element={<SingIp />} />
        <Route path="/articles" element={<ArticlItem />} />
        <Route path="/articles/:slug" element={<ArticlList />} />
      </Routes>
    </div>
  );
}

export default App;
