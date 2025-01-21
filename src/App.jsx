import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import ArticlItem from './components/ArticlItem/ArticlItem';
import ArticlList from './components/ArticlList/ArticlList';
import SingUp from './components/SingUp/SingUp';
import SingIp from './components/SignIn/SignIn';
import CreateArticl from './components/CreateArticl/CreateArticl';
import EditArticl from './components/EditArticl/EditArticl';
import EditProfile from './components/EditProfile/EditProfile';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ArticlItem />} />
        <Route path="/sign-up" element={<SingUp />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/sign-in" element={<SingIp />} />
        <Route path="/new-article" element={<CreateArticl />} />

        <Route path="/articles/:slug" element={<ArticlList />} />
        <Route path="/articles/:slug/edit" element={<EditArticl />} />
      </Routes>
    </div>
  );
}
//
export default App;
