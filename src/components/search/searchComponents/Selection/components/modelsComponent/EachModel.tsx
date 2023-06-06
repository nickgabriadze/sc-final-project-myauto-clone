import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../features/hooks";
import { setModels } from "../../../../../../features/searchSlice";
import { Model } from "../../../../searchInterfaces";
import selectionStyling from "../../selection.module.css";

function EachModel({ innerModel }: { innerModel: Model }) {
  const selectionDispatch = useAppDispatch();
  const { models } = useAppSelector((state) => state.searchReducer);

  return (
    <>
      <div
        key={innerModel.model_id}
        className={selectionStyling["each-models-man"]}
      >
        <input
          onClick={() => {
            
            if (
              models.some(
                (model) =>
                  model.model_id === innerModel.model_id &&
                  model.model_name === innerModel.model_name &&
                  model.man_id === innerModel.man_id
              )
            ) {
              selectionDispatch(
                setModels({
                  models: [
                    ...models.filter(
                      (model) => model.model_id !== innerModel.model_id
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
                      man_id: innerModel.man_id,
                      model_name: innerModel.model_name,
                      model_id: innerModel.model_id,
                    },
                  ],
                })
              );
            }
          }}
          readOnly={true}
          type={"checkbox"}
          checked={
            models.some(
              (model) =>
                model.model_id === innerModel.model_id &&
                model.model_name === innerModel.model_name &&
                model.man_id === innerModel.man_id
            ) && true
          }
          name="Manufacturers"
        ></input>
        <p
          onClick={() => {
           
            if (
              models.some(
                (model) =>
                  model.model_id === innerModel.model_id &&
                  model.model_name === innerModel.model_name &&
                  model.man_id === innerModel.man_id
              )
            ) {
              selectionDispatch(
                setModels({
                  models: [
                    ...models.filter(
                      (model) => model.model_id !== innerModel.model_id
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
                      man_id: innerModel.man_id,
                      model_name: innerModel.model_name,
                      model_id: innerModel.model_id,
                    },
                  ],
                })
              );
            }
          }}
        >
          {innerModel.model_name}
        </p>
      </div>
    </>
  );
}

export default EachModel;
