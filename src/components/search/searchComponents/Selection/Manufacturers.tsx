import carSearchStyling from "../../carSearch.module.css";
import useManufacturers from "../../../../hooks/useManufacturers";
import { Manufacturer } from "../../searchInterfaces";
import { useAppSelector } from "../../../../features/hooks";
import ExpandMoreSVG from "../../icons/expand-more.svg";
import { useState, useRef } from "react";
import ExpandLessSVG from "../../icons/expand-less.svg";
import CloseSVG from "../../icons/close.svg";

function Manufacturers() {
  const { mansData, mansError, mansLoading } = useManufacturers(
    "https://static.my.ge/myauto/js/mans.json"
  );
  const { main_type } = useAppSelector((state) => state.searchReducer);

  const [searchMans, setSearchMans] = useState<boolean>(false);
  const [searchMansTXT, setSearchMansTXT] =
    useState<string>("ყველა მწარმოებელი");

  const [selectedCarBrands, setSelectedCarBrands] = useState<string[]>([]);
  const inputFocusRef = useRef<HTMLInputElement>(null);
  return (
    <div className={carSearchStyling["manufacturers-wrapper"]}>
      <div className={carSearchStyling["mans-type"]}>
        <h5>მწარმოებელი</h5>
        <div className={carSearchStyling["mans-outer-div"]}>
          <div className={carSearchStyling["mans-search-div"]}>
            <input
              type="text"
              className={carSearchStyling["man-input"]}
              readOnly={true}
              value={
                selectedCarBrands.length !== 0
                  ? selectedCarBrands.length > 2
                    ? selectedCarBrands.slice(0, 3).join(", ").concat("...")
                    : selectedCarBrands.join(", ")
                  : searchMansTXT
              }
              ref={inputFocusRef}
              style={searchMans ? { cursor: "initial" } : { cursor: "pointer" }}
              onClick={() => {
                setSearchMans(true);
                setSearchMansTXT("");
              }}
              onBlur={() => {
                setSearchMansTXT("ყველა მწარმოებელი");
              }}
            ></input>
            <img
              src={
                searchMans
                  ? selectedCarBrands.length === 0
                    ? ExpandLessSVG
                    : CloseSVG
                  : ExpandMoreSVG
              }
              draggable={false}
              onClick={() => {
                if (selectedCarBrands.length !== 0 && searchMans === true) {
                  setSelectedCarBrands([]);
                } else {
                  setSearchMans((prev) => !prev);
                }
              }}
              width={20}
              height={20}
            ></img>
          </div>
        </div>
        {searchMans === true && mansData !== undefined && (
          <div className={carSearchStyling["mans-list"]}>
            <div className={carSearchStyling["scrollable-mans"]}>
              <div className={carSearchStyling["popular-options"]}>
                <h5>პოპულარული</h5>
                <hr></hr>
              </div>
              {mansData[main_type]?.map((eachManufacturer) => (
                <div
                  key={eachManufacturer.man_id}
                  className={carSearchStyling["each-man"]}
                >
                  <input
                    type={"checkbox"}
                    checked={
                      selectedCarBrands.includes(eachManufacturer.man_name)
                        ? true
                        : false
                    }
                    onClick={() => {
                      if (
                        selectedCarBrands.includes(eachManufacturer.man_name)
                      ) {
                        setSelectedCarBrands((prev) =>
                          prev.filter(
                            (eachBrand) =>
                              eachBrand !== eachManufacturer.man_name
                          )
                        );
                      } else {
                        setSelectedCarBrands((prev) => [
                          ...prev,
                          eachManufacturer.man_name,
                        ]);
                      }
                    }}
                  ></input>
                  <p
                    onClick={() => {
                      if (
                        selectedCarBrands.includes(eachManufacturer.man_name)
                      ) {
                        setSelectedCarBrands((prev) =>
                          prev.filter(
                            (eachBrand) =>
                              eachBrand !== eachManufacturer.man_name
                          )
                        );
                      } else {
                        setSelectedCarBrands((prev) => [
                          ...prev,
                          eachManufacturer.man_name,
                        ]);
                      }
                    }}
                  >
                    {eachManufacturer.man_name}
                  </p>
                </div>
              ))}
            </div>
            <div className={carSearchStyling["clear-mans-submit"]}>
              <p
                onClick={() => {
                  setSelectedCarBrands([]);
                }}
              >
                ფილტრის გასუფთავება
              </p>
              <button
                onClick={() => {
                  setSearchMans(false);
                }}
              >
                არჩევა
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Manufacturers;
