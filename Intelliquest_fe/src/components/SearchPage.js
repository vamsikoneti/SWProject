import React, { useState } from 'react';
import './SearchPage.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../logo.svg';
import CenterLogo from '../center_logo.svg';
import { useAuth } from '../contexts/AuthContext';



function SearchPage() {
  const { currentUser, signOut } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [expandedAbstract, setExpandedAbstract] = useState(null); 

  // Link to signin page
  let navigate = useNavigate();
  const handleSignInClick = () => {
    navigate('/signin'); // Navigate to the sign-in page
  };

  const handleSearch = async () => {
    // Replace with your Django API endpoint
    const apiUrl = `http://127.0.0.1:8000/IntelliQuest_v1/search/?query=${query}`;
    console.log(apiUrl);
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setResults(data.results);
      console.log(data.results);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  function resetSearch() {
    setQuery(''); // Resets the query string
    setResults([]); // Resets the search results
  }

  const toggleAbstract = (index) => {
    setExpandedAbstract(expandedAbstract === index ? null : index);
  };

  const renderAbstract = (paper, index) => {
    const abstractText = paper.abstract || "Abstract not available";
    return expandedAbstract === index ? (
      <p>{abstractText} <button className="readmore" onClick={() => toggleAbstract(index)}>Read less</button></p>
    ) : (
      <p>{abstractText.substring(0, 100)}... <button className="readmore" onClick={() => toggleAbstract(index)}>Read more</button></p>
    );
  };

  return (
    <>
      <div className="header">
        <div className="logo" onClick={resetSearch} style={{cursor: 'pointer'}}>
          <img src={Logo} alt="IntelliQuest Logo" />
        </div>
      </div>
      <div className="header-right">
      {currentUser ? (
        <>
          <span>{`User ID: ${currentUser.id}`}</span>
          <button onClick={signOut}>Sign Out</button>
        </>
      ) : (
        <button onClick={handleSignInClick}>Sign In</button>
      )}
        <button onClick={() => window.location='#settings'}>Settings</button>
      </div>

      <div className='search-container'>
        <div className="center-logo-container" onClick={resetSearch} style={{cursor: 'pointer'}}>
          <img src={CenterLogo} alt="Center Logo" className="center-logo" />
          <h1>IntelliQuest</h1>
        </div>

        <input className='search-input'
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search papers..."
        />
        <button className='search-button' onClick={handleSearch}>Search</button>
        
        <div className="results-container"> 
          {results.length > 0 ? (
            results.map((paper, index) => (
              <div key={index} className="paper">
                <h4>{paper.title}</h4>
                {renderAbstract(paper, index)}
                <p>Authors: {paper.authors.join(', ')}</p>
                <p>Year : {paper.year}</p>
              </div>
            ))
          ) : (
            <p>One Stop portal for searching anything academic!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;