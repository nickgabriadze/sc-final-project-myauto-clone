import { useEffect, useState } from "react";
import { Model } from "../components/search/searchInterfaces";

export const useModels = (mans: number[]) => {
  const [modelsData, setModelsData] = useState<Model[]>([]);
  const [modelsError, setModelsError] = useState<string>("");
  const [modelsLoading, setModelsLoading] = useState<boolean>(false);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      const models = [];
      for (const num of mans) {
        const req = await fetch(
          `https://api2.myauto.ge/ka/getManModels?man_id=${num}`
        );
        const data = await req.json();

        models.push(data.data);
      }

      return models;
    };

    try {
      setModelsLoading(true);
      const innerFunc = async () => {
        const fetchedData = await fetchData();
        setModelsData(fetchedData.flat());
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
