import selectionStyling from "../selection.module.css";
import ExpandMoreSVG from "../../../icons/expand-more.svg";
import ExpandLessSVG from "../../../icons/expand-less.svg";
import CloseSVG from "../../../icons/close.svg";
import { useAppSelector } from "../../../../../features/hooks";
import { useEffect } from "react";
import useModels from "../../../../../hooks/useModels";


function Models() {

    const {manufacturers} = useAppSelector(state => state.searchReducer);


    const {modelsData} = useModels(manufacturers);
      
    console.log(modelsData)
  
  return (
    <div className={selectionStyling["type-models-wrappers"]}>
      <div className={selectionStyling["models-type"]}>
        <div className={selectionStyling["mans-type"]}>
          <h5>მოდელები</h5>
          <div className={selectionStyling["mans-outer-div"]}>
            <div className={selectionStyling["mans-search-div"]}>
                <input></input>
                <img src={ExpandMoreSVG} alt="Dropdown" width={15} height={15}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Models;
