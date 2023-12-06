import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../components/SearchBar';

describe('SearchBar Component', () => {
  test('renders search input and button', () => {
    render(<SearchBar onSearch={() => {}} />);
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('allows typing in search input', () => {
    render(<SearchBar onSearch={() => {}} />);
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Luke Skywalker' } });
    expect(input.value).toBe('Luke Skywalker');
  });

  test('trims input value on search', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '  Yoda  ' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('Yoda');
  });

  test('triggers onSearch prop function with empty input', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

  test('triggers onSearch prop function when search button is clicked', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Darth Vader' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('Darth Vader');
  });
});
