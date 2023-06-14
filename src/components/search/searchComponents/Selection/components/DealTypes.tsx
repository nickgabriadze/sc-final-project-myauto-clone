import selectionStyling from "../selection.module.css";
import ExpandMoreSVG from "../../../icons/expand-more.svg";
import ExpandLessSVG from "../../../icons/expand-less.svg";
import CloseSVG from "../../../icons/close.svg";
import { useAppSelector, useAppDispatch } from "../../../../../features/hooks";
import { setSearchingTypeState } from "../../../../../features/selectionSlice";
import { setDealType } from "../../../../../features/searchSlice";

function DealTypes() {
  const selectionDispatch = useAppDispatch();
  const { deal_type: dealType } = useAppSelector(
    (state) => state.selectionReducer
  );
  const { deal_type } = useAppSelector((state) => state.searchReducer);

  const generateStringFromDealTypes = () => {
    const deals = [];

    if (deal_type.includes(0)) {
      deals.push("იყიდება");
    }

    if (deal_type.includes(1)) {
      deals.push("ქირავდება");
    }

    if (deal_type.filter((deal) => deal === 1).length == 2) {
      deals.push("დღიურად");
    }

    if (deal_type.includes(2)) {
      deals.push("მძღოლით");
    }

    if (deal_type.includes(3)) {
      deals.push("შესყიდვით");
    }

    if (deal_type.includes(4)) {
      deals.push("დაზღვეული");
    }

    return deals.join(", ");
  };

  const checkSelectedDeals = (): boolean => {
    return deal_type.includes(0) || deal_type.includes(1);
  };

  return (
    <div className={selectionStyling["type-deals-wrapper"]}>
      <div className={selectionStyling["deals-type"]}>
        <h5>გარიგების ტიპი</h5>
        <div className={selectionStyling["deals-outer-div"]}>
          <div className={selectionStyling["deals-search-div"]}>
            <input
              type="text"
              value={
                generateStringFromDealTypes().length === 0
                  ? "გარიგების ტიპი"
                  : generateStringFromDealTypes()
              }
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
                  selectionDispatch(
                    setDealType({
                      deal_type: [],
                    })
                  );
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
                  checked={deal_type.includes(0)}
                  onClick={() => {
                    if (deal_type.includes(0)) {
                      selectionDispatch(
                        setDealType({
                          deal_type: [
                            ...deal_type.filter((deal) => deal !== 0),
                          ],
                        })
                      );
                    } else {
                      selectionDispatch(
                        setDealType({
                          deal_type: [0],
                        })
                      );
                    }
                  }}
                ></input>
                <p
                  onClick={() => {
                    if (deal_type.includes(0)) {
                      selectionDispatch(
                        setDealType({
                          deal_type: [
                            ...deal_type.filter((deal) => deal !== 0),
                          ],
                        })
                      );
                    } else {
                      selectionDispatch(
                        setDealType({
                          deal_type: [0],
                        })
                      );
                    }
                  }}
                >
                  იყიდება
                </p>
              </div>

              <div className={selectionStyling["each-deal"]}>
                <input
                  type={"checkbox"}
                  readOnly={true}
                  checked={deal_type.includes(1)}
                  onClick={() => {
                    if (deal_type.includes(1)) {
                      selectionDispatch(
                        setDealType({
                          deal_type: [],
                        })
                      );
                    } else {
                      selectionDispatch(
                        setDealType({
                          deal_type: [1],
                        })
                      );
                    }
                  }}
                ></input>
                <p
                  onClick={() => {
                    if (deal_type.includes(1)) {
                      selectionDispatch(
                        setDealType({
                          deal_type: []
                        })
                      );
                    } else {
                      selectionDispatch(
                        setDealType({
                          deal_type: [1],
                        })
                      );
                    }
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
                      checked={
                        deal_type.filter((deal) => deal === 1).length == 2
                      }
                      onClick={() => {
                        if (
                          deal_type.filter((deal) => deal === 1).length === 2
                        ) {
                          selectionDispatch(
                            setDealType({
                              deal_type: [
                                ...deal_type.filter((deal) => deal !== 1),
                                1,
                              ],
                            })
                          );
                        } else {
                          selectionDispatch(
                            setDealType({
                              deal_type: [
                                ...deal_type.filter(deal => deal !== 0),
                                ...(deal_type.filter((deal) => deal === 1)
                                  .length === 0
                                  ? [1, 1]
                                  : [1]),
                              ],
                            })
                          );
                        }
                      }}
                    ></input>
                    <p
                      onClick={() => {
                        if (
                          deal_type.filter((deal) => deal === 1).length === 2
                        ) {
                          selectionDispatch(
                            setDealType({
                              deal_type: [
                                ...deal_type.filter((deal) => deal !== 1),
                                1,
                              ],
                            })
                          );
                        } else {
                          selectionDispatch(
                            setDealType({
                              deal_type: [
                                ...deal_type.filter(deal => deal !== 0),
                                ...(deal_type.filter((deal) => deal === 1)
                                  .length === 0
                                  ? [1, 1]
                                  : [1]),
                              ],
                            })
                          );
                        }
                      }}
                    >
                      დღიურად
                    </p>
                  </div>

                  <div className={selectionStyling["each-deal"]}>
                    <input
                      type={"checkbox"}
                      readOnly={true}
                      checked={deal_type.includes(2)}
                      onClick={() => {
                        if (deal_type.includes(2)) {
                          selectionDispatch(
                            setDealType({
                              deal_type: [
                                ...deal_type.filter((deal) => deal !== 2),
                              ],
                            })
                          );
                        } else {
                          selectionDispatch(
                            setDealType({
                              deal_type: [
                                ...deal_type.filter(deal => deal !== 0),
                                ...(deal_type.filter((deal) => deal === 1)
                                  .length === 0
                                  ? [1, 2]
                                  : [2]),
                              ],
                            })
                          );
                        }
                      }}
                    ></input>
                    <p
                      onClick={() => {
                        if (deal_type.includes(2)) {
                          selectionDispatch(
                            setDealType({
                              deal_type: [
                                ...deal_type.filter((deal) => deal !== 2),
                              ],
                            })
                          );
                        } else {
                          selectionDispatch(
                            setDealType({
                              deal_type: [
                                ...deal_type.filter(deal => deal !== 0),
                                ...(deal_type.filter((deal) => deal === 1)
                                  .length === 0
                                  ? [1, 2]
                                  : [2]),
                              ],
                            })
                          );
                        }
                      }}
                    >
                      მძღოლით
                    </p>
                  </div>
                  <div className={selectionStyling["each-deal"]}>
                    <input
                      type={"checkbox"}
                      readOnly={true}
                      checked={deal_type.includes(3)}
                      onClick={() => {
                        if (deal_type.includes(3)) {
                          selectionDispatch(
                            setDealType({
                              deal_type: [
                                ...deal_type.filter((deal) => deal !== 3),
                              ],
                            })
                          );
                        } else {
                          selectionDispatch(
                            setDealType({
                              deal_type: [
                                ...deal_type.filter(deal => deal !== 0),
                                ...(deal_type.filter((deal) => deal === 1)
                                  .length === 0
                                  ? [1, 3]
                                  : [3]),
                              ],
                            })
                          );
                        }
                      }}
                    ></input>
                    <p
                      onClick={() => {
                        if (deal_type.includes(3)) {
                          selectionDispatch(
                            setDealType({
                              deal_type: [
                                ...deal_type.filter((deal) => deal !== 3),
                              ],
                            })
                          );
                        } else {
                          selectionDispatch(
                            setDealType({
                              deal_type: [
                                ...deal_type.filter(deal => deal !== 0),
                                ...(deal_type.filter((deal) => deal === 1)
                                  .length === 0
                                  ? [1, 3]
                                  : [3]),
                              ],
                            })
                          );
                        }
                      }}
                    >
                      შესყიდვით
                    </p>
                  </div>
                  <div className={selectionStyling["each-deal"]}>
                    <input
                      type={"checkbox"}
                      readOnly={true}
                      checked={deal_type.includes(4)}
                      onClick={() => {
                        if (deal_type.includes(4)) {
                          selectionDispatch(
                            setDealType({
                              deal_type: [
                                ...deal_type.filter((deal) => deal !== 4),
                              ],
                            })
                          );
                        } else {
                          selectionDispatch(
                            setDealType({
                              deal_type: [
                                ...deal_type.filter(deal => deal !== 0),
                                ...(deal_type.filter((deal) => deal === 1)
                                  .length === 0
                                  ? [1, 4]
                                  : [4]),
                              ],
                            })
                          );
                        }
                      }}
                    ></input>
                    <p
                      onClick={() => {
                        if (deal_type.includes(4)) {
                          selectionDispatch(
                            setDealType({
                              deal_type: [
                                ...deal_type.filter((deal) => deal !== 4),
                              ],
                            })
                          );
                        } else {
                          selectionDispatch(
                            setDealType({
                              deal_type: [
                                ...deal_type.filter(deal => deal !== 0),
                                ...(deal_type.filter((deal) => deal === 1)
                                  .length === 0
                                  ? [1, 4]
                                  : [4]),
                              ],
                            })
                          );
                        }
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
                    selectionDispatch(
                      setDealType({
                        deal_type: [],
                      })
                    );
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
