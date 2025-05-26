import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/communityLogo.png";
import './CommunityAdminMainContainer.css';
import background from "../../assets/fanMainBack.png";
import { LogOut } from "lucide-react";
import { useUser } from "../../hooks/useUser";

interface Props {
  children: React.ReactNode;
}

export const CommunityAdminMainContainer: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const {logoutUser} = useUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
      <div className="main-container-admin" style={{ backgroundImage: `url(${background})` }}>
        <div className="header-admin">
          <img className="f1-logo-admin" src={Logo} alt="Formula 1 Logo" />
          <h1 className="main-title-admin">           
            <span style={{ color: 'orange' }}>Admin</span>
          </h1>
          <button className="logout-button" onClick={handleLogout} title="Logout">
            <LogOut size={28} color="white" />
          </button>
        </div>
        <div className="page-content-admin">
          {children}
        </div>
      </div>
  );
};
