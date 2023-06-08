
import useProducts from "../../hooks/products/useProducts";
import carProductsStyling from "./carProducts.module.css";
import EachCarAsProduct from "./components/EachCarAsProduct";
import ProductsHeader from "./components/ProductsHeader";

function CarProducts() {
  const { productsData } = useProducts(
    `https://api2.myauto.ge/ka/products?Page=${1}`
  );

  console.log(productsData)
 


  return (
    <div className={carProductsStyling["products-wrapper"]}>
      <ProductsHeader productsMetaTotal={productsData.meta.total}/>
      <div className={carProductsStyling['car-products']}>
        {productsData.items.map((eachCarAsProduct) => (
          <EachCarAsProduct key={eachCarAsProduct.car_id} carAsProduct={eachCarAsProduct}/>
        ))}
      </div>
    </div>
  );
}
export default CarProducts;