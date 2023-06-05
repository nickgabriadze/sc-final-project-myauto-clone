import { Model, SortedManModel } from "../components/search/searchInterfaces";

const sortByModelTypes = (
  data: {
    man_models: Model[];
    man_name: string;
  }[]
): SortedManModel[] => {
  const result: SortedManModel[] = [];

  for (const eachEntry of data) {
    const modelGroups = new Set(
      eachEntry.man_models.map((eachModel) => eachModel.model_group)
    );

    const modelGroupsObj: { [key: string]: Model[] } = {};

    for (const eachModelGroup of modelGroups) {
      modelGroupsObj[`${eachModelGroup}`] = [];
    }

    for (const eachModel of eachEntry.man_models) {
      modelGroupsObj[eachModel.model_group].push(eachModel);
    }

    const sortedObjectsArr = [];
    for (const [k, v] of Object.entries(modelGroupsObj)) {
      const modelsObj = { [k]: v };
      sortedObjectsArr.push(modelsObj);
    }
    result.push({
      man_name: eachEntry.man_name,
      models_group: sortedObjectsArr,
    });
  }

  return result;
};

export default sortByModelTypes;
