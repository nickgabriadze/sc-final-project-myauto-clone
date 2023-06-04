import useManufacturers from "../../../../../hooks/useManufacturers";
import { useAppSelector, useAppDispatch } from "../../../../../features/hooks";
import ExpandMoreSVG from "../../../icons/expand-more.svg";
import { useState, useRef, useEffect } from "react";
import ExpandLessSVG from "../../../icons/expand-less.svg";
import CloseSVG from "../../../icons/close.svg";
import selectionStyling from "../selection.module.css";
import { setSearchingTypeState } from "../../../../../features/selectionSlice";
import { setManuFacturers } from "../../../../../features/searchSlice";

function Manufacturers() {
  const { mansData } = useManufacturers(
    "https://static.my.ge/myauto/js/mans.json"
  );
  const selectionDispatch = useAppDispatch();
  const { main_type } = useAppSelector((state) => state.searchReducer);

  const [manufacturersData, setManufacturersData] = useState(
    mansData === undefined ? undefined : mansData[main_type]
  );

  const { manufacturer_type } = useAppSelector(
    (state) => state.selectionReducer
  );

  const [searchMansTXT, setSearchMansTXT] = useState<string>("მწარმოებელი");

  const [selectedCarBrands, setSelectedCarBrands] = useState<
    { man_name: string; man_id: number }[]
  >([]);

  const inputFocusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedCarBrands([]);
    setSearchMansTXT("მწარმოებელი");
    setManufacturersData(mansData && mansData[main_type]);
  }, [main_type, mansData]);

  return (
    <div className={selectionStyling["type-mans-wrapper"]}>
      <div className={selectionStyling["mans-type"]}>
        <h5>მწარმოებელი</h5>
        <div className={selectionStyling["mans-outer-div"]}>
          <div className={selectionStyling["mans-search-div"]}>
            <input
              type="text"
              value={searchMansTXT}
              ref={inputFocusRef}
              style={
                manufacturer_type
                  ? { cursor: "initial" }
                  : { cursor: "pointer" }
              }
              onClick={() => {
                selectionDispatch(
                  setSearchingTypeState({
                    deal_type: false,
                    manufacturer_type: true,
                    category_type: false,
                    models_type: false,
                  })
                );
                setSearchMansTXT("");
                setManufacturersData(mansData && mansData[main_type]);
              }}
              onChange={(e) => {
                setSearchMansTXT(e.target.value);
                if (manufacturersData !== undefined) {
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
                manufacturer_type
                  ? selectedCarBrands.length === 0
                    ? ExpandLessSVG
                    : CloseSVG
                  : ExpandMoreSVG
              }
              className={selectionStyling["expand-close-delete"]}
              draggable={false}
              onClick={() => {
                if (selectedCarBrands.length === 0) {
                  setSearchMansTXT("მწარმოებელი");
                }
                if (
                  selectedCarBrands.length !== 0 &&
                  manufacturer_type === true
                ) {
                  setSelectedCarBrands([]);
                  setSearchMansTXT("მწარმოებელი");
                  selectionDispatch(
                    setManuFacturers({
                      manufacturers: [],
                    })
                  );
                } else {
                  selectionDispatch(
                    setSearchingTypeState({
                      deal_type: false,
                      manufacturer_type: !manufacturer_type,
                      category_type: false,
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
        {manufacturer_type === true && manufacturersData !== undefined && (
          <div className={selectionStyling["mans-list"]}>
            <div
              className={selectionStyling["scrollable-mans"]}
              style={
                manufacturersData.length === 0 ? { height: "fit-content" } : {}
              }
            >
              {manufacturersData.length === 0 ? (
                <p className={selectionStyling["no-search-result"]}>
                  ჩანაწერი არ არის
                </p>
              ) : (
                <div className={selectionStyling["popular-options"]}>
                  <h5>პოპულარული</h5>
                  <hr></hr>
                </div>
              )}

              {manufacturersData?.map((eachManufacturer) => (
                <div
                  key={eachManufacturer.man_id}
                  className={selectionStyling["each-man"]}
                >
                  <input
                    type={"checkbox"}
                    readOnly={true}
                    name="Manufacturers"
                    checked={
                      selectedCarBrands.some(
                        (eachMan) =>
                          eachMan.man_name === eachManufacturer.man_name &&
                          eachMan.man_id === Number(eachManufacturer.man_id)
                      )
                        ? true
                        : false
                    }
                    onClick={() => {
                      if (
                        selectedCarBrands.some(
                          (eachMan) =>
                            eachMan.man_name === eachManufacturer.man_name &&
                            eachMan.man_id === Number(eachManufacturer.man_id)
                        )
                      ) {
                        setSelectedCarBrands((prev) =>
                          prev.filter(
                            (eachBrand) =>
                              eachBrand.man_name !== eachManufacturer.man_name
                          )
                        );

                        setSearchMansTXT(
                          selectedCarBrands
                            .filter(
                              (eachBrand) =>
                                eachBrand.man_name !== eachManufacturer.man_name
                            )
                            .map((eachMan) => eachMan.man_name)
                            .join(", ")
                        );

                        selectionDispatch(
                          setManuFacturers({
                            manufacturers: [
                              ...selectedCarBrands
                                .filter(
                                  (eachMan) =>
                                    eachMan.man_id !==
                                    Number(eachManufacturer.man_id)
                                )
                                .map((eachMan) => eachMan.man_id),
                            ],
                          })
                        );
                      } else {
                        setSelectedCarBrands((prev) => [
                          ...prev,
                          {
                            man_name: eachManufacturer.man_name,
                            man_id: Number(eachManufacturer.man_id),
                          },
                        ]);

                        setSearchMansTXT(
                          [
                            ...selectedCarBrands.map(
                              (eachMan) => eachMan.man_name
                            ),
                            eachManufacturer.man_name,
                          ].join(", ")
                        );

                        selectionDispatch(
                          setManuFacturers({
                            manufacturers: [
                              ...selectedCarBrands.map(
                                (eachMan) => eachMan.man_id
                              ),
                              Number(eachManufacturer.man_id),
                            ],
                          })
                        );
                      }
                    }}
                  ></input>
                  <p
                    onClick={() => {
                      if (
                        selectedCarBrands.some(
                          (eachMan) =>
                            eachMan.man_name === eachManufacturer.man_name &&
                            eachMan.man_id === Number(eachManufacturer.man_id)
                        )
                      ) {
                        setSelectedCarBrands((prev) =>
                          prev.filter(
                            (eachBrand) =>
                              eachBrand.man_name !== eachManufacturer.man_name
                          )
                        );

                        setSearchMansTXT(
                          selectedCarBrands
                            .filter(
                              (eachBrand) =>
                                eachBrand.man_name !== eachManufacturer.man_name
                            )
                            .map((eachMan) => eachMan.man_name)
                            .join(", ")
                        );

                        selectionDispatch(
                          setManuFacturers({
                            manufacturers: [
                              ...selectedCarBrands
                                .filter(
                                  (eachMan) =>
                                    eachMan.man_id !==
                                    Number(eachManufacturer.man_id)
                                )
                                .map((eachMan) => eachMan.man_id),
                            ],
                          })
                        );
                      } else {
                        setSelectedCarBrands((prev) => [
                          ...prev,
                          {
                            man_name: eachManufacturer.man_name,
                            man_id: Number(eachManufacturer.man_id),
                          },
                        ]);

                        setSearchMansTXT(
                          [
                            ...selectedCarBrands.map(
                              (eachMan) => eachMan.man_name
                            ),
                            eachManufacturer.man_name,
                          ].join(", ")
                        );

                        selectionDispatch(
                          setManuFacturers({
                            manufacturers: [
                              ...selectedCarBrands.map(
                                (eachMan) => eachMan.man_id
                              ),
                              Number(eachManufacturer.man_id),
                            ],
                          })
                        );
                      }
                    }}
                  >
                    {eachManufacturer.man_name}
                  </p>
                </div>
              ))}
            </div>
            {selectedCarBrands.length !== 0 && (
              <div className={selectionStyling["clear-mans-submit"]}>
                <p
                  onClick={() => {
                    setSelectedCarBrands([]);
                    setSearchMansTXT("მწარმოებელი");
                    selectionDispatch(
                      setManuFacturers({
                        manufacturers: [],
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

                    setSearchMansTXT(
                      selectedCarBrands
                        .map((eachMan) => eachMan.man_name)
                        .join(", ")
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

export default Manufacturers;
