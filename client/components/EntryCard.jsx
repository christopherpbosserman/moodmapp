import React from 'react';

const EntryCard = (props) => {
  const { date, mood } = props.info;
  let formatDate = new Date(date + ' 00:00').toDateString();
  let moDa = formatDate.slice(3, 10);
  if (moDa === 'alid D') moDa = '';
  let star = '';
  return (
    <article className={`entryCard mood${mood}`}>
      <div className="entryDetailsList">
        <center>
          <p className={`entryDetail hidden${mood}`}>
            {star} {moDa} {star}
          </p>
        </center>
      </div>
    </article>
  );
};

export default EntryCard;
