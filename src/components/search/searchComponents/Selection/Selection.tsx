import carSearchStyling from "../../carSearch.module.css";
import useCategories from "../../../../hooks/useCategories";
import { Category } from "../../searchInterfaces";
import Manufacturers from "./Manufacturers";
import Categories from "./Categories";
import DealTypes from "./DealTypes";

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
