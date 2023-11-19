import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchPeopleQuery } from '../../features/api/apiSlice';
import {
  setSearchTerm,
  setItemsPerPage,
} from '../../features/search/searchSlice';
import styles from './SearchPage.module.css';
import SearchBar from '../../components/SearchBar';
import Results from '../../components/Results';
import Pagination from '../../components/Pagination';
import { Person } from '../../types';
import { RootState } from '../../store';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

  const { data, error, isLoading } = useFetchPeopleQuery(searchTerm);

  useEffect(() => {
    const urlSearchTerm = searchParams.get('search') || '';
    if (urlSearchTerm && urlSearchTerm !== searchTerm) {
      dispatch(setSearchTerm(urlSearchTerm));
    }
  }, [searchParams, searchTerm, dispatch]);

  const handleSearch = (term: string) => {
    dispatch(setSearchTerm(term));
    setSearchParams({ search: term, page: '1' });
  };

  const handlePaginate = (page: number) => {
    setSearchParams({ search: searchTerm, page: page.toString() });
    dispatch(setItemsPerPage(page));
  };

  const openDetails = (person: Person) => {
    const personId = person.url.split('/').slice(-2, -1)[0];
    navigate(`/details/${personId}`);
  };

  return (
    <>
      <div className={styles.searchPage}>
        <div className={styles.searchPageRowSearch}>
          <SearchBar onSearch={handleSearch} />
        </div>

        {error && (
          <div className={styles.searchPageRowSearch}>
            <div className={styles.error}>
              An error has occurred. Please try again later.
            </div>
          </div>
        )}

        <div className={styles.searchPageRowResult}>
          {isLoading ? (
            <div className={styles.loader}>Loading...</div>
          ) : (
            <Results data={data?.results || []} onItemSelected={openDetails} />
          )}
        </div>

        <div className={styles.searchPageRowControls}>
          <Pagination
            total={data?.count || 0}
            currentPage={1}
            onPaginate={handlePaginate}
          />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
