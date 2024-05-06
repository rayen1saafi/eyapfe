import React from 'react'
import "../styles/packs-dashbord.css"
import PackageDashListe from '../Components/PackageDashListe'
const PacksDashbord = ({reloadPage,setReloadPage , search,setSearch}) => {

  return (
    <>
    <div className="packs-dashbord">
    <div className="pack-dash-container">
        <PackageDashListe reloadPage={reloadPage} setReloadPage={setReloadPage} search={search} setSearch={setSearch}/>
    </div>
    </div>
    </>
  )
}

export default PacksDashbord