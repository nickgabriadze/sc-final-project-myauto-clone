import headerStyling from "./header.module.css";
import myAuto from "./icons/myAuto.svg";


function Header() {

  return (
      <div className={headerStyling["header"]}>
        <img src={myAuto} alt={"MyAuto logo"}></img>
      </div>
  
  );
}

export default Header;
