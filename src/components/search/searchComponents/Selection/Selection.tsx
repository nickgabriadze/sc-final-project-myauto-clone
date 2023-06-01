import carSearchStyling from "../../carSearch.module.css";
import Manufacturers from "./Manufacturers";
import Categories from "./Categories";

function SelectionTypes() {

  return (
    <div className={carSearchStyling["categories-wrapper"]}>
      <div className={carSearchStyling["deal-wrapper"]}>
        <div className={carSearchStyling["deal-type"]}>
          <h5>გარიგების ტიპი</h5>
          <select name="Deal Type" className={carSearchStyling["deal-options"]}>
            <option value="not chosen">გარიგების ტიპი</option>
            <option value="იყიდება">იყიდება</option>
            <option value="ქირავდება">ქირავდება</option>
          </select>
        </div>
      </div>

      <Manufacturers />
      <Categories />
    </div>
  );
}

export default SelectionTypes;
