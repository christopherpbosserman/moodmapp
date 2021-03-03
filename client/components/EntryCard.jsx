import React from 'react';

const EntryCard = (info) => {
  const { date, mood } = info.info;
  console.log('info', info);
  return (
    <article className="entryCard">
      <div className="entryHeadContainer">
        <h3>Entry</h3>
      </div>
      <ul className="entryDetailsList">
        <li className="entryDetail">Date: {date}</li>
        <li className="entryDetail">Mood: {mood}</li>
      </ul>
    </article>
  );
};

export default EntryCard;
