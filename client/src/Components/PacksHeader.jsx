import React, { useEffect } from 'react';
import '../styles/packs.css';

const PacksHeader = ({ setSearch,search }) => {

  return (
    <div className="packs-header">
      <div className="packs-header-container">
        <div className="p-h-search-bar">
          <input
            type="text"
            placeholder="Search packs..."
            onChange={(e) => setSearch(e.target.value)}
            value={search} // Set the value of the input to search
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </div>
        <div className="p-h-element">
          
        </div>
      </div>
    </div>
  );
};

export default PacksHeader;
