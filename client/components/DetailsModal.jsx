import React, { useState, useEffect } from 'react';

const DetailsModal = ({ type, position, id, closeModal }) => {
  const [details, setDetails] = useState({});
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (id) {
      setIsFetching(true);
      fetch(`/api/details?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('data', data[0]);
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
    console.log('p', position);
    console.log('i', id);
    return (
      <div className="modal" style={position}>
        <p>Fetching data...</p>
      </div>
    );
  }

  let info;
  switch (type) {
    case 'species':
      case 'date':
      let { _id, date, mood, desc, note } = details;
      if (desc === 'null') desc = 'not entered.'
      
      info = (
        <ul className={`modalList mood${mood}`}>
          <li className="modalDetail">Your mood was {desc}</li>
          <li className="modalDetail">Notes: {note || 'No notes'}</li>
        </ul>
      );
      break;
    default:
      info = <p>Unexpected modal type</p>;
  }
  console.log(details.mood);
  return (
    <div className={`modal mood${details.mood}`} style={position}>
      <div className="modalHeading">
        <h4 className="modalName">
          {new Date(details.date + ' 00:00').toDateString()}
        </h4>
        {/* <FAIcon icon={faTimes} onClick={closeModal} /> */}
      </div>
      {info}
    </div>
  );
};

export default DetailsModal;
