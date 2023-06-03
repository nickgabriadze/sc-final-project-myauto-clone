import carSearchStyling from "../../carSearch.module.css";
import Manufacturers from "./components/Manufacturers";
import Categories from "./components/Categories";
import DealTypes from "./components/DealTypes";

function SelectionTypes() {


  return (
    <div className={carSearchStyling["categories-wrapper"]}>

      <DealTypes />
      <Manufacturers />
      <Categories/>

    </div>
  );
}

export default SelectionTypes;
