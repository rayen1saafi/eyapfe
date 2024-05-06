import React from 'react'
import PagesHeader from '../Components/PagesHeader'
import PacksHeader from '../Components/PacksHeader'
import PacksCard from '../Components/PacksCard'
import { useSelector } from 'react-redux'

const Packs = ({search,setSearch,setReloadPage,reloadPage}) => {
  const pack = useSelector((state) => state.pack?.pack);

  return (
    <>
        <PagesHeader  />
          <PacksHeader search={search}  setSearch={setSearch}  />
   
        <div style={{display:"flex",justifyContent:"center"}}>
        <div className="packs-liste">
          {/* {pack?.map((el)=>
          <PacksCard el={el}/>
          )}
         */}
        {pack
            ?.filter((el) =>
              el.nom?.toUpperCase().includes(search.toUpperCase())
            )
            .map((el, i) => (
              <div
              >
          <PacksCard el={el} reloadPage={reloadPage} setReloadPage={setReloadPage}/>
              </div>
            )).reverse()}
    

        </div>
        </div>
       
      
    </>
  )
}

export default Packs