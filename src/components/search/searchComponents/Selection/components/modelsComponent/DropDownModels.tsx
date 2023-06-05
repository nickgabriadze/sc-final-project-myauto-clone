import { v4 } from "uuid";
import { Model } from "../../../../searchInterfaces";
import selectionStyling from "../../selection.module.css";
import ExpandMoreSVG from "../../../../icons/expand-more.svg";
import ExpandLessSVG from "../../../../icons/expand-less.svg";
import { useState, useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../features/hooks";
import { setModels } from "../../../../../../features/searchSlice";
useAppDispatch;
function DropDownModels({
  modelGroup,
  manModels,
}: {
  modelGroup: string;
  manModels: Model[];
}) {
  const [openModels, setOpenModels] = useState<boolean>(false);
  const selectionDispatch = useAppDispatch();
  const { models_type } = useAppSelector((state) => state.selectionReducer);
  const { models } = useAppSelector((state) => state.searchReducer);

  useEffect(() => {
    setOpenModels(false);
   
  }, [models_type]);

  return (
    <>
      {modelGroup.trim().length !== 0 && (
        <>
          <div className={selectionStyling["each-models-man"]}

        >
            <div>
              <input
                type={"checkbox"}
                readOnly={true}
                
                name="Manufacturers"
              ></input>
              <p
               onClick={() => {
                setOpenModels(!openModels);
                console.log("WHUT")
            }}
              >{modelGroup}</p>
            </div>
            <img
              alt="Dropdown"
              src={!openModels ? ExpandMoreSVG : ExpandLessSVG}
                onClick={() => {
                    setOpenModels(!openModels);
                    console.log("WHUT")
                }}
              width={20}
              height={20}
              style={{ marginRight: "5px" }}
            ></img>
          </div>

          {openModels && (
            <div className={selectionStyling["models-dropdown"]}>
              <div>
                {manModels.map((eachInnerModel) => (
                  <div
                    key={eachInnerModel.model_id}
                    className={selectionStyling["each-models-man"]}
                  >
                    <input
                      onClick={() => {
                        if (
                          models.some(
                            (model) =>
                              model.model_id === eachInnerModel.model_id &&
                              model.model_name === eachInnerModel.model_name &&
                              model.man_id === eachInnerModel.man_id
                          )
                        ) {
                          selectionDispatch(
                            setModels({
                              models: [
                                ...models.filter(
                                  (model) => model.model_id !== eachInnerModel.model_id
                                ),
                              ],
                            })
                          );
                        } else {
                          selectionDispatch(
                            setModels({
                              models: [
                                ...models,
                                {
                                  man_id: eachInnerModel.man_id,
                                  model_name: eachInnerModel.model_name,
                                  model_id: eachInnerModel.model_id,
                                },
                              ],
                            })
                          );
                        }
                      }}

                      readOnly={true}
                      type={"checkbox"}
                      checked={ models.some(
                        (model) =>
                          model.model_id === eachInnerModel.model_id &&
                          model.model_name === eachInnerModel.model_name &&
                          model.man_id === eachInnerModel.man_id
                      ) && true}
                      name="Manufacturers"
                    ></input>
                    <p
                    onClick={() => {
                        if (
                          models.some(
                            (model) =>
                              model.model_id === eachInnerModel.model_id &&
                              model.model_name === eachInnerModel.model_name &&
                              model.man_id === eachInnerModel.man_id
                          )
                        ) {
                          selectionDispatch(
                            setModels({
                              models: [
                                ...models.filter(
                                  (model) => model.model_id !== eachInnerModel.model_id
                                ),
                              ],
                            })
                          );
                        } else {
                          selectionDispatch(
                            setModels({
                              models: [
                                ...models,
                                {
                                  man_id: eachInnerModel.man_id,
                                  model_name: eachInnerModel.model_name,
                                  model_id: eachInnerModel.model_id,
                                },
                              ],
                            })
                          );
                        }
                      }}
                    >{eachInnerModel.model_name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {modelGroup.trim() === "" &&
        manModels.map((each, index) => (
          <div key={index} className={selectionStyling["each-models-man"]}>
            <div>
              <input
                checked={
                  models.some(
                    (model) =>
                      model.model_id === each.model_id &&
                      model.model_name === each.model_name
                  ) && true
                }
                type={"checkbox"}
                readOnly={true}
                name="Manufacturers"
                onClick={() => {
                  if (
                    models.some(
                      (model) =>
                        model.model_id === each.model_id &&
                        model.model_name === each.model_name &&
                        model.man_id === each.man_id
                    )
                  ) {
                    selectionDispatch(
                      setModels({
                        models: [
                          ...models.filter(
                            (model) => model.model_id !== each.model_id
                          ),
                        ],
                      })
                    );
                  } else {
                    selectionDispatch(
                      setModels({
                        models: [
                          ...models,
                          {
                            man_id: each.man_id,
                            model_name: each.model_name,
                            model_id: each.model_id,
                          },
                        ],
                      })
                    );
                  }
                }}
              ></input>
              <p
                onClick={() => {
                    if (
                      models.some(
                        (model) =>
                          model.model_id === each.model_id &&
                          model.model_name === each.model_name &&
                          model.man_id === each.man_id
                      )
                    ) {
                      selectionDispatch(
                        setModels({
                          models: [
                            ...models.filter(
                              (model) => model.model_id !== each.model_id
                            ),
                          ],
                        })
                      );
                    } else {
                      selectionDispatch(
                        setModels({
                          models: [
                            ...models,
                            {
                              man_id: each.man_id,
                              model_name: each.model_name,
                              model_id: each.model_id,
                            },
                          ],
                        })
                      );
                    }
                  }}
              >{each.model_name}</p>
            </div>
          </div>
        ))}
    </>
  );
}

export default DropDownModels;
