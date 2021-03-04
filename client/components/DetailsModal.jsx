import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const DetailsModal = ({ type, position, id, closeModal }) => {
  const [details, setDetails] = useState({});
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (id) {
      setIsFetching(true);
      fetch(`/api/details?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setDetails(data[0]);
          setIsFetching(false);
        })
        .catch((err) => console.log('DetailsModal: fetch /api: ERROR: ', err));
    } else {
      setDetails({ name: 'Unavailable' });
      setIsFetching(false);
    }
  }, [id, type]);

  if (isFetching) {
    return (
      <div className="modal" style={position}>
        <p>Fetching data...</p>
      </div>
    );
  }

  let { mood, desc, note } = details;
  if (desc === 'null') desc = 'not entered.';
  console.log(note);
  if (note === 'Leave a note?' || note === undefined || note === '')
    note = 'No notes';

  let info = (
    <ul className={`modalList mood${mood}`}>
      <li className="modalDetail">Your mood was {desc}</li>
      <li className="modalDetail">Notes: {note}</li>
    </ul>
  );

  return (
    <div className={`modal mood${details.mood}`} style={position}>
      <div className="modalHeading">
        <h4 className="modalName">
          {new Date(details.date + ' 00:00').toDateString()}
        </h4>
        <FAIcon icon={faTimes} onClick={closeModal} />
      </div>
      {info}
    </div>
  );
};

export default DetailsModal;
