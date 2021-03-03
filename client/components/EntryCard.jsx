import React from 'react';

const EntryCard = (props) => {
  const { date, mood } = props.info;
  let formatDate = new Date(date + ' 00:00');
  return (
    <article className={`entryCard mood${mood}`}>
      {/* <div className="entryHeadContainer">
        <h3 className="entryHeadTitle">Entry</h3>
      </div> */}
      <ul className="entryDetailsList">
        <li className="entryDetail">Date: {formatDate.toDateString()}</li>
        <li className="entryDetail">Mood: {mood}</li>
      </ul>
    </article>
  );
};

export default EntryCard;
