import { v4 } from "uuid";
import selectionStyling from "../../selection.module.css";
import ExpandMoreSVG from "../../../../icons/expand-more.svg";
import ExpandLessSVG from "../../../../icons/expand-less.svg";
import CloseSVG from "../../../../icons/close.svg";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../features/hooks";
import useModels from "../../../../../../hooks/useModels";
import { setSearchingTypeState } from "../../../../../../features/selectionSlice";
import { useEffect, useState } from "react";
import DropDownModels from "./DropDownModels";
import { setModels } from "../../../../../../features/searchSlice";
import { SortedManModel } from "../../../../searchInterfaces";

function Models() {
  const { manufacturers, models } = useAppSelector(
    (state) => state.searchReducer
  );
  const selectionDispatch = useAppDispatch();

  const { modelsData } = useModels(manufacturers);
  const [modelsDataToManipulate, setModelsDataToManipulate] =
    useState<SortedManModel[]>();

  useEffect(() => {
    setModelsDataToManipulate(modelsData);
  }, [modelsData]);

  const { models_type } = useAppSelector((state) => state.selectionReducer);
  const [selectedModels, setSelectedModels] = useState<number[]>([]);
  const [modelsTXT, setModelsTXT] = useState<string>("ყველა მოდელი");

  return (
    <div className={selectionStyling["type-models-wrappers"]}>
      <div className={selectionStyling["models-type"]}>
        <h5>მოდელები</h5>
        <div className={selectionStyling["models-outer-div"]}>
          <div className={selectionStyling["models-search-div"]}>
            <input
              value={modelsTXT}
              onChange={(e) => {
                if(manufacturers.length !== 0){
                setModelsTXT(e.target.value);
                }
              }}
              readOnly={manufacturers.length === 0}
              onClick={() => {
                setModelsTXT("");
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
        {models_type &&
          modelsDataToManipulate !== undefined &&
          modelsData.length !== 0 && (
            <div className={selectionStyling["models-list"]}>
              <div className={selectionStyling["scrollable-models"]}>
                {modelsDataToManipulate.map((eachManModels) => (
                  <div key={v4()}>
                    <div className={selectionStyling["each-models-man"]}>
                      <div>
                        <input
                          type={"checkbox"}
                          checked={true}
                          readOnly={true}
                          name="Manufacturers"
                        ></input>
                        <p style={{ color: "black" }}>
                          {eachManModels.man_name}
                        </p>
                      </div>
                      <hr
                        style={
                          eachManModels.man_name.length >= 8
                            ? { width: "30%", marginRight: "5px" }
                            : { width: "90%", marginRight: "10px" }
                        }
                      ></hr>
                    </div>

                    {eachManModels.models_group.map((eachObject) => (
                      <div key={v4()}>
                        {Object.entries(eachObject).map(
                          ([modelGroup, models]) => {
                            return (
                              <DropDownModels
                                key={v4()}
                                modelGroup={modelGroup}
                                manModels={models}
                              />
                            );
                          }
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {models.length !== 0 && (
                <div className={selectionStyling["clear-mans-submit"]}>
                  <p
                    onClick={() => {
                      selectionDispatch(
                        setModels({
                          models: [],
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

export default Models;
