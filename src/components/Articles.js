import React, { useEffect, useState } from 'react';

const apiEndpoint = 'https://jsonmock.hackerrank.com/api/articles?author=';

const Articles = () => {
  const [author, setAuthor] = useState('');
  const [response, setResponse] = useState([]);

  async function fetchData() {
    let json;
    let response;

    try {
      json = await fetch(`${apiEndpoint}${author}&page=1`);
      response = await json.json();
    } catch(e) {
      response = e;
    }
    
    console.log(response);
    setResponse(response.data);
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
      {!response && (
        <div data-testid="no-results">No results</div>
      )}
    </ React.Fragment>
  );
};

export default Articles;
