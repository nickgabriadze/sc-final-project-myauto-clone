import { useState, useEffect } from "react";
import {Products } from "../../components/products/productsInterfaces";

function useProducts(url: string):{productsData: Products  , productsError: string, productsLoading: boolean}{

    const [productsData, setProductsData] = useState<Products>({
        data: [],
        meta: {
            total: 0,
            per_page: 15,
            current_page: 1,
            last_page: 0,
        }
    });
    const [productsError, setProductsError] = useState<string>("");
    const [productsLoading, setProductsLoading] = useState<boolean>(true);

    useEffect(() => {
        setProductsLoading(true);
        const abortController = new AbortController();
        const fetchProducts = async () =>{
            const request = fetch(url);
            const response = await (await request).json();

            return response
        }

        try{
            const innerFunc = async () => {
                const fetchedData = await fetchProducts();
                setProductsData(fetchedData.data)
               
            }
              innerFunc();
              
        }catch(err){
            setProductsError(`${err}`)
        }finally{
            setProductsLoading(false)
        }

        return () => abortController.abort();

    },[url])
    return {productsData, productsError, productsLoading}
}

export default useProducts;