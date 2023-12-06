import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import DetailPage from '../pages/DetailPage';
import { store } from '../store';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ detailsId: '1' }),
}));

describe('DetailPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should display loading indicator', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <DetailPage />
          </Router>
        </Provider>
      );
    });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('should display person details when loading is false and data is fetched', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({ name: 'Luke Skywalker', gender: 'male' }))
      )
    ) as jest.Mock;

    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <DetailPage />
          </Router>
        </Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('Gender:')).toBeInTheDocument();
    });
  });

  test('should navigate back on close', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({ name: 'Luke Skywalker', gender: 'male' }))
      )
    ) as jest.Mock;

    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <DetailPage />
          </Router>
        </Provider>
      );
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Close'));
    });

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
