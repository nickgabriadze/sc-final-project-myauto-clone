import { useState } from "react";
import carSearchStyling from "../carSearch.module.css";
import dollarWhiteSVG from "../icons/dollar-white.svg";
import dollarBlackSVG from "../icons/dollar-black.svg";
import gelWhiteSVG from "../icons/gel-white.svg";
import gelBlackSVG from "../icons/gel-black.svg";

function PriceFromTo() {
  const [currency, setCurrency] = useState(true); //false means that it is set to GEL

  const styleToSet = {
    backgroundColor: "#282a37",
    color: "white",
    padding: "3px",
    transition: "all 500ms ease-in-out",
  };

  return (
    <div className={carSearchStyling["price-from-to-wrapper"]}>
      <div className={carSearchStyling["price-range-wrapper"]}>
        <div className={carSearchStyling["gel-dollar"]}>
          <h5>ფასი</h5>
          <div className={carSearchStyling["currency-wrapper"]}>
            <img
              src={currency ? gelBlackSVG : gelWhiteSVG}
              alt="Gel icon"
              style={!currency ? styleToSet : {}}
              onClick={() => setCurrency(false)}
            ></img>
            <img
              src={currency ? dollarWhiteSVG : dollarBlackSVG}
              alt="Dollar icon"
              style={currency ? styleToSet : {}}
              onClick={() => setCurrency(true)}
            ></img>
          </div>
        </div>

        <div className={carSearchStyling["from-to-wrapper"]}>
          <input type="number" placeholder="დან"></input>
          <hr className={carSearchStyling["range-hr"]}></hr>
          <input type="number" placeholder="მდე"></input>
        </div>
      </div>

      <div className={carSearchStyling["search-btn-wrapper"]}>
        <button className={carSearchStyling["search-btn"]}>
          ძებნა {(197963).toString()}
        </button>
      </div>
    </div>
  );
}

export default PriceFromTo;
