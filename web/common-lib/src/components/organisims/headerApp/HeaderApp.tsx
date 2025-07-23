import { useNavigate } from "react-router-dom";
import Icon from "./../../../components/atoms/icon/Icon";
import { useTheme } from "./../../../context/ThemeContext";
import "./header.scss";

export interface NavButtonProps {
  name: string;
  type ?: "" | "outlined" | "round";
  className ?: string;
  onClick ?: () => void;
};

export interface HeaderProps {
  nav_button: {
    name: string;
    type?: "" | "outlined" | "round";
    className?: string;
    onClick?: Function;
  };
  logoSrc?: string;
  items: {
    id: string;
    icon: string;
    onClick: () => void;
  }[];
  isMobile?: boolean;
  backActive?:boolean;
}

export default function HeaderApp({ logoSrc, items, nav_button, isMobile = true, backActive=false }: HeaderProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <header
      className="header flex"
      style={{ backgroundColor: theme.theme.primary }}
    >
      {backActive ?<button onClick={()=>{
        navigate(-1)
      }} className="nav-button">
        <Icon name={'arrow_back_ios'}></Icon>
      </button> : <button onClick={()=>{
        console.log("navBtn", nav_button);
        
        if(nav_button.onClick){
          nav_button.onClick()
        }
      }} className={nav_button.className}>
        <Icon name={nav_button.name} type={nav_button.type}></Icon>
      </button>}
      <div className="top-center">
        <img src={logoSrc} alt={logoSrc} />
      </div>
      <div className="top-right">
        {items.map((item) => (
          <button key={item.id} onClick={item.onClick} className="nav-button">
            <Icon name={item.icon} />
          </button>
        ))}
      </div>
    </header>
  );
}
