export const generateFilterLink = (
  dealType: number[],
  models: {
    man_id: number;
    model_name: string;
    model_id: number;
    model_group: string;
  }[],
  categories: { cat_name: string; cat_id: number }[],
  pricesFrom: number,
  pricesTo: number,
  manufacturers: {
    man_name: string;
    man_id: number;
  }[]
) => {
  const dealTypesString = `ForRent=${dealType.join(".")}`;
  const categoriesString = `Cats=${categories
    .map((each) => each.cat_id)
    .join(".")}`;

  const grouppedModels: {
    [key: number]: number[];
  } = {};

  for (const model of models) {
    if (model.man_id in grouppedModels) {
      grouppedModels[model.man_id].push(model.model_id);
    } else {
      grouppedModels[model.man_id] = [model.model_id];
    }
  }

  const mansWithoutModels = [];
  // this for loop is for the manufacturers that the user hasn't chosen models from

  for (const eachMan of manufacturers) {
    if (grouppedModels[eachMan.man_id] === undefined) {
      mansWithoutModels.push(eachMan.man_id);
    }
  }

  let modelsString = "";

  Object.entries(grouppedModels).forEach(([key, value], i) => {
    if (i === Object.entries(grouppedModels).length - 1) {
      modelsString = modelsString.concat(`${key}.${value.join(".")}`);
    } else {
      modelsString = modelsString.concat(`${key}.${value.join(".")}-`);
    }
  });

  modelsString = modelsString.concat(
    mansWithoutModels.length !== 0 ? `-${mansWithoutModels.join("-")}` : ""
  );

  return `${dealTypesString}&&${categoriesString}&&Mans=${modelsString}&&PriceFrom=${
    pricesFrom === 0 ? "" : pricesFrom
  }&&PriceTo=${pricesTo === 0 ? "" : pricesTo}`;
};

export default generateFilterLink;
