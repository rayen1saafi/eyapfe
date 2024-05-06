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
          <span style={{ backgroundColor: '#43B4BE' }}>All</span>
          <span>MERN-STACK</span>
          <span>MERN-STACK</span>
          <span>MERN-STACK</span>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            Others
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-down-short"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PacksHeader;
