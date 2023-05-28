import { useState } from "react";
import carSearchStyling from "../carSearch.module.css";
import carSVG from "../icons/car.svg";
import motorcycleSVG from "../icons/motorcycle.svg";
import tractorSVG from "../icons/tractor.svg";

function ThreeTypes() {
  const [chosenSearchType, setChosenSearchType] = useState({
    car: true,
    tractor: false,
    motorcycle: false,
  });

  const styleToApply = {
    borderBottom: "1px solid #FD4100",
    backgroundColor: "white",
    borderTopLeftRadius: chosenSearchType.car ? "10px" : "",
    borderTopRightRadius: chosenSearchType.motorcycle ? "10px" : "",
    transition:` all 500ms ease-in-out`
  };

  return (
    <>
      <div className={carSearchStyling["three-types"]}>
        <div
          className={carSearchStyling["car-div"]}
          style={
            chosenSearchType.car
              ? styleToApply
              : {
                  borderTopLeftRadius: "10px",
                }
          }
          onClick={() =>
            setChosenSearchType((prev) => ({
              ...prev,
              car: true,
              tractor: false,
              motorcycle: false,
            }))
          }
        >
          <img
            src={carSVG}
            alt="Car icon"
            style={
              chosenSearchType.car
                ? {
                    filter:
                      "invert(37%) sepia(82%) saturate(4017%) hue-rotate(2deg) brightness(97%) contrast(112%)",
                  }
                : {}
            }
            draggable={false}
          ></img>
        </div>

        <div
          className={carSearchStyling["tractor-div"]}
          style={chosenSearchType.tractor ? styleToApply : {}}
          onClick={() =>
            setChosenSearchType((prev) => ({
              ...prev,
              tractor: true,
              car: false,
              motorcycle: false,
            }))
          }
        >
          <img
            src={tractorSVG}
            style={
              chosenSearchType.tractor
                ? {
                    filter:
                      "invert(37%) sepia(82%) saturate(4017%) hue-rotate(2deg) brightness(97%) contrast(112%)",
                  }
                : {}
            }
            alt="Tractor icon"
            draggable={false}
          ></img>
        </div>

        <div
          className={carSearchStyling["motorcycle-div"]}
          style={
            chosenSearchType.motorcycle
              ? styleToApply
              : {
                  borderTopRightRadius: "10px",
                }
          }
          onClick={() =>
            setChosenSearchType((prev) => ({
              ...prev,
              motorcycle: true,
              car: false,
              tractor: false,
            }))
          }
        >
          <img
            style={
              chosenSearchType.motorcycle
                ? {
                    filter:
                      "invert(37%) sepia(82%) saturate(4017%) hue-rotate(2deg) brightness(97%) contrast(112%)",
                  }
                : {}
            }
            src={motorcycleSVG}
            alt="Motorcycle icon"
            draggable={false}
          ></img>
        </div>
      </div>
    </>
  );
}

export default ThreeTypes;
