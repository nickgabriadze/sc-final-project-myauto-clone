import { useAppDispatch, useAppSelector } from "../../features/hooks";
import useProducts from "../../hooks/products/useProducts";
import carProductsStyling from "./carProducts.module.css";
import EachCarAsProduct from "./components/EachCarAsProduct";
import ProductsHeader from "./components/ProductsHeader";
import { Product } from "./productsInterfaces";
import GoToTheFirstAndTheLastPageSVG from "./icons/goToTheFirstAndTheLastPage.svg";
import GoBackAndForwardSVG from "./icons/goBackAndForward.svg";
import { setPage } from "../../features/productSlice";


function CarProducts() {
  const { page } = useAppSelector((state) => state.productsReducer);

  const { productsData } = useProducts(
    `https://api2.myauto.ge/ka/products?Page=${page}`
  );

  const productsDispatch = useAppDispatch();
  console.log(productsData);

  const generatePagesArray = () => {
    return [1, 2, 3, 4, 5, 6, 7];
  };

  const generatedPages = generatePagesArray();

  return (
    <div className={carProductsStyling["products-wrapper"]}>
      <ProductsHeader productsMetaTotal={productsData.meta.total} />
      {productsData.items.length !== 0 && (
        <>
          <div className={carProductsStyling["car-products"]}>
            {productsData.items.map((eachCarAsProduct: Product) => (
              <EachCarAsProduct
                key={eachCarAsProduct.car_id}
                carAsProduct={eachCarAsProduct}
              />
            ))}
          </div>

          <div className={carProductsStyling["pages-wrapper"]}>
            <div className={carProductsStyling["pages"]}>
          

              
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default CarProducts;
