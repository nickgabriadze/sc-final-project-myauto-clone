import useManufacturers from "../../../../../hooks/search/useManufacturers";
import { useAppSelector, useAppDispatch } from "../../../../../features/hooks";
import ExpandMoreSVG from "../../../icons/expand-more.svg";
import { useState, useEffect } from "react";
import ExpandLessSVG from "../../../icons/expand-less.svg";
import CloseSVG from "../../../icons/close.svg";
import selectionStyling from "../selection.module.css";
import { setSearchingTypeState } from "../../../../../features/selectionSlice";
import { setManuFacturers, setModels } from "../../../../../features/searchSlice";

function Manufacturers() {
  const { mansData } = useManufacturers(
    "https://static.my.ge/myauto/js/mans.json"
  );
  const selectionDispatch = useAppDispatch();
  const { main_type, manufacturers, models } = useAppSelector(
    (state) => state.searchReducer
  );

  const [manufacturersData, setManufacturersData] = useState(
    mansData === undefined ? undefined : mansData[main_type]
  );

  const { manufacturer_type } = useAppSelector(
    (state) => state.selectionReducer
  );



  const [searchMansTXT, setSearchMansTXT] =
    useState<string>("ყველა მწარმოებელი");
  const [searching, setSearching] = useState<boolean>(false);

  useEffect(() => {
    setSearchMansTXT("ყველა მწარმოებელი");
    setManufacturersData(mansData && mansData[main_type]);
  }, [main_type, mansData]);

  return (
    <div className={selectionStyling["type-mans-wrapper"]}>
      <div className={selectionStyling["mans-type"]}>
        <h5>ყველა მწარმოებელი</h5>
        <div className={selectionStyling["mans-outer-div"]}>
          <div className={selectionStyling["mans-search-div"]}>
            <input
              type="text"
              value={
                searching 
                  ? searchMansTXT
                  : manufacturers.length === 0
                  ? "ყველა მწარმოებელი"
                  : manufacturers.map((each) => each.man_name).join(", ")
              }
              style={
                manufacturer_type
                  ? { cursor: "initial" }
                  : { cursor: "pointer" }
              }
              onClick={() => {
                setSearching(true);
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
                  ? manufacturers.length === 0
                    ? ExpandLessSVG
                    : CloseSVG
                  : ExpandMoreSVG
              }
              className={selectionStyling["expand-close-delete"]}
              draggable={false}
              onClick={() => {

                if (manufacturers.length !== 0 && manufacturer_type === true) {
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
                manufacturersData.length < 7 ? { height: "fit-content" } : {}
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
                      manufacturers.some(
                        (eachMan) =>
                          eachMan.man_name === eachManufacturer.man_name &&
                          eachMan.man_id === Number(eachManufacturer.man_id)
                      )
                        ? true
                        : false
                    }
                    onClick={() => {
                      setSearching(false);

                      if (
                        manufacturers.some(
                          (eachMan) =>
                            eachMan.man_name === eachManufacturer.man_name &&
                            eachMan.man_id === Number(eachManufacturer.man_id)
                        )
                      ) {
                        selectionDispatch(
                          setManuFacturers({
                            manufacturers: [
                              ...manufacturers.filter(
                                (eachMan) =>
                                  eachMan.man_id !==
                                  Number(eachManufacturer.man_id)
                              ),
                            ],
                          })
                        );

                        selectionDispatch(setModels({
                          models: [...models.filter(each => each.man_id !== Number(eachManufacturer.man_id))]
                        }))

                      } else {
                        selectionDispatch(
                          setManuFacturers({
                            manufacturers: [
                              ...manufacturers,
                              {
                                man_name: eachManufacturer.man_name,
                                man_id: Number(eachManufacturer.man_id),
                              },
                            ],
                          })
                        );
                      }
                    }}
                  ></input>
                  <p
                    onClick={() => {
                      setSearching(false);
                      if (
                        manufacturers.some(
                          (eachMan) =>
                            eachMan.man_name === eachManufacturer.man_name &&
                            eachMan.man_id === Number(eachManufacturer.man_id)
                        )
                      ) {
                        selectionDispatch(
                          setManuFacturers({
                            manufacturers: [
                              ...manufacturers.filter(
                                (eachMan) =>
                                  eachMan.man_id !==
                                  Number(eachManufacturer.man_id)
                              ),
                            ],
                          })
                        );

                        selectionDispatch(setModels({
                          models: [...models.filter(each => each.man_id !== Number(eachManufacturer.man_id))]
                        }))
                      } else {
                        selectionDispatch(
                          setManuFacturers({
                            manufacturers: [
                              ...manufacturers,
                              {
                                man_name: eachManufacturer.man_name,
                                man_id: Number(eachManufacturer.man_id),
                              },
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
            {manufacturers.length !== 0 && (
              <div className={selectionStyling["clear-mans-submit"]}>
                <p
                  onClick={() => {
                    setSearchMansTXT("ყველა მწარმოებელი");
                    setSearching(false);
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
                    setSearching(false);
                    selectionDispatch(
                      setSearchingTypeState({
                        deal_type: false,
                        manufacturer_type: false,
                        category_type: false,
                        models_type: false,
                      })
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
