import React from "react";
import Typical from "react-typical";
import './Profile.css';

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-parent">
        <div className="profile-details">
          <div className="colz">
            <div className="colz-icon">
              <a href="#">
                <i className="fa fa-facebook-square mr-1" />
              </a>
              <a href="#">
                <i className="fa fa-google-plus-squ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      are mr-1" />
              </a>
              <a href="#">
                <i className="fa fa-instagram mr-1" />
              </a>
              <a href="#">
                <i className="fa fa-twitter-square mr-1" />
              </a>
            </div>
          </div>
          <div className="profile-details-name">
            <span className="primary-text">
              {" "}
              Hello, I'M{" "}
              <span className="highlighted-text">Shivam Bhai Patel </span>
            </span>
          </div>
          <div className="profile-details-role">
            <span className="primary-text">
              {" "}
              <h1>
                {" "}
                <Typical
                  loop={Infinity}
                  steps={[
                    "Enthusiastic Dev",
                    1000,
                    "React/React Native Dev",
                    1000,
                    "Java/SpringBoot Dev",
                    1000,
                    "Full Stack Developer",
                    1000,
                  ]}
                />
              </h1>
              <span className="profile-role-tagline">
                Knack of building applications with front and back end
                operations.
              </span>
            </span>
          </div>
          <div className="profile-options">
            <button className=" btn primary-btn">
              {""}
              Hire Me{" "}
            </button>
            <a href="resume.pdf" className="ml-2" target="_blank">
              <button className="btn highlighted-btn">View Resume</button>
            </a>
          </div>
        </div>
        <div className="profile-picture">
          <div className="profile-picture-background"></div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
