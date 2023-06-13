import carSearchStyling from "./carSearch.module.css";
import SelectionTypes from "./searchComponents/Selection/Selection";
import ThreeTypes from "./searchComponents/ThreeTypes";
import PriceFromTo from "./searchComponents/PriceFromTo";
import { useAppSelector } from "../../features/hooks";

function CarSearch() {
  const {deal_type} = useAppSelector(state => state.searchReducer);
  return (
    <div
    className={carSearchStyling['car-search-entire-container']}>
      <div style={{ display: "flex", flexDirection: "column", fontFamily: 'Noto Sans Georgian' }}
     
      >
        <p
          style={{
            fontSize: "15px",
            fontFamily: `Poppins, sans-serif`,
            color: '#6F7383',
            padding: '10px',
            paddingLeft: '0'
          }}
        >
          მთავარი &gt; ძიება &gt;{" "}
          <span
            style={{
              filter:
                "invert(37%) sepia(82%) saturate(4017%) hue-rotate(2deg) brightness(97%) contrast(112%)",
            }}
          >
            {deal_type.length !== 0 ? deal_type[0] === 0 ? "იყიდება" : "ქირავდება" : "იყიდება"}
          </span>
        </p>
        <section className={carSearchStyling["search-wrap"]}>
          <ThreeTypes />
          <SelectionTypes />
          <PriceFromTo />
        </section>
      </div>

      </div>
   
  );
}

export default CarSearch;
