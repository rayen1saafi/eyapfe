import React from "react";
import "../styles/contact.css";
import PagesHeader from "../Components/PagesHeader";
const Contact = () => {
  return (
    <>
      <PagesHeader />
      <div className="contact">
        <div className="contactpart1">
          <img
            src="https://getmasum.com/themes-wp/edumoon/wp-content/uploads/2024/04/contact.jpg"
            alt=""
          />
          <div className="content">
            <div className="part">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="bi bi-telephone-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                />
              </svg>
              <h3>For any Query?</h3>
              <p>+216******</p>
              <p>+216******</p>
            </div>
            <div className="part">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="bi bi-envelope-fill"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
              </svg>
              <h3>Write email Us</h3>
              <p>admin@example.com</p>
              <p>admin@example.com</p>
            </div>
            <div className="part">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="bi bi-geo-alt-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
              </svg>
              <h3>Visit anytime</h3>
              <p>tunisia,6****</p>
            </div>
          </div>
        </div>
        <div className="contactpart2">
          <h2>Send us email</h2>
          <h1>Feel Free to write</h1>
          <form>
            <div className="inputs">
              <input type="text" placeholder="Enter Name" />
              <input type="email" placeholder="Enter Email" />
            </div>
            <div className="inputs">
              <input type="text" placeholder="Enter Name" />
              <input type="email" placeholder="Enter Email" />
            </div>
            <div className="inputs">
              <textarea name="" id="" placeholder="Enter Message"></textarea>
            </div>

            <button>Send Message</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
