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
  
    const [categoriesData, setCategoriesData] = useState(
      catsData === undefined ? undefined : catsData[main_type]
    );
  
    const [searchCats, setSearchCats] = useState<boolean>(false);
    const [searchCatsTXT, setSearchCatsTXT] =
      useState<string>("ყველა კატეგორია");
  
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const inputFocusRef = useRef<HTMLInputElement>(null);
  
    useEffect(() => {
      setSelectedCategories([]);
      setSearchCatsTXT("ყველა კატეგორია");
      setCategoriesData(catsData && catsData[main_type]);
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
                value={searchCatsTXT}
                ref={inputFocusRef}
                style={searchCats ? { cursor: "initial" } : { cursor: "pointer" }}
                onClick={() => {
                  setSearchCats(true);
                  setSearchCatsTXT("")
                  setCategoriesData(catsData && catsData[main_type])
                }}
                onChange={(e) => {
                  setSearchCatsTXT(e.target.value);
                  if (categoriesData !== undefined) {
                    setCategoriesData(
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
                  searchCats
                    ? selectedCategories.length === 0
                      ? ExpandLessSVG
                      : CloseSVG
                    : ExpandMoreSVG
                }
                className={carSearchStyling['expand-close-delete']}
                draggable={false}
                onClick={() => {
                  if (selectedCategories.length !== 0 && searchCats === true) {
                    setSelectedCategories([]);
                    setSearchCatsTXT("")
                  } else {
                    setSearchCats((prev) => !prev);
                  }
                }}
                width={20}
                height={20}
              ></img>
            </div>
          </div>
          {searchCats === true && categoriesData !== undefined && (
            <div className={carSearchStyling["cats-list"]}>
              <div className={carSearchStyling["scrollable-cats"]}
              style={categoriesData.length === 0 ? {height:"fit-content"}: {}}
              >
                {}
  
                {categoriesData?.map((eachCategory) => (
                  <div
                    key={eachCategory.title}
                    className={carSearchStyling["each-man"]}
                  >
                    <input
                      type={"checkbox"}
                      readOnly={true}
                      name="Categories"
                      checked={
                        selectedCategories.includes(eachCategory.title)
                          ? true
                          : false
                      }
                      onClick={() => {
                        if (
                          selectedCategories.includes(eachCategory.title)
                        ) {
                          setSelectedCategories((prev) =>
                            prev.filter(
                              (eachBrand) =>
                                eachBrand !== eachCategory.title
                            )
                          );
                          setSearchCatsTXT(
                            selectedCategories
                              .filter(
                                (eachBrand) =>
                                  eachBrand !== eachCategory.title
                              )
                              .join(", ")
                          );
                        } else {
                          setSelectedCategories((prev) => [
                            ...prev,
                            eachCategory.title,
                          ]);
  
                          setSearchCatsTXT(
                            [
                              ...selectedCategories,
                              eachCategory.title,
                            ].join(", ")
                          );
                        }
                      }}
                    ></input>
                    <p
                     onClick={() => {
                      if (
                        selectedCategories.includes(eachCategory.title)
                      ) {
                        setSelectedCategories((prev) =>
                          prev.filter(
                            (eachBrand) =>
                              eachBrand !== eachCategory.title
                          )
                        );
                        setSearchCatsTXT(
                          selectedCategories
                            .filter(
                              (eachBrand) =>
                                eachBrand !== eachCategory.title
                            )
                            .join(", ")
                        );
                      } else {
                        setSelectedCategories((prev) => [
                          ...prev,
                          eachCategory.title,
                        ]);

                        setSearchCatsTXT(
                          [
                            ...selectedCategories,
                            eachCategory.title,
                          ].join(", ")
                        );
                      }
                    }}
                    >
                      {eachCategory.title}
                    </p>
                  </div>
                ))}
              </div>
             { selectedCategories.length !== 0 && <div className={carSearchStyling["clear-cats-submit"]}>
                <p
                  onClick={() => {
                    setSelectedCategories([]);
                    setSearchCatsTXT("")
                  }}
                >
                  ფილტრის გასუფთავება
                </p>
                <button
                  onClick={() => {
                    setSearchCats(false);
                    setSearchCatsTXT(selectedCategories.join(", "))
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