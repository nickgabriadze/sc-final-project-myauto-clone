import { v4 } from "uuid";
import selectionStyling from "../../selection.module.css";
import ExpandMoreSVG from "../../../../icons/expand-more.svg";
import ExpandLessSVG from "../../../../icons/expand-less.svg";
import CloseSVG from "../../../../icons/close.svg";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../features/hooks";
import useModels from "../../../../../../hooks/search/useModels";
import { setSearchingTypeState } from "../../../../../../features/selectionSlice";
import { useEffect, useState } from "react";
import DropDownModels from "./DropDownModels";
import {
  setManuFacturers,
  setModels,
} from "../../../../../../features/searchSlice";
import { MergedModel, SortedManModel } from "../../../../searchInterfaces";
import filterModelsByText from "../../../../../../hooks/search/filterModelsByText";
import EachModel from "./EachModel";

function Models() {
  const { manufacturers, models } = useAppSelector(
    (state) => state.searchReducer
  );
  const selectionDispatch = useAppDispatch();

  const { modelsData, mergedModelsData } = useModels(manufacturers);

  const [modelsDataToManipulate, setModelsDataToManipulate] =
    useState<SortedManModel[]>();

  const [mergedModelsDataToManipulate, setMergedModelsDataToManipulate] =
    useState<MergedModel[]>();

  useEffect(() => {
    setModelsDataToManipulate(modelsData);
    setMergedModelsDataToManipulate(mergedModelsData);
  }, [modelsData, mergedModelsData]);

  const { models_type } = useAppSelector((state) => state.selectionReducer);
  const [searchModelsTXT, setSearchModelsTXT] =
    useState<string>("ყველა მოდელი");
  const [searching, setSearching] = useState<boolean>(false);

  return (
    <div className={selectionStyling["type-models-wrapper"]}>
      <div className={selectionStyling["models-type"]}>
        <h5>მოდელები</h5>
        <div className={selectionStyling["models-outer-div"]}>
          <div className={selectionStyling["models-search-div"]}>
            <input
              value={
                searching
                  ? searchModelsTXT
                  : models.length === 0
                  ? "ყველა მოდელი"
                  : models.map((each) => each.model_name).join(", ")
              }
              onChange={(e) => {
                if (modelsDataToManipulate?.length !== 0) {
                  setSearchModelsTXT(e.target.value);
                }
              }}
              readOnly={modelsDataToManipulate?.length === 0}
              onClick={() => {
                setSearching(true);

                if (modelsDataToManipulate?.length !== 0) {
                  setSearchModelsTXT("");
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
                if (models.length !== 0) {
                  selectionDispatch(
                    setModels({
                      models: [],
                    })
                  );
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
              {filterModelsByText(
                searchModelsTXT,
                mergedModelsDataToManipulate === undefined
                  ? []
                  : mergedModelsDataToManipulate
              )
                .map((each) => each.models_group)
                .reduce((first, second) => first + second.length, 0) !== 0 ? (
                <div
                  className={selectionStyling["scrollable-models"]}
                  style={
                    searchModelsTXT.length > 0 &&
                    filterModelsByText(
                      searchModelsTXT,
                      mergedModelsDataToManipulate === undefined
                        ? []
                        : mergedModelsDataToManipulate
                    )
                      .map((each) => each.models_group)
                      .reduce((first, second) => first + second.length, 0) < 5
                      ? { height: "fit-content" }
                      : {}
                  }
                >
                  {modelsDataToManipulate.map((eachManModel) => (
                    <div key={v4()}>
                      {searchModelsTXT.length > 0 ? (
                        filterModelsByText(
                          searchModelsTXT,
                          mergedModelsDataToManipulate === undefined
                            ? []
                            : mergedModelsDataToManipulate
                        )
                          .filter((each) => each.man_id == eachManModel.man_id)
                          .map((each) => each.models_group)[0].length !== 0 && (
                          <div className={selectionStyling["each-models-man"]}>
                            <div>
                              <input
                                type={"checkbox"}
                                checked={true}
                                readOnly={true}
                                onClick={() => {
                                  setSearching(false);
                                  setModelsDataToManipulate(
                                    (prev) =>
                                      prev &&
                                      prev.filter(
                                        (each) =>
                                          each.man_id !== eachManModel.man_id
                                      )
                                  );

                                  selectionDispatch(
                                    setManuFacturers({
                                      manufacturers: [
                                        ...manufacturers.filter(
                                          (each) =>
                                            each.man_id !== eachManModel.man_id
                                        ),
                                      ],
                                    })
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
                                  setSearching(false);
                                  setModelsDataToManipulate(
                                    (prev) =>
                                      prev &&
                                      prev.filter(
                                        (each) =>
                                          each.man_id !== eachManModel.man_id
                                      )
                                  );

                                  selectionDispatch(
                                    setManuFacturers({
                                      manufacturers: [
                                        ...manufacturers.filter(
                                          (each) =>
                                            each.man_id !== eachManModel.man_id
                                        ),
                                      ],
                                    })
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
                                style={{ color: "black" }}
                              >
                                {eachManModel.man_name}
                              </p>
                            </div>
                            <hr
                              style={
                                eachManModel.man_name.length >= 9
                                  ? { width: "20%", marginRight: "10px" }
                                  : { width: "90%", marginRight: "10px" }
                              }
                            ></hr>
                          </div>
                        )
                      ) : (
                        <div className={selectionStyling["each-models-man"]}>
                          <div>
                            <input
                              type={"checkbox"}
                              checked={true}
                              readOnly={true}
                              onClick={() => {
                                setSearching(false);
                                setModelsDataToManipulate(
                                  (prev) =>
                                    prev &&
                                    prev.filter(
                                      (each) =>
                                        each.man_id !== eachManModel.man_id
                                    )
                                );
                                selectionDispatch(
                                  setManuFacturers({
                                    manufacturers: [
                                      ...manufacturers.filter(
                                        (each) =>
                                          each.man_id !== eachManModel.man_id
                                      ),
                                    ],
                                  })
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
                                setSearching(false);
                                setModelsDataToManipulate(
                                  (prev) =>
                                    prev &&
                                    prev.filter(
                                      (each) =>
                                        each.man_id !== eachManModel.man_id
                                    )
                                );

                                selectionDispatch(
                                  setManuFacturers({
                                    manufacturers: [
                                      ...manufacturers.filter(
                                        (each) =>
                                          each.man_id !== eachManModel.man_id
                                      ),
                                    ],
                                  })
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
                              style={{ color: "black" }}
                            >
                              {eachManModel.man_name}
                            </p>
                          </div>
                          <hr
                            style={
                              eachManModel.man_name.length >= 9
                                ? { width: "20%", marginRight: "5px" }
                                : { width: "90%", marginRight: "10px" }
                            }
                          ></hr>
                        </div>
                      )}

                      {searching &&
                        searchModelsTXT.length !== 0 &&
                        filterModelsByText(
                          searchModelsTXT,
                          mergedModelsDataToManipulate === undefined
                            ? []
                            : mergedModelsDataToManipulate
                        ).map((eachModel) => (
                          <EachModel
                            key={v4()}
                            parentManID={eachManModel.man_id}
                            innerModelsManID={eachModel.man_id}
                            innerModels={eachModel.models_group}
                          />
                        ))}

                      {searchModelsTXT.length === 0 &&
                        eachManModel.models_group.map((eachObject) => (
                          <div key={v4()}>
                            {Object.entries(eachObject).map(
                              ([modelGroup, models]) => {
                                return (
                                  <DropDownModels
                                    key={v4()}
                                    setSearchingState={setSearching}
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
              ) : (
                <p
                  style={{ marginLeft: "10px" }}
                  className={selectionStyling["no-search-result"]}
                >
                  ჩანაწერი არ არის
                </p>
              )}
              {models.length !== 0 && (
                <div className={selectionStyling["clear-mans-submit"]}>
                  <p
                    onClick={() => {
                      setSearching(false);
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

export default Models;
