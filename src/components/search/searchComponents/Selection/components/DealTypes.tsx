import selectionStyling from "../selection.module.css";
import ExpandMoreSVG from "../../../icons/expand-more.svg";
import ExpandLessSVG from "../../../icons/expand-less.svg";
import CloseSVG from "../../../icons/close.svg";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../../../features/hooks";
import { setSearchingTypeState } from "../../../../../features/selectionSlice";
import { setDealType } from "../../../../../features/searchSlice";

interface Deal {
  იყიდება: [number, boolean];
  ქირავდება: [number, boolean];
  დღიურად: [number, boolean];
  მძღოლით: [number, boolean];
  შესყიდვით: [number, boolean];
  დაზღვეული: [number, boolean];
}

function DealTypes() {
  const [searchDealsTXT, setSearchDealsTXT] =
    useState<string>("გარიგების ტიპი");
  const selectionDispatch = useAppDispatch();
  const { deal_type: dealType, } = useAppSelector((state) => state.selectionReducer);
   const {deal_type} = useAppSelector(state => state.searchReducer);

  const [selectedDeals, setSelectedDeals] = useState<Deal>({
    იყიდება: [0, false],
    ქირავდება: [1, false],
    დღიურად: [1, false],
    მძღოლით: [2, false],
    შესყიდვით: [3, false],
    დაზღვეული: [4, false],
  });

  const checkSelectedDeals = (): boolean => {
    return (
      selectedDeals.იყიდება[1] ||
      selectedDeals.ქირავდება[1] ||
      selectedDeals.დაზღვეული[1] ||
      selectedDeals.დღიურად[1] ||
      selectedDeals.მძღოლით[1] ||
      selectedDeals.შესყიდვით[1]
    );
  };

  useEffect(() => {
    const updateSearchTXT = (): [string, number[]] => {
      let constructedString = "";
      const chosenDealIds: number[] = [];
      for (const [k, v] of Object.entries(selectedDeals)) {
        if (v[1] === true) {
          constructedString = constructedString + k + ", ";
          chosenDealIds.push(v[0]);
        }
      }

      return [
        constructedString.split(", ").slice(0, -1).join(", "),
        chosenDealIds
      ];
    };
    const updatedString = updateSearchTXT();
    setSearchDealsTXT(
      updatedString[0].length === 0 ? "გარიგების ტიპი" : updatedString[0]
    );
    selectionDispatch(
      setDealType({
        deal_type: updatedString[1],
      })
    );
  }, [
    selectedDeals,
    selectionDispatch,
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
                    deal_type: !dealType,
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
                if (dealType && checkSelectedDeals()) {
                  setSearchDealsTXT("გარიგების ტიპი");
                  setSelectedDeals((prev) => ({
                    ...prev,
                    იყიდება: [0, false],
                    ქირავდება: [1, false],
                    დღიურად: [1, false],
                    მძღოლით: [2, false],
                    შესყიდვით: [3, false],
                    დაზღვეული: [4, false],
                  }));
                } else {
                  
                  selectionDispatch(
                    setSearchingTypeState({
                      deal_type: !dealType,
                      manufacturer_type: false,
                      category_type: false,
                      models_type: false,
                    })
                  );
                }
              }}
              src={
                dealType
                  ? !checkSelectedDeals()
                    ? ExpandLessSVG
                    : CloseSVG
                  : ExpandMoreSVG
              }
              className={selectionStyling["expand-close-delete"]}
            />
          </div>
        </div>
        {dealType && (
          <div className={selectionStyling["deals-list"]}>
            <div className={selectionStyling["each-deal-wrapper"]}>
              <div className={selectionStyling["each-deal"]}>
                <input
                  type={"checkbox"}
                  readOnly={true}
                  checked={selectedDeals.იყიდება[1]}
                  onClick={() => {
                    setSelectedDeals((prev) => ({
                      ...prev,
                      იყიდება: [0, !prev.იყიდება[1]],
                      ქირავდება: [1, false],
                      დღიურად: [1, false],
                      მძღოლით: [2, false],
                      შესყიდვით: [3, false],
                      დაზღვეული: [4, false],
                    }));
                  }}
                ></input>
                <p
                  onClick={() => {
                    setSelectedDeals((prev) => ({
                      ...prev,
                      იყიდება: [0, !prev.იყიდება[1]],
                      ქირავდება: [1, false],
                      დღიურად: [1, false],
                      მძღოლით: [2, false],
                      შესყიდვით: [3, false],
                      დაზღვეული: [4, false],
                    }));
                  }}
                >
                  იყიდება
                </p>
              </div>

              <div className={selectionStyling["each-deal"]}>
                <input
                  type={"checkbox"}
                  readOnly={true}
                  checked={selectedDeals.ქირავდება[1]}
                  onClick={() => {
                    setSelectedDeals((prev) => ({
                      ...prev,
                      იყიდება: [0, false],
                      ქირავდება: [1, !prev.ქირავდება[1]],
                      დღიურად: [1, false],
                      მძღოლით: [2, false],
                      შესყიდვით: [3, false],
                      დაზღვეული: [4, false],
                    }));
                  }}
                ></input>
                <p
                  onClick={() => {
                    setSelectedDeals((prev) => ({
                      ...prev,
                      იყიდება: [0, false],
                      ქირავდება: [1, !prev.ქირავდება[1]],
                      დღიურად: [1, false],
                      მძღოლით: [2, false],
                      შესყიდვით: [3, false],
                      დაზღვეული: [4, false],
                    }));
                  }}
                >
                  ქირავდება
                </p>
              </div>

              <div className={selectionStyling["for-rent-deals"]}>
                <hr></hr>
                <div className={selectionStyling["rent-deals"]}>
                  <div className={selectionStyling["each-deal"]}>
                    <input
                      type={"checkbox"}
                      readOnly={true}
                      checked={selectedDeals.დღიურად[1]}
                      onClick={() => {
                        setSelectedDeals((prev) => ({
                          ...prev,
                          იყიდება: [0, false],
                          ქირავდება: [1, true],
                          დღიურად: [1, !prev.დღიურად[1]],
                          მძღოლით: [2, prev.მძღოლით[1]],
                          შესყიდვით: [3, prev.შესყიდვით[1]],
                          დაზღვეული: [4, prev.დაზღვეული[1]],
                        }));
                      }}
                    ></input>
                    <p
                      onClick={() => {
                        setSelectedDeals((prev) => ({
                          ...prev,
                          იყიდება: [0, false],
                          ქირავდება: [1, true],
                          დღიურად: [1, !prev.დღიურად[1]],
                          მძღოლით: [2, prev.მძღოლით[1]],
                          შესყიდვით: [3, prev.შესყიდვით[1]],
                          დაზღვეული: [4, prev.დაზღვეული[1]],
                        }));
                      }}
                    >
                      დღიურად
                    </p>
                  </div>

                  <div className={selectionStyling["each-deal"]}>
                    <input
                      type={"checkbox"}
                      readOnly={true}
                      checked={selectedDeals.მძღოლით[1]}
                      onClick={() => {
                        setSelectedDeals((prev) => ({
                          ...prev,
                          იყიდება: [0, false],
                          ქირავდება: [1, true],
                          დღიურად: [1, prev.დღიურად[1]],
                          მძღოლით: [2, !prev.მძღოლით[1]],
                          შესყიდვით: [3, prev.შესყიდვით[1]],
                          დაზღვეული: [4, prev.დაზღვეული[1]],
                        }));
                      }}
                    ></input>
                    <p
                      onClick={() => {
                        setSelectedDeals((prev) => ({
                          ...prev,
                          იყიდება: [0, false],
                          ქირავდება: [1, true],
                          დღიურად: [1, prev.დღიურად[1]],
                          მძღოლით: [2, !prev.მძღოლით[1]],
                          შესყიდვით: [3, prev.შესყიდვით[1]],
                          დაზღვეული: [4, prev.დაზღვეული[1]],
                        }));
                      }}
                    >
                      მძღოლით
                    </p>
                  </div>
                  <div className={selectionStyling["each-deal"]}>
                    <input
                      type={"checkbox"}
                      readOnly={true}
                      checked={selectedDeals.შესყიდვით[1]}
                      onClick={() => {
                        setSelectedDeals((prev) => ({
                          ...prev,
                          იყიდება: [0, false],
                          ქირავდება: [1, true],
                          დღიურად: [1, prev.დღიურად[1]],
                          მძღოლით: [2, prev.მძღოლით[1]],
                          შესყიდვით: [3, !prev.შესყიდვით[1]],
                          დაზღვეული: [4, prev.დაზღვეული[1]],
                        }));
                      }}
                    ></input>
                    <p
                      onClick={() => {
                        setSelectedDeals((prev) => ({
                          ...prev,
                          იყიდება: [0, false],
                          ქირავდება: [1, true],
                          დღიურად: [1, prev.დღიურად[1]],
                          მძღოლით: [2, prev.მძღოლით[1]],
                          შესყიდვით: [3, !prev.შესყიდვით[1]],
                          დაზღვეული: [4, prev.დაზღვეული[1]],
                        }));
                      }}
                    >
                      შესყიდვით
                    </p>
                  </div>
                  <div className={selectionStyling["each-deal"]}>
                    <input
                      type={"checkbox"}
                      readOnly={true}
                      checked={selectedDeals.დაზღვეული[1]}
                      onClick={() => {
                        setSelectedDeals((prev) => ({
                          ...prev,
                          იყიდება: [0, false],
                          ქირავდება: [1, true],
                          დღიურად: [1, prev.დღიურად[1]],
                          მძღოლით: [2, prev.მძღოლით[1]],
                          შესყიდვით: [3, prev.შესყიდვით[1]],
                          დაზღვეული: [4, !prev.დაზღვეული[1]],
                        }));
                      }}
                    ></input>
                    <p
                      onClick={() => {
                        setSelectedDeals((prev) => ({
                          ...prev,
                          იყიდება: [0, false],
                          ქირავდება: [1, true],
                          დღიურად: [1, prev.დღიურად[1]],
                          მძღოლით: [2, prev.მძღოლით[1]],
                          შესყიდვით: [3, prev.შესყიდვით[1]],
                          დაზღვეული: [4, !prev.დაზღვეული[1]],
                        }));
                      }}
                    >
                      დაზღვეული
                    </p>
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
                      იყიდება: [0, false],
                      ქირავდება: [1, false],
                      დღიურად: [1, false],
                      მძღოლით: [2, false],
                      შესყიდვით: [3, false],
                      დაზღვეული: [4, false],
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
