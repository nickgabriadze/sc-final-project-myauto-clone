import selectionStyling from "../selection.module.css";
import ExpandMoreSVG from "../../../icons/expand-more.svg";
import { useState } from "react";

function DealTypes() {
  const [searchDealsTXT, setSearchDealsTXT] = useState<string>("გარიგების ტიპი");

  return (
    <div className={selectionStyling["type-deals-wrapper"]}>
      <div className={selectionStyling["deals-type"]}>
        <h5>გარიგების ტიპი</h5>
        <div className={selectionStyling['deals-outer-div']}>
          <div className={selectionStyling["deals-search-div"]}>
            <input type="text" 
            value={searchDealsTXT}
            onClick={() => {
              setSearchDealsTXT("")
            }}
            readOnly={true}
            />
            <img src={ExpandMoreSVG} alt="dropdown" width={20} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealTypes;
