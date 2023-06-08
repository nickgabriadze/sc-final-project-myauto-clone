import { useEffect, useState } from "react";
import useProducts from "../../hooks/products/useProducts";
import carProductsStyling from "./carProducts.module.css";
import EachCarAsProduct from "./components/EachCarAsProduct";
import ProductsHeader from "./components/ProductsHeader";
import { Products } from "./productsInterfaces";

function CarProducts() {
  const {productsData} = useProducts(`https://api2.myauto.ge/ka/products?Page=${1}`);
  
  
  const [carProductsData, setCarProductsData] = useState<Products>(
    {
      data: [],
      meta: {
          total: 0,
          per_page: 15,
          current_page: 1,
          last_page: 0,
      }}
  )
  useEffect(() => {
  
    setCarProductsData(productsData)

  }, [productsData?.data?.length, productsData])

console.log(carProductsData)
  return (
    <div className={carProductsStyling["products-wrapper"]}>
      <ProductsHeader productsMetaTotal={productsData.meta.total}/>
      <div>
        {carProductsData?.data.map((eachCarProduct) => (
          <EachCarAsProduct key={eachCarProduct.car_id} carAsProduct={eachCarProduct} />
        ))}
      </div>
    </div>
  );
}
export default CarProducts;
