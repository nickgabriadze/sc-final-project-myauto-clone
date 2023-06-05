import selectionStyling from "../../selection.module.css";
import ExpandMoreSVG from "../../../../icons/expand-more.svg";
import ExpandLessSVG from "../../../../icons/expand-less.svg";
import CloseSVG from "../../../../icons/close.svg";
import { useAppDispatch, useAppSelector } from "../../../../../../features/hooks";
import useModels from "../../../../../../hooks/useModels";
import { setSearchingTypeState } from "../../../../../../features/selectionSlice";
import { useState } from "react";

function Models() {
  const { manufacturers } = useAppSelector((state) => state.searchReducer);
  const selectionDispatch = useAppDispatch();

  const { modelsData } = useModels(manufacturers);
  
  const { models_type } = useAppSelector((state) => state.selectionReducer);
  const [selectedModels, setSelectedModels] = useState<number[]>([]);
  const [modelsTXT, setModelsTXT] = useState<string>("ყველა მოდელი");
  console.log(modelsData);

  return (
    <div className={selectionStyling["type-models-wrappers"]}>
      <div className={selectionStyling["models-type"]}>
        <div className={selectionStyling["models-type"]}>
          <h5>მოდელები</h5>
          <div className={selectionStyling["models-outer-div"]}>
            <div className={selectionStyling["models-search-div"]}>
              <input
                value={modelsTXT}
                readOnly={manufacturers.length === 0}
                onClick={() => {
                  if (manufacturers.length !== 0) {
                    selectionDispatch(
                      setSearchingTypeState({
                        deal_type: false,
                        manufacturer_type: false,
                        category_type: false,
                        models_type: true,
                      })
                    );
                  }
                }}
                style={
                  manufacturers.length === 0
                    ? { cursor: "pointer" }
                    : { cursor: "initial" }
                }
              ></input>
              <img
                alt="Dropdown"
                src={
                  models_type
                    ? selectedModels.length === 0
                      ? ExpandLessSVG
                      : CloseSVG
                    : ExpandMoreSVG
                }
                onClick={() => {
                  selectionDispatch(
                    setSearchingTypeState({
                      deal_type: false,
                      manufacturer_type: false,
                      category_type: false,
                      models_type: !models_type && manufacturers.length !== 0,
                    })
                  );
                }}
                className={selectionStyling["expand-close-delete"]}
                draggable={false}
                width={15}
                height={15}
              ></img>
            </div>
          </div>
          {models_type && modelsData.length !== 0 && (
            <div className={selectionStyling["models-list"]}>
              <div className={selectionStyling["scrollable-models"]}>
                {modelsData.map((eachManModels, index) => (
                  <div key={index}>
                    <div className={selectionStyling["each-models-man"]}>
                     <div>
                      <input
                        type={"checkbox"}
                        
                        checked={true}
                        name="Manufacturers"
                      ></input>
                      <p>{eachManModels.man_name}</p>
                      </div>
                      <hr
                        style={
                          eachManModels.man_name.length >= 8
                            ? { width: "30%", marginRight:"5px" }
                            : { width: "90%", marginRight: "10px" }
                        }
                      ></hr>
                    </div>

                    {eachManModels.models_group.map((eachObject) => (
                      <div>
                        {Object.entries(eachObject).map(
                          ([modelGroup, models]) => {
                            return (
                              <>
                                {modelGroup.trim().length !== 0 && (
                                  <><div
                                    className={
                                      selectionStyling["each-models-man"]
                                    }
                                  >
                                    <div>
                                      <input
                                        type={"checkbox"}
                                        readOnly={true}
                                        name="Manufacturers"
                                      ></input>
                                      <p>{modelGroup}</p>
                                    </div>
                                    <img
                                      alt="Dropdown"
                                      src={ExpandMoreSVG}
                                      width={20}
                                      height={20}
                                      style={{marginRight: '5px'}}
                                    ></img>
                                  </div>

                                   {/* <div>{models.map(eachInnerModel => eachInnerModel.model_name)}</div> */}
                                   </>
                                )}
                                <div>
                                  {
                                  modelGroup.trim() === "" &&
                                  models.map((each) => (
                                    <>
                                    <div
                                      className={
                                        selectionStyling["each-models-man"]
                                      }
                                    >
                                      <div>
                                        <input
                                          type={"checkbox"}
                                          readOnly={true}
                                          name="Manufacturers"
                                        ></input>
                                        <p>{each.model_name}</p>
                                      </div>
                                    </div>

                                   
                                    </>
                                  ))}
                                </div>
                              </>
                            );
                          }
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Models;
