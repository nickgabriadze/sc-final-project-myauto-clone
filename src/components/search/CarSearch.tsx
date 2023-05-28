import carSearchStyling from "./carSearch.module.css";
import SelectionTypes from "./searchComponents/Selection";
import ThreeTypes from "./searchComponents/ThreeTypes";
import PriceFromTo from "./searchComponents/priceFromTo";

function CarSearch() {
  return (
    <>
      <section className={carSearchStyling["search-wrap"]}>
        <ThreeTypes />
        <SelectionTypes />
        <PriceFromTo />
      </section>
    </>
  );
}

export default CarSearch;
