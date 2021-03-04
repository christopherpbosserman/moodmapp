import React from 'react';

const EntryCard = (props) => {
  const { date, mood } = props.info;
  let formatDate = new Date(date + ' 00:00').toDateString();
  let moDa = formatDate.slice(3, 10);
  if (moDa === 'alid Da') {
    moDa = '';
  }

  const openDetailsModal = (e, type, id) => {
    const top = e.pageY;
    const left = e.pageX;
    props.openModal(type, { top, left }, id);
  };

  return (
    <article
      className={`entryCard mood${mood}`}
      onClick={(e) => openDetailsModal(e, 'date', props.info.date)}
    >
      <div className="entryDetailsList">
        <center>
          <p className="entryDetail">{moDa}</p>
        </center>
      </div>
    </article>
  );
};

export default EntryCard;
