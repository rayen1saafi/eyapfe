import React from 'react'
import '../styles/pages-header.css'
import {Link, useLocation  } from 'react-router-dom';

const PagesHeader = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const pageTitle = pathSegments[1];
  const finalTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  return (
    <>
    <div className="pages-header">
     <h3>{finalTitle}</h3>
     <div className="page-header-path">
      <Link to='/'>
      <span>Home</span>
      </Link>
      
       <span> / </span>
       <span style={{color:"#0175CD"}}>{pageTitle}</span>
     </div>
     <img className='shape_7' src="/assets/shape_7.png" alt="" />
     <img className='shape_8' src="/assets/shape_8.png" alt="" />

    </div>
    </>
  )
}

export default PagesHeader