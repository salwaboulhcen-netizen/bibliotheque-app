import React from "react";
import "./TopBar.css";
import { useTranslation } from "react-i18next";
const TopBar = () => {
  const {i18n } = useTranslation();
  return (
    <div className="topbar">
      <div className="topbar-left">
        <span className="topbar-contact">
          <i className="fas fa-phone-alt"></i> +121687272581
        </span>
        <span className="topbar-contact">
          <i className="fas fa-envelope"></i> contact@bibliotheque.com
        </span>
      </div>
      <div className="topbar-right">
        <a
          href="https://facebook.com"
          className="topbar-icon"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <i className="fab fa-facebook-f"></i>
        </a>
        <a
          href="https://twitter.com"
          className="topbar-icon"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter (X)"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="https://instagram.com"
          className="topbar-icon"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <select className="topbar-lang" onChange={(e) => i18n.changeLanguage(e.target.value)}>
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
      </div>
    </div>
  );
};

export default TopBar;

