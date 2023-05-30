import carSearchStyling from "./carSearch.module.css";
import SelectionTypes from "./searchComponents/Selection/Selection";
import ThreeTypes from "./searchComponents/ThreeTypes";
import PriceFromTo from "./searchComponents/PriceFromTo";

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
