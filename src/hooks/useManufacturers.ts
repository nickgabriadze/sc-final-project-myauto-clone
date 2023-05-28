import { useEffect, useState } from "react"
import { Manufacturer } from "../components/search/searchInterfaces";
import sortMansByTypes from "./sortMansByTypes";


export const useManufacturers = (url: string) => {
    const [mansData, setMansData] = useState<{[key:string]: Manufacturer[]}>();
    const [mansError, setMansError] = useState<string>("OK")
    const [mansLoading, setMansLoading] = useState<boolean>(false);


    useEffect(() => {
       
        const abortController = new AbortController();


        const fetchData = async () => {
            const req = await fetch(url);
            const data = req.json();
            
            return data
        }

        try{
            setMansLoading(true)
            const innerFunc = async () => {
                const fetchedData = await fetchData();
                
                setMansData(sortMansByTypes(fetchedData));
                
            }

            innerFunc();
        }catch(err){
            setMansError("Couldn't fetch data")
            
        }finally{
           setTimeout(() => {
            setMansLoading(false)
           }, 1000)
        }


        return () => abortController.abort();

        
    }, [url])

    return  {mansData, mansLoading, mansError}
}

export default useManufacturers;