import carSearchStyling from "../../carSearch.module.css";
import Manufacturers from "./components/Manufacturers";
import Categories from "./components/Categories";
import DealTypes from "./components/DealTypes";
import Models from "./components/modelsComponent/Models";

function SelectionTypes() {


  return (
    <div className={carSearchStyling["categories-wrapper"]}>

      <DealTypes />
      <Manufacturers />
      <Models />
      <Categories/>

    </div>
  );
}

export default SelectionTypes;
