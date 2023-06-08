import carProductsStyling from "../carProducts.module.css";
import { Product } from "../productsInterfaces";



function EachCarAsProduct({carAsProduct}: {carAsProduct: Product}){

    return <p>{carAsProduct.car_id}</p>
}

export default EachCarAsProduct