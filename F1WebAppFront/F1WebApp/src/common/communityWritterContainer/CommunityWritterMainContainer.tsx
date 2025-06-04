import React from "react";
import { useNavigate} from "react-router-dom";
import Logo from "../../assets/communityLogo.png";
import './CommunityWritterMainContainer.css';
import background from "../../assets/fanMainBack.png";
import { LogOut } from "lucide-react"; // Asegúrate de tener esta librería instalada
import { useUser } from "../../hooks/useUser";

interface Props {
  children: React.ReactNode;
}

export const CommunityWritterMainContainer: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const {logoutUser} = useUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
      <div className="main-container-writter" style={{ backgroundImage: `url(${background})` }}>
        <div className="header-writter">
          <img className="f1-logo-writter" src={Logo} alt="Formula 1 Logo" />
          <h1 className="main-title-writter">           
            <span style={{ color: 'white' }}>Community </span>
            <span style={{ color: '#1a1a1a' }}>Writter </span>
            <span style={{ color: 'white' }}>Management</span>
          </h1>
          <button className="logout-button" onClick={handleLogout} title="Logout">
            <LogOut size={28} color="white" />
          </button>
        </div>
        <div className="page-content-writter">
          {children}
        </div>
      </div>
  );
};
