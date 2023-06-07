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
import { setManuFacturers, setModels } from "../../../../../../features/searchSlice";
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

  useEffect(() => {
      if(modelsDataToManipulate?.length === 0){
        setModelsTXT("ყველა მოდელი")
      }
  }, [modelsDataToManipulate?.length])

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
              value={models.map(each => each.model_name).join(", ")}
              onChange={(e) => {
                if (modelsDataToManipulate?.length !== 0) {
                  setModelsTXT(e.target.value);
                }
              }}
              readOnly={modelsDataToManipulate?.length === 0}
              onClick={() => {
                  

                if (modelsDataToManipulate?.length !== 0) {
                  setModelsTXT("")
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
                models_type && modelsDataToManipulate?.length !== 0
                  ? models.length === 0
                    ? ExpandLessSVG
                    : CloseSVG
                  : ExpandMoreSVG
              }
              onClick={() => {

                if(models.length !== 0){
                  selectionDispatch(setModels({
                    models: []
                  }))
                }
                selectionDispatch(
                  setSearchingTypeState({
                    deal_type: false,
                    manufacturer_type: false,
                    category_type: false,
                    models_type:
                      !models_type && modelsDataToManipulate?.length !== 0,
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
          modelsDataToManipulate?.length !== 0 &&
          modelsDataToManipulate !== undefined &&
          modelsData.length !== 0 && (
            <div className={selectionStyling["models-list"]}>
              <div className={selectionStyling["scrollable-models"]}>
                {modelsDataToManipulate.map((eachManModel) => (
                  <div key={v4()}>
                    <div className={selectionStyling["each-models-man"]}>
                      <div>
                        <input
                          type={"checkbox"}
                          checked={true}
                          readOnly={true}
                          onClick={() => {
                            setModelsDataToManipulate(
                              (prev) =>
                                prev &&
                                prev.filter(
                                  (each) => each.man_id !== eachManModel.man_id
                                )
                            );
                            selectionDispatch(
                              setModels({
                                models: [
                                  ...models.filter(
                                    (each) =>
                                      each.man_id !== eachManModel.man_id
                                  ),
                                ],
                              })
                            );
                          }}
                          name="Manufacturers"
                        ></input>
                        <p
                          onClick={() => {
                            setModelsDataToManipulate(
                              (prev) =>
                                prev &&
                                prev.filter(
                                  (each) => each.man_id !== eachManModel.man_id
                                )
                            );
                            
                            selectionDispatch(setManuFacturers({
                              manufacturers: [...manufacturers.filter((each) => each.man_id !== eachManModel.man_id)]
                            }))

                            selectionDispatch(
                              setModels({
                                models: [
                                  ...models.filter(
                                    (each) =>
                                      each.man_id !== eachManModel.man_id
                                  ),
                                ],
                              })
                            );
                          }}
                          style={{ color: "black" }}
                        >
                          {eachManModel.man_name}
                        </p>
                      </div>
                      <hr
                        style={
                          eachManModel.man_name.length >= 8
                            ? { width: "30%", marginRight: "5px" }
                            : { width: "90%", marginRight: "10px" }
                        }
                      ></hr>
                    </div>

                    {eachManModel.models_group.map((eachObject) => (
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
