import carSearchStyling from "../carSearch.module.css";
import useManufacturers from "../../../hooks/useManufacturers";
import useCategories from "../../../hooks/useCategories";
import { Category, Manufacturer } from "../searchInterfaces";

function SelectionTypes() {

    const {mansData, mansError, mansLoading} = useManufacturers("https://static.my.ge/myauto/js/mans.json");
    const {catsData, catsError, catsLoading} = useCategories("https://api2.myauto.ge/ka/cats/get");
   

  return (
    <div className={carSearchStyling["categories-wrapper"]}>
      <div className={carSearchStyling["deal-wrapper"]}>
        <div className={carSearchStyling["deal-type"]}>
          <h5>გარიგების ტიპი</h5>
          <select name="Deal Type" className={carSearchStyling["deal-options"]}>
            <option value="იყიდება">იყიდება</option>
            <option value="ქირავდება">ქირავდება</option>
          </select>
        </div>
      </div>


      <div className={carSearchStyling['manufacturers-wrapper']}>
      <div className={carSearchStyling["mans-type"]}>
          <h5>მწარმოებელი</h5>
          <select name="Deal Type" className={carSearchStyling["man-options"]}>
           <option value="loading">ყველა მწარმოებელი</option>
             {mansData?.map((eachManufacturer:Manufacturer) => 
             (
                   <option value={eachManufacturer.man_id}>{eachManufacturer.man_name}</option>
                
             ))
           }
          </select>
        </div>
      </div>

      <div className={carSearchStyling['type-cat-wrapper']}>
      <div className={carSearchStyling["cats-type"]}>
          <h5>კატეგორია</h5>
          <select name="Deal Type" className={carSearchStyling["cats-options"]}>
           <option value="loading">ყველა კატეგორია</option>
             {catsData?.map((eachCategory:Category) => 
             (
                   <option value={eachCategory.category_id}>{eachCategory.seo_title.toLocaleUpperCase()}</option>
                
             ))
           }
          </select>
        </div>
      </div>
    </div>
  );
}

export default SelectionTypes;