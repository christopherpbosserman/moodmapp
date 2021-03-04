import React from 'react';

const EntryCard = (props) => {
  const { date, mood } = props.info;
  let formatDate = new Date(date + ' 00:00').toDateString();
  let sat = formatDate.slice(0, 3);
  let star = '';
  return (
    <article className={`entryCard mood${mood} ${sat}`}>
      {/* <div className="entryHeadContainer">
        <h3 className="entryHeadTitle">Entry</h3>
      </div> */}
      <div className="entryDetailsList">
        <p className="entryDetail">
          {star} {formatDate} {star}
        </p>
      </div>
    </article>
  );
};

export default EntryCard;
