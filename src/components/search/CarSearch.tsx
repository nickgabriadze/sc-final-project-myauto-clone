import carSearchStyling from "./carSearch.module.css";
import SelectionTypes from "./searchComponents/Selection/Selection";
import ThreeTypes from "./searchComponents/ThreeTypes";
import PriceFromTo from "./searchComponents/PriceFromTo";

function CarSearch() {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", fontFamily: 'Noto Sans Georgian' }}
      className={carSearchStyling['car-search-entire-container']}
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
            იყიდება
          </span>
        </p>
        <section className={carSearchStyling["search-wrap"]}>
          <ThreeTypes />
          <SelectionTypes />
          <PriceFromTo />
        </section>
      </div>
    </>
  );
}

export default CarSearch;
