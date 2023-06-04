import carSearchStyling from "../carSearch.module.css";
import dollarWhiteSVG from "../icons/dollar-white.svg";
import dollarBlackSVG from "../icons/dollar-black.svg";
import gelWhiteSVG from "../icons/gel-white.svg";
import gelBlackSVG from "../icons/gel-black.svg";
import { useAppDispatch } from "../../../features/hooks";
import { useAppSelector } from "../../../features/hooks";
import {
  setCurrency,
  setPricesFrom,
  setPricesTo,
} from "../../../features/searchSlice";
function PriceFromTo() {
  const styleToSet = {
    backgroundColor: "#282a37",
    color: "white",
   
    transition: "all 500ms ease-in-out",
  };
  const currencyDispatch = useAppDispatch();
  const currency = useAppSelector((state) => state.searchReducer.currency); //false means that it is set to GEL

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
              onClick={() =>
                currencyDispatch(
                  setCurrency({
                    currency: false,
                  })
                )
              }
            ></img>
            <img
              src={currency ? dollarWhiteSVG : dollarBlackSVG}
              alt="Dollar icon"
              style={currency ? styleToSet : {}}
              onClick={() =>
                currencyDispatch(
                  setCurrency({
                    currency: true,
                  })
                )
              }
            ></img>
          </div>
        </div>

        <div className={carSearchStyling["from-to-wrapper"]}>
          <input
            type="number"
            placeholder="დან"
            onChange={(e) =>
              currencyDispatch(
                setPricesFrom({
                  pricesFrom: Number(e.target.value),
                })
              )
            }
          ></input>
          <hr className={carSearchStyling["range-hr"]}></hr>
          <input
            type="number"
            placeholder="მდე"
            onChange={(e) =>
              currencyDispatch(
                setPricesTo({
                  pricesTo: Number(e.target.value),
                })
              )
            }
          ></input>
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
