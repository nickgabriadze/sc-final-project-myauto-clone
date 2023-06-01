import carSearchStyling from "../../carSearch.module.css"
import useCategories from "../../../../hooks/useCategories";
import { Category } from "../../searchInterfaces";
import Manufacturers from "./Manufacturers";
import { useAppSelector } from "../../../../features/hooks";
import Categories  from "./Categories";

function SelectionTypes() {

  useCategories(
    "https://api2.myauto.ge/ka/cats/get"
  );

  const { main_type } = useAppSelector((state) => state.searchReducer);

  return (
    <div className={carSearchStyling["categories-wrapper"]}
    >
      <div className={carSearchStyling["deal-wrapper"]}
     
      >
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

      <div className={carSearchStyling["type-cat-wrapper"]}
   
      >
      </div>
      <Categories/>

    </div>
  );
}

export default SelectionTypes;
