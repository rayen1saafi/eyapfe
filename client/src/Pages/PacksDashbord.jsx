import React from "react";
import "../styles/packs-dashbord.css";
import PackageDashListe from "../Components/PackageDashListe";
import Headerdashboard from "../Components/Headerdashboard";
const PacksDashbord = ({ reloadPage, setReloadPage, search, setSearch }) => {
  return (
    <main>
      <Headerdashboard />
      <div className="packs-dashbord">
        <div className="pack-dash-container">
          <PackageDashListe
            reloadPage={reloadPage}
            setReloadPage={setReloadPage}
            search={search}
            setSearch={setSearch}
          />
        </div>
      </div>
    </main>
  );
};

export default PacksDashbord;
