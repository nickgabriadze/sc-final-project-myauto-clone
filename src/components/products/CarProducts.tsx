import carProductsStyling from "./carProducts.module.css";
import ProductsHeader from "./components/ProductsHeader";

function CarProducts() {
  return (
    <div className={carProductsStyling["products-wrapper"]}>
      <ProductsHeader />
    </div>
  );
}
export default CarProducts;
