import React from "react";
import "../styles/home.css";
import HomeHeader from "../Components/HomeHeader";
const Home = () => {
  return (
    <>
      <HomeHeader />
      <div className="homecontainer">
        <img
          className="img"
          src="https://cdn.discordapp.com/attachments/1022529234700357713/1235587149206913024/review_2.png?ex=6634e9b4&is=66339834&hm=c93da7027d65c4868766f8a2efac950ad618537a1717f08a36b06478e4a2bf7d&"
          alt=""
        />
        <div className="part1">
          <div className="card1">
            <img
              src="https://img.freepik.com/free-photo/portrait-teenage-girl-with-book_23-2148105580.jpg?t=st=1714677128~exp=1714680728~hmac=841462e8acc7c09fbd6411d345e590b1e8fdf9fa2e66fcaf66bd711ff6cf21a6&w=740"
              alt=""
            />
          </div>
          <div className="card2">
            <img
              src="https://img.freepik.com/free-photo/front-view-beautiful-woman-desk_23-2148481601.jpg?t=st=1714677452~exp=1714681052~hmac=b74ab66c060635953c7395f1073459a1b7d5b9c71c5990a9768c8dd9057b06a0&w=740"
              alt=""
            />
          </div>
          <div className="card3" id="card">
            <h2>240+</h2>
            <p>online courses</p>
          </div>
          <div className="card4" id="card">
            <h2>240+</h2>
            <p>online courses</p>
          </div>
          <div className="card5" id="card">
            <h2>240+</h2>
            <p>online courses</p>
          </div>

          <div className="circle">
            <div className="sCircle"></div>
          </div>
        </div>
        <div className="part2">
          <h4>WHAT'S OUR MAIN GOAL</h4>
          <h1>
            Take Not a Lorem Ipsum <span>whatsoever;</span> And{" "}
            <span>but your Lorem Ipsum</span> With Education
          </h1>
          <p>
            Lorem ipsum dolor sit amet. Eos dolor temporibus ea modi deleniti ad
            autem eaque aut repellat laudantium ab saepe labore. Ut eligendi
            dignissimos non ratione accusantium ea reiciendis labore.
          </p>
          <p>
            Aut veritatis assumenda cum molestias nesciunt eum architecto
            voluptatem. Eum nulla deserunt aut culpa quia eum galisum inventore
            vel ratione neque eum saepe asperiores. At nesciunt velit qui
            nostrum nulla rem eius distinctio vel sapiente provident et nulla
            voluptates sed omnis accusantium.
          </p>
          <button>Read more</button>
        </div>
      </div>
      <div className="Homecourse">
        <div className="text">
          <h3>WHAT'S OUR MAIN GOAL</h3>
          <h1>Explore <span>1200+</span> Online pack</h1>
          <p>
            Lorem ipsum dolor sit amet. Eos dolor temporibus ea modi deleniti ad
            autem eaque aut repellat laudantium ab saepe labore. Ut eligendi
            dignissimos non ratione accusantium ea reiciendis labore.
          </p>
          <p>
            Aut veritatis assumenda cum molestias nesciunt eum architecto
            voluptatem.
          </p>
          <button>View All</button>
        </div>
        <div className="container">
          <div className="content">
            <img src="https://i.postimg.cc/hGpfL4GF/teacher.png" alt="" />
            <h3>React Js</h3>
            <p>1 courses</p>
          </div>
          <div className="content">
            <img src="https://i.postimg.cc/hGpfL4GF/teacher.png" alt="" />
            <h3>React Js</h3>
            <p>1 courses</p>
          </div>
          <div className="content">
            <img src="https://i.postimg.cc/hGpfL4GF/teacher.png" alt="" />
            <h3>React Js</h3>
            <p>1 courses</p>
          </div>
          <div className="content">
            <img src="https://i.postimg.cc/hGpfL4GF/teacher.png" alt="" />
            <h3>React Js</h3>
            <p>1 courses</p>
          </div>
          <div className="content">
            <img src="https://i.postimg.cc/hGpfL4GF/teacher.png" alt="" />
            <h3>React Js</h3>
            <p>1 courses</p>
          </div>
          <div className="content">
            <img src="https://i.postimg.cc/hGpfL4GF/teacher.png" alt="" />
            <h3>React Js</h3>
            <p>1 courses</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
