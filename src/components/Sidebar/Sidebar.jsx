import React, { useState } from "react";
import sarah from "../../assets/sarah.webp";
import "./Sidebar.css";

const Sidebar = ({ sideBar, setCategory }) => {
  const [active, setActive] = useState("Home");

  const categories = [
    { name: "Home", id: 0, icon: "M240-200h120v-240h240v240h120v-360L480-740 240-560v360Z" },
    { name: "Gaming", id: 20, icon: "M182-200q-51 0-79-35.5T82-322l42-300q9-60 53.5-99T282-760h396q60 0 104.5 39t53.5 99l42 300q7 51-21 86.5T778-200q-21 0-39-7.5T706-230l-90-90H344l-90 90q-15 15-33 22.5t-39 7.5Z" },
    { name: "Sports", id: 17, icon: "M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" },
    { name: "News", id: 25, icon: "M160-120q-33 0-56.5-23.5T80-200v-640l67 67 66-67 67 67 67-67 66 67 67-67 67 67 66-67 67 67 67-67 66 67 67-67v640q0 33-23.5 56.5T800-120H160Z" },
    { name: "Blogs", id: 22, icon: "M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47Z" },
    { name: "Music", id: 10, icon: "M160-120q-33 0-56.5-23.5T80-200v-480h80v480h600v80H160Z" },
  ];

  const handleCategoryChange = (category) => {
    setActive(category.name);
    setCategory(category.id);
  };

  return (
    <div className={`sidebar ${sideBar === "active" ? "active" : ""}`}>
      <ul className="side-links">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`side-link ${active === category.name ? "active" : ""}`}
            onClick={() => {handleCategoryChange(category),console.log(category.id)}}
            aria-label={category.name}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d={category.icon} />
            </svg>
            <p>{category.name}</p>
          </li>
        ))}
      </ul>
      <hr />
      <div className="subscriptions">
        <h1>Subscriptions</h1>
        {Array.from({ length: 3 }, (_, i) => (
          <span key={i}>
            <h3>Channel Name</h3>
            <img src={sarah} alt="Channel Logo" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
