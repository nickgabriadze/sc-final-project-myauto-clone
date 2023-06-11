import { useState, useEffect } from "react";
import { Products } from "../../components/products/productsInterfaces";

function useProducts(url: string): [Products, string, boolean] {
  const [productsData, setProductsData] = useState<Products>({
    items: [],
    meta: {
      total: 0,
      per_page: 15,
      current_page: 1,
      last_page: 0,
    },
  });
  const [productsError, setProductsError] = useState<string>("");
  const [productsLoading, setProductsLoading] = useState<boolean>(true);

  useEffect(() => {
    setProductsLoading(true);
    const abortController = new AbortController();

    const fetchProducts = async () => {
      const request = await fetch(url);
      const response = await request.json();

      return response;
    };

    const innerFunc = async () => {
      try {
        const fetchedData = await fetchProducts();
        setProductsData(fetchedData.data);
      } catch (err) {
        setProductsError(`${err}`);
        setProductsLoading(false);
      } finally {
        setProductsLoading(false);
      }
    };
    innerFunc();

    return () => abortController.abort();
  }, [url]);

  return [productsData, productsError, productsLoading];
}

export default useProducts;
