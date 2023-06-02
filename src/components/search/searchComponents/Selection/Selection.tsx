import carSearchStyling from "../../carSearch.module.css";
import Manufacturers from "./Manufacturers";
import Categories from "./Categories";
import DealTypes from "./DealTypes";

function SelectionTypes() {

  return (
    <div className={carSearchStyling["categories-wrapper"]}>
      <DealTypes/>
      
      <Manufacturers />
      <Categories />
    </div>
  );
}

export default SelectionTypes;
