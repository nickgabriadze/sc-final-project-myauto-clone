import carProductsStyling from "../carProducts.module.css";
import { useState } from "react";
import ExpandMoreSVG from "../../search/icons/expand-more.svg";
import ExpandLessSVG from "../../search/icons/expand-less.svg";
import { useAppDispatch, useAppSelector } from "../../../features/hooks";
import { setSortIncDec } from "../../../features/productSlice";

function ProductsHeader({productsMetaTotal}: {productsMetaTotal: number}) {
  const [sorters, setSorters] = useState({
    first: false,
    second: false,
  });

  const productDispatch = useAppDispatch();
  const { sortIncDec } = useAppSelector((state) => state.productsReducer)
  const filterObjects:{
    sortIncDec: {
      [key: number]: string
    }
  } = {
    sortIncDec: {
      1 : "თარიღი კლებადი",
      2 : "თარიღი ზრდადი",
      3 : "ფასი კლებადი",
      4 : "ფასი ზრდადი",
      5 : "გარბენი კლებადი",
      6 : "გარბენი ზრდადი",
    }
  }

  return (
    <div className={carProductsStyling["products-header"]}>
      <p className={carProductsStyling['number-of-cars']}>{productsMetaTotal} განცხადება</p>
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
            <p>პერიოდი</p>
            <img
              src={sorters.first ? ExpandLessSVG : ExpandMoreSVG}
              width={15}
              height={15}
              alt="Dropdown"
            ></img>
          </div>

          {sorters.first && (
            <div className={carProductsStyling["last-hours"]}>
              <p>1 საათი</p>
              <p>3 საათი</p>
              <p>6 საათი</p>
              <p>12 საათი</p>
              <p>24 საათი</p>
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
            <p>{filterObjects.sortIncDec[sortIncDec]}</p>
            <img
              src={sorters.second ? ExpandLessSVG : ExpandMoreSVG}
              width={15}
              height={15}
              alt="Dropdown"
            ></img>
          </div>

          {sorters.second && (
            <div className={carProductsStyling["sort-by-date-price"]}>
             {[1,2,3,4,5,6].map((eachFilteringID) => 
              {return eachFilteringID !== sortIncDec && <p key={eachFilteringID}
              onClick={() => {
                productDispatch(setSortIncDec({
                  sortIncDec: eachFilteringID
                }))
                setSorters((prev) =>{
                  return {
                    ...prev,
                    second: false
                  }
                })
              }}
              >{filterObjects.sortIncDec[eachFilteringID]}</p>}
             )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsHeader;
