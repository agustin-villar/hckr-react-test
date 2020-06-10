import React, {  useState } from 'react';

const apiEndpoint = 'response.json?';
const responseLimit = 3;

function filterNullTitles(data, limit) {
  return data.filter((item) => item.title).splice(0, limit);
}

const Articles = () => {
  const [author, setAuthor] = useState('');
  const [response, setResponse] = useState(null);

  async function fetchData() {
    let json;
    let response;

    try {
      json = await fetch(`${apiEndpoint}${author}&page=1`);
      response = await json.json();
    } catch(e) {
      response = e;
    }
    
    setResponse(filterNullTitles(response.data, responseLimit));
  }

  return (
    <React.Fragment>
      <div className="controls">
        <div className="input-container">
          <span>author:</span>
          <input type="text" className="text-input" data-testid="text-input" onChange={(e) => setAuthor(e.target.value)} />
          <button className="fetch-button" data-testid="fetch-button" onClick={fetchData}>Fetch</button>
        </div>
      </div>
      <div className="results">
        {response && response.map(({ title }) => (
            <li key={title} data-testid="result-row">{title}</li>
          ))}
      </div>
      {(response && response.length === 0) && (
        <div data-testid="no-results">No results</div>
      )}
    </ React.Fragment>
  );
};

export default Articles;
