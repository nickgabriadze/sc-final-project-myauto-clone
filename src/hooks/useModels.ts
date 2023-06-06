import { useEffect, useState } from "react";
import { Model, SortedManModel } from "../components/search/searchInterfaces";
import sortByModelTypes from "./sortByModelTypes";


export const useModels = (mans: {man_name: string, man_id:number}[]) => {
  const [modelsData, setModelsData] = useState<SortedManModel[]>([]);
  const [modelsError, setModelsError] = useState<string>("");
  const [modelsLoading, setModelsLoading] = useState<boolean>(false);
  
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
        setModelsData(sortByModelTypes(fetchedData));
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

  return { modelsData, modelsLoading, modelsError };
};

export default useModels;
