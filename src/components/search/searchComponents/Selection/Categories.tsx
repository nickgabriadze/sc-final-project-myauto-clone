import carSearchStyling from "../../carSearch.module.css";
import useCategories from "../../../../hooks/useCategories";
import { useAppSelector } from "../../../../features/hooks";
import ExpandMoreSVG from "../../icons/expand-more.svg";
import { useState, useRef, useEffect } from "react";
import ExpandLessSVG from "../../icons/expand-less.svg";
import CloseSVG from "../../icons/close.svg";

function Categories() {
    const { catsData, catsError, catsLoading } = useCategories(
      "https://api2.myauto.ge/ka/cats/get"
    );
    const { main_type } = useAppSelector((state) => state.searchReducer);
  
    const [manufactueresData, setManufacturersData] = useState(
      catsData === undefined ? undefined : catsData[main_type]
    );
  
    const [searchMans, setSearchMans] = useState<boolean>(false);
    const [searchMansTXT, setSearchMansTXT] =
      useState<string>("ყველა კატეგორია");
  
    const [selectedCarBrands, setSelectedCarBrands] = useState<string[]>([]);
    const inputFocusRef = useRef<HTMLInputElement>(null);
  
    useEffect(() => {
      setSelectedCarBrands([]);
      setSearchMansTXT("ყველა კატეგორია");
      setManufacturersData(catsData && catsData[main_type]);
    }, [main_type, catsData]);
  
    return (
      <div className={carSearchStyling["type-cats-wrapper"]}>
        <div className={carSearchStyling["cats-type"]}>
          <h5>კატეგორია</h5>
          <div className={carSearchStyling["cats-outer-div"]}>
            <div className={carSearchStyling["cats-search-div"]}>
              <input
                type="text"
                className={carSearchStyling["cats-input"]}
                value={searchMansTXT}
                ref={inputFocusRef}
                style={searchMans ? { cursor: "initial" } : { cursor: "pointer" }}
                onClick={() => {
                  setSearchMans(true);
                  setSearchMansTXT("")
                  setManufacturersData(catsData && catsData[main_type])
                }}
                onChange={(e) => {
                  setSearchMansTXT(e.target.value);
                  if (manufactueresData !== undefined) {
                    setManufacturersData(
                        catsData &&
                      catsData[main_type].filter((each) =>
                          each.title
                            .toLowerCase()
                            .startsWith(e.target.value.toLowerCase())
                        )
                    );
                  }
                }}
                name="Categories List"

              ></input>
              <img
                src={
                  searchMans
                    ? selectedCarBrands.length === 0
                      ? ExpandLessSVG
                      : CloseSVG
                    : ExpandMoreSVG
                }
                className={carSearchStyling['expand-close-delete']}
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
            <div className={carSearchStyling["cats-list"]}>
              <div className={carSearchStyling["scrollable-mans"]}
              style={manufactueresData.length === 0 ? {height:"fit-content"}: {}}
              >
                {}
  
                {manufactueresData?.map((eachManufacturer) => (
                  <div
                    key={eachManufacturer.title}
                    className={carSearchStyling["each-man"]}
                  >
                    <input
                      type={"checkbox"}
                      readOnly={true}
                      name="Categories"
                      checked={
                        selectedCarBrands.includes(eachManufacturer.title)
                          ? true
                          : false
                      }
                      onClick={() => {
                        if (
                          selectedCarBrands.includes(eachManufacturer.title)
                        ) {
                          setSelectedCarBrands((prev) =>
                            prev.filter(
                              (eachBrand) =>
                                eachBrand !== eachManufacturer.title
                            )
                          );
                          setSearchMansTXT(
                            selectedCarBrands
                              .filter(
                                (eachBrand) =>
                                  eachBrand !== eachManufacturer.title
                              )
                              .join(", ")
                          );
                        } else {
                          setSelectedCarBrands((prev) => [
                            ...prev,
                            eachManufacturer.title,
                          ]);
  
                          setSearchMansTXT(
                            [
                              ...selectedCarBrands,
                              eachManufacturer.title,
                            ].join(", ")
                          );
                        }
                      }}
                    ></input>
                    <p
                      onClick={() => {
                        if (
                          selectedCarBrands.includes(eachManufacturer.title)
                        ) {
                          setSelectedCarBrands((prev) =>
                            prev.filter(
                              (eachBrand) =>
                                eachBrand !== eachManufacturer.title
                            )
                          );
                        } else {
                          setSelectedCarBrands((prev) => [
                            ...prev,
                            eachManufacturer.title,
                          ]);
                        }
                      }}
                    >
                      {eachManufacturer.title}
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
  

export default Categories;
