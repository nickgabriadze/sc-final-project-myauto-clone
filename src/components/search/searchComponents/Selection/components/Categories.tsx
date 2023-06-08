import selectionStyling from "../selection.module.css";
import useCategories from "../../../../../hooks/search/useCategories";
import { useAppDispatch, useAppSelector } from "../../../../../features/hooks";
import ExpandMoreSVG from "../../../icons/expand-more.svg";
import { useState, useRef, useEffect } from "react";
import ExpandLessSVG from "../../../icons/expand-less.svg";
import CloseSVG from "../../../icons/close.svg";
import { setSearchingTypeState } from "../../../../../features/selectionSlice";
import { setCategories } from "../../../../../features/searchSlice";

function Categories() {
  const { catsData } = useCategories("https://api2.myauto.ge/ka/cats/get");
  const { main_type } = useAppSelector((state) => state.searchReducer);

  const [categoriesData, setCategoriesData] = useState(
    catsData === undefined ? undefined : catsData[main_type]
  );

  const { category_type } = useAppSelector((state) => state.selectionReducer);

  const selectionDispatch = useAppDispatch();
  const [searchCatsTXT, setSearchCatsTXT] = useState<string>("ყველა კატეგორია");

  const [selectedCategories, setSelectedCategories] = useState<
    { cat_name: string; cat_id: number }[]
  >([]);
  const inputFocusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedCategories([]);
    setSearchCatsTXT("ყველა კატეგორია");
    setCategoriesData(catsData && catsData[main_type]);
  }, [main_type, catsData]);

  return (
    <div className={selectionStyling["type-cats-wrapper"]}>
      <div className={selectionStyling["cats-type"]}>
        <h5>ყველა კატეგორია</h5>
        <div className={selectionStyling["cats-outer-div"]}>
          <div className={selectionStyling["cats-search-div"]}>
            <input
              type="text"
              className={selectionStyling["cats-input"]}
              value={searchCatsTXT}
              ref={inputFocusRef}
              style={
                category_type ? { cursor: "initial" } : { cursor: "pointer" }
              }
              onClick={() => {
                selectionDispatch(
                  setSearchingTypeState({
                    deal_type: false,
                    manufacturer_type: false,
                    category_type: true,
                    models_type: false,
                  })
                );

                setSearchCatsTXT("");
                setCategoriesData(catsData && catsData[main_type]);
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
                category_type
                  ? selectedCategories.length === 0
                    ? ExpandLessSVG
                    : CloseSVG
                  : ExpandMoreSVG
              }
              className={selectionStyling["expand-close-delete"]}
              draggable={false}
              onClick={() => {
                if (selectedCategories.length === 0) {
                  setSearchCatsTXT("ყველა კატეგორია");
                }

                if (selectedCategories.length !== 0 && category_type === true) {
                  setSelectedCategories([]);
                  setSearchCatsTXT("ყველა კატეგორია");
                  selectionDispatch(
                    setCategories({
                      categories: [],
                    })
                  );
                } else {
                  selectionDispatch(
                    setSearchingTypeState({
                      deal_type: false,
                      manufacturer_type: false,
                      category_type: !category_type,
                      models_type: false,
                    })
                  );
                }
              }}
              width={15}
              height={15}
            ></img>
          </div>
        </div>
        {category_type === true && categoriesData !== undefined && (
          <div className={selectionStyling["cats-list"]}>
            <div
              className={selectionStyling["scrollable-cats"]}
              style={
                categoriesData.length < 5  ? { height: "fit-content" } : {}
              }
            >

{categoriesData.length === 0 ? (
                <p className={selectionStyling["no-search-result"]}>
                  ჩანაწერი არ არის
                </p>
              ) : (
                <div className={selectionStyling["popular-options"]}>
                  <h5>პოპულარული</h5>
                  <hr></hr>
                </div>
              )}
              {categoriesData?.map((eachCategory) => (
                <div
                  key={eachCategory.title}
                  className={selectionStyling["each-man"]}
                >
                  <input
                    type={"checkbox"}
                    readOnly={true}
                    name="Categories"
                    checked={
                      selectedCategories.some(
                        (eachCat) =>
                          eachCat.cat_name === eachCategory.title &&
                          eachCat.cat_id === eachCategory.category_id
                      )
                        ? true
                        : false
                    }
                    onClick={() => {
                      if (
                        selectedCategories.some(
                          (eachCat) =>
                            eachCat.cat_name === eachCategory.title &&
                            eachCat.cat_id === eachCategory.category_id
                        )
                      ) {
                        setSelectedCategories((prev) =>
                          prev.filter(
                            (eachBrand) =>
                              eachBrand.cat_name !== eachCategory.title
                          )
                        );
                        selectionDispatch(
                          setCategories({
                            categories: [
                              ...selectedCategories
                                .filter(
                                  (each) =>
                                    each.cat_id !== eachCategory.category_id
                                )
                                .map((each) => each.cat_id),
                            ],
                          })
                        );
                        setSearchCatsTXT(
                          selectedCategories
                            .filter(
                              (eachBrand) =>
                                eachBrand.cat_name !== eachCategory.title
                            )
                            .map((each) => each.cat_name)
                            .join(", ")
                        );
                      } else {
                        setSelectedCategories((prev) => [
                          ...prev,
                          {
                            cat_name: eachCategory.title,
                            cat_id: eachCategory.category_id,
                          },
                        ]);

                        selectionDispatch(
                          setCategories({
                            categories: [
                              ...selectedCategories.map((each) => each.cat_id),
                              eachCategory.category_id,
                            ],
                          })
                        );

                        setSearchCatsTXT(
                          [
                            ...selectedCategories.map((each) => each.cat_name),
                            eachCategory.title,
                          ].join(", ")
                        );
                      }
                    }}
                  ></input>
                  <p
                    onClick={() => {
                      if (
                        selectedCategories.some(
                          (eachCat) =>
                            eachCat.cat_name === eachCategory.title &&
                            eachCat.cat_id === eachCategory.category_id
                        )
                      ) {
                        setSelectedCategories((prev) =>
                          prev.filter(
                            (eachBrand) =>
                              eachBrand.cat_name !== eachCategory.title
                          )
                        );

                        selectionDispatch(
                          setCategories({
                            categories: [
                              ...selectedCategories
                                .filter(
                                  (each) =>
                                    each.cat_id !== eachCategory.category_id
                                )
                                .map((each) => each.cat_id),
                            ],
                          })
                        );
                        setSearchCatsTXT(
                          selectedCategories
                            .filter(
                              (eachBrand) =>
                                eachBrand.cat_name !== eachCategory.title
                            )
                            .map((each) => each.cat_name)
                            .join(", ")
                        );
                      } else {
                        setSelectedCategories((prev) => [
                          ...prev,
                          {
                            cat_name: eachCategory.title,
                            cat_id: eachCategory.category_id,
                          },
                        ]);

                        selectionDispatch(
                          setCategories({
                            categories: [
                              ...selectedCategories.map((each) => each.cat_id),
                              eachCategory.category_id,
                            ],
                          })
                        );

                        setSearchCatsTXT(
                          [
                            ...selectedCategories.map((each) => each.cat_name),
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
            {selectedCategories.length !== 0 && (
              <div className={selectionStyling["clear-cats-submit"]}>
                <p
                  onClick={() => {
                    setSelectedCategories([]);
                    setSearchCatsTXT("ყველა კატეგორია");
                    selectionDispatch(
                      setCategories({
                        categories: [],
                      })
                    );
                  }}
                >
                  ფილტრის გასუფთავება
                </p>
                <button
                  onClick={() => {
                    selectionDispatch(
                      setSearchingTypeState({
                        deal_type: false,
                        manufacturer_type: false,
                        category_type: false,
                        models_type: false,
                      })
                    );

                    setSearchCatsTXT(
                      selectedCategories.map((each) => each.cat_name).join(", ")
                    );
                  }}
                >
                  არჩევა
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Categories;
