import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/communityLogo.png";
import './CommunityMainContainer.css';
import background from "../../assets/fanMainBack.png";
import { LogOut } from "lucide-react"; // Asegúrate de tener esta librería instalada
import { useUser } from "../../hooks/useUser";

interface Props {
  children: React.ReactNode;
}

export const CommunityMainContainer: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const {logoutUser} = useUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
      <div className="main-container-community" style={{ backgroundImage: `url(${background})` }}>
        <div className="header-community">
          <img className="f1-logo-community" src={Logo} alt="Formula 1 Logo" />
          <h1 className="main-title-community">
            
            <span style={{ color: 'white' }}>Web </span>
            <span style={{ color: 'white' }}>App</span>
          </h1>
          <button className="logout-button" onClick={handleLogout} title="Logout">
            <LogOut size={28} color="white" />
          </button>
        </div>
        <div className="page-content-community">
          {children}
        </div>
      </div>
  );
};
