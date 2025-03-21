import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/f1newLogo.png";
import './MainContainerActual.css';
import background from "../../assets/backgroundActual.png";
import { DropdownMenu } from "../menu/DropDownMenu";

interface Props {
  children: React.ReactNode;
}

export const MainContainerActual: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    if (location.pathname !== "/actual") {
      navigate("/actual");
    }
  };

  return (
    <>
      <DropdownMenu />
      <div className="main-container" style={{ backgroundImage: `url(${background})` }}>
        <div className="header">
          <img className="f1-logo" src={Logo} alt="Formula 1 Logo" />
          <h1 className="main-title">F1 Web App</h1>
        </div>
        <div className="page-content">
          {location.pathname !== "/actual" && (
            <button className="close-button" onClick={handleClose}>✖</button>
          )}
          {children}
        </div>
      </div>
    </>
  );
};
