import React, { useState } from "react";
import carSearchStyling from "../../carSearch.module.css";
import { useAppSelector } from "../../../../features/hooks";

function SelectTypes() {
  const { main_type } = useAppSelector((state) => state.searchReducer);

  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={carSearchStyling["deal-wrapper"]}>
        <div className={carSearchStyling["deal-type"]}>
          <h5>გარიგების ტიპი</h5>
            <select name="Deal Type" className={carSearchStyling["deal-options"]} value={selectedOption}
          onChange={handleOptionChange}>
            <option value="not chosen">გარიგების ტიპი</option>
            <option value="იყიდება">იყიდება</option>
            <option value="ქირავდება">ქირავდება</option>
            <option value="child1">შვილი 1</option>
            <option value="child2">შვილი 2</option>
            <option value="child3">შვილი 3</option>
            <option value="child4">შვილი 4</option>
          </select>
          
          
        </div>
      </div>


  );
}

export default SelectTypes;
