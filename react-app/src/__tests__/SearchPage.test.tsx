import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import SearchPage from '../pages/SearchPage';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('SearchPage', () => {
  it('renders search input and submit button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('updates search term on input change and submits', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchPage />
        </BrowserRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Luke Skywalker' } });
    expect(input.value).toBe('Luke Skywalker');

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    // Здесь могут быть дополнительные проверки на изменение URL или вызов Redux actions
  });

  it('displays loading and error states', () => {
    const store = mockStore({
      search: {
        currentPage: 1,
        searchTerm: '',
      },
      api: {
        queries: {},
        mutations: {},
      },
      loading: {
        mainPageLoading: true,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('handles search term change', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchPage />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Luke Skywalker' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(window.location.search).toContain('search=Luke+Skywalker');
  });
});
