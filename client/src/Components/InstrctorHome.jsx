import React from 'react'
import { useSelector } from "react-redux";
import InstructorsCard from './InstructorsCard';
import "../styles/instructor-home.css"
const InstrctorHome = () => {
    const users = useSelector((state) => state.user?.users);

  return (
    <>
    <div className="instractors">
        <div className="titre">
          <h3>OUR INSTRUCTORS</h3>
          <h1>Meet The Magic Team Who Make Courses For Grow Your Future</h1>
        </div>
        {users
  ?.filter((user) => user?.role === "Instructor")
  ?.slice(0, 6)
  ?.map((e) => (
    <InstructorsCard key={e.id} e={e} />
  ))
}

        <div className="img">
          <img
            src="https://media.discordapp.net/attachments/1022529234700357713/1235587149206913024/review_2.png?ex=663c29f4&is=663ad874&hm=7452889607ba3b6aa7c13b03e6c6cc99a4183f4110c0a07357b3f08b90ea86d8&=&format=webp&quality=lossless"
            alt=""
          />
        </div>
        <div className="img1">
          <img
            src="https://cdn.discordapp.com/attachments/1195434177756143746/1237721976399986842/Fichier_11.5x-8.png?ex=663cadea&is=663b5c6a&hm=0e1434bb6a9dc2188899e77429a1c248956f752b15a0ff91e8bb80d871bcaeac&"
            alt=""
          />
        </div>
      </div>
    </>
  )
}

export default InstrctorHome