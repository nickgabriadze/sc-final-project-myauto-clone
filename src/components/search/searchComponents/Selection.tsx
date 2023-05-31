import carSearchStyling from "../carSearch.module.css";
import useManufacturers from "../../../hooks/useManufacturers";
import useCategories from "../../../hooks/useCategories";
import { Category, Manufacturer } from "../searchInterfaces";
import { useAppDispatch, useAppSelector } from "../../../features/hooks";



function SelectionTypes() {
  
  const { mansData, mansError, mansLoading } = useManufacturers(
    "https://static.my.ge/myauto/js/mans.json"
  );
  const { catsData, catsError, catsLoading } = useCategories(
    "https://api2.myauto.ge/ka/cats/get"
  );
  const { main_type } = useAppSelector((state) => state.searchReducer);

  return (
    <div className={carSearchStyling["categories-wrapper"]}>
      
      
      <div className={carSearchStyling["deal-wrapper"]}>
        <div className={carSearchStyling["deal-type"]}>
          <h5>გარიგების ტიპი</h5>
          <select name="Deal Type" className={carSearchStyling["deal-options"]}>
            <option value="not chosen">გარიგების ტიპი</option>
            <option value="იყიდება">იყიდება</option>
            <option value="ქირავდება">ქირავდება</option>
            <option value="ქირავდება-1">ქირავდება-1</option>
            <option value="ქირავდება-2">ქირავდება-2</option>
            <option value="ქირავდება-3">ქირავდება-3</option>
            <option value="ქირავდება-4">ქირავდება-4</option>
          </select>
        </div>
      </div>


      <div className={carSearchStyling["manufacturers-wrapper"]}>
        <div className={carSearchStyling["mans-type"]}>
          <h5>მწარმოებელი</h5>
          <select name="Deal Type" className={carSearchStyling["man-options"]}>
            <option value="loading">ყველა მწარმოებელი</option>

            {mansData !== undefined
              ? mansData[main_type]?.map(
                  (eachManufacturer: Manufacturer, index) => (
                    <option key={index} value={eachManufacturer.man_id}>
                      {eachManufacturer.man_name}
                    </option>
                  )
                )
              : "loading..."}
          </select>
        </div>
      </div>

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
      </div>
    </div>
  );
}

export default SelectionTypes;
