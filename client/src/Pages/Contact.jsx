import React from "react";
import "../styles/contact.css";
import PagesHeader from "../Components/PagesHeader";
const Contact = () => {
  return (
    <div className="contact">
      <PagesHeader />
      <div className="contact_content">
        <div className="container">
          <h1>Contact Information</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <div className="part">
            <div className="logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="bi bi-geo-alt"
                viewBox="0 0 16 16"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
            </div>
            <div className="text">
              <h3>Main Campus</h3>
              <p>Adress************</p>
              <p>tunisia. tunisia</p>
            </div>
          </div>
          <div className="part">
            <div className="logo">
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
            </div>
            <div className="text">
              <h3>Phone Number</h3>
              <p>+216********</p>
              <p>+216********</p>
            </div>
          </div>{" "}
          <div className="part">
            <div className="logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="bi bi-envelope-paper"
                viewBox="0 0 16 16"
              >
                <path d="M4 0a2 2 0 0 0-2 2v1.133l-.941.502A2 2 0 0 0 0 5.4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5.4a2 2 0 0 0-1.059-1.765L14 3.133V2a2 2 0 0 0-2-2zm10 4.267.47.25A1 1 0 0 1 15 5.4v.817l-1 .6zm-1 3.15-3.75 2.25L8 8.917l-1.25.75L3 7.417V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1zm-11-.6-1-.6V5.4a1 1 0 0 1 .53-.882L2 4.267zm13 .566v5.734l-4.778-2.867zm-.035 6.88A1 1 0 0 1 14 15H2a1 1 0 0 1-.965-.738L8 10.083zM1 13.116V7.383l4.778 2.867L1 13.117Z" />
              </svg>
            </div>
            <div className="text">
              <h3>Email Us</h3>
              <p>info@admissionexample.com</p>
              <p>info@admissionexample.com</p>
            </div>
          </div>
        </div>
        <div className="content">
          <h1>Send us a Message</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
            luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <form>
            <input type="text" placeholder="Name" required></input>
            <input type="email" required placeholder="Email"></input>
            <input type="number" placeholder="Phone" required></input>
            <input type="text" placeholder="Subject" required></input>
            <textarea
              id="story"
              name="story"
              rows="5"
              cols="33"
              placeholder=" Write Some Message  Here"
            ></textarea>
            <button>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
