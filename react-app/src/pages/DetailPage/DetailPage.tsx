import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDetailsPageLoading } from '../../features/loading/loadingSlice';
import { RootState } from '../../store';
import styles from './DetailPage.module.css';

import { Person } from '../../types';

const DetailPage = () => {
  const { detailsId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(
    (state: RootState) => state.loading.detailsPageLoading
  );

  const closeDetails = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      dispatch(setDetailsPageLoading(true));

      try {
        const response = await fetch(
          `https://swapi.dev/api/people/${detailsId}`
        );
        const data = await response.json();
        setPerson(data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }

      dispatch(setDetailsPageLoading(false));
    };

    fetchDetails();
  }, [detailsId, dispatch]);

  const [person, setPerson] = useState<Person | null>(null);

  if (isLoading) {
    return (
      <div className={styles.details}>
        <div className={styles.detailsOverlay} onClick={closeDetails}></div>
        <div className={styles.detailsModal}>
          <div className={styles.loader}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.details}>
      <>
        <div className={styles.detailsOverlay} onClick={closeDetails}></div>
        <div className={styles.detailsModal}>
          {person ? (
            <>
              <button className={styles.detailsClose} onClick={closeDetails}>
                Close
              </button>
              <h2 className={styles.detailsTitle}>{person.name}</h2>
              <div className={styles.detailsData}>
                <span>Gender: </span>
                <span>
                  <b>{person.gender}</b>
                </span>
              </div>
              <div className={styles.detailsData}>
                <span>Height: </span>
                <span>
                  <b>{person.height}</b>
                </span>
              </div>
              <div className={styles.detailsData}>
                <span>Mass: </span>
                <span>
                  <b>{person.mass}</b>
                </span>
              </div>
              <div className={styles.detailsData}>
                <span>Hair color: </span>
                <span>
                  <b>{person.hair_color}</b>
                </span>
              </div>
              <div className={styles.detailsData}>
                <span>Eye color: </span>
                <span>
                  <b>{person.eye_color}</b>
                </span>
              </div>
              <div className={styles.detailsData}>
                <span>Skin color: </span>
                <span>
                  <b>{person.skin_color}</b>
                </span>
              </div>
            </>
          ) : null}
        </div>
      </>
    </div>
  );
};

export default DetailPage;
