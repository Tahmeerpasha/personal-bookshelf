import './index.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {

  const BookSearch = lazy(() => import('./components/BookSearch.js'));
  const BookShelf = lazy(() => import('./components/BookShelf.js'));
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            <Route path='/' Component={BookSearch} />
            <Route path='/bookshelf' Component={BookShelf} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;