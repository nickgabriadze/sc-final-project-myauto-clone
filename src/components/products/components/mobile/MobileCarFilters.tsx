import { useAppDispatch, useAppSelector } from "../../../../features/hooks";
import mobileCarStyling from "./mobileCar.module.css";
import CloseSVG from "../../../search/icons/close.svg";
import {
    setCategories,
  setDealType,
  setManuFacturers,
  setModels,
  setPricesFrom,
  setPricesTo,
} from "../../../../features/searchSlice";
import { setSearchLink } from "../../../../features/productSlice";
import generateFilterLink from "../../../search/searchComponents/generateSearchLink";

function MobileCarFilters() {
  const {
    pricesFrom,
    pricesTo,
    manufacturers,
    categories,
    deal_type,
    models,
    currency,
  } = useAppSelector((state) => state.searchReducer);


  

  const { pressedSearch } = useAppSelector((state) => state.productsReducer);

  const productsDispatch = useAppDispatch();
  if (pressedSearch) {
    return (
      <div className={mobileCarStyling["filters"]}>
        {deal_type.length !== 0 ? (
          deal_type[0] === 0 ? (
            <div
              className={mobileCarStyling["each-filter-div"]}
              onClick={() => {
                productsDispatch(
                  setDealType({
                    deal_type: [],
                  })
                );

                productsDispatch(setSearchLink({
                    searchLink: generateFilterLink(
                     [],
                      models,
                      categories,
                      pricesFrom,
                      pricesTo,
                      manufacturers
                    ),
                  }))
              }}
            >
              <p>იყიდება</p>
              <img
                src={CloseSVG}
                width={12}
                height={12}
                alt="Remove icon"
              ></img>
            </div>
          ) : (
            <div
              className={mobileCarStyling["each-filter-div"]}
              onClick={() => {
                productsDispatch(
                  setDealType({
                    deal_type: [],
                  })
                );

                
                productsDispatch(setSearchLink({
                    searchLink: generateFilterLink(
                      [],
                      models,
                      categories,
                      pricesFrom,
                      pricesTo,
                      manufacturers
                    ),
                  }))
              }}
            >
              <p>ქირავდება</p>
              <img
                src={CloseSVG}
                width={12}
                height={12}
                alt="Remove icon"
              ></img>
            </div>
          )
        ) : (
          ""
        )}

        {manufacturers.length !== 0
          ? manufacturers.map((eachMan) => (
              <div
                key={eachMan.man_id}
                className={mobileCarStyling["each-filter-div"]}
                onClick={() => {
                  productsDispatch(
                    setManuFacturers({
                      manufacturers: [
                        ...manufacturers.filter(
                          (each) => each.man_id !== eachMan.man_id
                        ),
                      ],
                    })
                  );
                  productsDispatch(
                    setModels({
                      models: [
                        ...models.filter(
                          (eachModel) => eachModel.man_id !== eachMan.man_id
                        ),
                      ],
                    })
                  );

                  
                productsDispatch(setSearchLink({
                    searchLink: generateFilterLink(
                      deal_type,
                      models,
                      categories,
                      pricesFrom,
                      pricesTo,
                      manufacturers
                    ),
                  }))
                }}
              >
                <p>{eachMan.man_name}</p>
                <img
                  src={CloseSVG}
                  width={12}
                  height={12}
                  alt="Remove icon"
                ></img>
              </div>
            ))
          : ""}

        {pricesFrom !== 0 && (
          <div
            className={mobileCarStyling["each-filter-div"]}
            onClick={() => {
              productsDispatch(
                setPricesFrom({
                  pricesFrom: 0,
                })
              );

              
              productsDispatch(setSearchLink({
                searchLink: generateFilterLink(
                  deal_type,
                  models,
                  categories,
                  pricesFrom,
                  pricesTo,
                  manufacturers
                ),
              }))
            }}
          >
            <p>
              From {currency && "$"}
              {pricesFrom}
              {!currency && "₾"}
            </p>
            <img src={CloseSVG} width={12} height={12} alt="Remove icon"></img>
          </div>
        )}

        {pricesTo !== 0 && (
          <div
            className={mobileCarStyling["each-filter-div"]}
            onClick={() => {
              productsDispatch(
                setPricesTo({
                  pricesTo: 0,
                })
              );
              
              productsDispatch(setSearchLink({
                searchLink: generateFilterLink(
                  deal_type,
                  models,
                  categories,
                  pricesFrom,
                  pricesTo,
                  manufacturers
                ),
              }))
            }}
          >
            <p>
              To {currency && "$"}
              {pricesTo}
              {!currency && "₾"}
            </p>
            <img src={CloseSVG} width={12} height={12} alt="Remove icon"></img>
          </div>
        )}

        {categories.map((eachCat) => (
          <div
            key={eachCat.cat_id}
            className={mobileCarStyling["each-filter-div"]}
            onClick={() => {
                productsDispatch(setCategories({
                    categories: [...categories.filter((each) => each.cat_id !== eachCat.cat_id)]
                }))

                
                productsDispatch(setSearchLink({
                    searchLink: generateFilterLink(
                      deal_type,
                      models,
                      categories,
                      pricesFrom,
                      pricesTo,
                      manufacturers
                    ),
                  }))
            }}
          >
             <p>
              {eachCat.cat_name}
            </p>
            <img src={CloseSVG} width={12} height={12} alt="Remove icon"></img>
          </div>
        ))}
      </div>
    );
  } else {
    return <></>;
  }
}

export default MobileCarFilters;
