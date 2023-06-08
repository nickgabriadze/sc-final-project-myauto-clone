import { MergedModel } from "../components/search/searchInterfaces";

const filterModelsByText = (text: string, mergedModels: MergedModel[]) => {
  
  return mergedModels.map((eachManModel) => {
    return {
      man_id: eachManModel.man_id,
      man_name: eachManModel.man_name,
      models_group: eachManModel.models_group.filter((eachModel) =>
            eachModel.model_name.toLowerCase().startsWith(text.toLowerCase())
      )
    };
  });
};

export default filterModelsByText;
