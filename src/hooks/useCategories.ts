import { useEffect, useState } from "react"
import { Category } from "../components/search/searchInterfaces";


export const useCategories = (url: string) => {
    const [catsData, setCatsData] = useState<Category[]>();
    const [catsError, setCatsError] = useState<string>("OK")
    const [catsLoading, setCatsLoading] = useState<boolean>(false);


    useEffect(() => {
       
        const abortController = new AbortController();


        const fetchData = async () => {
            const req = await fetch(url);
            const data = req.json();
            
            return data
        }

        try{
            setCatsLoading(true)
            const innerFunc = async () => {
                const fetchedData = await fetchData();
                setCatsData(fetchedData.data);
                
            }

            innerFunc();
        }catch(err){
            setCatsError("Couldn't fetch data")
            
        }finally{
           setTimeout(() => {
            setCatsLoading(false)
           }, 1000)
        }


        return () => abortController.abort();

        
    }, [url])

    return {catsData, catsLoading, catsError}
}

export default useCategories;