import React from 'react';
import styles from './SearchPage.module.css';

import SearchBar from '../../components/SearchBar';
import Results from '../../components/Results';

type Person = {
  name: string;
  gender: string;
};

type SearchPageState = {
  searchResults: Person[];
  error: boolean;
  testError: boolean;
  isLoading: boolean;
};

class SearchPage extends React.Component<
  Record<string, never>,
  SearchPageState
> {
  state: SearchPageState = {
    searchResults: [],
    error: false,
    testError: false,
    isLoading: false,
  };

  componentDidMount() {
    const initialSearchTerm = localStorage.getItem('searchTerm') || '';
    this.handleSearch(initialSearchTerm);
  }

  testError = () => {
    this.setState({ testError: true });
  };

  handleSearch = async (searchTerm: string) => {
    this.setState({ isLoading: true });

    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchTerm}`
      );
      const data = (await response.json()) as { results: Person[] };
      this.setState({ searchResults: data.results, isLoading: false });
    } catch (error) {
      console.error(error);
      this.setState({ error: true, isLoading: false });
    }
  };

  render() {
    if (this.state.testError) {
      throw new Error('Test error!');
    }

    return (
      <>
        <button onClick={this.testError}>Тестировать ошибку</button>

        <div className={styles.searchPage}>
          <div className={styles.searchPageRow}>
            <SearchBar onSearch={this.handleSearch} />
          </div>

          {this.state.isLoading ? (
            <div>Загрузка...</div>
          ) : (
            <div className={styles.searchPageRow}>
              <Results data={this.state.searchResults} />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default SearchPage;
