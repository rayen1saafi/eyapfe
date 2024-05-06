import React from "react";
import "../styles/about.css";
import PagesHeader from "../Components/PagesHeader";
import { useSelector } from "react-redux";
import InstructorsCard from "../Components/InstructorsCard";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Slider from "react-slick";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const About = () => {
  const users = useSelector((state) => state.user?.users);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="about">
      <PagesHeader />
      <div class="container1">
        <div class="faders">
          <div class="left"></div>
          <div class="right"></div>
        </div>

        <div class="items">
          <div class="entry" id="entry">
            <div className="img">
              <img src="https://img.freepik.com/photos-gratuite/deux-jeunes-entrepreneurs-analysant-graphique_23-2147839889.jpg?t=st=1714596728~exp=1714600328~hmac=3ce19fcdd8a249aece76050c791c452d156c3ecf61d3a8f8fadfa2bad0e0e474&w=740" />
            </div>
          </div>
          <div class="entry">
            <div className="img">
              <img src="https://img.freepik.com/photos-gratuite/collegues-ayant-reunion-affaires-ensemble_23-2148746253.jpg?t=st=1714596033~exp=1714599633~hmac=403a66f38f537f7eb3b65a1067d244ebd8d1c404b50a4485270b47eeb0d7bcf7&w=740" />
            </div>
          </div>
          <div class="entry" id="entry2">
            <div className="img">
              <img src="https://img.freepik.com/photos-premium/gens-ayant-debat-tout-regardant-par-dessus-ordinateur_23-2149389756.jpg?w=360" />
            </div>
          </div>
          <div class="entry" id="entry">
            <div className="img">
              <img src="https://img.freepik.com/photos-gratuite/jeunes-amis-s-amusant_23-2148451733.jpg?t=st=1714596201~exp=1714599801~hmac=65aee0be78e7cf107628a37e1a77ad82b3eed1991129b7c484656e1f0cdf5e64&w=740" />
            </div>
          </div>
          <div class="entry">
            <div className="img">
              <img src="https://img.freepik.com/photos-gratuite/vue-face-du-couple-planifiant-ensemble-pour-redecorer-maison_23-2148814609.jpg?t=st=1714596259~exp=1714599859~hmac=ef636bccaa669dd30e55297c7aebaa4af0c560495cec583004e53d5f2b66acb0&w=740" />
            </div>
          </div>{" "}
          <div class="entry" id="entry2">
            <div className="img">
              <img src="https://img.freepik.com/photos-gratuite/quipe-travaillant-ensemble-projet_23-2149273739.jpg?t=st=1714597388~exp=1714600988~hmac=05228ed94847f3494abb1cf020ca2d49b57d2877666c0226788a1cc38dff376d&w=360" />
            </div>
          </div>{" "}
          <div class="entry" id="entry">
            <div className="img">
              <img src="https://img.freepik.com/photos-gratuite/femme-affaires-debout-derriere-bureau-planification-business-plan_23-2147955174.jpg?t=st=1714596447~exp=1714600047~hmac=7c7d73a71340ceabd6bf5ee84102cf851607cfc0a0591f016ac5340471963856&w=740" />
            </div>
          </div>{" "}
          <div class="entry">
            <div className="img">
              <img src="https://img.freepik.com/photos-gratuite/deux-femmes-affaires-preparant-drapeau-damier-graphique-au-bureau_23-2147955073.jpg?t=st=1714596548~exp=1714600148~hmac=52d24ea96327607695048c3b9370bbdf3d191e20d6a13a2f977a029e1673bc55&w=740" />
            </div>
          </div>{" "}
          <div class="entry" id="entry2">
            <div className="img">
              <img src="https://img.freepik.com/photos-gratuite/femmes-souriantes-coup-moyen-au-travail_23-2149337226.jpg?t=st=1714597440~exp=1714601040~hmac=0c3aaf392b6a6bac3377cc3588b814a6ddd9e0800ac98fbed947349968630983&w=360" />
            </div>
          </div>{" "}
          <div class="entry" id="entry">
            <div className="img">
              <img src="https://img.freepik.com/photos-gratuite/vue-laterale-femme-affaires-elegante-smartwatch-travaillant-ordinateur-portable-exterieur_23-2148788791.jpg?t=st=1714596699~exp=1714600299~hmac=6ccfc7771465253f1b425cbef755765730617ba1bca87d5a139955ecb6caf387&w=740" />
            </div>
          </div>
        </div>
      </div>
      <div className="about_content">
        <div className="goal">
          <div className="goal_img">
            <img src="https://i.postimg.cc/mkWD0rY0/Sans-titre-1.png" alt="" />
          </div>
          <div className="goal_content">
            <h4>WHAT'S OUR MAIN GOAL</h4>
            <h1>
              Take Not a Lorem Ipsum <span>whatsoever;</span> And{" "}
              <span>but your Lorem Ipsum</span> With Education
            </h1>
            <p>
              Lorem ipsum dolor sit amet. Eos dolor temporibus ea modi deleniti
              ad autem eaque aut repellat laudantium ab saepe labore. Ut
              eligendi dignissimos non ratione accusantium ea reiciendis labore.
            </p>
            <p>
              Aut veritatis assumenda cum molestias nesciunt eum architecto
              voluptatem. Eum nulla deserunt aut culpa quia eum galisum
              inventore vel ratione neque eum saepe asperiores. At nesciunt
              velit qui nostrum nulla rem eius distinctio vel sapiente provident
              et nulla voluptates sed omnis accusantium.
            </p>
          </div>
        </div>
      </div>
      <div className="about-container">
        <div className="content">
          <div className="container">
            <img src="https://i.postimg.cc/hGpfL4GF/teacher.png" alt="" />
            <h3>1000</h3>
            <p>Instractor</p>
          </div>
          <div className="container">
            <img
              src="https://i.postimg.cc/6phqdVWb/congratulation.png"
              alt=""
            />
            <h3>1000</h3>
            <p>Students</p>
          </div>{" "}
          <div className="container">
            <img src="https://i.postimg.cc/Ls5nVq0t/package.png" alt="" />
            <h3>1000</h3>
            <p>Pack</p>
          </div>
          <div className="container">
            <img src="https://i.postimg.cc/jjcG8dCt/execution.png" alt="" />
            <h3>1000</h3>
            <p>courses</p>
          </div>
        </div>
      </div>
      <div className="aboutcourse">
        <div className="text">
          <h3>TOP CLASS PACK</h3>
          <h1>Explore 1200+ Online pack</h1>
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
        </div>
      </div>
      <div className="instractors">
        <h1>OUR INSTRUCTORS</h1>
        <div className="instractor_content">
          {users
            ?.filter((user) => user?.role === "Instructor")
            ?.map((e) => (
              <InstructorsCard e={e} />
            ))}
        </div>
      </div>
      <div className="Customer">
        <div className="part1">
          <div className="section">
            <h4>WHY OURS</h4>
            <h1>Our Most Satisfied Customers Share Their Experiences!</h1>
          </div>
          <div className="sec">
            <img
              src="https://cdn.discordapp.com/attachments/1022529234700357713/1235587148527308894/curve-rotate-2.png?ex=6634e9b4&is=66339834&hm=12a0919377eae3945e11ede3c02c012e1c9f44c116ccd1ee190b66e9f463cea0&"
              alt=""
            />
          </div>
        </div>
        <div className="part2">
          <div className="circle-abso" id="abso1">
            <div className="Scircle">
              <img
                src="https://img.freepik.com/photos-gratuite/celebration-journee-internationale-education_23-2150930946.jpg?t=st=1714657343~exp=1714660943~hmac=f00bb7610aac747ad1b0957f96dba58e7fc8eb9282b916d3e55b89c50745206c&w=740"
                alt=""
              />
            </div>
          </div>
          <div className="circle-abso" id="abso2">
            <div className="Scircle">
              <img
                src="https://img.freepik.com/free-photo/team-meeting-startups_23-2148898708.jpg?t=st=1714660843~exp=1714664443~hmac=276b2db1e6308faa1a8232d3bd11f82250c8ab8c69d1c8de58af064beb7f1259&w=740"
                alt=""
              />
            </div>
          </div>
          <div className="circle-abso" id="abso3">
            <div className="Scircle">
              <img
                src="https://img.freepik.com/free-photo/teenager-holding-textbooks_23-2147669090.jpg?t=st=1714660803~exp=1714664403~hmac=3344b41789fbee657873c1b3cc47dca1b0cb8a9c8f0112cebe1d1702e2909e01&w=740"
                alt=""
              />
            </div>
          </div>
          <div className="circle-abso" id="abso4">
            <div className="Scircle">
              <img
                src="https://img.freepik.com/free-photo/portrait-young-student-happy-be-back-university_23-2148586557.jpg?t=st=1714660629~exp=1714664229~hmac=2529faa245814a941983055143e920b1bd9f4664d73ecb1e6d611e853c06cae3&w=740"
                alt=""
              />
            </div>
          </div>
          <Carousel
            className="c"
            width="1100px"
            emulateTouch
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            autoPlay={true}
            interval={2000}
            showIndicators={false}
            showArrows={false}
          >
            <div className="carou">
              <div className="decri">
                <div className="content">
                  <div className="card">
                    <div className="svg_top ">
                      <svg
                        // className="svg_top"
                        aria-hidden="true"
                        class="e-font-icon-svg e-fas-quote-right svg_top"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z"></path>
                      </svg>
                    </div>

                    <div className="svg_bot ">
                      <svg
                        // className="svg_top"
                        aria-hidden="true"
                        class="e-font-icon-svg e-fas-quote-right"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z"></path>
                      </svg>
                    </div>
                    <p>
                      {" "}
                      Lorem ipsum dolor sit amet. Eos dolor temporibus ea modi
                      deleniti ad autem eaque aut repellat laudantium ab saepe
                      labore. Ut eligendi dignissimos non ratione accusantium ea
                      reiciendis labore.
                    </p>
                    <span>first Last</span>
                  </div>
                </div>
                <div className="container">
                  <div className="circle">
                    <div className="Scircle">
                      <img
                        src="https://img.freepik.com/free-photo/portrait-young-student-happy-be-back-university_23-2148586557.jpg?t=st=1714660629~exp=1714664229~hmac=2529faa245814a941983055143e920b1bd9f4664d73ecb1e6d611e853c06cae3&w=740"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carou">
              <div className="decri">
                <div className="content">
                  <div className="card">
                    <div className="svg_top ">
                      <svg
                        // className="svg_top"
                        aria-hidden="true"
                        class="e-font-icon-svg e-fas-quote-right svg_top"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z"></path>
                      </svg>
                    </div>

                    <div className="svg_bot ">
                      <svg
                        // className="svg_top"
                        aria-hidden="true"
                        class="e-font-icon-svg e-fas-quote-right"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z"></path>
                      </svg>
                    </div>

                    <p>
                      {" "}
                      Lorem ipsum dolor sit amet. Eos dolor temporibus ea modi
                      deleniti ad autem eaque aut repellat laudantium ab saepe
                      labore. Ut eligendi dignissimos non ratione accusantium ea
                      reiciendis labore.
                    </p>
                    <span>first Last</span>
                  </div>
                </div>
                <div className="container">
                  <div className="circle">
                    <div className="Scircle">
                      <img
                        src="https://img.freepik.com/free-photo/teenager-holding-textbooks_23-2147669090.jpg?t=st=1714660803~exp=1714664403~hmac=3344b41789fbee657873c1b3cc47dca1b0cb8a9c8f0112cebe1d1702e2909e01&w=740"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carou">
              <div className="decri">
                <div className="content">
                  <div className="card">
                    <div className="svg_top ">
                      <svg
                        // className="svg_top"
                        aria-hidden="true"
                        class="e-font-icon-svg e-fas-quote-right svg_top"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z"></path>
                      </svg>
                    </div>

                    <div className="svg_bot ">
                      <svg
                        // className="svg_top"
                        aria-hidden="true"
                        class="e-font-icon-svg e-fas-quote-right"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z"></path>
                      </svg>
                    </div>
                    <p>
                      {" "}
                      Lorem ipsum dolor sit amet. Eos dolor temporibus ea modi
                      deleniti ad autem eaque aut repellat laudantium ab saepe
                      labore. Ut eligendi dignissimos non ratione accusantium ea
                      reiciendis labore.
                    </p>
                    <span>first Last</span>
                  </div>
                </div>
                <div className="container">
                  <div className="circle">
                    <div className="Scircle">
                      <img
                        src="https://img.freepik.com/free-photo/team-meeting-startups_23-2148898708.jpg?t=st=1714660843~exp=1714664443~hmac=276b2db1e6308faa1a8232d3bd11f82250c8ab8c69d1c8de58af064beb7f1259&w=740"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carou">
              <div className="decri">
                <div className="content">
                  <div className="card">
                    <div className="svg_top ">
                      <svg
                        // className="svg_top"
                        aria-hidden="true"
                        class="e-font-icon-svg e-fas-quote-right svg_top"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z"></path>
                      </svg>
                    </div>

                    <div className="svg_bot ">
                      <svg
                        // className="svg_top"
                        aria-hidden="true"
                        class="e-font-icon-svg e-fas-quote-right"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z"></path>
                      </svg>
                    </div>
                    <p>
                      {" "}
                      Lorem ipsum dolor sit amet. Eos dolor temporibus ea modi
                      deleniti ad autem eaque aut repellat laudantium ab saepe
                      labore. Ut eligendi dignissimos non ratione accusantium ea
                      reiciendis labore.
                    </p>
                    <span>first Last</span>
                  </div>
                </div>
                <div className="container">
                  <div className="circle">
                    <div className="Scircle">
                      <img
                        src="https://img.freepik.com/photos-gratuite/celebration-journee-internationale-education_23-2150930946.jpg?t=st=1714657343~exp=1714660943~hmac=f00bb7610aac747ad1b0957f96dba58e7fc8eb9282b916d3e55b89c50745206c&w=740"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default About;
