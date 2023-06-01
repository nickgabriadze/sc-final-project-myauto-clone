import carSearchStyling from "../../carSearch.module.css";
import useCategories from "../../../../hooks/useCategories";
import { Category } from "../../searchInterfaces";
import Manufacturers from "./Manufacturers";
import { useAppSelector } from "../../../../features/hooks";
<<<<<<< HEAD
import SelectTypes from "./SelectionType";

function SelectionTypes() {
  const { catsData, catsError, catsLoading } = useCategories(
=======
import Categories  from "./Categories";

function SelectionTypes() {

  useCategories(
>>>>>>> f41b5ae44c8ff775c138d08c24903d793c9a14f8
    "https://api2.myauto.ge/ka/cats/get"
  );

  const { main_type } = useAppSelector((state) => state.searchReducer);

  return (
    <div className={carSearchStyling["categories-wrapper"]}>

      <SelectTypes />
      <Manufacturers />

<<<<<<< HEAD
      <div className={carSearchStyling["type-cat-wrapper"]}>
        <div className={carSearchStyling["cats-type"]}>
          <h5>კატეგორია</h5>
          <select name="Deal Type" className={carSearchStyling["cats-options"]}>
            <option value="loading">ყველა კატეგორია</option>
            {catsData !== undefined
              ? catsData[main_type].map((eachCategory: Category, index) => (
                  <option key={index} value={eachCategory.category_id}>
                    {eachCategory.seo_title.toLocaleUpperCase()}
                  </option>
                ))
              : "loading..."}
          </select>
        </div>
=======
      <div className={carSearchStyling["type-cat-wrapper"]}
   
      >
>>>>>>> f41b5ae44c8ff775c138d08c24903d793c9a14f8
      </div>
      <Categories/>

    </div>
  );
}

export default SelectionTypes;
