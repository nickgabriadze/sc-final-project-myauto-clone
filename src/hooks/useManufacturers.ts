import { useEffect, useState } from "react"
import { Manufacturer } from "../components/search/searchInterfaces";


export const useManufacturers = (url: string) => {
    const [mansData, setMansData] = useState<Manufacturer[]>();
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
                setMansData(fetchedData);
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