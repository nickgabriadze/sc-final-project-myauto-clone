import selectionStyling from "../selection.module.css";
import ExpandMoreSVG from "../../../icons/expand-more.svg";
import ExpandLessSVG from "../../../icons/expand-less.svg";
import CloseSVG from "../../../icons/close.svg";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../../../features/hooks";
import { setSearchingTypeState } from "../../../../../features/selectionSlice";

interface Deal {
  იყიდება: boolean;
  ქირავდება: boolean;
  დღიურად: boolean;
  მძღოლით: boolean;
  შესყიდვით: boolean;
  დაზღვეული: boolean;
}

function DealTypes() {
  const [searchDealsTXT, setSearchDealsTXT] =
    useState<string>("გარიგების ტიპი");
  const selectionDispatch = useAppDispatch();
  const { deal_type } = useAppSelector((state) => state.selectionReducer);
  const [selectedDeals, setSelectedDeals] = useState<Deal>({
    იყიდება: false,
    ქირავდება: false,
    დღიურად: false,
    მძღოლით: false,
    შესყიდვით: false,
    დაზღვეული: false,
  });

  const checkSelectedDeals = (): boolean => {
    return (
      selectedDeals.იყიდება ||
      selectedDeals.ქირავდება ||
      selectedDeals.დაზღვეული ||
      selectedDeals.დღიურად ||
      selectedDeals.მძღოლით ||
      selectedDeals.შესყიდვით
    );
  };

  useEffect(() => {
    const updateSearchTXT = (): string => {
      let constructedString = "";
      for (const [k, v] of Object.entries(selectedDeals)) {
        if (v) {
          constructedString = constructedString + k + ", ";
        }
      }
      

      return constructedString.split(", ").slice(0, -1).join(", ");
    };
    const updatedString = updateSearchTXT();
    setSearchDealsTXT(updatedString.length === 0 ? "გარიგების ტიპი": updatedString);
  }, [
    selectedDeals,
    selectedDeals.დაზღვეული,
    selectedDeals.დღიურად,
    selectedDeals.იყიდება,
    selectedDeals.ქირავდება,
    selectedDeals.შესყიდვით,
    selectedDeals.მძღოლით,
  ]);

  return (
    <div className={selectionStyling["type-deals-wrapper"]}>
      <div className={selectionStyling["deals-type"]}>
        <h5>გარიგების ტიპი</h5>
        <div className={selectionStyling["deals-outer-div"]}>
          <div className={selectionStyling["deals-search-div"]}>
            <input
              type="text"
              value={searchDealsTXT}
              readOnly={true}
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
              style={{ cursor: "pointer" }}
            />
            <img
              alt="dropdown"
              width={15}
              height={15}
              onClick={() => {
                if (deal_type && checkSelectedDeals()) {
                  setSearchDealsTXT("გარიგების ტიპი");
                  setSelectedDeals((prev) => ({
                    ...prev,
                    იყიდება: false,
                    ქირავდება: false,
                    დღიურად: false,
                    მძღოლით: false,
                    შესყიდვით: false,
                    დაზღვეული: false,
                  }));
                } else {
                  selectionDispatch(
                    setSearchingTypeState({
                      deal_type: !deal_type,
                      manufacturer_type: false,
                      category_type: false,
                      models_type: false,
                    })
                  );
                }
              }}
              src={
                deal_type
                  ? !checkSelectedDeals()
                    ? ExpandLessSVG
                    : CloseSVG
                  : ExpandMoreSVG
              }
              className={selectionStyling["expand-close-delete"]}
            />
          </div>
        </div>
        {deal_type && (
          <div className={selectionStyling["deals-list"]}>
            <div className={selectionStyling["each-deal-wrapper"]}>
              <div className={selectionStyling["each-deal"]}>
                <input
                  type={"checkbox"}
                  readOnly={true}
                  checked={selectedDeals.იყიდება}
                  onClick={() => {
                    setSelectedDeals((prev) => ({
                      ...prev,
                      იყიდება: !prev.იყიდება,
                      ქირავდება: false,
                      დღიურად: false,
                      მძღოლით: false,
                      შესყიდვით: false,
                      დაზღვეული: false,
                    }));
                  }}
                ></input>
                <p>იყიდება</p>
              </div>

              <div className={selectionStyling["each-deal"]}>
                <input
                  type={"checkbox"}
                  readOnly={true}
                  checked={selectedDeals.ქირავდება}
                  onClick={() => {
                    setSelectedDeals((prev) => ({
                      ...prev,
                      იყიდება: false,
                      ქირავდება: !prev.ქირავდება,
                      დღიურად: false,
                      მძღოლით: false,
                      შესყიდვით: false,
                      დაზღვეული: false,
                    }));
                  }}
                ></input>
                <p>ქირავდება</p>
              </div>

              <div className={selectionStyling["for-rent-deals"]}>
                <hr></hr>
                <div className={selectionStyling["rent-deals"]}>
                  <div className={selectionStyling["each-deal"]}>
                    <input
                      type={"checkbox"}
                      readOnly={true}
                      checked={selectedDeals.დღიურად}
                      onClick={() => {
                        setSelectedDeals((prev) => ({
                          ...prev,
                          იყიდება: false,
                          ქირავდება: true,
                          დღიურად: !prev.დღიურად,
                          მძღოლით: prev.მძღოლით,
                          შესყიდვით: prev.შესყიდვით,
                          დაზღვეული: prev.დაზღვეული,
                        }));
                      }}
                    ></input>
                    <p>დღიურად</p>
                  </div>

                  <div className={selectionStyling["each-deal"]}>
                    <input
                      type={"checkbox"}
                      readOnly={true}
                      checked={selectedDeals.მძღოლით}
                      onClick={() => {
                        setSelectedDeals((prev) => ({
                          ...prev,
                          იყიდება: false,
                          ქირავდება: true,
                          დღიურად: prev.დღიურად,
                          მძღოლით: !prev.მძღოლით,
                          შესყიდვით: prev.შესყიდვით,
                          დაზღვეული: prev.დაზღვეული,
                        }));
                      }}
                    ></input>
                    <p>მძღოლით</p>
                  </div>
                  <div className={selectionStyling["each-deal"]}>
                    <input
                      type={"checkbox"}
                      readOnly={true}
                      checked={selectedDeals.შესყიდვით}
                      onClick={() => {
                        setSelectedDeals((prev) => ({
                          ...prev,
                          იყიდება: false,
                          ქირავდება: true,
                          დღიურად: prev.დღიურად,
                          მძღოლით: prev.მძღოლით,
                          შესყიდვით: !prev.შესყიდვით,
                          დაზღვეული: prev.დაზღვეული,
                        }));
                      }}
                    ></input>
                    <p>შესყიდვით</p>
                  </div>
                  <div className={selectionStyling["each-deal"]}>
                    <input
                      type={"checkbox"}
                      readOnly={true}
                      checked={selectedDeals.დაზღვეული}
                      onClick={() => {
                        setSelectedDeals((prev) => ({
                          ...prev,
                          იყიდება: false,
                          ქირავდება: true,
                          დღიურად: prev.დღიურად,
                          მძღოლით: prev.მძღოლით,
                          შესყიდვით: prev.შესყიდვით,
                          დაზღვეული: !prev.დაზღვეული,
                        }));
                      }}
                    ></input>
                    <p>დაზღვეული</p>
                  </div>
                </div>
              </div>
            </div>
            {checkSelectedDeals() && (
              <div className={selectionStyling["clear-cats-submit"]}>
                <p
                  onClick={() => {
                    setSelectedDeals((prev) => ({
                      ...prev,
                      იყიდება: false,
                      ქირავდება: false,
                      დღიურად: false,
                      მძღოლით: false,
                      შესყიდვით: false,
                      დაზღვეული: false,
                    }));
                  
                  }}
                >
                  ფილტრის გასუფთავება
                </p>
                <button
                  onClick={() => {
                    selectionDispatch(
                      setSearchingTypeState({
                        deal_type: false,
                        manufacturer_type: false,
                        category_type: false,
                        models_type: false,
                      })
                    );
                  }}
                >
                  არჩევა
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DealTypes;
