import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/communityLogo.png";
import './CommunityMainContainer.css';
import background from "../../assets/fanMainBack.png";

interface Props {
  children: React.ReactNode;
}

export const CommunityMainContainer: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
      <div className="main-container-community" style={{ backgroundImage: `url(${background})` }}>
        <div className="header-community">
          <img className="f1-logo-community" src={Logo} alt="Formula 1 Logo" />
          <h1 className="main-title-community">
            <span style={{ color: 'black' }}>F1 </span>
            <span style={{ color: 'white' }}>Web </span>
            <span style={{ color: 'white' }}>App</span>
          </h1>
          <img className="f1-logo" src={Logo} alt="Formula 1 Logo" />
        </div>
        <div className="page-content-community">
          {children}
        </div>
      </div>
  );
};
