import Logo from "../../assets/f1logo.png";
import './MainContainerHistorical.css';
import background from "../../assets/startingGrid.png";
import { DropdownMenu } from "../menu/DropDownMenu";

interface Props {
  children: React.ReactNode;
}

export const MainContainerHistorical: React.FC<Props> = ({ children }) => {
  return (
    <>
      <DropdownMenu />
      <div className="main-container" style={{ backgroundImage: `url(${background})` }}>
        <div className="lines">
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="header">
          <img className="f1-logo" src={Logo} alt="Logo de la Formula 1" />
          <h1 className="main-title">
            <span style={{ color: 'black' }}>Historical </span>
            <span style={{ color: 'black' }}>F1 </span>
            <span style={{ color: '#AD0303' }}>Web App</span>
          </h1>
          <img className="f1-logo" src={Logo} alt="Logo de la Formula 1" />
        </div>
        <div className="lines">
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="page">{children}</div>
      </div>
    </>
  );
};