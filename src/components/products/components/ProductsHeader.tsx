import carProductsStyling from "../carProducts.module.css";
import { useState } from "react";
import ExpandMoreSVG from "../../search/icons/expand-more.svg";
import ExpandLessSVG from "../../search/icons/expand-less.svg";
import { useAppDispatch, useAppSelector } from "../../../features/hooks";
import { setSortIncDec, setSortPeriod } from "../../../features/productSlice";

function ProductsHeader({ productsMetaTotal }: { productsMetaTotal: number }) {
  const [sorters, setSorters] = useState({
    first: false,
    second: false,
  });

  const productDispatch = useAppDispatch();
  const { sortIncDec, sortPeriod } = useAppSelector(
    (state) => state.productsReducer
  );
  const filterObjects: {
    sortByIncDec: {
      [key: number]: string;
    };

    sortByPeriod: {
      [key: number]: string;
    };
  } = {
    sortByIncDec: {
      1: "თარიღი კლებადი",
      2: "თარიღი ზრდადი",
      3: "ფასი კლებადი",
      4: "ფასი ზრდადი",
      5: "გარბენი კლებადი",
      6: "გარბენი ზრდადი",
    },

    sortByPeriod: {
      0: "პერიოდი",
      1: "1 საათი",
      2: "3 საათი",
      3: "6 საათი",
      4: "12 საათი",
      5: "24 საათი",
    },
  };
  return (
    <div className={carProductsStyling["products-header"]}>
      <p className={carProductsStyling["number-of-cars"]}>
        {productsMetaTotal} განცხადება
      </p>
      <div className={carProductsStyling["sort-by-s"]}>
        <div className={carProductsStyling["select-style-sort"]}>
          <div
            className={carProductsStyling["search"]}
            style={sorters.first ? { border: `1px solid #87888c97` } : {}}
            onClick={() => {
              setSorters((prev) => {
                return {
                  ...prev,
                  first: !prev.first,
                  second: false,
                };
              });
            }}
          >
            <p>
              {filterObjects.sortByPeriod[sortPeriod] !== "პერიოდი"
                ? `ბოლო ${filterObjects.sortByPeriod[sortPeriod]}`
                : "პერიოდი"}
            </p>
            <img
              src={sorters.first ? ExpandLessSVG : ExpandMoreSVG}
              width={15}
              height={15}
              alt="Dropdown"
            ></img>
          </div>

          {sorters.first && (
            <div
              className={carProductsStyling["last-hours"]}
              style={
                filterObjects.sortByPeriod[sortPeriod] === "პერიოდი"
                  ? { width: "100px" }
                  : filterObjects.sortByPeriod[sortPeriod].length < 8
                  ? { width: "140px" }
                  : { width: "150px" }
              }
            >
              {[0, 1, 2, 3, 4].map((eachPeriod) => {
                {
                  return (
                    eachPeriod !== sortPeriod && (
                      <p
                        key={eachPeriod}
                        onClick={() => {
                          productDispatch(
                            setSortPeriod({
                              sortPeriod: eachPeriod,
                            })
                          );

                          setSorters((prev) => {
                            return {
                              ...prev,
                              first: false,
                            };
                          });
                        }}
                      >
                        {filterObjects.sortByPeriod[eachPeriod]}
                      </p>
                    )
                  );
                }
              })}
            </div>
          )}
        </div>
        <div className={carProductsStyling["select-style-sort"]}>
          <div
            className={carProductsStyling["search"]}
            style={sorters.second ? { border: `1px solid #87888c97` } : {}}
            onClick={() => {
              setSorters((prev) => {
                return {
                  ...prev,
                  first: false,
                  second: !prev.second,
                };
              });
            }}
          >
            <p>{filterObjects.sortByIncDec[sortIncDec]}</p>
            <img
              src={sorters.second ? ExpandLessSVG : ExpandMoreSVG}
              width={15}
              height={15}
              alt="Dropdown"
            ></img>
          </div>

          {sorters.second && (
            <div className={carProductsStyling["sort-by-date-price"]}>
              {[1, 2, 3, 4, 5, 6].map((eachFilteringID) => {
                return (
                  eachFilteringID !== sortIncDec && (
                    <p
                      key={eachFilteringID}
                      onClick={() => {
                        productDispatch(
                          setSortIncDec({
                            sortIncDec: eachFilteringID,
                          })
                        );
                        setSorters((prev) => {
                          return {
                            ...prev,
                            second: false,
                          };
                        });
                      }}
                    >
                      {filterObjects.sortByIncDec[eachFilteringID]}
                    </p>
                  )
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsHeader;
