
import { Model } from "../../../../searchInterfaces";
import selectionStyling from "../../selection.module.css";
import ExpandMoreSVG from "../../../../icons/expand-more.svg";
import ExpandLessSVG from "../../../../icons/expand-less.svg";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../features/hooks";
import { setModels } from "../../../../../../features/searchSlice";
import { setOpenedModelGroups } from "../../../../../../features/selectionSlice";
useAppDispatch;
function DropDownModels({
  modelGroup,
  manModels,
}: {
  modelGroup: string;
  manModels: Model[];
}) {
  const allOpenedModelGroups = useAppSelector((state) => state.selectionReducer.openedModelGroups);
  const openedModelGroup = useAppSelector(state =>  state.selectionReducer.openedModelGroups).includes(modelGroup)
  const selectionDispatch = useAppDispatch();
  const { models } = useAppSelector((state) => state.searchReducer);


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
                checked={models.some(model => manModels.map(each => each.model_name).includes(model.model_name))}
                name="Manufacturers"
                onClick={() => {
                  if(manModels.length === models.filter(each => each.model_group === modelGroup).length){
                    selectionDispatch(setModels({
                      models: [...models.filter(each => each.model_group !== modelGroup )]
                    }))
                  }

                  if(models.filter(each => each.model_group === modelGroup).length === 0){
                    selectionDispatch(setModels({
                      models: [...models, ...manModels.map(each => {return {man_id: each.man_id, model_name: each.model_name, model_id: each.model_id, model_group: each.model_group}})]
                    }))
                  }
                }}
    
              ></input>
              <p
                onClick={() => {
                  if(allOpenedModelGroups.includes(modelGroup)){
                    selectionDispatch(setOpenedModelGroups({
                      modelGroups: [...allOpenedModelGroups.filter(eachModelGroup => eachModelGroup !== modelGroup)]
                     }))
                  }else{
                   selectionDispatch(setOpenedModelGroups({
                    modelGroups: [...allOpenedModelGroups, modelGroup]
                   }))
                  }
                
                }}
              >{modelGroup}</p>
            </div>
            <img
              alt="Dropdown"
              src={!openedModelGroup ? ExpandMoreSVG : ExpandLessSVG}
                onClick={() => {
                  if(allOpenedModelGroups.includes(modelGroup)){
                    selectionDispatch(setOpenedModelGroups({
                      modelGroups: [...allOpenedModelGroups.filter(eachModelGroup => eachModelGroup !== modelGroup)]
                     }))
                  }else{
                   selectionDispatch(setOpenedModelGroups({
                    modelGroups: [...allOpenedModelGroups, modelGroup]
                   }))
                  }
                
                }}
              width={20}
              height={20}
              style={{ marginRight: "5px" }}
            ></img>
          </div>

          {openedModelGroup && (
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
                                  model_group: eachInnerModel.model_group
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
                                   model_group: eachInnerModel.model_group
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
                            model_group: each.model_group
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
                              model_group: each.model_group
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
