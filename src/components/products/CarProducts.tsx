import { useAppDispatch, useAppSelector } from "../../features/hooks";
import useProducts from "../../hooks/products/useProducts";
import carProductsStyling from "./carProducts.module.css";
import EachCarAsProduct from "./components/EachCarAsProduct";
import ProductsHeader from "./components/ProductsHeader";
import { Product } from "./productsInterfaces";
import GoToTheFirstAndTheLastPageSVG from "./icons/goToTheFirstAndTheLastPage.svg";
import GoBackAndForwardSVG from "./icons/goBackAndForward.svg";
import { setPage } from "../../features/productSlice";
import NoSearchResult from "./components/NoSearchResult";
import CarLoading from "./components/CarLoading";
import generatePageNumbers from "./helpers/generatePageNumbers";

function CarProducts() {
  const { page, sortIncDec, sortPeriod, searchLink, pressedSearch } =
    useAppSelector((state) => state.productsReducer);

  const sortByPeriod: {
    [key: number]: string;
  } = {
    0: "",
    1: "1h",
    2: "3h",
    3: "6h",
    4: "12h",
    5: "1d",
  };

  const [productsData, productsError, productsLoading] = useProducts(
    `https://api2.myauto.ge/ka/products?Page=${page}&&SortOrder=${sortIncDec}&&Period=${sortByPeriod[sortPeriod]}&&${searchLink}`
  );

  const productsDispatch = useAppDispatch();

  const generatedPages: number[] = generatePageNumbers(
    page,
    productsData.meta.last_page
  );
  
  if (productsError) {
    return <NoSearchResult />;
  }

  return (
    <div className={carProductsStyling["products-wrapper"]}>
      <ProductsHeader productsMetaTotal={productsData.meta.total} />
      {productsData.items.length !== 0 ? (
        <>
          <div className={carProductsStyling["car-products"]}>
            {productsLoading
              ? Array.from({ length: 15 }).map((_, i) => <CarLoading key={i} />)
              : productsData.items.map((eachCarAsProduct: Product) => (
                  <EachCarAsProduct
                    key={eachCarAsProduct.car_id}
                    carAsProduct={eachCarAsProduct}
                  />
                ))}
          </div>

          <div className={carProductsStyling["pages-wrapper"]}>
            <div className={carProductsStyling["pages"]}>
              {page !== 1 && (
                <img
                  src={GoToTheFirstAndTheLastPageSVG}
                  onClick={() => {
                    productsDispatch(
                      setPage({
                        page: 1,
                      })
                    );
                  }}
                  alt="Go to the first page"
                ></img>
              )}

              {page > 1 && (
                <img
                  src={GoBackAndForwardSVG}
                  onClick={() => {
                    productsDispatch(
                      setPage({
                        page: page - 1,
                      })
                    );
                  }}
                  style={{ rotate: "180deg" }}
                  alt="Go one page back"
                ></img>
              )}

              {generatedPages.map((eachPageNumber) => (
                <p
                  className={carProductsStyling["page-number"]}
                  onClick={() => {
                    productsDispatch(
                      setPage({
                        page: eachPageNumber,
                      })
                    );
                  }}
                  style={eachPageNumber === page ? { color: "#e34c0e" } : {}}
                  key={eachPageNumber}
                >
                  {eachPageNumber}
                </p>
              ))}

              {page < productsData.meta.last_page && (
                <img
                  src={GoBackAndForwardSVG}
                  onClick={() => {
                    productsDispatch(
                      setPage({
                        page: page + 1,
                      })
                    );
                  }}
                  alt="Go one page forward"
                ></img>
              )}
              {page !== productsData.meta.last_page && (
                <img
                  src={GoToTheFirstAndTheLastPageSVG}
                  onClick={() => {
                    productsDispatch(
                      setPage({
                        page: productsData.meta.last_page,
                      })
                    );
                  }}
                  style={{ rotate: "180deg" }}
                  alt="Go to the last page"
                ></img>
              )}
            </div>
          </div>
        </>
      ) : (
        pressedSearch && <NoSearchResult />
      )}
    </div>
  );
}
export default CarProducts;
