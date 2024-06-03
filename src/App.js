import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookShelf from './components/BookShelf';
import BookSearch from './components/BookSearch';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' Component={BookSearch} />
          <Route path='/bookshelf' Component={BookShelf} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
