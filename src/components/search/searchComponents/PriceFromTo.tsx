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
import {
  setPage,
  setPressedSearch,
  setSearchLink,
} from "../../../features/productSlice";
import generateFilterLink from "./generateSearchLink";
function PriceFromTo() {
  const styleToSet = {
    backgroundColor: "#282a37",
    color: "white",

    transition: "all 500ms ease-in-out",
  };
  const dispatch = useAppDispatch();

  const {
    currency,
    deal_type,
    models,
    categories,
    pricesFrom,
    pricesTo,
    manufacturers,
  } = useAppSelector((state) => state.searchReducer); //false means that it is set to GEL

  
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
                dispatch(
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
                dispatch(
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
              dispatch(
                setPricesFrom({
                  pricesFrom: Math.abs(Number(e.target.value)),
                })
              )
            }
            min={0}
            value={pricesFrom === 0 ? "" : pricesFrom < 0 ? Math.abs(pricesFrom):pricesFrom}
          ></input>
          <hr className={carSearchStyling["range-hr"]}></hr>
          <input
            type="number"
            placeholder="მდე"
            onChange={(e) =>
              dispatch(
                setPricesTo({
                  pricesTo: Math.abs(Number(e.target.value)),
                })
              )
            }
            min={0}
            value={pricesTo === 0 ? "" : pricesTo < 0 ? Math.abs(pricesTo): pricesTo}
          ></input>
        </div>
      </div>

      <div className={carSearchStyling["search-btn-wrapper"]}>
        <button
          className={carSearchStyling["search-btn"]}
          onClick={() => {
            dispatch(
              setSearchLink({
                searchLink: generateFilterLink(
                  deal_type,
                  models,
                  categories,
                  pricesFrom,
                  pricesTo,
                  manufacturers
                ),
              })
            );

            dispatch(
              setPressedSearch({
                pressedSearch: true,
              })
            );

            dispatch(
              setPage({
                page: 1,
              })
            );
          }}
        >
          ძებნა
        </button>
      </div>
    </div>
  );
}

export default PriceFromTo;
