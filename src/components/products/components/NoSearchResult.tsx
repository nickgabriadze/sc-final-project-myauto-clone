import { useAppDispatch } from "../../../features/hooks";
import { setSearchLink } from "../../../features/productSlice";
import {
  setCategories,
  setDealType,
  setManuFacturers,
  setModels,
  setPricesFrom,
  setPricesTo,
} from "../../../features/searchSlice";
import productsStyling from "../carProducts.module.css";
import NoResultSVG from "../icons/noResults.svg";

function NoSearchResult() {
  const selectionDispatch = useAppDispatch();

  return (
    <div className={productsStyling["no-results"]}>
      <img src={NoResultSVG} alt="Alert icon"></img>
      <h1>განცხადებები ვერ მოიძებნა</h1>
      <p>
        შენი ძებნის პარამეტრების მიხედვით განცხადებები ვერ მოიძებნა. შეცვალე ან
        გამოიწერე პარამეტრები და მიიღე შეტყობინება ახალი განცხადებების
        განთავსების შემთხვევაში
      </p>
      <button
        onClick={() => {
          selectionDispatch(
            setManuFacturers({
              manufacturers: [],
            })
          );

          selectionDispatch(
            setDealType({
              deal_type: [],
            })
          );

          selectionDispatch(
            setModels({
              models: [],
            })
          );

          selectionDispatch(
            setCategories({
              categories: [],
            })
          );

          selectionDispatch(
            setPricesFrom({
              pricesFrom: 0,
            })
          );

          selectionDispatch(
            setPricesTo({
              pricesTo: 0,
            })
          );

          selectionDispatch(
            setSearchLink({
              searchLink: "",
            })
          );
        }}
      >
        ფილტრის გასუფთავება
      </button>
    </div>
  );
}

export default NoSearchResult;
