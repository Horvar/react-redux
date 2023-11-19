import React from 'react';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import SearchProvider from './context/searchContext';
import { Provider } from 'react-redux';
import { store } from './store';

import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import ErrorBoundary from './components/ErrorBoundary';
import NotFoundPage from './pages/NotFoundPage';

import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Provider store={store}>
      <SearchProvider>
        <React.StrictMode>
          <BrowserRouter>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<SearchPage />}>
                  <Route path="details/:detailsId" element={<DetailPage />} />
                  <Route path="page/:pageNumber" element={<SearchPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </ErrorBoundary>
          </BrowserRouter>
        </React.StrictMode>
      </SearchProvider>
    </Provider>
  );
};

export default App;
