import React, { useState } from "react";
import "./styles.css";
import defaultProfile from "../assets/default-profile.png";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="App">
      <header>
        <div onClick={() => setShowMenu(!showMenu)} id="menu-container">
          <button type="button" id="hamburger-menu">
            {!showMenu ? "☰" : "×"}
          </button>
        </div>
        <a href="#" id="logo">
          Venture
        </a>
        {showMenu && (
          <div id="menu-dropdown">
            <div id="menu-user-info">
              <img
                id="menu-profile-pic"
                src={defaultProfile}
                alt="User Profile"
              />
              <span id="menu-username">#32106</span>
            </div>
            <ul>
              <li id="edit-profile">Endre min profil</li>
              <li id="active-wishes">Aktive ønsker</li>
              <li id="my-friends">Mine venner</li>
              <li id="history">Historikk</li>
            </ul>
          </div>
        )}
      </header>

      <main>
        <div id="wish-list">
          <div className="wish-item">
            <span className="delete-btn">×</span>
            <span className="edit-btn">✏️</span>

            <div className="wish-card">
              <div className="wish-front">
                <img className="wish-image" style={{ display: "none" }} />

                <img className="buddy-image" style={{ display: "none" }} />
              </div>
              <div className="wish-back"></div>
            </div>
          </div>
        </div>

        <button
          type="button"
          id="add-wish-btn"
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          +
        </button>
      </main>

      <button type="button" id="scroll-to-top-btn">
        ↑
      </button>

      {showModal && (
        <div id="edit-modal" className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Rediger Ønske</h2>
            <div id="image-preview-container">
              <img id="image-preview" />
            </div>
            <label>Last opp bilde:</label>
            <input type="file" id="image-upload" />
            <label>Ansvarspartner:</label>
            <input
              type="text"
              id="accountability-partner"
              placeholder="Navn på ansvarspartner"
            />
            <button
              type="button"
              id="save-btn"
              onClick={() => {
                alert("håndter lagring i api-et");
                setShowModal(false);
              }}
            >
              Lagre
            </button>
          </div>
        </div>
      )}

      <div className="sky">
        <div className="cloud"></div>
        <div className="cloud"></div>
        <div className="cloud"></div>
        <div className="cloud"></div>
        <div className="cloud"></div>
      </div>
    </div>
  );
}

export default App;
