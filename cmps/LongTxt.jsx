const { useState } = React;

export default function LongTxt({ txt, length = 100 }) {
  const [isFullTextDisplayed, setIsFullTextDisplayed] = useState(false);

  function toggleLongTxt() {
    setIsFullTextDisplayed(prev => !prev);
  }

  if (txt.length <= length) return <p>{txt}</p>;

  return (
    <p className="long-txt">
      {isFullTextDisplayed ? txt : `${txt.substring(0, length)}...`}
      <button onClick={toggleLongTxt}>
        {isFullTextDisplayed ? 'Show Less' : 'Read More'}
      </button>
    </p>
  );
}
