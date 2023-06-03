import selectionStyling from "../selection.module.css";
import ExpandMoreSVG from "../../../icons/expand-more.svg";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../../../features/hooks";
import { setSearchingTypeState } from "../../../../../features/selectionSlice";

function DealTypes() {
  const [searchDealsTXT, setSearchDealsTXT] =
    useState<string>("გარიგების ტიპი");
  const selectionDispatch = useAppDispatch();
  const { deal_type } = useAppSelector((state) => state.selectionReducer);
  const [selectedDeals, setSelectedDeals] = useState<string[]>([]);



  return (
    <div className={selectionStyling["type-deals-wrapper"]}>
      <div className={selectionStyling["deals-type"]}>
        <h5>გარიგების ტიპი</h5>
        <div className={selectionStyling["deals-outer-div"]}>
          <div className={selectionStyling["deals-search-div"]}>
            <input
              type="text"
              value={searchDealsTXT}
              onClick={() => {
                setSearchDealsTXT("");
                selectionDispatch(
                  setSearchingTypeState({
                    deal_type: true,
                    manufacturer_type: false,
                    category_type: false,
                    models_type: false,
                  })
                );
              }}
              style={deal_type ? { cursor: "initial" } : { cursor: "pointer" }}
            />
            <img
              src={ExpandMoreSVG}
              alt="dropdown"
              width={15}
              height={15}
              onClick={() => {
                selectionDispatch(
                  setSearchingTypeState({
                    deal_type: !deal_type,
                    manufacturer_type: false,
                    category_type: false,
                    models_type: false,
                  })
                );
              }}
              className={selectionStyling["expand-close-delete"]}
            />
          </div>
        </div>
        {deal_type && (
          <div className={selectionStyling["deals-list"]}>
            <div className={selectionStyling['each-deal-wrapper']}>
            <div className={selectionStyling["each-deal"]}>
              <input type={"checkbox"}
              onClick={() => {
                if(!selectedDeals.includes("იყიდება")){
                setSelectedDeals((prev) => [...prev, "იყიდება"])
                setSearchDealsTXT([...selectedDeals, "იყიდება"].join(", "))
                }else{
                  setSelectedDeals((prev) => prev.filter(eachDeal => eachDeal !== "იყიდება"))
                  setSearchDealsTXT(selectedDeals.filter(eachDeal => eachDeal !== "იყიდება").join(", "))
                }
              
              }}
              ></input>
              <p
              onClick={() => {
                if(!selectedDeals.includes("იყიდება")){
                  setSelectedDeals((prev) => [...prev, "იყიდება"])
                  setSearchDealsTXT([...selectedDeals, "იყიდება"].join(", "))
                  }else{
                    setSelectedDeals((prev) => prev.filter(eachDeal => eachDeal === "იყიდება"))
                    setSearchDealsTXT(selectedDeals.filter(eachDeal => eachDeal !== "იყიდება").join(", "))
                  }
                }}
                
              >იყიდება</p>
            </div>

            <div className={selectionStyling["each-deal"]}>
              <input type={"checkbox"}
              
              ></input>
              <p>ქირავდება</p>
            </div>
            
            <div className={selectionStyling["for-rent-deals"]}>
              <hr></hr>
              <div className={selectionStyling['rent-deals']}>
              <div className={selectionStyling["each-deal"]}>
                <input type={"checkbox"}></input>
                <p>დღიურად</p>
              </div>

              <div className={selectionStyling["each-deal"]}>
                <input type={"checkbox"}></input>
                <p>მძღოლით</p>
              </div>
              <div className={selectionStyling["each-deal"]}>
                <input type={"checkbox"}></input>
                <p>შესყიდვით</p>
              </div>
              <div className={selectionStyling["each-deal"]}>
                <input type={"checkbox"}></input>
                <p>დაზღვეული</p>
              </div>
              </div>
            </div>
          </div>
          { selectedDeals.length !== 0 && <div className={selectionStyling["clear-cats-submit"]}>
                <p

                >
                  ფილტრის გასუფთავება
                </p>
                <button
                  onClick={() => {
                    selectionDispatch(setSearchingTypeState({
                      deal_type: false,
                      manufacturer_type: false,
                      category_type: false,
                      models_type: false
                    }));
  
                   
                  }}
                >
                  არჩევა
                </button>
              </div>}
          </div>
        )}

      </div>
    </div>
  );
}

export default DealTypes;
