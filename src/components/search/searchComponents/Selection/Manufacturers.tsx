import carSearchStyling from "../../carSearch.module.css";
import useManufacturers from "../../../../hooks/useManufacturers";
import { useAppSelector } from "../../../../features/hooks";
import ExpandMoreSVG from "../../icons/expand-more.svg";
import { useState, useRef, useEffect } from "react";
import ExpandLessSVG from "../../icons/expand-less.svg";
import CloseSVG from "../../icons/close.svg";

function Manufacturers() {
  const { mansData, mansError, mansLoading } = useManufacturers(
    "https://static.my.ge/myauto/js/mans.json"
  );
  const { main_type } = useAppSelector((state) => state.searchReducer);

  const [manufactueresData, setManufacturersData] = useState(
    mansData === undefined ? undefined : mansData[main_type]
  );

  const [searchMans, setSearchMans] = useState<boolean>(false);
  const [searchMansTXT, setSearchMansTXT] =
    useState<string>("ყველა მწარმოებელი");

  const [selectedCarBrands, setSelectedCarBrands] = useState<string[]>([]);
  const inputFocusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedCarBrands([]);
    setSearchMansTXT("ყველა მწარმოებელი");
    setManufacturersData(mansData && mansData[main_type]);
  }, [main_type, mansData]);

  return (
    <div className={carSearchStyling["manufacturers-wrapper"]}
    >
      <div className={carSearchStyling["mans-type"]}>
        <h5>მწარმოებელი</h5>
        <div className={carSearchStyling["mans-outer-div"]}>
          <div className={carSearchStyling["mans-search-div"]}>
            <input
              type="text"
              className={carSearchStyling["man-input"]}
              value={searchMansTXT}
              ref={inputFocusRef}
              style={searchMans ? { cursor: "initial" } : { cursor: "pointer" }}
              onClick={() => {
                setSearchMans(true);
                setSearchMansTXT("")
                setManufacturersData(mansData && mansData[main_type])
              }}
              onChange={(e) => {
                setSearchMansTXT(e.target.value);
                if (manufactueresData !== undefined) {
                  setManufacturersData(
                    mansData &&
                      mansData[main_type].filter((each) =>
                        each.man_name
                          .toLowerCase()
                          .startsWith(e.target.value.toLowerCase())
                      )
                  );
                }
              }}
              name="Manufacturers List"
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
                  setSearchMansTXT("")
                } else {
                  setSearchMans((prev) => !prev);
                }
              }}
              width={20}
              height={20}
            ></img>
          </div>
        </div>
        {searchMans === true && manufactueresData !== undefined && (
          <div className={carSearchStyling["mans-list"]}>
            <div className={carSearchStyling["scrollable-mans"]}
            style={manufactueresData.length === 0 ? {height:"fit-content"}: {}}
            >
              {manufactueresData.length === 0 ? (
                <p className={carSearchStyling["no-search-result"]}>
                  ჩანაწერი არ არის
                </p>
              ) : (
                <div className={carSearchStyling["popular-options"]}>
                  <h5>პოპულარული</h5>
                  <hr></hr>
                </div>
              )}

              {manufactueresData?.map((eachManufacturer) => (
                <div
                  key={eachManufacturer.man_id}
                  className={carSearchStyling["each-man"]}
                >
                  <input
                    type={"checkbox"}
                    readOnly={true}
                    name="Manufacturers"
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
                        setSearchMansTXT(
                          selectedCarBrands
                            .filter(
                              (eachBrand) =>
                                eachBrand !== eachManufacturer.man_name
                            )
                            .join(", ")
                        );
                      } else {
                        setSelectedCarBrands((prev) => [
                          ...prev,
                          eachManufacturer.man_name,
                        ]);

                        setSearchMansTXT(
                          [
                            ...selectedCarBrands,
                            eachManufacturer.man_name,
                          ].join(", ")
                        );
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
           { manufactueresData.length !== 0 && <div className={carSearchStyling["clear-mans-submit"]}>
              <p
                onClick={() => {
                  setSelectedCarBrands([]);
                  setSearchMansTXT("")
                }}
              >
                ფილტრის გასუფთავება
              </p>
              <button
                onClick={() => {
                  setSearchMans(false);
                  setSearchMansTXT(selectedCarBrands.join(", "))
                }}
              >
                არჩევა
              </button>
            </div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Manufacturers;
