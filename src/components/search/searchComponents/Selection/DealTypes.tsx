import carSearchStyling from "../../carSearch.module.css";
import ExpandMoreSVG from "../../icons/expand-more.svg";

function DealTypes() {
  return (
    <div className={carSearchStyling["type-deals-wrapper"]}>
      <div className={carSearchStyling["deals-type"]}>
        <h5>გარიგების ტიპი</h5>
        <div className={carSearchStyling['deals-outer-div']}>
          <div className={carSearchStyling["deals-search-div"]}>
            <input type="text" />
            <img src={ExpandMoreSVG} alt="dropdown" width={20} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealTypes;
