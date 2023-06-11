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
import { setPage, setPressedSearch, setSearchLink } from "../../../features/productSlice";
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

  const generateFilterLink = (
    dealType: number[],
    models: {
      man_id: number;
      model_name: string;
      model_id: number;
      model_group: string;
    }[],
    categories: { cat_name: string; cat_id: number }[],
    pricesFrom: number,
    pricesTo: number,
    manufacturers: {
      man_name: string;
      man_id: number;
    }[]
  ) => {
    const dealTypesString = `ForRent=${dealType.join(".")}`;
    const categoriesString = `Cats=${categories
      .map((each) => each.cat_id)
      .join(".")}`;

    const grouppedModels: {
      [key: number]: number[];
    } = {};

    for (const model of models) {
      if (model.man_id in grouppedModels) {
        grouppedModels[model.man_id].push(model.model_id);
      } else {
        grouppedModels[model.man_id] = [model.model_id];
      }
    }

    const mansWithoutModels = [];
    // this for loop is for the manufacturers that the user hasn't chosen models from

    for (const eachMan of manufacturers) {
      if (grouppedModels[eachMan.man_id] === undefined) {
        mansWithoutModels.push(eachMan.man_id);
      }
    }
    console.log(mansWithoutModels);

    let modelsString = "";

    Object.entries(grouppedModels).forEach(([key, value], i) => {
      if (i === Object.entries(grouppedModels).length - 1) {
        modelsString = modelsString.concat(`${key}.${value.join(".")}`);
      } else {
        modelsString = modelsString.concat(`${key}.${value.join(".")}-`);
      }
    });

    modelsString = modelsString.concat(
      mansWithoutModels.length !== 0 ? `-${mansWithoutModels.join("-")}` : ""
    );

    console.log(modelsString);

    return `${dealTypesString}&&${categoriesString}&&Mans=${modelsString}&&PriceFrom=${
      pricesFrom === 0 ? "" : pricesFrom
    }&&PriceTo=${pricesTo === 0 ? "" : pricesTo}`;
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
                  pricesFrom: Number(e.target.value),
                })
              )
            }
            value={pricesFrom === 0 ? "" : pricesFrom}
          ></input>
          <hr className={carSearchStyling["range-hr"]}></hr>
          <input
            type="number"
            placeholder="მდე"
            onChange={(e) =>
              dispatch(
                setPricesTo({
                  pricesTo: Number(e.target.value),
                })
              )
            }
            value={pricesTo === 0 ? "" : pricesTo}
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

            dispatch(setPressedSearch({
              pressedSearch: true
            }))

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
