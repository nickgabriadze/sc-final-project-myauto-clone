import { useEffect, useState } from "react";
import { MergedModel, Model, SortedManModel } from "../../components/search/searchInterfaces";
import sortByModelTypes from "./sortByModelTypes";
import mergeModels from "./mergeModels";


export const useModels = (mans: {man_name: string, man_id:number}[]) => {
  const [modelsData, setModelsData] = useState<SortedManModel[]>([]);
  const [modelsError, setModelsError] = useState<string>("");
  const [modelsLoading, setModelsLoading] = useState<boolean>(false);
  const [mergedModelsData, setMergedModelsData] = useState<MergedModel[]>() 
  
  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      const manModels:{man_models:Model[], man_name: string, man_id: number}[] = [];
      for (const man of mans) {
        const req = await fetch(
          `https://api2.myauto.ge/ka/getManModels?man_id=${man.man_id}`
        );
        const models = await req.json();

        manModels.push({man_models: models.data, man_name: man.man_name, man_id: man.man_id });
      }

      return manModels;
    };

    try {
      setModelsLoading(true);
      const innerFunc = async () => {
        const fetchedData = await fetchData();
        const sortedByModelTypes = sortByModelTypes(fetchedData)
        setModelsData(sortedByModelTypes);
        setMergedModelsData(mergeModels(sortedByModelTypes))
      };

      innerFunc();
    } catch (err) {
      setModelsError("Couldn't fetch data");
    } finally {
      setTimeout(() => {
        setModelsLoading(false);
      }, 1000);
    }

    return () => abortController.abort();
  }, [mans.length, mans]);

  return { mergedModelsData, modelsData, modelsLoading, modelsError };
};

export default useModels;
